package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

// Item struct will be returned
type Item struct {
	Item string `json:"item"`
}

func main() {
	// Fiber instance
	app := fiber.New()

	// Routes
	app.Post("/", createItem)

	// Start server
	log.Fatal(app.Listen(":8080"))
}

// Handler
func createItem(c *fiber.Ctx) error {
	type request struct {
		Item string `json:"item"`
	}

	var body request

	if err := c.BodyParser(&body); err != nil {
		fmt.Println("Error: ", err)
		return c.Status(500).SendString("Cannot parse body")
	}
	item := &Item{
		Item: body.Item,
	}

	fmt.Println("Backend server recevied data: ", *item)
	return c.JSON(item)
}

