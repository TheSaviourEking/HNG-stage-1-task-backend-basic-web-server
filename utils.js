require('dotenv').config();

const stripQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}

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

module.exports = { stripQuotes, getCombinedData };
