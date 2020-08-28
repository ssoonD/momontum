const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
//querySelector : 찾은 첫 번째 요소만 가져옴
//querySelectorAll : 찾은 모든 것을 array로 반환 -> 귀찮음 
// 둘다 HTML에서 필요한 것들을 얻었다는 뜻 

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    // localStorage : 정보를 유저 컴퓨터에 저장하는 방법 
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // 이벤트 전파 중단 
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    // 특정 이벤트 발생 시 특정 함수 실행 
    // 만약 ()를 사용한다면 그 함수가 바로 실행된다 .
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    // hiding form 
    form.classList.remove(SHOWING_CN);
    // adding greeting 
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text} 🤗`;
    // https://velog.io/@rimu/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-classList.add-remove-contains-toggle
}

// currentUser 삭제 
function removeName() {
    // hiding greeting
    greeting.classList.remove(SHOWING_CN);
    localStorage.removeItem(USER_LS);
    // adding form
    form.classList.add(SHOWING_CN);
    input.value = "";
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
    // greeting click하면 삭제 
    greeting.addEventListener("click", removeName);
}

function init() {
    loadName();
}

init();

// 기능 추가 -> 로그아웃  