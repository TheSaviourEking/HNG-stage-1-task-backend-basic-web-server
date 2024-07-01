require('dotenv').config();

const express = require('express');
const geoip = require('fast-geoip');
const app = express();
const { stripQuotes, getCombinedData } = require('./utils');
// const { lookup } = require('geoip-lite');

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
app.get('/api/hello/', async (req, res) => {
    const { visitor_name } = req.query;
    var reqIp = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        null;

    // const { ipInfoData: { ip, city }, weatherData: { temp_c } } = await getCombinedData(reqIp);
    const { ipInfoData: { ip, city }, current: { temp_c } } = await getCombinedData(reqIp);

    res.json(
        {
            'client_ip': ip,
            'location': city,
            'greeting': `Hello ${visitor_name ? stripQuotes(visitor_name) : 'guest'}! The temperature is ${temp_c} degrees Celsius in ${city}`
        }
    )
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
