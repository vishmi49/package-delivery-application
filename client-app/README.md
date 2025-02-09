# Client App

This is the client-side application for the Package Delivery system. It is built using React and Vite and provides a user interface for tracking and managing package deliveries.

## Installation

### Prerequisites

- Node.js version 23

### Installing Node.js version 23

If you don't have Node.js version 23 installed, you can install it using `nvm` (Node Version Manager). 

1. **Install Node.js version 23**:

    ```sh
    nvm install 23
    nvm use 23
    ```
 3. **Verify the installation**:

    ```sh
    node -v
    ```

    This should output `v23.x.x`.   

1. Clone the repository:
   ```bash
   git clone https://github.com/vish49/package-delivery-client.git
   cd package-delivery-client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000/signin`.

## Available Scripts

- `npm run dev`: Starts the development server.


## Project Structure

```
client-app/
├── public/                     # Public assets
├── src/                        # Source files
│   ├── assets/                 # Static assets
│   ├── components/             # React components
│   ├── context/                # Context providers
│   ├── layouts/                # Layout components
│   ├── pages/                  # Page components
│   ├── App.jsx                 # Main App component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── .gitignore                  # Git ignore file
├── index.html                  # HTML template
├── package.json                # NPM scripts and dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.js              # Vite configuration
```

## Dependencies

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-router-dom`: ^7.0.2
- `axios`: ^1.7.9
- `@auth0/auth0-react`: ^2.3.0
- `tailwindcss`: ^3.4.16
- `@headlessui/react`: ^2.2.0
- `react-icons`: ^5.4.0


### Dev Dependencies

- `vite`: ^6.0.1
- `eslint`: ^9.15.0
- `mocha`: ^11.1.0
- `chai`: ^5.1.2
- `sinon`: ^19.0.2
- `supertest`: ^7.0.0
- `@vitejs/plugin-react`: ^4.3.4







