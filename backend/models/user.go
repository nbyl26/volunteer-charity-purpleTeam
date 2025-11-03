package models

import "time"

type Role string

const (
	RoleAdmin     Role = "admin"
	RoleUser      Role = "user"
)

type User struct {
	ID        uint      `gorm:"primaryKey"`
	Name      string    `gorm:"not null"`
	Email     string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
	Role      Role      `gorm:"type:varchar(20);not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	Donations          []Donation
	EventRegistrations []EventRegistration
}