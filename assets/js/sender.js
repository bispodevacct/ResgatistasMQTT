const username = 'bispo';
const password = 'LosAngeles?001'

let options = {
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

class Geo {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
    }

    updateLocation() {
        if (!('geolocation' in navigator)) {
            console.log(`There is no "geolocation" on this navigator.`);
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }
}