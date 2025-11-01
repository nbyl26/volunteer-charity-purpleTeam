package controllers

import (
	"backend/database"
	"backend/models"
	"backend/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type ProfileResponse struct {
	ID        uint      `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Role      models.Role `json:"role"`
	CreatedAt time.Time `json:"created_at"`
	Donations          []models.Donation         `json:"donations"`
	EventRegistrations []models.EventRegistration `json:"event_registrations"`
}

type UpdateProfileInput struct {
	Name  string `json:"name" validate:"required_without=Email,min=3"`
	Email string `json:"email" validate:"required_without=Name,email"`
}

func GetMyProfile(c *fiber.Ctx) error {
	userID := uint(c.Locals("userID").(float64))

	var user models.User
	err := database.DB.
		Preload("Donations").
		Preload("EventRegistrations.Event").
		First(&user, userID).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	
	resp := ProfileResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		Donations: user.Donations,
		EventRegistrations: user.EventRegistrations,
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}

func UpdateMyProfile(c *fiber.Ctx) error {
	userID := uint(c.Locals("userID").(float64))
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	var input UpdateProfileInput
	if err := utils.ParseAndValidate(c, &input); err != nil {
		return err
	}

	if err := database.DB.Model(&user).Updates(input).Error; err != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Email already in use"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Profile updated"})
}


func GetAllUsers(c *fiber.Ctx) error {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	var resp []UserResponse
	for _, u := range users {
		resp = append(resp, UserResponse{
			ID: u.ID, Name: u.Name, Email: u.Email, Role: u.Role, CreatedAt: u.CreatedAt,
		})
	}
	return c.Status(fiber.StatusOK).JSON(resp)
}

func GetUserByID(c *fiber.Ctx) error {
	id := c.Params("id")
	var user models.User

	err := database.DB.
		Preload("Donations").
		Preload("EventRegistrations.Event").
		First(&user, id).Error

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}
	
	resp := ProfileResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
		Donations: user.Donations,
		EventRegistrations: user.EventRegistrations,
	}
	return c.Status(fiber.StatusOK).JSON(resp)
}