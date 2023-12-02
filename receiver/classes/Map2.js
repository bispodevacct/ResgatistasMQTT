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

    addCircle(latitude, longitude) {
        L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.1,
            radius: 50
        }).addTo(this.map);
    }
}

export default Map2;