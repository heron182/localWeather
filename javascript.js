/* jshint esversion:6 */
$(document).ready(function() {
    var wheaterEndpoint = "http://api.openweathermap.org/data/2.5/weather?";
    var apiKey = "388f93bdb20d412fc65f122e7f7dc729";

    function setWheaterInfo(res){
        $("#p-wtcity").text(`${res.name} current wheater`);
        $("#p-wtdesc").html(`${res.weather[0].main},
            ${res.main.temp} <i class="fa fa-thermometer-empty" aria-hidden="true"></i>`);
    }
    $.geolocation.get()
        .done(pos => {
            var loc = {
                lat: pos.coords.latitude,
                long: pos.coords.longitude
            };
            wheaterEndpoint += `lat=${loc.lat}&lon=${loc.long}`;
            wheaterEndpoint += `&APPID=${apiKey}`;

            $.ajax({
                    url: wheaterEndpoint
                })
                .done(setWheaterInfo);

        })
        .fail(err => console.log(err));

});
