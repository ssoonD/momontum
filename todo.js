const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos",
    DONES_LS = "dones";

let toDos = [],
    dones = [];

function deleteToDo(event, list) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}


function deleteDone(event) {
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);

    const cleanDones = dones.filter(function (done) {
        return done.id !== parseInt(li.id);
    });
    dones = cleanDones;
    saveDones();
}

function saveToDos() {
    // local storage에는 자바스크립트의 data를 저장할 수 없다. 
    // 오직 string만 저장할 수 있음
    // 그래서 toDos를 그냥 넣으면 Object로 들어감
    // JSON.stringify : 자바스크립트 Object를 string으로 바꿔준다. 
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveDones() {
    localStorage.setItem(DONES_LS, JSON.stringify(dones));
}

function toDoToDone(event) {
    const btn = event.target;
    const li = btn.parentNode;
    // 해당 event 삭제 
    deleteToDo(event);
    // 해당 event의 text를 done에 추가 
    paintDone(li.querySelector("span").innerText);
}

function doneToToDO() {
    const btn = event.target;
    const li = btn.parentNode;
    deleteDone(event);
    paintToDo(li.querySelector("span").innerText);
}

function paintToDo(text) {
    // 원하는 것을 생성 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    doneBtn.innerText = "⭕";
    doneBtn.addEventListener("click", toDoToDone)
    span.innerText = ` ${text} `;

    // appendChild : 선탣한 요소 안에 자식 요소를 추가  
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(doneBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintDone(text) {
    // 원하는 것을 생성 
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "✅";
    delBtn.addEventListener("click", deleteDone);
    backBtn.innerText = "🔙";
    backBtn.addEventListener("click", doneToToDO);
    span.innerText = ` ${text} `;

    // appendChild : 선탣한 요소 안에 자식 요소를 추가  
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(backBtn);
    li.id = newId;
    doneList.appendChild(li);

    const doneObj = {
        text: text,
        id: newId
    };
    dones.push(doneObj);
    saveDones();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // JSON.parse : string을 Object로 바꿔줌 
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
    const loadedDones = localStorage.getItem(DONES_LS);
    if (loadedDones !== null) {
        const parsedDones = JSON.parse(loadedDones);
        parsedDones.forEach(function (done) {
            paintDone(done.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();