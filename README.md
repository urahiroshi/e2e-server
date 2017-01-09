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
    "actions": [
        {
            "selector": "<String>",
            "type": "", // "click" or "input" or "select" or "getHtml" or "getText" or "getScreenshot"
            "name": "", // name of getHtml / getText / getScreenshot
            "value": "" // value of select / input
        }
    ],
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
GET /usecases/:id

- Response

```
```

**Remove Usecase**

DELETE /usecases/:id

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
    "usecaseId": "<usecase_id>"
}
```

- Response

```json
{
    "id": "<trial_id>",
}
```

**Get Trial**

GET /trials/:id

- json

```json
{
  "usecaseId": "<usecase_id>",
  // usecase parameter
  "params": {
    "browser": {},
    "timeout": 3000,
    "actions": [
      {
        "timeout": 1000,
        "param": "",
        "type": "click",
        "selector": "#fuga"
      }
    ],
    "url": "http://localhost:8000"
  },
  "id": "12",
  "priority": 0,
  "progress": 0,
  "state": "inactive",
  "created_at": "1468331406461",
  "promote_at": "1468331406461",
  "updated_at": "1468331406468",
  "attempts": {
    "max": 1,
    "remaining": 1,
    "made": 0
  }
}
```

**GET Result**

GET /results

- Response

```json
[
    {
        "id": "<id>",
        "trialId": "<trial_id>",
        "failed_at": null,
        "finished_at": "1468331406468",
        "innerHTMLs": {},
        "innerTexts": {},
        "screenshots": {}
    }
]
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