package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"time"

	"github.com/gofiber/fiber/v2"
)

type EventInput struct {
    Title       string `json:"title" validate:"required,min=3"`
    Description string `json:"description" validate:"required,min=10"`
    Location    string `json:"location" validate:"required"`
    EventDate   string `json:"event_date" validate:"required"`
    Category    string `json:"category" validate:"required"`
}

func GetEvents(c *fiber.Ctx) error {
    var events []models.Event
    if err := database.DB.Preload("Registrations.User").Find(&events).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(fiber.StatusOK).JSON(events)
}

func GetEventByID(c *fiber.Ctx) error {
    id := c.Params("id")
    var event models.Event
    if err := database.DB.Preload("Registrations.User").First(&event, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
    }
    return c.Status(fiber.StatusOK).JSON(event)
}

func CreateEvent(c *fiber.Ctx) error {
    title := c.FormValue("title")
    description := c.FormValue("description")
    location := c.FormValue("location")
    category := c.FormValue("category")
    eventDateStr := c.FormValue("event_date")

    if title == "" || description == "" || location == "" || category == "" || eventDateStr == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "All fields are required"})
    }

    eventDate, err := time.Parse(time.RFC3339, eventDateStr)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid event_date format. Use ISO 8601 (e.g., 2025-06-15T10:00:00Z)",
        })
    }

    fileUrl, err := utils.SaveFile(c, "photo", "./uploads")
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Photo upload failed: " + err.Error()})
    }

    event := models.Event{
        Title:       title,
        Description: description,
        Location:    location,
        EventDate:   eventDate,
        Category:    category,
        PhotoURL:    fileUrl,
    }

    if err := database.DB.Create(&event).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusCreated).JSON(event)
}

func UpdateEvent(c *fiber.Ctx) error {
    id := c.Params("id")
    var event models.Event
    if err := database.DB.First(&event, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
    }

    title := c.FormValue("title")
    description := c.FormValue("description")
    location := c.FormValue("location")
    category := c.FormValue("category")
    eventDateStr := c.FormValue("event_date")

    if title == "" || description == "" || location == "" || category == "" || eventDateStr == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "All fields are required"})
    }

    eventDate, err := time.Parse(time.RFC3339, eventDateStr)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid event_date format. Use ISO 8601 (e.g., 2025-06-15T10:00:00Z)",
        })
    }

    event.Title = title
    event.Description = description
    event.Location = location
    event.EventDate = eventDate
    event.Category = category

    fileUrl, err := utils.SaveFile(c, "photo", "./uploads")
    if err == nil {
        event.PhotoURL = fileUrl
    }

    if err := database.DB.Save(&event).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(event)
}

func DeleteEvent(c *fiber.Ctx) error {
    id := c.Params("id")
    var event models.Event
    if err := database.DB.First(&event, id).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Event not found"})
    }

    if err := database.DB.Delete(&event).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
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

	var existing models.EventRegistration
	err := database.DB.Where("user_id = ? AND event_id = ?", userID, eventID).First(&existing).Error
	if err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "You have already registered for this event"})
	}

	registration := models.EventRegistration{
		UserID:  userID,
		EventID: event.ID,
		Status:  models.RegStatusPending,
	}

	if err := database.DB.Create(&registration).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
    
	var createdRegistration models.EventRegistration
	if err := database.DB.Preload("User").Preload("Event").First(&createdRegistration, registration.ID).Error; err != nil {
		return c.Status(fiber.StatusCreated).JSON(registration)
	}

	return c.Status(fiber.StatusCreated).JSON(createdRegistration)
}

func GetEventRegistrations(c *fiber.Ctx) error {
    eventID := c.Params("id")

    var registrations []models.EventRegistration
    if err := database.DB.Where("event_id = ?", eventID).Preload("User").Find(&registrations).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(registrations)
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

func RejectVolunteer(c *fiber.Ctx) error {
    volunteerID := c.Params("volunteerId")
    regID := c.Params("regId")

    var registration models.EventRegistration
    err := database.DB.Where("id = ? AND user_id = ?", regID, volunteerID).First(&registration).Error
    if err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Registration not found"})
    }

    if err := database.DB.Model(&registration).Update("status", models.RegStatusRejected).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(registration)
}

func UpdateRegistrationStatus(c *fiber.Ctx) error {
    regID := c.Params("regId")

    var input struct {
        Status models.RegistrationStatus `json:"status" validate:"required,oneof=pending approved rejected selesai"`
    }

    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    var registration models.EventRegistration
    if err := database.DB.First(&registration, regID).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Registration not found"})
    }

    if err := database.DB.Model(&registration).Update("status", input.Status).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    return c.Status(fiber.StatusOK).JSON(registration)
}
