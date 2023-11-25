class Geo {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }

    updateLocation() {
        if (!('geolocation' in navigator)) {
            console.log(`There is no "geolocation" on this navigator.`);
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }
}

class Map {
    constructor() {
        this.map = L.map('map').fitWorld();

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    locate(latitude, longitude) {
        this.map.setView([latitude, longitude], 16);
    }

    addPin(latitude, longitude) {
        L.marker([latitude, longitude]).addTo(this.map);
    }

    addCircle(latitude, longitude) {
        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 50
        }).addTo(this.map);
    }
}

const geo = new Geo();
const map = new Map();

setInterval(() => {
    geo.updateLocation();
    map.locate(geo.getLatitude(), geo.getLongitude());
    map.addCircle(geo.getLatitude(), geo.getLongitude());
}, 10000);

/*var map = L.map('map').setView([geo.getLatitude(), geo.getLongitude()], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);*/