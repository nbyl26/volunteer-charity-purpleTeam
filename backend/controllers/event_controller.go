package controllers

import (
	"time"
	"backend/database"
	"backend/models"
	"backend/utils"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type EventInput struct {
	Title       string    `json:"title" validate:"required,min=5"`
	Description string    `json:"description" validate:"required"`
	Location    string    `json:"location" validate:"required"`
	EventDate   time.Time `json:"event_date" validate:"required"`
	PhotoURL    string    `json:"photo_url" validate:"omitempty,url"`
	Category    string    `json:"category" validate:"required"` 
}


func CreateEvent(c *fiber.Ctx) error {
	eventDateStr := c.FormValue("event_date")
	eventDate, err := time.Parse(time.RFC3339, eventDateStr)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid event_date format. Use ISO 8601 (RFC3339).",
		})
	}

	input := EventInput{
		Title:       c.FormValue("title"),
		Description: c.FormValue("description"),
		Location:    c.FormValue("location"),
		Category:    c.FormValue("category"),
		EventDate:   eventDate,
	}

	if errors := utils.ValidateStruct(input); errors != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"errors": errors})
	}

	fileUrl, err := utils.SaveFile(c, "photo", "./uploads")
	if err != nil {
		if err == utils.ErrMissingFile {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Event photo (field 'photo') is required.",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "File upload failed: " + err.Error()})
	}

	event := models.Event{
		Title:       input.Title,
		Description: input.Description,
		Location:    input.Location,
		EventDate:   input.EventDate,
		Category:    input.Category,
		PhotoURL:    fileUrl,
	}

	if err := database.DB.Create(&event).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(event)
}

func GetEvents(c *fiber.Ctx) error {
	var events []models.Event
	if err := database.DB.Find(&events).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(events)
}

func GetEventByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var event models.Event

	err := database.DB.Preload("Registrations.User").First(&event, id).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(event)
}

func UpdateEvent(c *fiber.Ctx) error {
	id := c.Params("id")
	var event models.Event
	if err := database.DB.First(&event, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
	}

	var input EventInput
	if err := utils.ParseAndValidate(c, &input); err != nil {
		return err
	}

	database.DB.Model(&event).Updates(input)
	return c.Status(fiber.StatusOK).JSON(event)
}

func DeleteEvent(c *fiber.Ctx) error {
	id := c.Params("id")
	result := database.DB.Delete(&models.Event{}, id)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": result.Error.Error()})
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Event deleted successfully"})
}


func JoinEvent(c *fiber.Ctx) error {
	userID := uint(c.Locals("userID").(float64))
	eventID := c.Params("id")

	var event models.Event
	if err := database.DB.First(&event, eventID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
	}
	
	var existingReg models.EventRegistration
	err := database.DB.Where("user_id = ? AND event_id = ?", userID, eventID).First(&existingReg).Error
	if err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "You are already registered for this event"})
	}

	registration := models.EventRegistration{
		UserID:  userID,
		EventID: event.ID,
		Status:  models.RegStatusPending,
	}

	if err := database.DB.Create(&registration).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	
	var createdReg models.EventRegistration
	if err := database.DB.Preload("User").Preload("Event").First(&createdReg, registration.ID).Error; err != nil {
		return c.Status(fiber.StatusCreated).JSON(registration)
	}
	
	return c.Status(fiber.StatusCreated).JSON(createdReg)
}

func ApproveVolunteer(c *fiber.Ctx) error {
	volunteerID := c.Params("volunteerId")
	regID := c.Params("regId")

	var registration models.EventRegistration
	err := database.DB.Where("id = ? AND user_id = ?", regID, volunteerID).First(&registration).Error
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Registration not found"})
	}
	
	if err := database.DB.Model(&registration).Update("status", models.RegStatusApproved).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusOK).JSON(registration)
}