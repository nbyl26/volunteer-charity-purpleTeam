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

    // Create DSN without database name first to check/create database
    dsnWithoutDB := fmt.Sprintf("%s:%s@tcp(%s:%s)/?charset=utf8mb4&parseTime=True&loc=Local",
        dbUser, dbPassword, dbHost, dbPort)
    
    // Connect without specific database
    tempDB, err := gorm.Open(mysql.Open(dsnWithoutDB), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Silent),
    })
    if err != nil {
        log.Fatal("Failed to connect to MySQL server:", err)
    }

    // Create database if not exists
    createDBSQL := fmt.Sprintf("CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", dbName)
    if err := tempDB.Exec(createDBSQL).Error; err != nil {
        log.Fatal("Failed to create database:", err)
    }
    log.Println("Database ensured:", dbName)

    // Now connect to specific database
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        dbUser, dbPassword, dbHost, dbPort, dbName)

    DB, err = gorm.Open(mysql.New(mysql.Config{
        DSN:                       dsn,
        DefaultStringSize:         256,
        DisableDatetimePrecision:  false,
        DontSupportRenameIndex:    true,
        DontSupportRenameColumn:   true,
        SkipInitializeWithVersion: false,
    }), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })

    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }

    log.Println("Database connected successfully!")
}

func MigrateDB(db *gorm.DB) {
    log.Println("Running database migrations...")
    
    // Try AutoMigrate first
    err := db.AutoMigrate(
        &models.User{},
        &models.Campaign{},
        &models.Event{},
        &models.Donation{},
        &models.EventRegistration{},
    )
    
    if err != nil {
        log.Println("⚠️  AutoMigrate failed, trying manual table creation...")
        
        // Create tables manually using SQL
        sqlStatements := []string{
            `CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                password_reset_token VARCHAR(255),
                reset_token_expiry DATETIME(3),
                created_at DATETIME(3),
                updated_at DATETIME(3),
                PRIMARY KEY (id),
                UNIQUE KEY idx_users_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
            
            `CREATE TABLE IF NOT EXISTS campaigns (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                target DOUBLE NOT NULL,
                collected DOUBLE DEFAULT 0,
                image_url VARCHAR(255),
                created_at DATETIME(3),
                updated_at DATETIME(3),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
            
            `CREATE TABLE IF NOT EXISTS events (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                location VARCHAR(255) NOT NULL,
                event_date DATETIME(3) NOT NULL,
                photo_url VARCHAR(255),
                category VARCHAR(100) NOT NULL,
                created_at DATETIME(3),
                updated_at DATETIME(3),
                PRIMARY KEY (id),
                KEY idx_events_category (category)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
            
            `CREATE TABLE IF NOT EXISTS donations (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                amount DOUBLE NOT NULL,
                proof_of_payment VARCHAR(255) NOT NULL,
                message TEXT,
                status VARCHAR(20) DEFAULT 'pending',
                user_id BIGINT UNSIGNED NOT NULL,
                campaign_id BIGINT UNSIGNED NOT NULL,
                created_at DATETIME(3),
                updated_at DATETIME(3),
                PRIMARY KEY (id),
                KEY fk_donations_user (user_id),
                KEY fk_donations_campaign (campaign_id),
                CONSTRAINT fk_donations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                CONSTRAINT fk_donations_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
            
            `CREATE TABLE IF NOT EXISTS event_registrations (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                status VARCHAR(20) DEFAULT 'pending',
                documentation_upload VARCHAR(255),
                user_id BIGINT UNSIGNED NOT NULL,
                event_id BIGINT UNSIGNED NOT NULL,
                created_at DATETIME(3),
                updated_at DATETIME(3),
                PRIMARY KEY (id),
                KEY fk_event_registrations_user (user_id),
                KEY fk_event_registrations_event (event_id),
                CONSTRAINT fk_event_registrations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                CONSTRAINT fk_event_registrations_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
        }
        
        for _, sql := range sqlStatements {
            if err := db.Exec(sql).Error; err != nil {
                log.Printf("Error executing SQL: %v", err)
                log.Fatal("Cannot create tables manually")
            }
        }
        
        log.Println("✅ Tables created manually")
    } else {
        log.Println("✅ Database migration completed successfully!")
    }
}