class Place {
    constructor(title, imageURI, address, location) {
        this.title = title
        this.imageURI = imageURI
        this.address = address
        this.location = location; // (lat:0.023230, log: 0.221100)
        this.id = new Date().toString() + Math.random().toString();
    }
}