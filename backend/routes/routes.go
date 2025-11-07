package routes

import (
	"backend/controllers"
	"backend/middleware"
	"backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {

	api := app.Group("/api")

	// Public Routes
	{
		api.Post("/contact", controllers.SendContactEmail)
	}

	{
		auth := api.Group("/auth")
		auth.Post("/register", controllers.Register)
		auth.Post("/login", controllers.Login)
		auth.Post("/refresh", controllers.RefreshToken)
		auth.Post("/logout", controllers.Logout)

		api.Get("/events", controllers.GetEvents)
		api.Get("/events/:id", controllers.GetEventByID)
		api.Get("/campaigns", controllers.GetCampaigns)
		api.Get("/campaigns/:id", controllers.GetCampaignByID)
	}

	// Authenticated Routes
	{
		api.Get("/auth/me", middleware.AuthMiddleware(), controllers.GetSelf)
		
		userGroup := api.Group("/users")
		userGroup.Get("/me", middleware.AuthMiddleware(), controllers.GetMyProfile)
		userGroup.Patch("/me", middleware.AuthMiddleware(), controllers.UpdateMyProfile)
	}

	// User Routes
	{
		api.Post("/events/:id/join", 
			middleware.AuthMiddleware(), 
			controllers.JoinEvent)
		
		api.Post("/upload/documentation/:regId", 
			middleware.AuthMiddleware(), 
			controllers.UploadVolunteerDocumentation)

		api.Post("/campaigns/:id/donate", 
			middleware.AuthMiddleware(),
			controllers.CreateDonation)
	}

	// Admin Routes
	adminMiddleware := []fiber.Handler{middleware.AuthMiddleware(), middleware.RoleMiddleware(models.RoleAdmin)}
	{
		eventAdmin := api.Group("/events", adminMiddleware...)
		eventAdmin.Post("/", controllers.CreateEvent)
		eventAdmin.Put("/:id", controllers.UpdateEvent)
		eventAdmin.Delete("/:id", controllers.DeleteEvent)
		eventAdmin.Patch("/registrations/:regId/approve/:volunteerId", controllers.ApproveVolunteer)
		eventAdmin.Get("/:id/registrations", controllers.GetEventRegistrations)

		campaignAdmin := api.Group("/campaigns", adminMiddleware...)
		campaignAdmin.Post("/", controllers.CreateCampaign)
		campaignAdmin.Put("/:id", controllers.UpdateCampaign)
		campaignAdmin.Delete("/:id", controllers.DeleteCampaign)

		donationAdmin := api.Group("/donations", adminMiddleware...)
		donationAdmin.Get("/", controllers.GetAllDonations)
		donationAdmin.Patch("/:id/verify", controllers.VerifyDonation)

		
		userAdmin := api.Group("/users", adminMiddleware...)
		userAdmin.Get("/", controllers.GetAllUsers)
		userAdmin.Get("/:id", controllers.GetUserByID)
	}
}