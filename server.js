// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;;

app.use(cors());
app.use(bodyParser.json());

let batteryData = {
    batteryLevel: 0,
    charging: false
};

// Endpoint to update battery status
app.post('/update-battery', (req, res) => {
    batteryData.batteryLevel = req.body.batteryLevel;
    batteryData.charging = req.body.charging;
    res.sendStatus(200);
});

// Endpoint to get battery status
app.get('/get-battery-status', (req, res) => {
    res.json(batteryData);
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
