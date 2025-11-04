package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"github.com/gofiber/fiber/v2"
)

func UploadVolunteerDocumentation(c *fiber.Ctx) error {
	userID := uint(c.Locals("userID").(float64))
	regID := c.Params("regId")

	var registration models.EventRegistration
	err := database.DB.Where("id = ? AND user_id = ?", regID, userID).First(&registration).Error
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event registration not found or you don't own it"})
	}
	
	fileUrl, err := utils.SaveFile(c, "documentation", "./uploads")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "File upload failed: " + err.Error()})
	}

	if err := database.DB.Model(&registration).Update("documentation_upload", fileUrl).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to save file path to database"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Documentation uploaded successfully",
		"url": fileUrl,
	})
}