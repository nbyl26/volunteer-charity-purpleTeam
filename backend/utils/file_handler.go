package utils

import (
	"errors"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

var ErrMissingFile = errors.New("missing file")

func SaveFile(c *fiber.Ctx, fieldName string, directory string) (string, error) {
	file, err := c.FormFile(fieldName)
	if err != nil {
		if err.Error() == "missing file" {
			return "", ErrMissingFile
		}
		return "", err
	}

	ext := filepath.Ext(file.Filename)
	newFilename := uuid.New().String() + ext
	
	dst := filepath.Join(directory, newFilename)

	if err := c.SaveFile(file, dst); err != nil {
		return "", err
	}

	fileUrl := "/files/" + newFilename
	return fileUrl, nil
}