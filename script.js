// script.js
navigator.getBattery().then(function(battery) {
    function updateBatteryInfo() {
        const batteryLevel = battery.level * 100;
        const charging = battery.charging;

        // Update frontend
        document.getElementById('battery').textContent = `Battery: ${batteryLevel.toFixed(2)}%`;
        document.getElementById('charging').textContent = `Status: ${charging ? 'Charging' : 'Not Charging'}`;

        // Send data to server
        fetch('/update-battery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                batteryLevel: batteryLevel,
                charging: charging,
            }),
        });
    }

    updateBatteryInfo();

    battery.addEventListener('levelchange', updateBatteryInfo);
    battery.addEventListener('chargingchange', updateBatteryInfo);
});

// Function to fetch battery status every few seconds
setInterval(() => {
    fetch('/get-battery-status')
        .then(response => response.json())
        .then(data => {
            document.getElementById('battery').textContent = `Battery: ${data.batteryLevel.toFixed(2)}%`;
            document.getElementById('charging').textContent = `Status: ${data.charging ? 'Charging' : 'Not Charging'}`;
        });
}, 5000); // Update every 5 seconds
