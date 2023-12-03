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
map.locate(-22.50300688591888, -41.923579532908015)

client.on('connect', () => client.subscribe('geolocation'));
client.on('message', (topic, mqttMessage) => {
    const {geolocation, message} = JSON.parse(mqttMessage.toString());
    const {latitude, longitude} = geolocation;
    console.log(message)
    map.addCircle(latitude, longitude, message);
    
    //map.locate(latitude, longitude);
});
client.on('error', err => alert('Erro ao conectar com o Broker MQTT:', err));