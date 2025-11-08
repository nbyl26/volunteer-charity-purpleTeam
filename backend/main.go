package main

import (
	"log"

	"backend/config"
	"backend/database"
	"backend/models"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
    database.InitDB()

    log.Println("Running database migrations...")
    if err := database.DB.AutoMigrate(
        &models.User{},
        &models.Campaign{},
        &models.Event{},
        &models.Donation{},
        &models.EventRegistration{},
    ); err != nil {
        log.Fatalf("Failed to auto-migrate: %v", err)
    }
    log.Println("Database migration completed")

    config.LoadConfig()
    cfg := config.GetConfig()

    app := fiber.New()

    app.Use(logger.New())
    app.Use(cors.New(cors.Config{
        AllowOrigins:     "http://localhost:5173",
        AllowMethods:     "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
        ExposeHeaders:    "Set-Cookie",
        AllowCredentials: true,
    }))

    app.Static("/files", "./uploads")

    routes.SetupRoutes(app, database.DB)

    app.Use(func(c *fiber.Ctx) error {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Route not found",
        })
    })

    log.Printf("🚀 Server starting on http://localhost:%s\n", cfg.Port)
    log.Fatal(app.Listen(":" + cfg.Port))
}