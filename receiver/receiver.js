import credentials from "../credentials";

const {username, password} = credentials;

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

let options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect('wss://5c79ee7cca8f4bd19e3eabbcd01f27a0.s2.eu.hivemq.cloud:8884/mqtt', options);

client.on('error', (err) => {
    console.error('Erro ao conectar com o Broker MQTT:', err);
});

client.on('connect', () => {
    console.log('Sucesso ao se conectar!');

    var topic = 'geolocation';
    client.subscribe(topic);
});

const map = new Map2();

client.on('message', (topic, message) => {
    const latLon = message.toString();
    const latLonArray = latLon.split(" ");
    const latitude = Number(latLonArray[0]);
    const longitude = Number(latLonArray[1]);

    //map.locate(latitude, longitude);
    map.addCircle(latitude, longitude);
});