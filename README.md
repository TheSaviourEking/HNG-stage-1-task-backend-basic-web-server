# Stage-1 Project

This project is a simple Node.js server using Express that provides a greeting and weather information based on the client's IP address.

## Project Structure

- `app.js`: Main server file that sets up routes and starts the server.
- `utils.js`: Utility file that contains helper functions `stripQuotes` and `getCombinedData`.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheSaviourEking/stage-1.git
   cd stage-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```
   apiKey=your_weather_api_key
   ```

## Usage

### Development

To run the server in development mode with hot-reloading:

```bash
npm run dev
```

### Production

To run the server in production mode:

```bash
npm start
```

## API Endpoints

### Root Endpoint

- **URL:** `/`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "message": "Server is currently running"
  }
  ```

### Greeting Endpoint

- **URL:** `/api/hello`
- **Method:** `GET`
- **Query Parameters:**
  - `visitor_name` (optional): Name of the visitor to include in the greeting.
- **Response:**
  ```json
  {
    "client_ip": "127.0.0.1",
    "location": "New York",
    "greeting": "Hello, Mark! The temperature is 11 degrees Celsius in New York"
  }
  ```
- **Example Request:**
  ```bash
  curl "http://localhost:5000/api/hello?visitor_name=\"Mark\""
  ```

## Helper Functions

### `stripQuotes`

Removes quotes from a string if they exist.

```javascript
const stripQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}
```

### `getCombinedData`

Fetches weather information based on the provided IP address.

```javascript
const getCombinedData = async (ip) => {
    const apiKey = process.env.apiKey || null;
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ip}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const { location: { name }, current: { temp_c } } = await weatherResponse.json();
        return { name, temp_c };
    } catch (error) {
        console.error('Error:', error);
    }
}
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

- [Saviour Eking](https://github.com/TheSaviourEking)
