const inputBox = document.getElementById("input-box");
const list = document.getElementById("list");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

list.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false)

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}
function showTask(){
    list.innerHTML = localStorage.getItem("data");
}

showTask();

// Получение списка задач
fetch('https://mockapi.io/clone/656eb2056529ec1c62367e28')
  .then(response => response.json())
  .then(data => {
    // Обработка данных
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");
  
    fetch('https://mockapi.io/clone/656eb2056529ec1c62367e28')
      .then(response => response.json())
      .then(tasks => {
        tasks.forEach(task => {
          const li = document.createElement("li");
          li.textContent = task.title;
          taskList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  