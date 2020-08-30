const COORDS = 'coords';
// API (Application Programming Interface) : 다른 서버로부터 손쉽게 데이터를 가져올 수 있는 수단 
// 오직 데이터만 가져 온다. 
const API_KEY = "b6ea035eb7b70d332129f6211d75bcb4";
const weather = document.querySelector(".js-weather");

// 자바스크립트는 웹사이트로 Request를 보내고 응답을 통해 데이터를 얻을 수 있는데 
// 가져온 데이터를 Refresh 없이도 나의 웹사이트에 적용시킬 수 있다. 
// ex) 이메일을 확인할 때 웹사이트를 새로고침하지 않아도 실시간으로 메일이 오는 것을 확인할 수 있는 이유 
// 왜냐하면 자바스크립트가 보이지 않는 곳에서 계속 데이터를 가져오고 있기 때문에 

// 데이터를 얻는 방법
// fetch 사용
// fetch()안에는 가져올 데이터가 들어가면 된다. 
// then 사용
// 데이터가 우리한테 넘어왔을 때 사용 (fetch를 기다린다)
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            // console.log(json);
            const temp = json.main.temp;
            const place = json.name;

            weather.innerText = `${temp}°C @${place}`
        })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
        // object의 key와 value가 동일할 때 이렇게 정의 
        lat,
        lon
    };

    saveCoords(coordsObj);
    getWeather(lat, lon);
}

function handleGeoError() {
    console.log('Can\'t access GEO!');
}

function askForCoords() {
    // 첫 번째 파라미터 : 좌표를 가져오는데 성공했을 때를 처리하는 함수 
    // 두 번째 파라미터 : 좌표를 가져오는데 실패했을 때를 처리하는 함수 
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.lat, parseCoords.lon);
    }
}

function init() {
    loadCoords();
}

init();