package controllers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"backend/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type RegisterInput struct {
    Name     string `json:"name" validate:"required,min=3"`
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=6"`
}

type LoginInput struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required"`
}

type ForgotPasswordInput struct {
    Email string `json:"email" validate:"required,email"`
}

type ResetPasswordInput struct {
    Token       string `json:"token" validate:"required"`
    NewPassword string `json:"new_password" validate:"required,min=6"`
}

type UserResponse struct {
    ID        uint        `json:"id"`
    Name      string      `json:"name"`
    Email     string      `json:"email"`
    Role      models.Role `json:"role"`
    CreatedAt time.Time   `json:"created_at"`
}

func Register(c *fiber.Ctx) error {
    var input RegisterInput

    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to hash password",
        })
    }

    user := models.User{
        Name:     input.Name,
        Email:    input.Email,
        Password: string(hashedPassword),
        Role:     models.RoleUser,
    }

    result := database.DB.Create(&user)
    if result.Error != nil {
        return c.Status(fiber.StatusConflict).JSON(fiber.Map{
            "error": "Email already exists",
        })
    }

    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "Registration successful",
        "user":    UserResponse{ID: user.ID, Name: user.Name, Email: user.Email, Role: user.Role, CreatedAt: user.CreatedAt},
    })
}

func Login(c *fiber.Ctx) error {
    var input LoginInput

    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    var user models.User
    if err := database.DB.First(&user, "email = ?", input.Email).Error; err != nil {
        if err == gorm.ErrRecordNotFound {
            return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
                "error": "Invalid credentials",
            })
        }
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
            "error": "Invalid credentials",
        })
    }

    accessToken, refreshToken, err := utils.GenerateTokens(user.ID, user.Role)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to generate tokens",
        })
    }

    cfg := config.GetConfig()

    c.Cookie(&fiber.Cookie{
        Name:     "access_token",
        Value:    accessToken,
        Expires:  time.Now().Add(cfg.TokenExpiresIn),
        HTTPOnly: true,
        SameSite: "Strict",
        Path:     "/",
    })

    c.Cookie(&fiber.Cookie{
        Name:     "refresh_token",
        Value:    refreshToken,
        Expires:  time.Now().Add(time.Hour * 24 * 7),
        HTTPOnly: true,
        SameSite: "Strict",
        Path:     "/api/auth",
    })

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Login successful",
    })
}

func Logout(c *fiber.Ctx) error {
    c.Cookie(&fiber.Cookie{
        Name:     "access_token",
        Value:    "",
        Expires:  time.Now().Add(-time.Hour),
        HTTPOnly: true,
        SameSite: "Strict",
        Path:     "/",
    })

    c.Cookie(&fiber.Cookie{
        Name:     "refresh_token",
        Value:    "",
        Expires:  time.Now().Add(-time.Hour),
        HTTPOnly: true,
        SameSite: "Strict",
        Path:     "/api/auth",
    })

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Logged out successfully",
    })
}

func RefreshToken(c *fiber.Ctx) error {
    cfg := config.GetConfig()

    refreshTokenString := c.Cookies("refresh_token")
    if refreshTokenString == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Refresh token not found in cookie"})
    }

    token, err := jwt.Parse(refreshTokenString, func(token *jwt.Token) (interface{}, error) {
        return []byte(cfg.RefreshSecret), nil
    })

    if err != nil || !token.Valid {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid refresh token"})
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token claims"})
    }

    userID := uint(claims["sub"].(float64))

    var user models.User
    if err := database.DB.First(&user, userID).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
    }

    accessToken, err := utils.GenerateAccessToken(user.ID, user.Role)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate access token"})
    }

    c.Cookie(&fiber.Cookie{
        Name:     "access_token",
        Value:    accessToken,
        Expires:  time.Now().Add(cfg.TokenExpiresIn),
        HTTPOnly: true,
        SameSite: "Strict",
        Path:     "/",
    })

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Token refreshed",
    })
}

func ForgotPassword(c *fiber.Ctx) error {
    var input ForgotPasswordInput

    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    var user models.User
    if err := database.DB.First(&user, "email = ?", input.Email).Error; err != nil {
        return c.Status(fiber.StatusOK).JSON(fiber.Map{
            "message": "If the email exists, a reset link has been sent",
        })
    }

    resetToken, err := utils.GenerateResetToken()
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to generate reset token",
        })
    }

    hashedToken, err := bcrypt.GenerateFromPassword([]byte(resetToken), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to hash reset token",
        })
    }

    user.PasswordResetToken = string(hashedToken)
    user.ResetTokenExpiry = time.Now().Add(1 * time.Hour)

    if err := database.DB.Save(&user).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to save reset token",
        })
    }

    resetLink := "http://localhost:5173/reset-password?token=" + resetToken + "&email=" + user.Email

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message":    "Password reset link has been sent to your email",
        "reset_link": resetLink,
    })
}

func ResetPassword(c *fiber.Ctx) error {
    var input ResetPasswordInput

    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    email := c.Query("email")
    if email == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Email is required",
        })
    }

    var user models.User
    if err := database.DB.First(&user, "email = ?", email).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
            "error": "Invalid reset link",
        })
    }

    if user.PasswordResetToken == "" {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "No reset token found for this user",
        })
    }

    if utils.IsTokenExpired(user.ResetTokenExpiry) {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Reset token has expired",
        })
    }

    err := bcrypt.CompareHashAndPassword([]byte(user.PasswordResetToken), []byte(input.Token))
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid reset token",
        })
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.NewPassword), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to hash new password",
        })
    }

    user.Password = string(hashedPassword)
    user.PasswordResetToken = ""
    user.ResetTokenExpiry = time.Time{}

    if err := database.DB.Save(&user).Error; err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to update password",
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Password has been reset successfully",
    })
}

func GetSelf(c *fiber.Ctx) error {
    userID := c.Locals("userID").(float64)

    var user models.User
    if err := database.DB.First(&user, uint(userID)).Error; err != nil {
        return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
    }

    return c.Status(fiber.StatusOK).JSON(UserResponse{
        ID:        user.ID,
        Name:      user.Name,
        Email:     user.Email,
        Role:      user.Role,
        CreatedAt: user.CreatedAt,
    })
}