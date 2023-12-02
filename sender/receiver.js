import credentials from "../credentials";

const {username, password} = credentials;

const options = {
    username,
    password,
    clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

const client = mqtt.connect('wss://5c79ee7cca8f4bd19e3eabbcd01f27a0.s2.eu.hivemq.cloud:8884/mqtt', options);

client.subscribe('geolocation');

client.on('error', (err) => {
    console.error('Erro ao conectar com o Broker MQTT:', err);
});

client.on('connect', () => {
    console.log('Sucesso ao se conectar1');
    
    const geo = new Geo();

    setInterval(() => {
        geo.updateLocation();
        client.publish('geolocation', `${geo.getLatitude()} ${geo.getLongitude()}`);
        console.log('Localização enviada!');
    }, 30000);
});