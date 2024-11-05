package handlers

import (
	"log"
	"redis-management-system/internal/redis"

	"github.com/gofiber/fiber/v2"
)

func DeleteCacheHandler(c *fiber.Ctx) error {
	key := c.Params("key")
	log.Println("Attempting to delete key:", key) // Debug log

	if key == "" {
		log.Println("No key provided") // Debug log
		return c.Status(fiber.StatusBadRequest).SendString("No key provided")
	}

	if err := redis.DeleteKey(key); err != nil {
		log.Println("Failed to delete key:", err) // Debug log
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to delete key")
	}

	log.Println("Key deleted successfully") // Debug log
	return c.SendString("Key deleted successfully")
}
