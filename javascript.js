/* jshint esversion:6 */
$(document).ready(function() {
    var wheaterEndpoint = "http://api.openweathermap.org/data/2.5/weather?";
    var apiKey = "388f93bdb20d412fc65f122e7f7dc729";
    var temperature = 'K'
    function setWeatherImg(id){

        switch(Number(id)){
            case 2:
                $(".thunder-storm").css("display", "inline-block");
                break;
            case 5:
                $(".rainy").css("display", "inline-block");
                break;
            case 6:
                $(".flurries").css("display", "inline-block");
                break;
            case 8:
                $(".cloudy").css("display", "inline-block");
                break;
            default:
                $(".sunny").css("display", "inline-block");
        }
    }

    function changeTempScale(e){
        var newTemp = $("#sptmp").text().replace(',','.').match(/[0-9]+.[0-9]+/)[0];
        newTemp = Number(newTemp);
        if (temperature === 'K'){
            temperature = 'C';
            $("#sptmp").text(`${Number(newTemp-273.15).toFixed(2)} ${temperature}`);
        }
        else {
            temperature = 'K';
            $("#sptmp").text(`${Number(newTemp+273.15).toFixed(3)} ${temperature}`);
        }
    }

    function setWheaterInfo(res){
        // the first number will be used to determined what kind of weather we should output
        var weatherPreffix = res.weather[0].id.toString()[0];
        setWeatherImg(weatherPreffix);
        $("#p-wtcity").text(`${res.name} current wheater`);
        $("#p-wtdesc").html(`${res.weather[0].main},
            <span id="sptmp">${res.main.temp} ${temperature}</span> <a id="btntemp" href="#">
            <i class="fa fa-thermometer-empty" aria-hidden="true"></i></a>`);
        $("#btntemp").on("click", changeTempScale);
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
