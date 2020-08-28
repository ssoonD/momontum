const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-doneList");

const TODOS_LS = "toDos",
    DONES_LS = "dones";

const data = {
    toDos: [],
    dones: []
}

function itemDeleteFactory(domList, key) {
    function deleteItem(event) {
        const btn = event.target;
        const li = btn.parentNode;
        domList.removeChild(li);

        data[key] = data[key].filter(function (item) {
            return item.id !== parseInt(li.id);
        });
        itemSaveFactory(key)();
    }

    return deleteItem;
}

function itemSaveFactory(key) {
    function saveItem() {
        // local storage에는 자바스크립트의 data를 저장할 수 없다. 
        // 오직 string만 저장할 수 있음
        // 그래서 toDos를 그냥 넣으면 Object로 들어감
        // JSON.stringify : 자바스크립트 Object를 string으로 바꿔준다. 
        localStorage.setItem(key, JSON.stringify(data[key]));
    }

    return saveItem;
}

function itemChangeFactory(domList, changeList, key, changekey) {
    function changeItem(event) {
        const btn = event.target;
        const li = btn.parentNode;
        // 해당 event 삭제 
        itemDeleteFactory(domList, key)(event);
        // 해당 event의 text를 done에 추가 
        itemPaintFactory(changeList, changekey)(li.querySelector("span").innerText);
    }

    return changeItem;
}

function itemPaintFactory(domList, key) {
    function paintItem(text) {
        // 원하는 것을 생성 
        const li = document.createElement("li");
        const delBtn = document.createElement("button");
        const doneBtn = document.createElement("button");
        const span = document.createElement("span");
        const newId = data[key].length + 1;

        if (key === TODOS_LS) {
            delBtn.innerText = "❌";
            delBtn.addEventListener("click", itemDeleteFactory(domList, key));
            doneBtn.innerText = "⭕";
            doneBtn.addEventListener("click", itemChangeFactory(domList, doneList, key, DONES_LS));
        } else {
            delBtn.innerText = "✅";
            delBtn.addEventListener("click", itemDeleteFactory(domList, key));
            doneBtn.innerText = "🔙";
            doneBtn.addEventListener("click", itemChangeFactory(domList, toDoList, key, TODOS_LS));
        }
        span.innerText = ` ${text} `;

        // appendChild : 선탣한 요소 안에 자식 요소를 추가  
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(doneBtn);
        li.id = newId;
        domList.appendChild(li);

        const itemObj = {
            text: text,
            id: newId
        };
        data[key].push(itemObj);
        itemSaveFactory(key)();
    }

    return paintItem;
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    itemPaintFactory(toDoList, TODOS_LS)(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // JSON.parse : string을 Object로 바꿔줌 
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            itemPaintFactory(toDoList, TODOS_LS)(toDo.text);
        });
    }
    const loadedDones = localStorage.getItem(DONES_LS);
    if (loadedDones !== null) {
        const parsedDones = JSON.parse(loadedDones);
        parsedDones.forEach(function (done) {
            itemPaintFactory(doneList, DONES_LS)(done.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();