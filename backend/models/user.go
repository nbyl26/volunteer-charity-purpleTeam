package models

import "time"

type Role string

const (
    RoleAdmin Role = "admin"
    RoleUser  Role = "user"
)

type User struct {
    ID                 uint      gorm:"primaryKey"
    Name               string    gorm:"not null"
    Email              string    gorm:"uniqueIndex;not null"
    Password           string    gorm:"not null"
    Role               Role      gorm:"type:varchar(20);default:'user'"
    PasswordResetToken string    gorm:"type:varchar(255)" 
    ResetTokenExpiry   time.Time 
    CreatedAt          time.Time
    UpdatedAt          time.Time
    Donations          []Donation         gorm:"foreignKey:UserID"
    EventRegistrations []EventRegistration gorm:"foreignKey:UserID"
}