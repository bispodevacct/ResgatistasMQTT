class Geolocation {
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
        return this
    }
}

export default Geolocation;