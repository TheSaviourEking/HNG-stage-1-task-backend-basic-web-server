require('dotenv').config();

const express = require('express');
const app = express();
const { lookup } = require('geoip-lite');

app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.json({ message: 'Server is currently running' });
})

// /api/hello?visitor_name="Mark"
// {
//     "client_ip": "127.0.0.1", // The IP address of the requester
//     "location": "New York" // The city of the requester
//     "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
//   }
app.get('/api/hello/', (req, res) => {
    const { visitor_name } = req.query;
    var ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;
    const parseIp = (req) =>
        req.headers['x-forwarded-for']?.split(',').shift()
        || req.socket?.remoteAddress
    var getClientIp = function (req) {
        return (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
            req.client.remoteAddress;
    };

    const location = lookup(req.ip)?.city

    res.json(
        {
            'client_ip': req.ip,
            'second ip': ip,
            "parsed ip": parseIp(req),
            'getIp': getClientIp(req),
            'location': location,
            'greeting': `Hello ${visitor_name}! The temperature is 11 degrees Celsius in ${location}`
        }
    )
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
