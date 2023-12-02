import credentials from "../credentials.js";
import Geo from "./classes/Geo.js";

const {username, password, hivemq} = credentials;

const options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect(hivemq, options);

const geo = new Geo();

client.subscribe('geolocation');

client.on('error', err => {
    alert('Erro ao conectar com o Broker MQTT:', err);
});

client.on('connect', () => {
    const interval = setInterval(() => {
        geo.updateLocation();
        client.publish('geolocation', JSON.stringify(geo));
        console.log(`Enviando localização! (${geo.latitude}, ${geo.logitude})`);
    }, 30000);
});

const findButton = document.getElementById("findButton");

findButton.onclick = () => {
    geo.updateLocation();
    client.publish('geolocation', JSON.stringify(geo));
    console.log(`Enviando localização! (${geo.latitude}, ${geo.logitude})`);
}