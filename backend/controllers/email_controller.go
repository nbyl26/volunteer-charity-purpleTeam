package controllers

import (
    "os"
    "backend/utils"
    "github.com/gofiber/fiber/v2"
    "github.com/resend/resend-go/v2"

	"fmt"
)

type ContactEmailInput struct {
    Name    string `json:"name" validate:"required,min=2"`
    Email   string `json:"email" validate:"required,email"`
    Message string `json:"message" validate:"required,min=10"`
}

func SendContactEmail(c *fiber.Ctx) error {
    var input ContactEmailInput
    
    if err := utils.ParseAndValidate(c, &input); err != nil {
        return err
    }

    apiKey := os.Getenv("RESEND_API_KEY")
    client := resend.NewClient(apiKey)
	fromEmail := os.Getenv("RESEND_FROM_EMAIL")
	toEmail := os.Getenv("RESEND_TO_EMAIL")

    params := &resend.SendEmailRequest{
        From:    "PurpleCare <" + fromEmail + ">",
        To:      []string{toEmail},
        Subject: "Pesan Baru dari " + input.Name,
        Html:    "<p><strong>Dari:</strong> " + input.Name + " (" + input.Email + ")</p><p><strong>Pesan:</strong><br>" + input.Message + "</p>",
    }

    _, err := client.Emails.Send(params)
    if err != nil {
		fmt.Printf(err.Error())
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Gagal mengirim email",
        })
    }

    return c.Status(fiber.StatusOK).JSON(fiber.Map{
        "message": "Pesan Anda telah diterima. Kami akan segera menghubungi Anda!",
    })
}