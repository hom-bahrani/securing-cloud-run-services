package controllers

import (
	"github.com/gofiber/fiber"
	uuid "github.com/satori/go.uuid"
)

// Post struct model
type Item struct {
	ID    uuid.UUID `json:"id"`
	Title string    `json:"title"`
}

var items = []*Item{}

// GetItems gets all the items
func GetItems(ctx *fiber.Ctx) {
	ctx.Status(fiber.StatusOK).JSON(items)
}

// CreateItem creates a new post and saves it in posts slice
func CreateItem(ctx *fiber.Ctx) {
	type request struct {
		Title string `json:"title"`
	}

	var body request

	err := ctx.BodyParser(&body)
	if err != nil {
		ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "cannot parse json",
		})
		return
	}

	u := uuid.NewV4()

	item := &Item{
		ID:    u,
		Title: body.Title,
	}

	items = append(items, item)

	ctx.Status(fiber.StatusCreated).JSON(item)
}