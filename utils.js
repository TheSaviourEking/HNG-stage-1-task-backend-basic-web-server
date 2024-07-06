require('dotenv').config();

const stripQuotes = (str) => {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}

// const getCombinedData = async (ip) => {
//     const apiKey = process.env.apiKey || null;
//     const ipInfoUrl = `https://api.weatherapi.com/v1/ip.json?key=${apiKey}&q=${ip}`;
//     const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ip}`;

//     try {
//         const [ipInfoResponse, weatherResponse] = await Promise.all([
//             fetch(ipInfoUrl),
//             fetch(weatherUrl)
//         ]);

//         const ipInfoData = await ipInfoResponse.json();
//         const { current } = await weatherResponse.json();

//         return { ipInfoData, current };
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

const getCombinedData = async (ip) => {
    const apiKey = process.env.apiKey || null;
    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ip}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const { location: { name }, current: { temp_c } } = await weatherResponse.json();

        return { name, temp_c };
        // return current;
    } catch (error) {
        console.error('Error:', error);
    }
}

// (async () => {
//     const weatherData = await getCombinedData("197.210.84.112");
//     console.log(weatherData);
// })();
// console.log(await getCombinedData("197.210.84.112"));
module.exports = { stripQuotes, getCombinedData };
