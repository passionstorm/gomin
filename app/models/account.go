package models

import "time"

type AccountModel struct {
	ID           int64
	Name         string    `db:"name"`
	Username     string    `db:"username"`
	Email        string    `db:"email"`
	PasswordHash string    `db:"password_hash" json:"-"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`
	Password     string    `db:"-" json:"-"`
	Role         string    `db:"role"`
	DelFlg       bool      `db:"del_flg"`
}
