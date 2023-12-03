import credentials from "../credentials.js";

const messageBox = document.getElementById("messageBox");
const loadingText = document.getElementById("loadingText");
const loaderBox = document.getElementById("loaderBox");
const findButton = document.getElementById("findButton");

const {username, password, hivemq} = credentials;

let geolocation;

const mqttOptions = {
	username,
	password,
	clientId: `mqttjs_${Math.random().toString(16).substr(2, 8)}`,
}

if (!('geolocation' in navigator)) {
	alert(`There is no "geolocation" on this navigator.`);
}
else{
	const client = mqtt.connect(hivemq, mqttOptions);
	client.subscribe('geolocation');

	const sendGeolocation = (message) => client.publish('geolocation', JSON.stringify({geolocation, message}));

	const geoLocationOptions = {
		enableHighAccuracy: true
	};

	client.on('connect', () => {
		navigator.geolocation.watchPosition(
			position => {
				const {latitude, longitude} = position.coords;
				geolocation = {latitude, longitude};
				sendGeolocation()
			},
			error => alert(error),
			geoLocationOptions
		);
		loaderBox.id = "connected";
		loadingText.innerHTML = "Enviando localização...";
	});
	client.on('error', error => alert(error));

	findButton.onclick = () => sendGeolocation(messageBox.value);
}