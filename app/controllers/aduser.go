package controllers

import (
	"github.com/revel/revel"
	"gomin/app/models"
)

type AdUser struct {
	BaseController
}

func (c AdUser) Index() revel.Result {
	model := models.AdUserModel{}
	return c.RenderJSON(model.GetAdUser(1))
}

func (c AdUser) Login() revel.Result {
	return c.Render()
}
