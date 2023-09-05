# **Build a Book Catalog Backend with TypeScript Express.js Prisma postgreSQL**

## **Live Link: https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/**

---

## Welcome route

- [Website Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/)

---

## Auth routes

### Registration or signup for user (post route)

- /api/v1/auth/signup (POST) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/auth/signup)

- Need **name , role, email, contactNo, password, address, profileImg** from **req.body**

### Sign In or login for user (post route)

- /api/v1/auth/signin (POST) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/auth/signin)

- Need **email , password** from **req.body**

---

## Users routes

### Get all users (get route)

- /api/v1/users (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/users)

- Need **jwt** from **req.headers.authorization** => (for admin)

### Get single user (get route)

- /api/v1/users/:id (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76)

- ###### /api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76

- Need **jwt** from **req.headers.authorization** => (for admin)

### Update single user (patch route)

- /api/v1/users/:id (patch) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76)

- ###### /api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76

- Need **jwt** from **req.headers.authorization** => (for admin)

### Delete single user (delete route)

- /api/v1/users/:id (delete) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76)

- ###### /api/v1/users/cff88af9-0d97-43b7-9340-c2851625cd76

- Need **jwt** from **req.headers.authorization** => (for admin)

---

## Category routes

### Get all categories (get route)

- /api/v1/categories (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/categories)

### Get single category (get route)

- /api/v1/categories/:id (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7)

- ###### /api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7

### Create category (post route)

- /api/v1/categories/create-category (post) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/categories/create-category)

- Need **jwt** from **req.headers.authorization** => (for admin)

- Need **title** from **req.body**

### Update single category (patch route)

- /api/v1/categories/:id (patch) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7)

- ###### /api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7

- Need **jwt** from **req.headers.authorization** => (for admin)

- Need **title** from **req.body**

### Delete single category (delete route)

- /api/v1/categories/:id (delete) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7)

- ###### /api/v1/categories/aa0976e5-dd71-460a-8b72-a2e892581ca7

- Need **jwt** from **req.headers.authorization** => (for admin)

## Books routes

### Get all books (get route)

- /api/v1/books (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books)

### Searching, filtering and pagination routes for book listing

- api/v1/books?page=1&size=10 **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?page=1&size=10)** => (Page {default: 1} and size {default: 10})

- api/v1/books?sortBy=price&sortOrder=asc **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?sortBy=price&sortOrder=asc)** => (sortBy {default: title} and sortOrder {default: desc})

- api/v1/books?sortBy=price&sortOrder=asc **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?sortBy=price&sortOrder=asc)** => (sortBy and sortOrder)

- api/v1/books?minPrice=400&maxPrice=500 **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?minPrice=400&maxPrice=500)** => (filter by minPrice {default: 0} and maxPrice {default: 1000000})

- api/v1/books?title=The Boy **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?title=The%20Boy)** => (accurate search {**case sensitive**})

- api/v1/books?searchTerm=tion **[Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books?searchTerm=tion)** => (any matching search from title/ author/ genre {**case insensitive**})

---

### Get single book (get route)

- /api/v1/books/:id (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a)

- ###### /api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a

### Get books by category (get route)

- /api/v1/books/:categoryId/category (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books/aa0976e5-dd71-460a-8b72-a2e892581ca7/category)

- ###### /api/v1/books/aa0976e5-dd71-460a-8b72-a2e892581ca7/category

### Create book (post route)

- /api/v1/books/create-book (post) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books/create-book)

- Need **jwt** from **req.headers.authorization** => (for admin)

- Need **title, author, genre, price, publicationDate, categoryId** from **req.body**

### Update single book (patch route)

- /api/v1/books/:id (patch) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a)

- ###### /api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a

- Need **jwt** from **req.headers.authorization** => (for admin)

### Delete single book (delete route)

- /api/v1/books/:id (delete) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a)

- ###### /api/v1/books/16200fdb-1922-4e04-af77-291d3d49dc7a

- Need **jwt** from **req.headers.authorization** => (for admin)

---

## Orders routes

### Get all orders (get route)

- /api/v1/orders (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/orders)

- Need **jwt** from **req.headers.authorization** => (for admin and customer)

- **admin** can get **all orders**

- **customer** can get only **his all orders that posted by himself**

### Get single order (get route)

- /api/v1/orders/:id (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/orders/d96ec818-db19-4588-9dd2-87ff87f88d28)

- ###### /api/v1/orders/d96ec818-db19-4588-9dd2-87ff87f88d28

- Need **jwt** from **req.headers.authorization** => (for admin and customer)

- **admin** can get **any single order**

- **customer** can get only **his order that posted by himself**

### Create order (post route)

- /api/v1/orders/create-order (post) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/orders/create-order)

- Need **jwt** from **req.headers.authorization** => (for customer)

- Need **orderedBooks** as an array; and in this array need **bookId, quantity** in every object from **req.body**

---

## Profile routes

### Get own profile (get route)

- /api/v1/profile (get) [Link](https://book-catalog-prisma-mdminhazulislamkhan.vercel.app/api/v1/profile)

- Need **jwt** from **req.headers.authorization** => (for admin and customer)

---
