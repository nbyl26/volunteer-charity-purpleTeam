package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type CampaignInput struct {
	Title       string  `json:"title" validate:"required,min=5"`
	Description string  `json:"description" validate:"required"`
	Target      float64 `json:"target" validate:"required,gt=0"`
}


func CreateCampaign(c *fiber.Ctx) error {
	var input CampaignInput
	if err := utils.ParseAndValidate(c, &input); err != nil {
		return err
	}

	campaign := models.Campaign{
		Title:       input.Title,
		Description: input.Description,
		Target:      input.Target,
		Collected:   0,
	}

	if err := database.DB.Create(&campaign).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(campaign)
}

func GetCampaigns(c *fiber.Ctx) error {
	var campaigns []models.Campaign
	if err := database.DB.Find(&campaigns).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(campaigns)
}

func GetCampaignByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var campaign models.Campaign

	err := database.DB.Preload("Donations.User").First(&campaign, id).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Campaign not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(campaign)
}

func UpdateCampaign(c *fiber.Ctx) error {
	id := c.Params("id")
	var campaign models.Campaign
	if err := database.DB.First(&campaign, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Campaign not found"})
	}

	var input CampaignInput
	if err := utils.ParseAndValidate(c, &input); err != nil {
		return err
	}

	database.DB.Model(&campaign).Updates(input)
	return c.Status(fiber.StatusOK).JSON(campaign)
}

func DeleteCampaign(c *fiber.Ctx) error {
	id := c.Params("id")
	result := database.DB.Delete(&models.Campaign{}, id)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": result.Error.Error()})
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Campaign not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Campaign deleted successfully"})
}