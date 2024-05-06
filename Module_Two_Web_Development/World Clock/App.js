const express = require('express');
const app = express();

const timeZones = {
    'utc': 0,
    'gmt': 0,
    'est': -5,
    'cst': -6,
    'pst': -8,

};

app.get('/time/:timezone', (req, res) => {
    let timezone = req.params.timezone.toLowerCase();
    const offset = timeZones[timezone];
    if (offset !== undefined) {
        const currentTime = new Date(Date.now() + offset * 3600000).toLocaleTimeString();
        res.send(`Current time in ${timezone.toUpperCase()}: ${currentTime}`);
    } else {
        res.status(404).send('Timezone not found');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


