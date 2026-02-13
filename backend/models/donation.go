package models

import "time"

type DonationStatus string

const (
    StatusPending   DonationStatus = "pending"
    StatusVerified  DonationStatus = "verified"
    StatusRejected  DonationStatus = "rejected"
)

type Donation struct {
	ID             uint           `gorm:"primaryKey"`
	Amount         float64        `gorm:"not null"`
	ProofOfPayment string         `gorm:"not null"`
	Message        string         `gorm:"type:text"`
	Status         DonationStatus `gorm:"type:varchar(20);default:'pending'"`
	UserID         uint
	CampaignID     uint
	User           User
	Campaign       Campaign
	CreatedAt      time.Time
	UpdatedAt      time.Time
}