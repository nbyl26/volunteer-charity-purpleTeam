package controllers

import (
	"path/filepath"
	"strconv"

	"backend/database"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type VerifyDonationInput struct {
	Status models.DonationStatus `json:"status" validate:"required,oneof=verified rejected"`
}

func saveFile(c *fiber.Ctx, fieldName string) (string, error) {
	file, err := c.FormFile(fieldName)
	if err != nil {
		return "", err
	}

	ext := filepath.Ext(file.Filename)
	newFilename := uuid.New().String() + ext
	dst := filepath.Join("./uploads", newFilename)

	if err := c.SaveFile(file, dst); err != nil {
		return "", err
	}
	
	fileUrl := "/files/" + newFilename
	return fileUrl, nil
}


func CreateDonation(c *fiber.Ctx) error {
	userID := uint(c.Locals("userID").(float64))
	campaignID := c.Params("id")

	amountStr := c.FormValue("amount")
	amount, err := strconv.ParseFloat(amountStr, 64)
	if err != nil || amount <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid amount"})
	}

	var campaign models.Campaign
	if err := database.DB.First(&campaign, campaignID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Campaign not found"})
	}

	fileUrl, err := saveFile(c, "proof_of_payment")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload failed: " + err.Error()})
	}

	donation := models.Donation{
		Amount:         amount,
		ProofOfPayment: fileUrl,
		Status:         models.StatusPending,
		UserID:         userID,
		CampaignID:     campaign.ID,
	}

	if err := database.DB.Create(&donation).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(donation)
}

func VerifyDonation(c *fiber.Ctx) error {
	donationID := c.Params("id")

	var input VerifyDonationInput
	if err := utils.ParseAndValidate(c, &input); err != nil {
		return err
	}
	
	var donation models.Donation
	if err := database.DB.First(&donation, donationID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Donation not found"})
	}
	
	if donation.Status != models.StatusPending {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Donation has already been processed"})
	}

	tx := database.DB.Begin()

	if err := tx.Model(&donation).Update("status", input.Status).Error; err != nil {
		tx.Rollback()
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	if input.Status == models.StatusVerified {
		err := tx.Model(&models.Campaign{}).Where("id = ?", donation.CampaignID).
					Update("collected", gorm.Expr("collected + ?", donation.Amount)).Error
					
		if err != nil {
			tx.Rollback()
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update campaign total"})
		}
	}

	if err := tx.Commit().Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to commit transaction"})
	}

	return c.Status(fiber.StatusOK).JSON(donation)
}