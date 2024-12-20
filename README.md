![Lottie Animation](assets/AccrediLink.gif)

## Project Structure

The project is organized as follows:


- **client**: Contains the frontend built with Vite, React, and TypeScript.  
- **server**: Contains the backend code.

---

## Getting Started

Follow the steps below to set up and run the application locally.

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### Installation

#### Environment Variables
Inside your server folder make a .env file and add those entries:
```bash
   PORT = 
   ACCESS_TOKEN_SECRET = 
   REFRESH_TOKEN_SECRET = 
   DATABASE_URL = 
```

1. Clone the repository:
   ```bash
   git clone https://github.com/AaryaBalwadkar/AL-Demo.git
   cd AL-Demo

2. Install dependencies for both the client and server folders.
   <br>***Installing Client Dependencies***
   ```bash
   cd client
   npm install
   ```

   ***Installing Server Dependencies***
   ```bash
   cd ../server
   npm install
   ```

### Running the Application

***Starting the Client***
1. Navigate to the client folder:
   ```bash
   cd client

2. Start the frontend application:
   ```bash
   npm run dev

3. The frontend will run on http://localhost:5173 (default Vite port).

<br>***Starting the Server***
1. Navigate to the server folder:
   ```bash
   cd server

2. Start the server:
   ```bash
   npm run dev

3. The backend will run on your configured port mentioned in .env.

