document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks) {
        storedTasks.forEach(task => tasks.push(task));
    }

    updateTask();
    updateStats();
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

        if(text) {
            tasks.push({text: text, completed: false});

            updateTask();
            updateStats();
            saveTasks();

            taskInput.value = "";
           
        }   
        
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    updateTask();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);

    updateTask();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTask();
    updateStats();
    saveTasks();
}


// const updateStats = () => {
//     const completeTasks = tasks.filter(task => task.completed).length;
//     const totalTasks = tasks.length;
//     const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
//     const progressBar = document.getElementById("progressBar");

//     if (progressBar) {
//         progressBar.style.width = `${progress}%`;
//     } else {
//         console.error("Progress bar element not found!");
//     }
// };
 
const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks)*100
    const progressBar = document.getElementById("progressBar");

    progressBar.style.width = `${progress}%`

    document.getElementById("numbers").innerHTML = `${completeTasks} / ${totalTasks}`

    if(tasks.length && completeTasks === totalTasks) {
        fireZee();
    }
}

const updateTask = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class= "taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${ task.completed? "checked" : "" }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./assets/images/checked.jpg" onclick="editTask(${index})"/>
                <img src="./assets/images/delete.jpg"  onclick="deleteTask(${index})" />
            </div>
        </div>`;
        
        const checkbox = listItem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            toggleTaskComplete(index);
        });
        // listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();

    addTask();
})

const fireZee = () => {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}