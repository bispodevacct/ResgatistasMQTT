class Map2 {
    constructor() {
        this.map = L.map('map').fitWorld();

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.locate(0, 0);
    }

    locate(latitude, longitude) {
        this.map.setView([latitude, longitude], 4);
    }

    addCircle(latitude, longitude, message) {
        const c = L.circle([latitude, longitude], {
            color: undefined,
            fillColor: message ? 'red' : 'green',
            fillOpacity: 0.5,
            radius: message ? 50 : 5
        })
        if (message)
            c.bindPopup(message)
        c.addTo(this.map);
    }
}

export default Map2;