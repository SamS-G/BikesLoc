/**
 * @constructor
 * @param{string} url - URL to the API to send the Ajax request -
 * @param{string} jsonCallback - Result returned for map markers in map.js -
 */

class AjaxRequest {
    constructor(url, jsonCallBack) {
        this.url = url;
        this.request = new XMLHttpRequest();
        this.json = jsonCallBack;
        this.query()
    }

    query() {
        this.request.open("GET", this.url, true);
        this.request.send(null);
        this.request.onload = () => {
            if (this.request.readyState === 4 && this.request.status === 200) {
                this.json(this.request.responseText);

            } else {
                alert("Erreur lors du chargement des données !");
            }
        };
    }
}




