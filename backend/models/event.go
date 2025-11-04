package models

import "time"

type Event struct {
	ID          uint      `gorm:"primaryKey"`
	Title       string    `gorm:"not null"`
	Description string
	Location    string
	EventDate   time.Time
	PhotoURL    string    `gorm:"type:varchar(255)"`
	Category    string    `gorm:"type:varchar(100);index"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Registrations []EventRegistration
}