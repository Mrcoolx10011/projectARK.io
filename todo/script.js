const todovalue = document.getElementById("todoText");
const listItems = document.getElementById("List-item");
const addupdataclick = document.getElementById("addupdataclick")
AlertMessage=document.getElementById("AlertMessage");
let updataText;
let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

if (!todoData) {
    todoData = [];
}

todovalue.addEventListener('keypress', function (e) {
    setAlertMessage("");
    if (e.key == 'Enter') {
        addupdataclick.click();
    }
});

ReadToDoItems();

function ReadToDoItems() {
    console.log(todoData);
    todoData.forEach(element => {
        let li = document.createElement("li");
        let style = "";
        if (element.status) {
            style = 'style="text-decoration: line-through"';
        }
        const todoItem = `<div ${style} ondblclick="CompleteTodoItem(this)">${element.item} ${style === "" ? `<img class='edit todo-controls' onclick="UpdataToDoItems(this)" src="pen32.png"/>` : `<img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="waste.png"></img>`}</div>`;
        li.innerHTML = todoItem;
        listItems.appendChild(li);
    });
}

function createToDoData() {
    if (todovalue.value === "") {
        setAlertMessage("Please Enter Your todo text");
        todovalue.focus();
        return;
    }

    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompleteTodoItem(this)">${todovalue.value}</div><div><img class="todo-control" onclick="UpdataToDoItems(this)" src="pen32.png"/> <img class="delete todo-control" onclick="DeleteToDoItems(this)" src="waste.png"></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    let dataItem = { item: todovalue.value, status: false };
    todoData.push(dataItem);
    setlocalStorage();
    todovalue.value = "";
    setAlertMessage("Todo item Created successfully.")
}

function CompleteTodoItem(e) {
    if (e.style.textDecoration === "") {
        e.style.textDecoration = "line-through";
        let todoItemText = e.innerText.trim();
        e.parentElement.querySelector("img.edit").remove();
        todoData.forEach((element) => {
            if (element.item === todoItemText) {
                element.status = true;
            }
        });
        setlocalStorage();
    }
}

function UpdateOnSelectionItems() {
    
    todoData.forEach(element =>{
        if(element.item == updataText.innerHTML.trim()){
            element.item =todoData.value;
        }

    });
    setlocalStorage();
    todovalue.value ="";
}

function UpdataToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todovalue.value = e.parentElement.parentElement.querySelector("div").innerText;
        addupdataclick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addupdataclick.setAttribute("src", "refresh.png");
        updataText = e.parentElement.parentElement.querySelector("div");
    }
}

function DeleteToDoItems(e) {
    let deletevalue = e.parentElement.parentElement.querySelector("div").innerText.trim();
    if (confirm(`Are you sure?.Do You want to delete this ${deletevalue}!`)) {

        e.parentElement.parentElement.parentElement.querySelector("li").remove();
        e.parentElement.parentElement.setAttribute("class" ,"deleted-item")
        todovalue.focus();
        todoData.forEach((element)=>{
           if (element.item==deletevalue.trim()){
               todoData.splice(element,1);
           }
        });
        setlocalStorage();
    }
}

function setlocalStorage()
{
    localStorage.setItem("todoData", JSON.stringify(todoData));


}
function setAlertMessage(message){
    AlertMessage.removeAttribute("class");
    AlertMessage.innerText= message;
    setTimeout(()=>{
        AlertMessage.classList.add("toggleMe")

    }, 1000);

}