import credentials from "../credentials";
import Map2 from "./classes/Map2";

const {username, password} = credentials;

const options = {
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