package main

import (
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/middleware"
	"github.com/hom-bahrani/backend/controllers"
)



func main() {
	app := fiber.New()

	app.Use(cors.New())
	app.Use(middleware.Logger())
	app.Use(middleware.Recover())

	app.Get("/", func(ctx *fiber.Ctx) {
		ctx.Send("posts API")
	})

	SetupAPIV1(app)

	err := app.Listen(8080)
	if err != nil {
		panic(err)
	}
}

// SetupAPIV1 sets up the API Group
func SetupAPIV1(app *fiber.App) {
	v1 := app.Group("/v1")
	SetupPostRoutes(v1)
}

// SetupPostRoutes sets up the post routes
func SetupPostRoutes(grp fiber.Router) {
	todosRoutes := grp.Group("/items")
	todosRoutes.Post("/item", controllers.CreateItem)
}
