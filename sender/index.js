import credentials from "../credentials.js";
import Geo from "./classes/Geo.js";

const {username, password} = credentials;

const options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect('wss://5c79ee7cca8f4bd19e3eabbcd01f27a0.s2.eu.hivemq.cloud:8884/mqtt', options);

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