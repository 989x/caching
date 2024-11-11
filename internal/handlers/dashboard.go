package handlers

import (
	"bytes"
	"fmt"
	"html/template"
	"redis-management-system/internal/redis"

	"github.com/gofiber/fiber/v2"
)

func DashboardHandler(c *fiber.Ctx) error {
	// Get keys with their counts
	keyCounts, err := redis.GetAllKeysWithCounts()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to retrieve keys")
	}

	// Load HTML template
	tmpl, err := template.ParseFiles("internal/templates/dashboard.html")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to load template")
	}

	// Generate key list HTML with counts
	var keyListHTML string
	for key, count := range keyCounts {
		keyListHTML += fmt.Sprintf(`
            <li>
                <span>%s (Items: %d)</span>
                <button onclick="deleteKey('%s')">Delete</button>
            </li>`, key, count, key)
	}

	// Create data map for template rendering
	data := struct {
		Keys template.HTML
	}{
		Keys: template.HTML(keyListHTML),
	}

	// Render template to buffer
	var buf bytes.Buffer
	if err := tmpl.Execute(&buf, data); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to render template")
	}

	// Send rendered template as response
	c.Type("html")
	return c.SendString(buf.String())
}

func AddCacheHandler(c *fiber.Ctx) error {
	key := c.FormValue("key")
	value := c.FormValue("value")

	if err := redis.AddKey(key, value); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to add key")
	}

	return c.Redirect("/")
}
