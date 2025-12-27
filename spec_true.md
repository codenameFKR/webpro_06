#　開発仕様書(仮)
## キュゥべえの各話のセリフ一覧(アニメ)システム
| 機能 | メソッド | リソース名 | 処理内容 |
| :--- | :--- | :--- | :--- |
| 一覧表示 | GET | `/kyubey` | セリフデータの一覧を表示する |
| 詳細表示 | GET | `/kyubey/:id` | 指定IDのセリフ詳細を表示する |
| 新規登録画面 | GET | `/kyubey/create` | 新規登録フォームを表示する |
| 新規登録処理 | POST | `/kyubey/create` | フォームデータを配列に追加し一覧へ戻る |
| 編集画面 | GET | `/kyubey/edit/:id` | 指定IDの編集フォームを表示する |
| 更新処理 | POST | `/kyubey/update/:id` | 指定IDのデータを更新し一覧へ戻る |
| 削除処理 | POST | `/kyubey/delete/:id` | 指定IDのデータを削除し一覧へ戻る |

```mermaid

graph LR;
    一覧[一覧表示] -->|GET /flute/:number| 詳細表示[詳細表示]
    詳細表示 -->|GET /flute/edit/:number| 編集[編集画面]
    編集 -->|POST /flute/update/:number| 更新処理[更新処理]
    一覧 -->|GET /flute/create| 新規登録[新規登録画面]
    新規登録 -->|POST /flute| 新規登録処理[新規登録処理]
    詳細表示 -->|GET /flute/delete/:number| 削除処理[削除処理]
    詳細表示 -->|戻る| 一覧
    編集 -->|戻る| 詳細表示
    新規登録 -->|戻る| 一覧
    更新処理 -->|リダイレクト| 詳細表示
    新規登録処理 -->|リダイレクト| 一覧
    削除処理 --> |リダイレクト|一覧

```

## ゼルダの伝説時系列システム

| 機能 | メソッド | リソース名 | 処理内容 |
| :--- | :--- | :--- | :--- |
| 一覧表示 | GET | `/zelda` | セリフデータの一覧を表示する |
| 詳細表示 | GET | `/zelda/:id` | 指定IDのセリフ詳細を表示する |
| 新規登録画面 | GET | `/zelda/create` | 新規登録フォームを表示する |
| 新規登録処理 | POST | `/zelda/create` | フォームデータを配列に追加し一覧へ戻る |
| 編集画面 | GET | `/zelda/edit/:id` | 指定IDの編集フォームを表示する |
| 更新処理 | POST | `/zelda/update/:id` | 指定IDのデータを更新し一覧へ戻る |
| 削除処理 | POST | `/zelda/delete/:id` | 指定IDのデータを削除し一覧へ戻る |


```mermaid

graph LR;
    一覧[一覧表示] -->|GET /zelda/:number| 詳細表示[詳細表示]
    詳細表示 -->|GET /zelda/edit/:number| 編集[編集画面]
    編集 -->|POST /zelda/update/:number| 更新処理[更新処理]
    一覧 -->|GET /zelda/create| 新規登録[新規登録画面]
    新規登録 -->|POST /zelda| 新規登録処理[新規登録処理]
    詳細表示 -->|GET /zelda/delete/:number| 削除処理[削除処理]
    詳細表示 -->|戻る| 一覧
    編集 -->|戻る| 詳細表示
    新規登録 -->|戻る| 一覧
    更新処理 -->|リダイレクト| 詳細表示
    新規登録処理 -->|リダイレクト| 一覧
    削除処理 --> |リダイレクト|一覧

```

## 歴代マジカルミライシステム

| 機能 | メソッド | リソース名 | 処理内容 |
| :--- | :--- | :--- | :--- |
| 一覧表示 | GET | `/magimira` | セリフデータの一覧を表示する |
| 詳細表示 | GET | `/magimira/:id` | 指定IDのセリフ詳細を表示する |
| 新規登録画面 | GET | `/magimira/create` | 新規登録フォームを表示する |
| 新規登録処理 | POST | `/magimira/create` | フォームデータを配列に追加し一覧へ戻る |
| 編集画面 | GET | `/magimira/edit/:id` | 指定IDの編集フォームを表示する |
| 更新処理 | POST | `/magimira/update/:id` | 指定IDのデータを更新し一覧へ戻る |
| 削除処理 | POST | `/magimira/delete/:id` | 指定IDのデータを削除し一覧へ戻る |


```mermaid

graph LR;
    一覧[一覧表示] -->|GET /deco/:number| 詳細表示[詳細表示]
    詳細表示 -->|GET /deco/edit/:number| 編集[編集画面]
    編集 -->|POST /deco/update/:number| 更新処理[更新処理]
    一覧 -->|GET /deco/create| 新規登録[新規登録画面]
    新規登録 -->|POST /deco| 新規登録処理[新規登録処理]
    詳細表示 -->|GET /deco/delete/:number| 削除処理[削除処理]
    詳細表示 -->|戻る| 一覧
    編集 -->|戻る| 詳細表示
    新規登録 -->|戻る| 一覧
    更新処理 -->|リダイレクト| 詳細表示
    新規登録処理 -->|リダイレクト| 一覧
    削除処理 --> |リダイレクト|一覧

```
