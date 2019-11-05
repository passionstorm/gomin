package controllers

import (
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

type BaseController struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) Login() revel.Result {
	return c.Render()
}
