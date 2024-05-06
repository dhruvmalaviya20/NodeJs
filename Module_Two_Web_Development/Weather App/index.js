import express from 'express';
import fetch from 'node-fetch';

const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.render('index', { error: 'Please provide a city' });
    }

    try {
        const apiKey = '058074f7a5a46b503851c8250c58e7f7'; // Get your API key from the weather service provider
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?key=${apiKey}&q=${city}`;

        const response = await fetch(apiUrl);
        const weatherData = await response.json();

        if (weatherData.error) {
            return res.render('index', { error: 'City not found' });
        }

        res.render('weather', { weatherData });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.render('index', { error: 'Something went wrong' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
