package main

import (
	"log"
	"redis-management-system/internal/config"
	"redis-management-system/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

func main() {
	config.InitRedisClient()

	app := fiber.New()

	app.Get("/", handlers.DashboardHandler)
	app.Post("/add", handlers.AddCacheHandler)
	app.Delete("/delete/:key", handlers.DeleteCacheHandler)

	log.Println("Starting server on :8080")
	log.Fatal(app.Listen(":8080"))
}
