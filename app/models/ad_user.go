package models

import (
	"gomin/app"
	"time"
)

type AdUserModel struct {
	ID           int64
	Name         string    `db:"name"`
	Email        string    `db:"email"`
	PasswordHash string    `db:"password_hash" json:"-"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
	Password     string    `db:"-" json:"-"`
}

func (t *AdUserModel) GetAdUser(id int64) *AdUserModel {
	sql := `
		SELECT id, name, email, password_hash
		FROM ad_user
		WHERE id= ?
	`
	adminUser := AdUserModel{}
	err := app.Db.Get(&adminUser, sql, id)
	if err != nil {
		return nil
	}

	return &adminUser
}
