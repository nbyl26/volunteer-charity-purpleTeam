package controllers

import (
	"strconv"
	"time"

	"backend/database"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type SimpleUserResponse struct {
    ID    uint   `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

type CampaignResponse struct {
    ID    uint   `json:"id"`
    Title string `json:"title"`
}

type DonationResponse struct {
    ID             uint                  `json:"id"`
    Amount         float64               `json:"amount"`
    ProofOfPayment string                `json:"proof_of_payment"`
    Message        string                `json:"message"`
    Status         models.DonationStatus `json:"status"`
    CreatedAt      time.Time             `json:"created_at"`
    User           SimpleUserResponse    `json:"user"`
    Campaign       CampaignResponse      `json:"campaign"`
}

type VerifyDonationInput struct {
    Status models.DonationStatus `json:"status" validate:"required,oneof=verified rejected"`
}

func GetAllDonations(c *fiber.Ctx) error {
    var donations []models.Donation

    if err := database.DB.Preload("User").Preload("Campaign").Order("created_at desc").Find(&donations).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to retrieve donations",
        })
    }

    var response []DonationResponse
    for _, donation := range donations {
        userResp := SimpleUserResponse{}
        if donation.User.ID != 0 {
            userResp = SimpleUserResponse{
                ID:    donation.User.ID,
                Name:  donation.User.Name,
                Email: donation.User.Email,
            }
        }

        campaignResp := CampaignResponse{}
        if donation.Campaign.ID != 0 {
            campaignResp = CampaignResponse{
                ID:    donation.Campaign.ID,
                Title: donation.Campaign.Title,
            }
        }

        response = append(response, DonationResponse{
            ID:             donation.ID,
            Amount:         donation.Amount,
            ProofOfPayment: donation.ProofOfPayment,
            Message:        donation.Message, 
            Status:         donation.Status,
            CreatedAt:      donation.CreatedAt,
            User:           userResp,
            Campaign:       campaignResp,
        })
    }

    return c.Status(fiber.StatusOK).JSON(response)
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

	fileUrl, err := utils.SaveFile(c, "proof_of_payment", "./uploads")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload failed: " + err.Error()})
	}

	message := c.FormValue("message")

	donation := models.Donation{
		Amount:         amount,
		ProofOfPayment: fileUrl,
		Message:        message,
		Status:         models.StatusPending,
		UserID:         userID,
		CampaignID:     campaign.ID,
	}

	if err := database.DB.Create(&donation).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	var createdDonation models.Donation
	if err := database.DB.Preload("User").Preload("Campaign").First(&createdDonation, donation.ID).Error; err != nil {
		return c.Status(fiber.StatusCreated).JSON(donation)
	}

	return c.Status(fiber.StatusCreated).JSON(createdDonation)
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
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }
    }

    tx.Commit()

    if err := database.DB.Preload("User").Preload("Campaign").First(&donation, donationID).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(donation)
}
