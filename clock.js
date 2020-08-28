const clockContainer = document.querySelector(".js-clock"),
    clockTilte = clockContainer.querySelector(".js-title");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTilte.innerText = `${makeTime(hours)}:${makeTime(minutes)}:${makeTime(seconds)}`;
}

// 시간 앞에 0을 붙여주는 함수 
function makeTime(time) {
    return time < 10 ? `0${time}` : time;
}

function init() {
    getTime();
    /*
    setInterval() ->
    두 개의 인자를 받는데
    첫 뻔쨰 인자로 실행할 함수를 받고
    두 번쨰 인자로 그 함수를 실행할 시간 간격을 받는다
    */
    setInterval(getTime, 1000);
}

init();