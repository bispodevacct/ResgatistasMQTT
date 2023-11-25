function sendLocation() {
    if (!('geolocation' in navigator)) {
        console.log('It was not possible to access the user location.');
    } else {
        const watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
        setInterval(displayConnection, 10000);
        console.log(watchId);
    }
}

function displayLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`Latitude:\t${latitude}°\nLongitude:\t${longitude}°`);
}

function displayError() {
    console.log('It was not possible to display your location.');
}

function displayConnection() {
    const time = getCurrentTime();
    console.log(`Online - Last checked: ${time["hour"]}:${time["minute"]} ${time["day"]}/${time["month"]}/${time["year"]}.`);
}

function getCurrentTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { hour: hour, minute: minute, day: day, month: month, year: year };
}