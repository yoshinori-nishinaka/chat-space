# chat-space DB設計

## usersテーブル
|Column|Type|Option|
|------|----|------|
|email|string|null: false, unique:true|
|password|string|null: false|
|nickname|string|null: false, unique: true|

### Association
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :chats

## chatsテーブル
|Column|Type|Option|
|------|----|------|
|text|text|null: false|
|image|text|null: false|
|user_id|integer|null: false, foreign_kye: true|
|group_id|integer|null: false, foreign_kye: true|

### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique:true|
|user_id|integer|null: false, foreign_kye: true|

### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :chats

## users_groupsテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_kye: true|
|group_id|integer|null: false, foreign_kye: true|

### Association
- belongs_to :group
- belongs_to :user