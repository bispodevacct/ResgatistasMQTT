import credentials from "../credentials.js";
import Geolocation from "./classes/Geolocation.js";

const {username, password, hivemq} = credentials;

const options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect(hivemq, options);

const geolocation = new Geolocation();

const sendGeolocation = () => {
	const {latitude, longitude} = geolocation.updateLocation();
	client.publish('geolocation', JSON.stringify(geolocation));
	console.log(`Enviando localização! (${latitude}, ${longitude})`);
}

client.subscribe('geolocation');

client.on('connect', () => setInterval(sendGeolocation, 10000));

client.on('error', err => alert('Erro ao conectar com o Broker MQTT:', err));

const findButton = document.getElementById("findButton");

findButton.onclick = sendGeolocation