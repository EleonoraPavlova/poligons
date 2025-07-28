# Vue Polygons SPA

This is a Single Page Application built with Vue 3 that visualizes and interacts with geographic data. The app displays polygons on a map, fetches and caches information about villages using the OpenStreetMap Nominatim API, and allows users to search and view detailed info about each village.

## Features

- SPA architecture with Vue 3 and Composition API for scalability
- Pinia for state management and caching API responses
- vue-router for routing
- Leaflet + vue-leaflet for interactive map rendering
- Turf.js for calculating polygon centers
- Nominatim API integration for geocoding and fetching village details
- Responsive layout with a sidebar for search and village list/details
- Map auto-focus to show all polygons or a selected village polygon
- Loading indicators during API calls
- Error handling with user notifications
- Caching to minimize redundant API requests
- Adaptive design optimized for desktops, tablets, and mobile devices

## Architecture

- Layouts for consistent app structure
- Reusable components for UI elements
- Services for API calls and data processing
- Pinia stores to manage polygons, villages, and village details state
- Separation of concerns to keep codebase clean and maintainable

## Setup & Run

- Node.js (v22 or higher recommended)
- npm or yarn package manager

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
