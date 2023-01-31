
loadTasks()
function loadTasks() {

    const tasksSortingStatus = localStorage.getItem("tasksSortingStatus");
    const loadObj = JSON.parse(tasksSortingStatus);
    if (loadObj === null || loadObj.option === "byOrder") {
        const allTasks = getFromStorage();
        display(allTasks);
    }

    else {
        const allTasks = getFromStorageByDate();
        display(allTasks);
    }
}

function addTask() {
    if (!validation()) return
    const newTask = getTask();
    const newDiv = document.createElement("div");
    newDiv.id = `pad${newTask.id}`;
    newDiv.innerHTML = `<p class="task">${newTask.task}</p>
    <p class="date">${newTask.date}</p>
    <p class="time">${newTask.time}</p>
    <button type="button" class="delete btn btn-lg" onclick="deleteMe(this)"><i class="bi bi-x-square-fill "></i></button>`;
    tasksSection.append(newDiv);
    const allTasks = getFromStorage();
    allTasks.push(newTask);
    saveToStorage(allTasks);
    clearForm()
}

function getTask() {
    const task = taskBox.value;
    let date = dateBox.value;
    date = new Date(date).toLocaleDateString()
    const time = timeBox.value
    let fullDateAndTime = dateBox.value // getting full date in order to sort tasks by dates // 
    fullDateAndTime = new Date(fullDateAndTime);
    fullDateAndTime.setHours(time.slice(0, 2));
    fullDateAndTime.setMinutes(time.slice(3, 5));

    let id;
    const allTasks = getFromStorage();
    if (allTasks.length === 0) id = 1;
    else id = allTasks[allTasks.length - 1].id + 1;
    const newTask = { id, task, date, time, fullDateAndTime };
    return newTask;
}


function validation() {
    const task = taskBox.value;
    const date = dateBox.value;
    const time = timeBox.value;
    const currentDateAndTime = new Date(); // creating current date and time variable to compare with user's date and time  //

    // creating full user's date and time variable to compare with current date and time //
    const fullUserDateAndTime = new Date(date);
    fullUserDateAndTime.setHours(time.slice(0, 2));
    fullUserDateAndTime.setMinutes(time.slice(3, 5));
    fullUserDateAndTime.setSeconds(currentDateAndTime.getSeconds()); // adding seconds just for comparison reasons // 

    if (task === "") {
        alert("Enter a Task");
        return;
    }
    if (date === "") {
        alert("Enter The Date For Completing The Task");
        return;
    }

    if (date.length !== 10) {
        alert("Enter A Valid Year, Year Must Be 4 Characters") // incase user enters year manually incorrectly //
        return;
    }

    if (time === "") {
        alert("Enter The Time For Completing The Task");
        return;
    }

    if (fullUserDateAndTime <= currentDateAndTime) {
        alert("Invalid Date Or Time, Enter Future Deadline For Task");
        return;
    }

    return true;

}

function clearForm() {
    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
}

function deleteMe(element) {
    const section = element.parentNode.parentNode
    const div = element.parentNode
    const padId = +div.id.slice(3);
    const allTasks = getFromStorage();
    const indexToDelete = allTasks.findIndex(p => p.id === padId);
    allTasks.splice(indexToDelete, 1);
    saveToStorage(allTasks);
    section.removeChild(div);
}

function getFromStorage() {
    const allTaskString = localStorage.getItem("My-Tasks");
    if (!allTaskString) {
        return [];
    }
    const allTasks = JSON.parse(allTaskString);
    return allTasks;
}

function getFromStorageByDate() {
    const allTasksString = localStorage.getItem("My-Aranged-Tasks");
    if (!allTasksString) {
        return []
    }
    const tasks = JSON.parse(allTasksString)
    return tasks
}

function saveToStorage(allTasks) {
    const string = JSON.stringify(allTasks)
    localStorage.setItem("My-Tasks", string)
}

function clearForm() {
    taskBox.value = ""
    dateBox.value = ""
    timeBox.value = ""

}

function arrangeByDate() {
    tasksSection.innerHTML = ""
    const allTasks = getFromStorage();

    const sortedTasks = allTasks.sort(function (a, b) {
        return new Date(a.fullDateAndTime) - new Date(b.fullDateAndTime);
    });

    const load = { option: "byDate" };
    const loadString = JSON.stringify(load);
    localStorage.setItem("tasksSortingStatus", loadString);
    display(sortedTasks);
}

function arrangeByOrder() {
    tasksSection.innerHTML = ""
    const allTasks = getFromStorage()
    const load = { option: "byOrder" }
    const loadString = JSON.stringify(load)
    localStorage.setItem("tasksSortingStatus", loadString)
    display(allTasks);
}

function display(allTasks) {
    let animationCounter = 1
    for (newTask of allTasks) {
        const newDiv = document.createElement("div");
        newDiv.id = `pad${newTask.id}`

        if (animationCounter === 1) {
            newDiv.style.animation = "left 3s";
            animationCounter++
        }
        else if (animationCounter === 2) {
            newDiv.style.animation = "top 3s";
            animationCounter++
        }

        else if (animationCounter === 3) {
            newDiv.style.animation = "bottom 3s";
            animationCounter++
        }

        else if (animationCounter === 4) {
            newDiv.style.animation = "right 3s";
            animationCounter++
            newDiv.allc
        }

        else if (animationCounter === 5) {
            newDiv.style.animation = "diagonalRight 3s";
            animationCounter++
            newDiv.allc
        }

        else {
            newDiv.style.animation = "diagonalLeft 3s";
            animationCounter = 1
            newDiv.allc
        }


        newDiv.innerHTML = `<p class="task">${newTask.task}</p>
        <p class="date">${newTask.date}</p>
        <p class="time">${newTask.time}</p>
        <button type="button" class="delete btn btn-lg" onclick="deleteMe(this)"><i class="bi bi-x-square-fill"></i></button>`;
        tasksSection.append(newDiv);
    }

}

function deleteAll() {

    const ok = confirm("Are You Sure You Want To Delete All Tasks? \nAll Tasks Will Get Lost With Out The Option To Retrace Back")
    if (!ok) return;
    tasksSection.innerHTML = "";
    allTaskString = JSON.stringify([]);

    localStorage.setItem("My-Tasks", allTaskString);
}


