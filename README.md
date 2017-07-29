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

- id (number, readonly): identification number.
    It is generated when usecase is created.
- createdAt (string, readonly): created date time.
    It is generated when usecase is created.
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
    It is generated when usecase is created.
- createdAt (string, readonly): created date time.
    It is generated when usecase is created.
- updatedAt (string, readonly): updated date time.
    It is generated when usecase is created.
- timestamp: (number, readonly): updated date time.
    It value is copy of job object.
- usecase (object, readonly): copy of usecase when trial created
- state (string): state of trial job
- job (object): job object

### Result (Object)

Result stores values obtained from trial,
which is created by getXXX actions on usecase.

- resultId (number, readonly): identification number.
    It is generated when usecase is created.
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

### Project (Object)

"Project" stores usecases for creating trials which are linked by this project.
Trials may be created repeatedly, one of each is called as "Iteration".

- projectId (number, readonly): identification number.
    It is generated when project is created.
- createdAt (string, readonly): created date time.
    It is generated when project is created.

## API Example

### POST /trials

- Request (application/json)

```json
{
    "usecase": {
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
}
```

- Response 201 (application/json)

```json
{
    "usecase": {
        "url": "http://yahoo.com",
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
        ]
    },
    "id": 2343814817,
    "state": "Initialized"
}
```

### GET /trials/:id

- response 200 (application/json)

(If this trial is created by usecase of project, parameter usecasePath exists.)

```json
{
    "createdAt": "2017-01-29T10:04:32.000Z",
    "id": 4238132527,
    "state": "completed",
    "updatedAt": "2017-01-29T10:13:15.000Z",
    "usecasePath": "path/to/usecase",
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
        "url": "http://yahoo.com"
    }
}
```

### POST /projects

```json
{}
```

- Response 201 (application/json)

```json
{
    "id": 2343814817,
    "createdAt": "2017-01-29T10:04:32.000Z",
}
```

### POST /projects/:projectId/iterations

```json
{
    "trials": [
        {
            "usecasePath": "path/to/usecase",
            "usecase": {
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
        }
    ]
}
```

- Response 201 (application/json)

```json
{
    "iterationNumber": 1,
    "createdAt": "",
    "trials": [
        {
            "usecasePath": "path/to/usecase",
            "id": 2343814817, 
            "usecase": {
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
        }
    ]
}
```


### GET /projects/:projectId

Get project iterators (it will get less than 10 iterators as default).

- Response 200 (application/json)

```json
{
    "id": 2343814817,
    "createdAt": "2017-01-29T10:04:32.000Z"
}
```

### GET /projects/:projectId/iterations

Get project iterations. (it will get less than 10 iterations as default).

- Query Parameters
    - offset: number from most recent iteration.
      Default value is offset=0, it means most recent one.
    - limit: max length of iterations which is older than offset. Default value is 10.

```json
[
        {
            "iterationNumber": 1,
            "createdAt": ""
        },
        {
            "iterationNumber": 2,
            "createdAt": ""
        }
]
```

### GET /projects/:projectId/iterations/:iterationNumber

Get trials of the iterations.

- Response 200 (application/json)

```json
{
    "iterationNumber": 2,
    "createdAt": "",
    "trials": [
        {
            "usecasePath": "path/to/usecase",
            "id": 2343814817,
            "state": "Finished",
            "createdAt": "",
            "updatedAt": ""
        },
        {
            "usecasePath": "path/to/usecase2",
            "id": 109726492,
            "state": "Running",
            "createdAt": "",
            "updatedAt": ""
        }
    ]
}
```

### GET /projects/:projectId/usecases/:usecasePath

Get trials of the usecase (it will get less than 10 trials as default).

- Query Parameters
    - offset: number from most recent trial.
      Default value (if offset and lastIterationNumber is undefined) is offset=0, it means most recent one.
    - lastIterationNumber: first iterationNumber of the trial.
    - limit: max length of trials which is older than offset. Default value is 10.

- Response 200 (application/json)

```json
{
    "usecasePath": "/path/to/usecase",
    "trials": [
        {
            "iterationNumber": 1,
            "id": 109726492,
            "state": "Running",
            "createdAt": "",
            "updatedAt": ""
        },
        {
            "iterationNumber": 2,
            "id": 109726492,
            "state": "Running",
            "createdAt": "",
            "updatedAt": ""
        }
    ]
}
```

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
