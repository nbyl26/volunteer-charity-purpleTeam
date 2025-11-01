package routes

import (
	"backend/controllers"
	"backend/middleware"
	"backend/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func SetupRoutes(app *fiber.App, db *gorm.DB) {
	{
		auth := app.Group("/auth")
		auth.Post("/register", controllers.Register)
		auth.Post("/login", controllers.Login)
		auth.Post("/refresh", controllers.RefreshToken)

		app.Get("/events", controllers.GetEvents)
		app.Get("/events/:id", controllers.GetEventByID)
		app.Get("/campaigns", controllers.GetCampaigns)
		app.Get("/campaigns/:id", controllers.GetCampaignByID)
	}

	{
		app.Get("/auth/me", middleware.AuthMiddleware(), controllers.GetSelf)
		
		userGroup := app.Group("/users")
		userGroup.Get("/me", middleware.AuthMiddleware(), controllers.GetMyProfile)
		userGroup.Patch("/me", middleware.AuthMiddleware(), controllers.UpdateMyProfile)
	}

	{
		app.Post("/events/:id/join", middleware.AuthMiddleware(), middleware.RoleMiddleware(models.RoleVolunteer), controllers.JoinEvent)
		
		app.Post("/upload/documentation/:regId", middleware.AuthMiddleware(), middleware.RoleMiddleware(models.RoleVolunteer), controllers.UploadVolunteerDocumentation)
	}

	{
		app.Post("/campaigns/:id/donate", middleware.AuthMiddleware(), middleware.RoleMiddleware(models.RoleDonatur), controllers.CreateDonation)
	}

	adminMiddleware := []fiber.Handler{middleware.AuthMiddleware(), middleware.RoleMiddleware(models.RoleAdmin)}
	{
		eventAdmin := app.Group("/events", adminMiddleware...)
		eventAdmin.Post("/", controllers.CreateEvent)
		eventAdmin.Put("/:id", controllers.UpdateEvent)
		eventAdmin.Delete("/:id", controllers.DeleteEvent)
		eventAdmin.Patch("/registrations/:regId/approve/:volunteerId", controllers.ApproveVolunteer)

		campaignAdmin := app.Group("/campaigns", adminMiddleware...)
		campaignAdmin.Post("/", controllers.CreateCampaign)
		campaignAdmin.Put("/:id", controllers.UpdateCampaign)
		campaignAdmin.Delete("/:id", controllers.DeleteCampaign)

		app.Patch("/donations/:id/verify", append(adminMiddleware, controllers.VerifyDonation)...)
		
		userAdmin := app.Group("/users", adminMiddleware...)
		userAdmin.Get("/", controllers.GetAllUsers)
		userAdmin.Get("/:id", controllers.GetUserByID)
	}
}