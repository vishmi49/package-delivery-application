# Server Application Documentation

## Introduction

The Server Application is responsible for managing package deliveries. It is built using Node.js with Express.js as the web framework and MongoDB for data storage. The API provides endpoints for managing package items, including creation, retrieval, updating, and searching package deliveries.

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
 2. **Verify the installation**:

    ```sh
    node -v
    ```

    This should output `v23.x.x`.   

3. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/package-delivery-server.git
   cd package-delivery-server
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Set up environment variables by creating a `.env` file:
   ```
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/packageDeliveryDB
   AUTH0_DOMAIN=your-auth0-domain
   AUTH0_CLIENT_ID=your-auth0-client-id
   AUTH0_CLIENT_SECRET=your-auth0-client-secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Package Items

#### Create a Package Item
- **Endpoint:** `POST /packageitems`
- **Request Body:**
  ```json
  {
    "packageName": "Sample Package",
    "priority": "High",
    "description": "Fragile",
    "currentStatus": "Pending",
    "additionalInstructions": "Handle with care",
    "deliveryDetails": {
      "deliveryDate": "2024-02-10",
      "deliveryTime": "14:00",
      "assignedDriver": "John Doe",
      "trackingNumber": "123456789"
    }
  }
  ```
- **Response:** `201 Created`

#### Get All Package Items
- **Endpoint:** `GET /packageitems`
- **Response:** `200 OK` (Returns an array of package items)

#### Get a Package Item by ID
- **Endpoint:** `GET /packageitems/{id}`
- **Response:** `200 OK` (Returns package item details)

#### Update a Package Item
- **Endpoint:** `PUT /packageitems/{id}`
- **Request Body:** Similar to create request
- **Response:** `200 OK`

#### Get Package Items by User Email
- **Endpoint:** `GET /packageitems/user/{email}`
- **Response:** `200 OK` (Returns package items linked to the user)

#### Search Package Items
- **Endpoint:** `GET /packageitems/search`
- **Response:** `200 OK` (Returns matching package items)



## Testing Method

1. **Unit Testing**: Uses Jest for testing individual functions and modules.
2. **Integration Testing**: Utilizes Mocha, Chai, and Supertest to validate API interactions.
3. **Mocking and Stubbing**: Uses Sinon to mock dependencies in tests.
4. **Test Coverage**: Covers various success, failure, and edge-case scenarios.



This README provides an overview of the server application, detailing its setup, API endpoints, design, technical approach, and challenges faced.

