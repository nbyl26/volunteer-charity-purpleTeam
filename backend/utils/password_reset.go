package utils

import (
	"crypto/rand"
	"encoding/hex"
	"time"
)

func GenerateResetToken() (string, error) {
    bytes := make([]byte, 32) 
    if _, err := rand.Read(bytes); err != nil {
        return "", err
    }
    return hex.EncodeToString(bytes), nil
}

func IsTokenExpired(expiry time.Time) bool {
    return time.Now().After(expiry)
}