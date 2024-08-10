# 環境構築手順
## Node.jsのインストール

[Node.js](https://nodejs.org/ja/)の公式サイトからインストーラーをダウンロードしてインストールしてください。

## 依存パッケージのインストール
```
yarn
```

## 開発サーバーの起動
```
yarn dev
```

## ビルド
```
yarn build
```

# django

##　インストール
```
pip install django
```

## サーバーの起動
```
python manage.py runserver
```

# ディレクトリ構成

```
geekcamp12/
│
├── public/
│   
├── server/
│   ├── api/
│   ├── server/
|  
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── .gitignore
├── package.json
├── vite.config.js
└── tsconfig.json
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# API仕様手順

各項で必要なリクエストは，説明の前の単語をキーとしてください．
また，ここで言及する URL に関しては，いずれも `localhost:8000/api/` が先頭につきますが，便宜上ここでは省略します．

## ユーザに関する操作

### ログイン

POST メソッドで `login/` にアクセス．

リクエストとして

- username: ユーザーネーム．
- password: パスワード．

を付属する必要あり．

### 登録

`register/` にアクセス．
メソッドの指定はなし．

リクエストとして

- username: ユーザーネーム．
- email: メールアドレス．
- password: 設定するパスワード．

を付属する必要あり．

### ID 指定による単一ユーザの取得

GET メソッドで `db/user/get/<int:user_id>/` にアクセス．

対象のユーザの ID に `<int:user_id>` を置換する．

リクエストは空でよい．

### 条件検索による複数ユーザの取得

GET メソッドで `db/users/get/` にアクセス．

URL の末尾に，`?username=test&email=test` のようにクエリを付属するか，リクエストに付随する．

フィルタリングの対象は

- username: ユーザーネームで，部分一致検索．
- email: メールアドレスで，部分一致検索．
- committed_habit_status: 達成状況の ID で，これをもつ達成状況をそのユーザが入力したか．

### 登録している習慣の取得

GET メソッドで `db/user/joined-habit-items/of/<int:user_id>/` にアクセス．

対象のユーザの ID に `<int:user_id>` を置換する．

上と同様の方法で条件検索が可能．

フィルタリングの対象は

- name: 習慣の名前で，部分一致検索．

### フレンドの取得

GET メソッドで `db/user/friends/of/<int:user_id>/` にアクセス．

フレンドを取得する対象のユーザの ID に `<int:user_id>` を置換する．

複数ユーザの取得と同様の条件検索が可能．

### 情報の更新

PUT メソッドで `db/user/update/<int:user_id>/` にアクセス．

リクエストとして

- username: 更新後のユーザーネーム．
- email: 更新後のメールアドレス．
- password: 更新後のパスワード．
- joined_habit_items: 登録している習慣の ID のリスト．
- friends: フレンドであるユーザの ID のリスト．

のいずれか 0 項目以上を付属する．

フレンドを更新する際には，あらかじめ更新対象のユーザのフレンドのリストを取得し，それに対する操作をして，上記のリクエストに操作後のリストを含める必要がある．

例えば，ユーザ 0 がユーザ 1, 2 とあらかじめフレンドである場合，得られるフレンドのリストは
```
  "friends": [1, 2]
```
である．ここにユーザ 3 を加える場合は，そのリストに 3 を追加して
```
  "friends": [1, 2, 3]
```
とする．また，ユーザ 2 を除く場合は
```
  "friends": [1, 3]
```
とする．こうして操作したリストを，上記のリクエストに含める．

## 習慣項目に関する操作

### 習慣項目の作成

POST メソッドで `habits/create/` にアクセス．

リクエストとして

- name: 名称．

を付属する．

### ID 指定による単一項目の取得

GET メソッドで `db/habit_item/get/<int:habit_item_id>/` にアクセス．

要領はユーザの場合と同じ．

リクエストは空でよい．

### 条件検索による複数項目の取得

GET メソッドで `db/habit_items/get/` にアクセス．

条件検索の要領はユーザの場合と同じ．

フィルタリングの対象は

- name: 習慣の名前で，部分一致検索．

### その習慣項目を登録しているユーザの取得

GET メソッドで `db/habit_item/committing_users/of/<int:habit_item_id>/` にアクセス．

複数ユーザの取得と同様の条件検索が可能．

要素は重複がなく，その個数が登録ユーザ数に一致する．

### 同一の年月日に，同一の習慣項目の達成状況を pile up したユーザの取得

GET メソッドで `db/habit_item/piling_up_users/of/<int:habit_item_id>/at/<str:date_committed>/` にアクセス．

習慣項目の名称に `<int:habit_item_id>` を，年月日に `<str:date_committed>` を置換する．たとえば，習慣 1 を 2024 年 8 月 10 日に達成したユーザを取得するなら，前者を 1 に，後者を 2024-08-10 に置換．

複数ユーザの取得と同様の条件検索が可能．

### 習慣項目の更新

PUT メソッドで `db/habit_item/update/<int:habit_item_id>/` にアクセス．

リクエストとして

- name: 更新後の名称．
- committing_users: 登録しているユーザの ID のリスト．

のいずれか 0 項目以上を付属する．

## 達成状況に対する操作

### 達成状況の作成

POST メソッドで `progress/record/` にアクセス．

リクエストとして

- habit_item: 習慣項目の ID
- committed_by: 入力したユーザの ID

を付属する．達成日時は自動的に入力される．
