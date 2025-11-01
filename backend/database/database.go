package database

import (
	"fmt"
	"log"
	"os"

	"backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	var err error

	err = godotenv.Load()
	if err != nil {
		log.Println("Warning: Could not load .env file. Using environment variables from OS.")
	}

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	log.Println("Database connected successfully!")
}

func MigrateDB(db *gorm.DB) {
	log.Println("Running database migrations...")
	err := db.AutoMigrate(
		&models.User{},
		&models.Event{},
		&models.Campaign{},
		&models.Donation{},
		&models.EventRegistration{},
	)
	if err != nil {
		log.Fatal("Failed to migrate database:", err)
	}
}