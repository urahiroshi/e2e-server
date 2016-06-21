Nightmare-api
=============

### 目的

- APIを通じてブラウザの所定の挙動を実行することで、ブラウザの挙動をAPI化する
- ブラウザアクセス時のHTMLの取得、スクリーンショットの取得、定形処理の自動化に用いることができる

### インターフェース

**Create Usecase**

POST /usecases

- Request

```json
{
    "url": "<initial_url>",
    "flow": [
        {
            "selector": "<String>",
            "action": "", // click or type or select
            "param": "", // parameter of type or select
            "timeout": 1000 // timeout by next action (ms)
        }
    ],
    "timeout": 3000,        // total timeout (ms)
    "validation": [
        {
            "selector": "<String>", // css selector for target element
            "target": "<Enum>",     // innerHTML or innerText or attribute([attr])
            "reg": "<regexp>"       // regexp for value
        }
    ],
    "browser": {
        "width": 800,
        "height": 600
    }
}
```

- Response

```json
{
    "id": "<id>"
}
```

**Get Usecase**

GET /usecases
GET /usecases?id=<id>

- Response

```
```

**Remove Usecase**

DELETE /usecases?id=<id>

- Response

```json
{
    "result": "Success"
}
```

**Create Trial**

POST /trials

- Request

```json
{
    "usecase": "<id>"
}
```

- Response

```json
{
    "usecase": "<usecase_id>",
    "id": "<request_id>",
    "request_dt": "<YYYY/MM/DD HH:mm:ss>"
}
```

**Get Trial**

GET /trial?id=<id>

- Response

```json
{
    "usecase": "<usecase_id>",
    "id": "<request_id>",
    "request_dt": "<YYYY/MM/DD HH:mm:ss>",
    "start_dt": "<YYYY/MM/DD HH:mm:ss>",
    "status": 0, // 0:prepare 1:running 20:success 40:fail
    "end_dt": "<YYYY/MM/DD HH:mm:ss>"
}
```


### ロードマップ

1. Basic Usecase, Trial API
    - Usecase: GET, POST, DELETE
    - Trial: POST, GET
2. Advanced Usecase, Trial API
    - Fix Usecase API (PATCH, PUT)
    - Add callback parameter ( or pubsub API?)
    - Usecase の組み合わせ, 階層構造
    - Customize Nightmare.js
3. GetHTML, GetScreenShot API