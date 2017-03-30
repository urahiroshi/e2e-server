E2E-Server
==========

E2E-Server provides REST APIs and Web UI to operate browser.

E2E-Server uses [Nightmare](https://github.com/segmentio/nightmare) for
browser automation library , so E2E-Server may not use for cross browser testing now,
but use for specification test or repeated browser operations.

## Roadmap

E2E-Server has aimed to use E2E test, but current codes is under development version,
it is unstable and more features needed.
So this project plans to make many breaking changes by first half of 2017.

## Getting Started (Web UI)

1. start docker-compose

```
$ docker-compose up
```

2. Access to http://localhost:3000

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
    - variable (string): variable name to use result by after actions.
        it is optional parameter of "getHtml", "getText". 

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
- trialId (number, readonly): id of trial
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
      "type": "getHtml"
    },
    {
      "selectors": [".title"],
      "type": "getText"
    },
    {
      "type": "getScreenshot"
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
            "selectors": [
                ".title"
            ], 
            "type": "getHtml"
        }, 
        {
            "selectors": [
                ".title"
            ], 
            "type": "getText"
        }, 
        {
            "type": "getScreenshot"
        }
    ],
    "id": 2343814817, 
    "name": "hogehoge", 
    "url": "http://yahoo.com"
}
```

### GET /usecases

- Response 200 (application/json)

(list of `POST /usecases` response object with createdAt)

```json

[
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
                "type": "click",
                "value": null
            },
            {
                "selectors": [
                    ".title"
                ],
                "type": "getHtml",
                "value": null
            },
            {
                "selectors": [
                    ".title"
                ],
                "type": "getText",
                "value": null
            },
            {
                "selectors": [],
                "type": "getScreenshot",
                "value": null
            }
        ],
        "createdAt": "2017-01-08T02:17:32.000Z",
        "id": 1863214872,
        "name": "hogehoge",
        "url": "http://yahoo.com"
    }
]
```

### GET /usecases/:id

- Response 200 (application/json)

(Response body is a member object of `GET /usecases`)

### PUT /usecases/:id

- Request (application/json)

(Request body is same as `POST /usecases`)

- Response 200 (application/json)

(Response body is same as `GET /usecases/:id`)

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
        "state": "completed",
        "updatedAt": "2017-01-29T10:13:15.000Z",
        "usecase": {
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
                    "type": "click",
                    "value": null
                },
                {
                    "selectors": [
                        ".title"
                    ],
                    "type": "getHtml",
                    "value": null
                },
                {
                    "selectors": [
                        ".title"
                    ],
                    "type": "getText",
                    "value": null
                },
                {
                    "selectors": [],
                    "type": "getScreenshot",
                    "value": null
                }
            ],
            "id": 1863214872,
            "url": "http://yahoo.com",
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

### GET /results?trialId=:trialId

- query parameters:
    - trialId: id of trial

- response 200 (application/json)

```json
[
    {
        "actionType": "input", 
        "createdAt": "2017-02-04T07:16:34.000Z", 
        "id": 594747449, 
        "trialId": 1294938304
    }, 
    {
        "actionType": "click", 
        "createdAt": "2017-02-04T07:16:34.000Z", 
        "id": 2795612685, 
        "trialId": 1294938304
    }, 
    {
        "actionType": "getHtml", 
        "createdAt": "2017-02-04T07:16:35.000Z", 
        "html": "<a class=\" ac-algo fz-l ac-21th lh-24\" data-sb=\"/beacon/clk;_ylt=AwrSbnHTf5VYZOcAT1JXNyoA;_ylu=X3oDMTByb2lvbXVuBGNvbG8DZ3ExBHBvcwMxBHZ0aWQDBHNlYwNzcg--\" href=\"https://github.com/segmentio/nightmare\" referrerpolicy=\"origin\" target=\"_blank\" data-b7c=\"58957fd3da311\"><b>GitHub</b> - segmentio/<b>nightmare</b>: A high-level browser automation ...</a>", 
        "id": 921606434, 
        "trialId": 1294938304
    }, 
    {
        "actionType": "getText", 
        "createdAt": "2017-02-04T07:16:35.000Z", 
        "id": 3769942071, 
        "trialId": 1294938304, 
        "text": "GitHub - segmentio/nightmare: A high-level browser automation ..."
    }, 
    {
        "actionType": "getScreenshot", 
        "createdAt": "2017-02-04T07:16:36.000Z", 
        "id": 1102802687, 
        "trialId": 1294938304, 
        "uri": "/screenshots/1102802687"
    }
]
```

### DELETE /results?trialId=:trialId

- response 204 (application/json)

(No response body)

### GET /screenshots/:resultId

- response 200 (application/json)

```json
{
    "resultId": 1386605851,
    "image": "<base64 of screen shot png image>"
}
```

## License

MIT
