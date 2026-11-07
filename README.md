# Sky Park Cafe

A food ordering website built with React, Redux Toolkit and React Router.

## Run

```bash
npm install
npm run dev
```

## Folder structure

```
src/
├─ main.jsx, App.jsx          App = routes only
├─ store/
│  ├─ Store.jsx               configureStore + saving the cart to localStorage
│  └─ slices/                 restaurantSlice, productSlice (dishes), CartSlice
├─ data/                      restaurants.json, menu.json, categories.js
├─ pages/                     Landing, Login, Home, Category, Restaurant, Cart, NotFound
├─ components/
│  ├─ layout/                 Layout (Outlet), Navbar, Footer, BottomNav
│  ├─ restaurant/             RestaurantCard
│  ├─ dish/                   DishCard, VegChips
│  └─ cart/                   CartRow
└─ utils/                     alerts.js, helpers.js, storage.js
```

## Routes

| Address | Page |
|---|---|
| `/` | Landing |
| `/login` | Login |
| `/home` | All restaurants, categories, search |
| `/category/:name` | Dishes of one category from every restaurant |
| `/restaurant/:rid` | One restaurant and its menu |
| `/cart` | Cart |

## Data

- `src/data/restaurants.json`: the restaurants (the pincodes are samples, replace them).
- `src/data/menu.json`: the dishes. `restaurantId` says which restaurant sells the dish.
- Photos go in `public/images/` and are written as `"/images/name.jpg"`.

Rules: a page has a route, a component does not. A slice only has state and
reducers and never imports a page or a component.
