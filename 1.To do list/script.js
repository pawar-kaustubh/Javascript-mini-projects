document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateProgress();
  }
});

let tasks = [];
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
const addTask = () => {
  const inputTask = document.getElementById("inputTask");
  const text = inputTask.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    inputTask.value = ""; // Clear input field
    updateTasksList();
    updateProgress();
    saveTasks();
  } else {
    alert("Please enter a task!");
  }
};

const updateTasksList = () => {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          }>
          <p class= "${task.completed ? "completed" : ""}">${task.text}</p>
          <div class="icons">
            <img src="./img/edit.png" alt="Edit" onclick="editTask(${index})">
            <img src="./img/delete.png" alt="Delete" onclick="deleteTask(${index})">
          </div>
        </div>
      </div>
    `;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });

  updateProgress();
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  tasks.sort((a, b) => a.completed - b.completed);
  updateTasksList();
  updateProgress();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("inputTask");
  inputTask.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateProgress();
  saveTasks();
};

const updateProgress = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  document.getElementById(
    "number"
  ).innerText = `${completedTasks}/${totalTasks}`;
  const progressBar = document.querySelector(".progressBar .progress");
  progressBar.style.width = totalTasks
    ? `${(completedTasks / totalTasks) * 100}%`
    : "0%";
  if (completedTasks !== totalTasks) {
    document.getElementById("appreciate").innerText = "You can do it.";
  } else if (totalTasks != 0 && completedTasks === totalTasks) {
    console.log("Total Tasks:", totalTasks);
    document.getElementById("appreciate").innerText =
      "Congratulations!!!🥳🥳🥳";
    celebration();
  }
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
  saveTasks();
});

function createConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");

  // Resize canvas to cover the entire screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiParticles = [];

  // Generate confetti particles
  for (let i = 0; i < 300; i++) {
    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      velocityX: Math.random() * 2 - 1, // Random horizontal speed
      velocityY: Math.random() * 5 + 2, // Random vertical speed
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 5,
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    confettiParticles.forEach((particle, index) => {
      // Update particle position
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.rotation += particle.rotationSpeed;

      // Recycle confetti particles that fall off-screen
      if (particle.y > canvas.height) {
        confettiParticles[index].y = -particle.size;
        confettiParticles[index].x = Math.random() * canvas.width;
      }

      // Draw confetti
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;
      ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
      ctx.restore();
    });

    requestAnimationFrame(drawConfetti);
  }

  drawConfetti();

  // Automatically stop confetti after 5 seconds
  setTimeout(() => {
    confettiParticles.length = 0; // Clear particles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}

// Call this function when you want the confetti to appear
function celebration() {
  createConfetti();
}

// Example usage: Trigger celebration when all tasks are complete
document.addEventListener("DOMContentLoaded", () => {
  celebration();
});
