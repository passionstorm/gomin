package controllers

import (
	"github.com/revel/revel"
)

type AdUser struct {
	BaseController
}

func (c AdUser) Index() revel.Result {
	return c.Render()
}

func (c AdUser) Login() revel.Result {
	return c.Render()
}
