require('dotenv').config();

const getCombinedData = async (ip) => {
    const apiKey = process.env.apiKey || null;
    const ipInfoUrl = `https://api.weatherapi.com/v1/ip.json?key=186c65a9633c4c77800234103243006&q=${ip}`;
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=186c65a9633c4c77800234103243006&q=${ip}`;

    try {
        const [ipInfoResponse, weatherResponse] = await Promise.all([
            fetch(ipInfoUrl),
            fetch(weatherUrl)
        ]);

        const ipInfoData = await ipInfoResponse.json();
        const weatherData = await weatherResponse.json();

        console.log(ipInfoData);
        console.log(weatherData);

        return { ipInfoData, weatherData };
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = getCombinedData;
