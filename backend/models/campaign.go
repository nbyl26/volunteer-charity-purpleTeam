package models

import "time"

type Campaign struct {
	ID          uint      `gorm:"primaryKey"`
	Title       string    `gorm:"not null"`
	Description string
	Target      float64
	Collected   float64   `gorm:"default:0"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Donations []Donation
}