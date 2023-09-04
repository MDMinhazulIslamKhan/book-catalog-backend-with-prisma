# **Assignment 8 : Build a Book Catalog Backend Assignment**

## **Live Link: https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/**

---

## Welcome route

- [Website Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/)

---

### Application Routes:

#### Auth routes / Common routes

- User Sign Up
  Route: /api/v1/auth/signup (POST)

- User Sign In/Login
  Route: /api/v1/auth/signin (POST)

#### User

- api/v1/users (GET)
- api/v1/users/0d57371c-eea4-47e2-b852-45131b7a0a21 (Single GET) Include an id that is saved in your database
- api/v1/users/0d57371c-eea4-47e2-b852-45131b7a0a21 (PATCH)
- api/v1/users/0d57371c-eea4-47e2-b852-45131b7a0a21 (DELETE) Include an id that is saved in your database
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/64a37aca-95a0-47dd-b267-5f219cd0f750 (Single GET) Include an id that is saved in your database
- api/v1/categories/64a37aca-95a0-47dd-b267-5f219cd0f7504 (PATCH)
- api/v1/categories/64a37aca-95a0-47dd-b267-5f219cd0f750 (DELETE) Include an id that is saved in your database

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books/:64a37aca-95a0-47dd-b267-5f219cd0f7504/category (GET)
- api/v1/books/:16200fdb-1922-4e04-af77-291d3d49dc7a (GET)
- api/v1/books/:16200fdb-1922-4e04-af77-291d3d49dc7a (PATCH)
- api/v1/books/:16200fdb-1922-4e04-af77-291d3d49dc7a (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET)
- api/v1/orders/:460634c9-4fe6-4b0d-9058-bac6dff7a9e8 (GET)
