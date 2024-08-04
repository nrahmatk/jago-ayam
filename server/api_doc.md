# Movie API Documentation

## Endpoints :

List of available endpoints:

### Public
- `GET /pub/cuisines`: Retrieve available cuisines.
- `GET /pub/cuisines/:cuisineId`: Retrieve a specific cuisine.

### Authentication
- `POST /login`: Generate authentication token.
- `POST /add-user`: Add a user (Requires authentication and Admin role)

### Cuisines (Authentication Required)
- `POST /cuisines`: Create a new cuisine.
- `GET /cuisines`: Retrieve all cuisines with user/author details.
- `GET /cuisines/:cuisineId`: Retrieve a specific cuisine.
- `PUT /cuisines/:cuisineId`: Update a specific cuisine (Requires Admin role or Staff with matching cuisine.authorId).
- `PATCH /upload/:cuisineId'`: Update image url of a specific cuisine (Requires Admin role or Staff with matching cuisine.authorId).
- `DELETE /cuisines/:cuisineId`: Delete a specific cuisine (Requires Admin role or Staff with matching cuisine.authorId).

### Categories (Authentication Required)
- `POST /categories`: Create a new category (Requires Admin role).
- `GET /categories`: Retrieve all categories.
- `PUT /categories/:categoryId`: Update a specific category (Requires Admin role).
- `DELETE /categories/:categoryId`: Delete a specific category (Requires Admin role).



&nbsp;

## 1. GET /pub/cuisines
Description:
- Retrieve available cuisines from database with pagination.

_Response (200 - OK)_

```json
{
    "page": 1,
    "data": [
        {
            "id": 1,
            "name": "Spring Rolls",
            "description": "Crispy rolls filled with fresh vegetables.",
            "price": 50000,
            "imgUrl": "http://example.com/spring_rolls.jpg",
            "categoryId": 1,
            "authorId": 1,
        },
        {
            "id": 2,
            "name": "Bruschetta",
            "description": "Grilled bread topped with diced tomatoes and basil.",
            "price": 45000,
            "imgUrl": "http://example.com/bruschetta.jpg",
            "categoryId": 1,
            "authorId": 2,
        }
        ...
    ],
    "totalData": 20,
    "totalPage": 2,
    "dataPerPage": 10
}
```

&nbsp;

## 2. GET /pub/cuisines/:cuisineId
Description:
- Retrieve a specific cuisine.

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Spring Rolls",
    "description": "Crispy rolls filled with fresh vegetables.",
    "price": 50000,
    "imgUrl": "http://example.com/spring_rolls.jpg",
    "categoryId": 1,
    "authorId": 1,
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Error 404: Item not found"
}
```

&nbsp;


## 3. POST /login
Description:
- Generate authentication token.

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid input: Please check your email and try again"
}
OR
{
  "message": "Invalid input: Please check your password and try again "
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email or password. Please try again"
}
```

&nbsp;
## 4. POST /add-user
Description:
- Add a user with Staff role (Requires authentication and Admin role).

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "An account with this email already exists"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Password length must be at least 5 characters"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## 5. POST /cuisines
Description:
- Create a new cuisine (Requires authentication).

