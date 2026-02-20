# Art Gallery Data Table

A professional, modern data table application built with **React**, **TypeScript**, and **Vite**. This project interfaces with the [Art Institute of Chicago API](https://api.artic.edu/docs/) to display artwork data with advanced features like server-side pagination and persistent row selection.

## 🚀 Features

- **Server-Side Pagination**: Efficiently fetches data on demand. No bulk data pre-loading or caching of previous pages.
- **Persistent Selection**: Row selections are preserved across page navigations using ID-based tracking.
- **Custom Bulk Selection**: A specialized overlay panel allows selecting the first *N* rows of the current page.
- **Modern UI/UX**:
    - **Dark Theme**: Deep indigo/slate gradient background.
    - **Glassmorphism**: Frosted glass effects on cards and headers.
    - **Animations**: Smooth entrance animations, staggered row loading, and micro-interactions.
    - **Responsive Design**: Polished layout using PrimeFlex and custom CSS.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **UI Library**: [PrimeReact](https://primereact.org/) (DataTable, OverlayPanel, InputNumber)
- **Styling**: PrimeFlex + Custom CSS Variables + CSS Keyframe Animations
- **HTTP Client**: Native Fetch API

## 📦 Installation & Running

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/swarajladke/art-gallery.git
    cd art-gallery
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧩 Key Implementation Details

- **`useArtworks` Hook**: Encapsulates data fetching logic, handling loading states and errors.
- **Persistent State**: Utilizes a `Set<number>` to track selected IDs independently of the visible data.
- **Optimization**: The `DataTable` is used in `lazy` mode to ensure strict server-side pagination compliance.

## 🎨 UI Highlights

The application features a custom implementation of PrimeReact components with:
- **Inter** font family for clean typography.
- Custom gradients for buttons and text.
- Overridden PrimeReact styles for a cohesive dark mode aesthetic.

---
*Built for the React Internship Assignment.*
