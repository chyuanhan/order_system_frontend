# Project Name

A customer side order system for a restaurant.

## Demo

Demo Link: [https://order-system-frontend.vercel.app/table/1](https://order-system-frontend.vercel.app/table/1)

## Features

- View Menu
- Add/Remove Items to Cart
- Order Summary
- Checkout

## Tech Stack

- **Frontend Framework**: React + TypeScript
- **UI Components**: Ant Design
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js >= version
- npm >= version
- Other dependencies...

## Installation

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation

1. Clone the repository

```bash
git clone https://github.com/chyuanhan/order_system_frontend.git
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file and add the following:

```bash
VITE_BACKEND_URL=your_backend_url
VITE_BACKEND_ASSET_URL=your_asset_url
```

4. Start development server

```bash
npm run dev
```

## Project Structure

├── components/
│ ├── FixedCartBar.tsx # Fixed footer cart bar
│ ├── MenuItem.tsx # Menu item
│ ├── TopBar.tsx # Top navigation bar
│ ├── NotFound.tsx # 404 page
│
├── pages/
│ ├── User/
│ │ ├── MenuPage.tsx # Menu page
│ │ ├── OrderConfirmation.tsx # Order confirmation page
│ │ ├── OrderDetailsPage.tsx # Order details page
│
├── context/
│ └── AuthContext.tsx # Authentication context
│
├── hooks/ # Custom hooks
│ └── useAuth.ts
│
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

## API Endpoints

### Menu Management

- `GET /menu` - Get all menu items
- `POST /menu` - Add a new menu item
- `PUT /menu/:id` - Update a menu item
- `DELETE /menu/:id` - Delete a menu item
