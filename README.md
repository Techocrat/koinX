# Crypto Trades API

This project is a Node.js and MongoDB-based server-side application that provides APIs for uploading cryptocurrency trade data from a CSV file and retrieving asset-wise balances at a given timestamp.

## Features

1. **Upload Trades**: Accepts a CSV file containing trade data and stores it in a MongoDB database.
2. **Get Asset Balance**: Retrieves the asset-wise balance of the account at a given timestamp.

## Endpoints

### 1. Upload Trades

- **Endpoint**: `POST http://localhost:8080/api/v1/trades/upload`
- **Description**: This endpoint accepts a CSV file, parses the trade data, and stores it in the database.

#### Request

- **Headers**:
  - `Content-Type: multipart/form-data`
- **Body**:
  - A CSV file with the following structure:

    ```csv
    User_ID,UTC_Time,Operation,Market,Buy/Sell Amount,Price
    513235744,2022-09-26 11:21:02,Buy,BTC/INR,25,1000
    513235744,2022-09-27 11:21:02,Sell,BTC/INR,10,2000
    513235744,2022-09-28 11:21:02,Buy,MATIC/INR,100,12
    ```

#### Response

- **Success**: `200 OK`
  - **Body**: `{"message": "Trades uploaded successfully"}`
- **Error**: `400 Bad Request`
  - **Body**: `{"message": "Invalid file format"}`
- **Error**: `500 Internal Server Error`
  - **Body**: `{"message": "Error uploading trades", "error": "<error details>"}`

### 2. Get Asset Balance

- **Endpoint**: `POST http://localhost:8080/api/v1/account/balance`
- **Description**: This endpoint retrieves the asset-wise balance of the account at a specified timestamp.

#### Request

- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  - A JSON object with the following structure:

    ```json
    {
      "timestamp": "2022-09-28T12:00:00"
    }
    ```

#### Response

- **Success**: `200 OK`
  - **Body**: A JSON object with asset balances:

    ```json
    {
      "BTC": 15,
      "MATIC": 100
    }
    ```

  - Explanation:
    - **BTC**: 25 (buy) - 10 (sell) = 15
    - **MATIC**: 100 (buy)
- **Error**: `400 Bad Request`
  - **Body**: `{"message": "Timestamp is required"}`
- **Error**: `500 Internal Server Error`
  - **Body**: `{"message": "Error calculating balance", "error": "<error details>"}`

## How to Run

### Prerequisites

- Node.js
- MongoDB