Request:
- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "imgUrl": "string",
  "categoryId": "integer"
}
```

_Response (201 - Created)_

```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "The minimum price is 1000"
}
OR
{
  "message": "Image URL is required"
}
OR
{
  "message": "Category is required"
}
```

&nbsp;

## 6. GET /cuisines
Description:
- Retrieve all cuisines with user/author details (Requires authentication).

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Spring Rolls",
        "description": "Crispy rolls filled with fresh vegetables.",
        "price": 50000,
        "imgUrl": "http://example.com/spring_rolls.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2024-06-01T16:49:50.269Z",
        "updatedAt": "2024-06-01T16:49:50.269Z",
        "User": {
            "id": 1,
            "username": "admin",
            "email": "admin@mail.com",
            "role": "Admin",
            "phoneNumber": "08123456123",
            "address": "Surabaya",
            "createdAt": "2024-06-01T16:49:50.180Z",
            "updatedAt": "2024-06-01T16:49:50.180Z"
        }
    },
    {
        "id": 2,
        "name": "Bruschetta",
        "description": "Grilled bread topped with diced tomatoes and basil.",
        "price": 45000,
        "imgUrl": "http://example.com/bruschetta.jpg",
        "categoryId": 1,
        "authorId": 2,
        "createdAt": "2024-06-01T16:49:50.269Z",
        "updatedAt": "2024-06-01T16:49:50.269Z",
        "User": {
            "id": 2,
            "username": "admin1",
            "email": "admin1@mail.com",
            "role": "Admin",
            "phoneNumber": "08123456123",
            "address": "Surabaya",
            "createdAt": "2024-06-01T16:49:50.245Z",
            "updatedAt": "2024-06-01T16:49:50.245Z"
        }
    }
    ...
]
```

&nbsp;

## 7. GET /cuisines/:cuisineId
Description:
- Retrieve specific cuisines (Requires authentication).

Request:

- headers: 

```json
{
  "Authorization": "Bearer <access_token>"
}
```
- params:
```json
{
  "cuisineId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Spring Rolls",
    "description": "Crispy rolls filled with fresh vegetables.",
    "price": 50000,
    "imgUrl": "http://example.com/spring_rolls.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2024-06-01T16:49:50.269Z",
    "updatedAt": "2024-06-01T16:49:50.269Z"
}
```
_Response (404 - Not Found)_

```json
{
  "message": "Error 404: Item not found"
}
```

&nbsp;

## 8. PUT /cuisines/:cuisineId
Description:
- Update a specific cuisine (Requires authentication, Admin role or Staff with matching cuisine.authorId).

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "cuisineId": "integer"
}
```

- body:
```json
{
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
}
```

_Response (200 - OK)_

```json
{
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error 404: Item not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "The minimum price is 1000"
}
OR
{
  "message": "Image URL is required"
}
OR
{
  "message": "Category is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;


## 9. PATCH /cuisines/upload/:cuisineId
Description:
- Update image url of a specific cuisine (Requires Admin role or Staff with matching cuisine.authorId).

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "cuisineId": "integer"
}
```

- body:
```json
{
    "imageUrl": "file data"
}
```

_Response (200 - OK)_

```json
{
    "message": "Image <entity name> success to update"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error 404: Item not found"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Image is required, try again"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## 10. DELETE /cuisines/:cuisineId

Description:
- Delete a specific cuisine. (Requires authentication, Admin role or Staff with matching cuisine.authorId).

Request:

- headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

- params:
```json
{
  "cuisineId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "<entity_name> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Error 404: Item not found"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## 11. POST /categories

Description:
- Add a new category (Requires authentication and Admin role).

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 5,
  "name": "category bary",
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Name is required"
    ]
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## 12. GET /categories

Description:
- Retrieve all categories (Requires authentication).

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Appetizers",
        "createdAt": "2024-06-01T16:49:50.266Z",
        "updatedAt": "2024-06-01T16:49:50.266Z"
    },
    {
        "id": 2,
        "name": "Main Courses",
        "createdAt": "2024-06-01T16:49:50.266Z",
        "updatedAt": "2024-06-01T16:49:50.266Z"
    }
    ...
]
```

&nbsp;

## 13. PUT /categories/:categoryId

Description:
- Edit a specific category (Requires authentication and Admin role).

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "categoryId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "name": "Snacks",
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Name is required"
    ]
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Error 404: Item not found"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## 14. Delete /categories/:categoryId

Description:
- Delete a specific category (Requires authentication and Admin role).

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "categoryId": "integer"
}
```

_Response (200 - OK)_

```json
{
    "message": "<category name> has been deleted"
}
```
_Response (404 - Not Found)_

```json
{
    "message": "Error 404: Item not found"
}
```
_Response (403 - Forbidden)_

```json
{
  "message": "Access denied: You do not have permission to access this resource"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Access denied: Please log in first"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
