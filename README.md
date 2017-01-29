E2E-Server
==========

E2E-Server provides REST APIs and Web UI to operate browser.

E2E-Server uses [Nightmare](https://github.com/segmentio/nightmare) for
browser automation library , so E2E-Server may not use for cross browser testing now,
but use for specification test or repeated browser operations.

## Requirements

- Node.js: ^6.9
- MySQL: ^5.5
- Redis: ^3.0
- WebPack: ^1.13
- Node Modules: Execute `npm install` in `api`, `e2e`, `gui` directories

## Getting Started (Web UI)

1. Create Databases, Tables

```
$ mysql -u admin_user < db/create-database.sql
$ mysql -u admin_user < db/create-tables.sql
```

2. Run servers

```
# in e2e directory
$ node index.js

# in api directory
$ npm start

# in api directory (need webpacking)
$ webpack
$ npm start
```

3. Access to http://localhost:3000

## Data Structures

### Usecase (Object)

Usecase stores url and browser actions on this url.

- id (number, readonly): identify number.
    This is generated when usecase is created.
- createdAt (string, readonly): created date time.
    This is generated when usecase is created.
- url (string, required): URL connected by e2e-server
- actions (array(object), required):
    - type (string, required): action type which is one of
        "click", "input", "select", "getHtml", "getText", "getScreenshot"
    - name (string): name for getXXX action type.
        it is required when type is one of "getHtml", "getText", "getScreenshot".
    - value (string): value to input or select.
        on select value, it allows to use regexp format.
        it is required when type is one of "input", "select"
    - selectors (array(string)): selectors for html element.
        This allows to use CSS selector format and [fuzzy-query](https://github.com/urahiroshi/fuzzy-query) selector format.
        it is required when type is one of "click", "input", "select", "getHtml", "getText"

### Trial (Object)

Trial stores informations and progress of each job executing usecase actions.
This object inherit job object on [bull](https://github.com/OptimalBits/bull).

- usecaseId (number, required): id of usecase to use trial 
- id (number, readonly): identify number.
    This is generated when usecase is created.
- createdAt (string, readonly): created date time.
    This is generated when usecase is created.
- timestamp: (number, readonly): updated date time.
    This value is copy of job object.
- usecase (object, readonly): copy of usecase when trial created
- state (string): state of trial job
- job (object): job object

### Result (Object)

Result stores values obtained from trial,
which is created by getXXX actions on usecase.

- resultId (number, readonly): identify number.
    This is generated when usecase is created.
- jobId (number, readonly): id of trial
- htmls (array(object)):
    - html (string) : obtained html value
    - name (string) : name of usecase action
- texts (array(object)):
    - txt: obtained text value
    - name: name of usecase action
- screenshots (array(object)):
    - uri: uri to get screenshot object
    - name: name of usecase action

## API Example

### POST /usecases

- Request (application/json)

```json
{
  "name": "hogehoge",
  "url": "http://yahoo.com",
  "actions": [
    {
      "selectors": ["form[action*=\"/search\"] [name=p]"],
      "type": "input",
      "value": "github nightmare"
    },
    {
      "selectors": ["form[action*=\"/search\"] [type=submit]"],
      "type": "click"
    },
    {
      "selectors": [".title"],
      "type": "getHtml",
      "name": "titleHTML"
    },
    {
      "selectors": [".title"],
      "type": "getText",
      "name": "titleText"
    },
    {
      "type": "getScreenshot",
      "name": "finishView"
    }
  ]
}
```

- Response 201 (application/json)

```json
{
    "actions": [
        {
            "selectors": [
                "form[action*=\"/search\"] [name=p]"
            ], 
            "type": "input", 
            "value": "github nightmare"
        }, 
        {
            "selectors": [
                "form[action*=\"/search\"] [type=submit]"
            ], 
            "type": "click"
        }, 
        {
            "name": "titleHTML", 
            "selectors": [
                ".title"
            ], 
            "type": "getHtml"
        }, 
        {
            "name": "titleText", 
            "selectors": [
                ".title"
            ], 
            "type": "getText"
        }, 
        {
            "name": "finishView", 
            "type": "getScreenshot"
        }
    ], 
    "createdAt": "2017-01-22T09:49:31.000Z",
    "id": 2343814817, 
    "name": "hogehoge", 
    "url": "http://yahoo.com"
}
```

### GET /usecases

- Response 200 (application/json)

(Response body is list of `POST /usecases` response object)

### GET /usecases/:id

- Response 200 (application/json)

(Response body is same as `POST /usecases`)

### PUT /usecases/:id

- Request (application/json)

(Request body is same as `POST /usecases`)

- Response 200 (application/json)

(Response body is same as `POST /usecases`)

### DELETE /usecases/:id

- Response 204

(No response body)

### POST /trials

- Request (application/json)

```json
{
    "usecaseId": 1863214872
}
```

- Response 201 (application/json)

```json
{
    "id": 4238132527, 
    "usecaseId": 1863214872
}
```

### GET /trials?usecaseId=:usecaseId&offset=:offset&length=:length

- query parameters:
    - usecaseId: id of usecase
    - offset: offset of trial which is created by same usecase
    (offset=0 is most recently trial)
    - length: count of trials from offset

- Response 200 (application/json)

```json

[
    {
        "createdAt": "2017-01-29T10:04:32.000Z",
        "id": 4238132527,
        "job": {
            "attempts": 1,
            "attemptsMade": 0,
            "data": {
                "actions": [
                    {
                        "name": null,
                        "selectors": [
                            "form[action*=\"/search\"] [name=p]"
                        ],
                        "type": "input",
                        "value": "github nightmare"
                    },
                    {
                        "name": null,
                        "selectors": [
                            "form[action*=\"/search\"] [type=submit]"
                        ],
                        "type": "click",
                        "value": null
                    },
                    {
                        "name": "titleHTML",
                        "selectors": [
                            ".title"
                        ],
                        "type": "getHtml",
                        "value": null
                    },
                    {
                        "name": "titleText",
                        "selectors": [
                            ".title"
                        ],
                        "type": "getText",
                        "value": null
                    },
                    {
                        "name": "finishView2",
                        "selectors": [],
                        "type": "getScreenshot",
                        "value": null
                    }
                ],
                "createdAt": "2017-01-08T02:17:32.000Z",
                "id": 1863214872,
                "name": "hogehoge",
                "url": "http://yahoo.com",
                "usecaseId": 1863214872
            },
            "delay": 0,
            "opts": {
                "jobId": 4238132527
            },
            "progress": 0,
            "returnvalue": null,
            "stacktrace": [],
            "timestamp": 1485684272903
        },
        "state": "completed",
        "timestamp": 1485684272903,
        "usecase": {
            "actions": [
                {
                    "name": null,
                    "selectors": [
                        "form[action*=\"/search\"] [name=p]"
                    ],
                    "type": "input",
                    "value": "github nightmare"
                },
                {
                    "name": null,
                    "selectors": [
                        "form[action*=\"/search\"] [type=submit]"
                    ],
                    "type": "click",
                    "value": null
                },
                {
                    "name": "titleHTML",
                    "selectors": [
                        ".title"
                    ],
                    "type": "getHtml",
                    "value": null
                },
                {
                    "name": "titleText",
                    "selectors": [
                        ".title"
                    ],
                    "type": "getText",
                    "value": null
                },
                {
                    "name": "finishView2",
                    "selectors": [],
                    "type": "getScreenshot",
                    "value": null
                }
            ],
            "createdAt": "2017-01-08T02:17:32.000Z",
            "id": 1863214872,
            "name": "hogehoge",
            "url": "http://yahoo.com",
            "usecaseId": 1863214872
        },
        "usecaseId": 1863214872
    }
]
```

### GET /trials/:id

- response 200 (application/json)

(Response body is same as a list member of `GET /trials`)

### DELETE /trials/:id

- response 204 (application/json)

(No response body)

### GET /results?jobId=:jobId

- query parameters:
    - jobId: id of trial

- response 200 (application/json)

```json
[
    {
        "htmls": [
            {
                "html": "<a class=\" fz-l ac-21th lh-24\" data-sb=\"/beacon/clk;_ylt=AwrTHR0Ym41YxQgAiBBXNyoA;_ylu=X3oDMTEyOGNucTZkBGNvbG8DZ3ExBHBvcwMxBHZ0aWQDQjI4MjNfMQRzZWMDc3I-\" href=\"https://github.com/segmentio/nightmare\" referrerpolicy=\"origin\" target=\"_blank\"><b>GitHub</b> - segmentio/<b>nightmare</b>: A high-level browser automation ...</a>", 
                "name": "titleHTML", 
                "resultId": 1230023475
            }
        ], 
        "htmlsCount": 1, 
        "jobId": 2351623262, 
        "resultId": 1230023475, 
        "screenshots": [
            {
                "name": "finishView2", 
                "resultId": 1230023475,
                "uri": "/screenshots?resultId=1230023475&name=finishView2"
            }
        ], 
        "screenshotsCount": 1, 
        "texts": [
            {
                "name": "titleText", 
                "resultId": 1230023475, 
                "txt": "GitHub - segmentio/nightmare: A high-level browser automation ..."
            }
        ], 
        "textsCount": 1
    }
]
```

### DELETE /results/:id

- response 204 (application/json)

(No response body)

### GET /screenshots?resultId=:resultId&name=:name

- query parameters:
    - resultId (string, required): id of result
    - name (string, required): name of usecase action

- response 200 (application/json)

```json
{
    "resultId": 1386605851,
    "name": "finishView2",
    "image": "<base64 of screen shot png image>"
}
```
