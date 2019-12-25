# chat-space DB設計

## usersテーブル
|Column|Type|Option|
|------|----|------|
|email|integer|null: false, unique:true|
|password|integer|null: false|
|nickname|integer|null: false, unique: true|

### Association
- has_many :groups
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
- belongs_to :chat

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|group_name|text|null: false, unique:true|
|user_id|integer|null: false, foreign_kye: true|

### Association
- belongs_to :user
- has_many :chats
