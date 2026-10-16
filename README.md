# Raksha Backend

Backend for **Raksha**. Users register and add emergency contacts for their device, and the device fetches those contacts from this API.

## Tech Stack

Node.js, Express 5, MongoDB (Mongoose)

## Setup

```bash
git clone https://github.com/ShubhamGogarkar/Raksha.git
cd Raksha
npm install
```

Create a `.env` file:

```env
PORT=3000
CORS_ORIGIN=
MONGODB_URI=<your-mongodb-connection-string>
```

Run:

```bash
npm run dev    # development
npm start      # production
```

## API

Base URL: `/api/v1`

| Method   | Endpoint                              | Description                               |
| -------- | ------------------------------------- | ----------------------------------------- |
| `GET`    | `/healthcheck`                        | Server health check                       |
| `POST`   | `/users/register`                     | Register a user with their device         |
| `GET`    | `/users/emergency-contacts/:deviceId` | Get a device's emergency contacts         |
| `PATCH`  | `/users/update-device-details`        | Update name and email for a device        |
| `POST`   | `/users/add-emergency-contact`        | Add an emergency contact to a device      |
| `DELETE` | `/users/remove-emergency-contact`     | Remove an emergency contact from a device |

**Register example**

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "emergencyContact": 9876543210,
    "deviceId": "device-123"
  }'
```
