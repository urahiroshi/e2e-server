e2e-server
==========

e2e-server is browser automation system for End-To-End test or repeating browser operations.

There are some features to write browser operations.

- e2e-server provides REST API to operate browser, and you can write operations with yaml by using [e2e-client](https://github.com/urahiroshi/e2e-client).
- e2e-server uses [fuzzy-query](https://github.com/urahiroshi/fuzzy-query) to select element.
- Each services used by e2e-server is written by Docker container, so you can increase browser automation services (named "e2e")

Current version is under development, so it is unstable and may be added breaking changes.

## Requirements

- docker-compose
- Node.js 8.0+ (for e2e-client)

## Getting Started

1. clone this repository and [e2e-client](https://github.com/urahiroshi/e2e-client).

```bash
$ git clone https://github.com/urahiroshi/e2e-server.git
$ git clone https://github.com/urahiroshi/e2e-client.git
```

2. move to e2e-server directory, start services

```
$ docker-compose up
```

3. move to e2e-client directory, initialize project

```
$ npm start
```

4. to show status, access to http://localhost:3000/projects/<projectId>/iterations/1
(projectId is shown in e2e-client console)

## Resources

### Trial

Trial stores usecase, project information and job status.
If trial is posted, begin to operate browser.

key  | type | description
--|---|--
usecase  | Usecase Object | **REQUIRED**. Usecase of the trial.
usecasePath | String | Path to track usecase. If it is a trial of Iteration, this value is required.
id | Integer | READONLY. Unique id of the trial.
state | String | READONLY. State of trial. It can be one of them: ['initialized', 'finished']
createdAt | String | READONLY. String of datetime when trial is created.
updatedAt | String | READONLY. String of datetime when trial is updated.

#### Usecase (contained in Trial)

Usecase stores browser actions and parameters such as url.

key  | type  | description
--|---|--
url  | String  | **REQUIRED**. Url where actions are called.
actions  | Array(Action Object)  | **REQUIRED**. Actions are executed in a sequential order.

#### Action (contained in Usecase)

Action stores informations to operate browser.
It has some data formats by specified type as shown below.

##### click

Click selected element.

key  | type  | description
--|---|--
type  | String  | **REQUIRED**. 'click'.
selectors  | Array(String)  | **REQUIRED**. fuzzy-query selectors for element to click.

##### input, select

Input or select specified value to selected element.

key  | type  | description
--|---|--
type  | String  | **REQUIRED**. 'input' or 'select'.
selectors  | Array(String)  |  **REQUIRED**. fuzzy-query selectors for element to input/select.
value | String  | **REQUIRED**. Input value or select value (on select, it is interpreted by regular expression).

##### getHtml, getText

Get inner html or inner text of selected element.

key  | type  | description
--|---|--
type  | String  | **REQUIRED**. 'getHtml' or 'getText'
selectors  | Array(String)  |  **REQUIRED**. fuzzy-query selectors for element to get html or text.
variable  | String  |  Variable name to be used by after actions. For example, if variable is 'foo', '${foo}' is replaced by result value (html or text) on parameter of after actions.

##### getScreenshot

Get screenshot of the current page.

key  | type  | description
--|---|--
type  | String  | **REQUIRED**. 'getScreenshot'.

### Result

Result stores information of an executed action of trial.
Result is returned by array, the order of this array correspond  to the order of actions.
This resouce is READONLY.

key  | type  | description
--|---|--
actionType  | String  | Type of the action.
createdAt  | String  | Time when action is executed.
id  | Integer  |  Unique id of the result.
trialId  | Integer  |  Id of the trial.
text  | String  |  If actionType is 'getText', this value shows the text.
html  | String  |  If actionType is 'getHtml', this value shows the html.
uri  | String  |  If actionType is 'getScreenshot', this value shows the uri of the screenshot.

### Screenshot

Screenshot stores a image gotten by getScreenshot action.
This resource is READONLY.

key  | type  | description
--|---|--
resultId  | Integer  | Id of corresponding result.
image  | String  | Base64 encoded data of screenshot image (PNG).

### Project

Project stores properties of project, which is used for bunding some related usecases and tracking trials of the same usecase.

key  | type  | description
--|---|--
id  | Integer  | READONLY. Unique id of the project.
createdAt  | String  | READONLY. String of datetime when project is created.

### Iteration

Iteration stores array of trials these usecases are related in a project.
If iteration is posted, these trials will be executed.

key  | type  | description
--|---|--
iterationNumber  | Integer  | READONLY. Unique id of the iteraion in a project. This value is incremental.
createdAt  | String  | READONLY. String of datetime when iteration is created.
trials | Array(Trial Object) | **REQUIRED**. Array of trials.


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