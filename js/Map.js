/**
 *
 * @param {HTMLElement} divName - #Id of the <div> of you want to see your Map
 * @param {number} gps - Tab with the GPS coordinates of the City -
 * @param {number} zoom - Initial zoom for your Map -
 * @param {string} tileLayer - Link to your API -
 * @param {number} miniZoom - Value of minimum zooming -
 * @param {number} maxiZoom - Value of maximum zooming -
 */
class Map {

    constructor(divName, gps, zoom, tileLayer, miniZoom, maxiZoom) {
        this.divName = divName;
        this.gps = gps;
        this.zoom = zoom;
        this.tileLayer = tileLayer;
        this.miniZoom = miniZoom;
        this.maxiZoom = maxiZoom;
        this.mapIni();
        this.stationsMarking();
    }

    /**
     * @function mapIni - Creation a new city map and his map markers -
     */
    mapIni() {
        this.myMap = L.map(this.divName).setView(this.gps, this.zoom);
        L.tileLayer(this.tileLayer, {minZoom: this.miniZoom, maxZoom: this.maxiZoom}).addTo(this.myMap);
    }

    /**
     *
     * @param svg{string} svg - Path of icon marker -
     */
    createMarker(svg) {
        return new L.Icon({
            iconUrl: svg,
            iconSize: [38, 95],
            iconAnchor: [50, 64],
            popupAnchor: [22, 94],
        });
    };

    /**
     * @function stationsMarking - Create and place markers off bikes stations on the map -
     */
    stationsMarking() {
        new AjaxRequest("https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=f2a011d29345c131ae841fd31b44a0a5d9d103aa", stationsData => {
            this.stations = JSON.parse(stationsData);
            this.stations.forEach(station => {
                this.stationGps = [station.position.lat, station.position.lng];
                if (station.status === 'CLOSED' || station.available_bikes <= 0) {
                    $('#rent').css('display', 'none');
                    this.redIcon = this.createMarker('images/bike_red.svg');
                    this.stationMarker = L.marker(this.stationGps, {icon: this.redIcon}).addTo(this.myMap);

                } else if (station.status === 'OPEN' && (station.available_bikes <= 2 || station.available_stands <= 2)) {
                    this.orangeIcon = this.createMarker('images/bike_orange.svg');
                    this.stationMarker = L.marker(this.stationGps, {icon: this.orangeIcon}).addTo(this.myMap);

                } else {
                    this.greenIcon = this.createMarker('images/bike_green.svg');
                    this.stationMarker = L.marker(this.stationGps, {icon: this.greenIcon}).addTo(this.myMap);
                }

                /**
                 * @event {} - When clicking on marker, open window for station information.
                 */
                this.stationMarker.on('click', () => {
                    this.stationsNames = station.name;
                    this.stationsData = station;

                    if (station.status === 'CLOSED' || station.available_bikes === 0) {
                        this.stationsInfosDisplay();
                        $('#rent').css('display', 'none');
                        $('#rent_not_available').css('display', 'block');

                    } else {
                        this.stationsInfosDisplay();
                        $('#rent_not_available').css('display', 'none');
                        $('#rent').css('display', 'block');
                    }
                })
            })
        });
    }

    /**
     * @function stationsInfoDisplay - All station information needed to display on the window -
     */
    stationsInfosDisplay() {

        $('#station_informations').css({'display': 'block', 'listeStyle': 'none'});

        $('#name').html('<span>Nom de la station : </span>' + this.stationsData.name);

        $('#address').html('<span>Adresse : </span>  ' + this.stationsData.address);

        $('#bikes_available').html('<span>Nombre de vélos disponibles : </span>' + this.stationsData.available_bikes);

        $('#bikes_stands').html('<span>Nombre de places disponibles : </span>' + this.stationsData.available_bike_stands);

        if (this.stationsData.banking === true) {
            $('#card').attr('src', 'images/credit-card-accepted.svg');

        } else {
            $('#card').attr('src', 'images/credit-card-refused.svg');
        }

        if (this.stationsData.status === 'OPEN') {
            $('#status').html('<span>Station</span> OUVERTE.');

        } else {
            $('#status').html('<span>Station</span> FERMEE.');
        }
    }

    /**
     *
     * @returns {*} - Return station name to Reservation class
     */
    stationNameSend() {
        return this.stationsNames;
    }
}





