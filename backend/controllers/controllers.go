package controllers

import (
	"github.com/gofiber/fiber"
	uuid "github.com/satori/go.uuid"
)

// Post struct model
type Item struct {
	ID    uuid.UUID `json:"id"`
	Item string    `json:"item"`
}

var items = []*Item{}

// CreateItem creates a new post and saves it in posts slice
func CreateItem(ctx *fiber.Ctx) {
	type request struct {
		Title string `json:"item"`
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
		Item: body.Title,
	}

	items = append(items, item)

	ctx.Status(fiber.StatusCreated).JSON(item)
}