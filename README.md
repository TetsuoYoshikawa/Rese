# Rese

飲食店予約サービスのフロントエンドです。

## Prerequisites

- Node.js 14.17.0
- Vue.js 4.5.13

## Usage Guide

[ご利用者様向けガイドはこちらから](/USAGEGUIDE.md)

## Installing

### Node.js

#### Mac

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

「MacOS Installer」を選択するとダウンロード開始します。

インストーラーが立ち上がるので全て「続ける」をクリックし、「インストール」をクリックします。

インストール完了後に「閉じる」をクリックします。

ターミナルを開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

#### Windows

Node.js のインストールは[こちら](https://nodejs.org/ja/download/)

インストーラーが立ちあがるので Next をクリックします。

End-User License Agreement - 「I accept the terms in the License Agreement」にチェックをし、Next をクリックします。

Destination Folder - Next をクリックします。

Custom Setup - Next をクリックします。

Tools for Native Modules - Next をクリックします。

Ready to install Node.js - Install をクリックし、完了後に Finish をクリックします。

CLI を開き、下記コマンドを入力します。

```
$ node -v
```

バージョンが返ってくれば成功です。

### Vue.js Install

#### Mac&Windows

CLI に下記コマンドを入力します。

```
$ npm install -g @vue/cli
```

「permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g @vue/cli
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ vue --version
```

### Yarn Install

#### Mac&Windows

下記コマンドを入力します。

```
$ npm install -g yarn
```

permission denied」というエラーが出る場合は以下のコマンドを入力してください。

```
$ sudo npm install -g yarn
```

下記のコードを入力して、バージョン情報が確認できればインストール完了です。

```
$ yarn --version
```

## Data Edit

リポジトリを取得します。

CLI を開きます。
任意の場所にリポジトリをコピーします。

```
$ git clone https://github.com/YUKINA-gif/Rese.git
```

ディレクトリに移動し、npm パッケージをインストールし、脆弱性の修正をします。

```
$ cd Rese

$ npm install

$ npm audit fix
```

## Access

アクセスし、動作を確認します。

ディレクトリ直下で下記コマンドを入力し、ローカルサーバーを起動します。

```
$ yarn serve
```

立ち上がったサーバーにアクセスします。

## Function

機能一覧です。

### 店舗検索(トップページ)

エリア、ジャンルを選択して店舗検索ができます。
店名を一部入力して検索することも可能です。

#### URL:

http://localhost:8080/

### 店舗一覧(トップページ)

店舗一覧をみることができます。

### 店舗お気に入り

店舗一覧の"ハート"をクリックする事でお気に入り店舗の登録ができます。

ログインしている場合のみ登録可能です。

### 新規会員登録

会員登録ができます。

#### URL:

http://localhost:8080/register

名前、メールアドレス、パスワードの入力が必須です。

各バリデーションは以下です。
| 各項目 | 条件 | 入力例 |
| --- | --- |--- |
| 名前 | 入力必須 |山田太郎 |
| メールアドレス | 入力必須・文字列不可(メールアドレスのみ) |test@example.com |
| パスワード | 入力必須・8 文字以上～ |password|

### ログイン

ログインができます。

会員でない場合のために会員登録のリンクもあります。

#### URL:

http://localhost:8080/login

### 店舗詳細・予約

店舗の詳細をみることができ、予約もできます。

#### URL:

http://localhost:8080/detail/1

予約する場合、ログインしていなければ"予約"をクリックしたタイミングでログインページへ遷移します。

各バリデーションは以下です。
| 各項目 | 条件 | 選択例 |
| --- | --- | --- |
| 来店日 | 翌日以降の日付選択必須 | 2020/06/30|
| 来店時間 | 時間選択必須 |19:30|
| 来店人数 | 人数選択必須 |2 人|

### マイページ

ログインが完了している場合、予約内容、お気に入り店舗をみることができます。

また予約内容の変更、取消も可能です。

#### URL:

http://localhost:8080/mypage

#### 予約更新:

各バリデーションは以下です。
| 各項目 | 条件 | 選択例 |
| --- | --- | --- |
| 来店日 | 翌日以降の日付選択必須 | 2020/08/30|
| 来店時間 | 時間選択必須 |20:30|
| 来店人数 | 人数選択必須 |4 人|

"予約更新"をクリックで完了

#### 予約取消:

"はい"をクリック「予約取消完了しました」

"いいえ"をクリック「マイページにもどります」
