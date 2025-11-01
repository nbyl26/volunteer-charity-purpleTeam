package config

import (
	"os"
	"time"
)

type Config struct {
	Port           string
	AccessSecret   string
	RefreshSecret  string
	TokenExpiresIn time.Duration
}

var Cfg *Config

func LoadConfig() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	accessSecret := os.Getenv("JWT_ACCESS_SECRET")
	refreshSecret := os.Getenv("JWT_REFRESH_SECRET")

	expiresIn, err := time.ParseDuration(os.Getenv("JWT_EXPIRATION"))
	if err != nil {
		expiresIn = time.Minute * 15 
	}

	Cfg = &Config{
		Port:           port,
		AccessSecret:   accessSecret,
		RefreshSecret:  refreshSecret,
		TokenExpiresIn: expiresIn,
	}
}

func GetConfig() *Config {
	return Cfg
}