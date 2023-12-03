class Map2 {
    constructor() {
        this.map = L.map('map').fitWorld();

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.circleLayer = L.layerGroup().addTo(this.map);

        this.locate(0, 0);
    }

    locate(latitude, longitude) {
        this.map.setView([latitude, longitude], 4);
    }

    addCircle(latitude, longitude, message) {
        const c = L.circle([latitude, longitude], {
            color: message ? 'green' : 'red',
            fillColor: message ? 'green' : 'red',
            fillOpacity: 0.1,
            radius: message ? 25 : 50
        })
        if (message) {
            c.bindPopup(message);
            /*this.circleLayer.clearLayers();*/
        }
            
        //c.addTo(this.map);
        
        this.circleLayer.addLayer(c);
        c.openPopup();
    }
}

export default Map2;