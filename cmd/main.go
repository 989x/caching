package main

import (
	"log"
	"os"
	"redis-management-system/internal/handlers"
	"redis-management-system/internal/redis"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	redis.InitRedisClient()

	app := fiber.New()

	app.Get("/", handlers.DashboardHandler)
	app.Post("/add", handlers.AddCacheHandler)
	app.Delete("/delete/:key", handlers.DeleteCacheHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8101" // Default port if not set in .env
	}

	log.Printf("Starting server on :%s", port)
	log.Fatal(app.Listen(":" + port))
}
