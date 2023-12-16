const inputBox = document.getElementById("username");
const listContainer = document.getElementById("task_list");
const userId = localStorage.getItem('userId');
const apiToPost = `https://65774405197926adf62dd78f.mockapi.io/api/vi/user/${userId}/tasks`;

let dataStructure = {
    userId: userId,
    title: null,
    completed: false,
}

console.log(`ID of user - ${localStorage.getItem('userId')}`)

function fillDataStructure(dataStructure, title, completed) {
    dataStructure.title = title;
    dataStructure.completed = completed;
    return dataStructure;
}

function clearDataStructure(dataStructure){
    dataStructure.title = null;
    dataStructure.completed = false
}

function addTask(event){
    if(inputBox.value !== ""){
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);


        let dataToSubmit = fillDataStructure(dataStructure, String(inputBox.value), false);
        console.log("Sending data ", dataToSubmit) 
        
        fetch(apiToPost, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSubmit)
          })
            .then(response => response.json())
            .then(data => li.id = data.id)
            .catch(error => console.error('Error:', error));

    }
    else {
        alert("You must write something!");
    }
    inputBox.value = "";
 };

 listContainer.addEventListener("click", async function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        
        async function changeCompletedStatus(target) {
            try {
                const response = await fetch(`https://65774405197926adf62dd78f.mockapi.io/api/vi/user/${userId}/tasks${target.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                const completedStatus = data.completed;

                console.log("info about GET", data);

    
                const responsePut = await fetch(`https://65774405197926adf62dd78f.mockapi.io/api/vi/user/${userId}/tasks${target.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !completedStatus })
                });

                if (!responsePut.ok) {
                    throw new Error(`Error: ${responsePut.status}`);
                }

                const dataPut = await responsePut.json();
                console.log("Info about PUT", dataPut);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        await changeCompletedStatus(e.target);
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        fetch(`https://65774405197926adf62dd78f.mockapi.io/api/vi/user/${userId}/tasks${e.target.parentElement.id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };
    
}, false);

function displayTasks() {
    const userId = localStorage.getItem('userId');
    const apiUrl = `https://65774405197926adf62dd78f.mockapi.io/api/vi/user/${userId}/tasks`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(tasks => {
            listContainer.innerHTML = ''; 

            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = task.title;
                li.id = task.id;
                if (task.completed) {
                    li.classList.add("checked");
                }

                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
                listContainer.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
}

window.onload = function () {
    const userId = localStorage.getItem('userId');

    if (userId) {
        console.log('User is logged in.');
        displayTasks();
    } else {
        console.log('User not logged in.');
    }
};