package main

import (
	"log"

	"backend/config"
	"backend/database"
	"backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	database.InitDB()
	
	database.MigrateDB(database.DB)

	config.LoadConfig()
	cfg := config.GetConfig()

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, PATCH, DELETE",
	}))

	app.Static("/files", "./uploads")

	routes.SetupRoutes(app, database.DB)

	app.Use(func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Route not found",
		})
	})

	log.Println("Starting server on port:", cfg.Port)
	log.Fatal(app.Listen(":" + cfg.Port))
}