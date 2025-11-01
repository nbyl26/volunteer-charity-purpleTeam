package utils

import (
	"time"
	"backend/config"
	"backend/models"
	
	"github.com/golang-jwt/jwt/v5"
)

func GenerateTokens(userID uint, userRole models.Role) (string, string, error) {
	cfg := config.GetConfig()

	accessClaims := jwt.MapClaims{
		"sub":  userID,
		"role": userRole,
		"exp":  time.Now().Add(cfg.TokenExpiresIn).Unix(),
		"iat":  time.Now().Unix(),
		"iss":  "backend-api",
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessString, err := accessToken.SignedString([]byte(cfg.AccessSecret))
	if err != nil {
		return "", "", err
	}

	refreshClaims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(),
		"iat": time.Now().Unix(),
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshString, err := refreshToken.SignedString([]byte(cfg.RefreshSecret))
	if err != nil {
		return "", "", err
	}

	return accessString, refreshString, nil
}

func GenerateAccessToken(userID uint, userRole models.Role) (string, error) {
	cfg := config.GetConfig()

	accessClaims := jwt.MapClaims{
		"sub":  userID,
		"role": userRole,
		"exp":  time.Now().Add(cfg.TokenExpiresIn).Unix(),
		"iat":  time.Now().Unix(),
		"iss":  "backend-api",
	}
	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessString, err := accessToken.SignedString([]byte(cfg.AccessSecret))
	if err != nil {
		return "", err
	}
	return accessString, nil
}