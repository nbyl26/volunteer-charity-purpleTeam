package models

import "time"

type RegistrationStatus string

const (
	RegStatusPending   RegistrationStatus = "pending"
	RegStatusApproved  RegistrationStatus = "approved"
	RegStatusRejected  RegistrationStatus = "rejected"
	RegStatusFinished  RegistrationStatus = "selesai"
)

type EventRegistration struct {
	ID                 uint               `gorm:"primaryKey"`
	Status             RegistrationStatus `gorm:"type:varchar(20);default:'pending'"`
	DocumentationUpload string            
	UserID  uint
	EventID uint
	User  User
	Event Event
	CreatedAt time.Time
	UpdatedAt time.Time
}