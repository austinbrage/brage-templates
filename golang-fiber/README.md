# **Golang + Fiber + Brage**

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white) ![Fiber](https://img.shields.io/badge/Fiber-000000?style=for-the-badge) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white

#### Minimal setup to get Fiber and MySQL working with Brage in Go.

##### Start creating new routes in the **_app_** folder [see the README file in app]

---

## API Route

#### All dynamically created routes are nested under the `/app` address

| Endpoint   | Description   |
| ---------- | ------------- |
| **`/app`** | API Version 1 |

## Healthcare Route

#### The API comes with 2 default routes in the `/ping` address within `/app` to verify both the client's connection to the API and to the database

| Endpoint                 | Queries | Description           |
| ------------------------ | ------- | --------------------- |
| **GET `/ping/api`**      | none    | Verify API connection |
| **GET `/ping/database`** | none    | Verify DB connection  |

## _Example Route_

#### If a folder called `articles` with the _table.sql_ and _queries.sql_ files in it is created under `app`, the `/articles` route will be added to the main `/app` route

> When the template is created, it includes an ARTICLES folder to test the Brage tool. Run the following command:
>
> ```
> brage create
> ```
