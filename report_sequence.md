
```mermaid
sequenceDiagram
  autonumber
  Webブラウザ(Webクライアント) ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ(Webクライアント):HTML,JS,CSS
  Webブラウザ(Webクライアント) ->> Webサーバ:POST 新規登録・編集・削除
  Webサーバ ->> Webブラウザ(Webクライアント):リダイレクト
```
