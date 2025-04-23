# My Next.js Map App

This project is a Next.js application that integrates Google Maps to display a map with a polygon and markers for points of interest. It utilizes the Google Maps API to render the map and manage user interactions.

## Project Structure

```
my-nextjs-map-app
├── public                # Static files
├── src
│   ├── components        # React components
│   │   └── mapGoogle.jsx # GoogleMapExample component
│   ├── pages             # Next.js pages
│   │   ├── _app.js       # Custom App component
│   │   └── index.js      # Main entry point
├── package.json          # npm configuration
├── next.config.js       # Next.js configuration
└── README.md             # Project documentation
```

## Features

- Displays a Google Map centered on a specific location.
- Renders a polygon on the map.
- Allows users to click on markers to view information in an InfoWindow.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-nextjs-map-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your Google Maps API key in the `mapGoogle.jsx` file.

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Dependencies

- React
- Next.js
- @react-google-maps/api

## License

This project is licensed under the MIT License.