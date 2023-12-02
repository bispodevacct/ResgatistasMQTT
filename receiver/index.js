import credentials from "../credentials.js";
import Map2 from "./classes/Map2.js";

const {username, password, hivemq} = credentials;

const options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect(hivemq, options);

const map = new Map2();

client.on('error', err => {
    alert('Erro ao conectar com o Broker MQTT:', err);
});

client.on('connect', () => {
    client.subscribe('geolocation');
});

client.on('message', (topic, message) => {
    const {latitude, longitude} = JSON.parse(message)

    //map.locate(latitude, longitude);
    map.addCircle(latitude, longitude);
});