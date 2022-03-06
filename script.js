const doc = document.documentElement;
const body = document.body;
//tasks
const taskContainer = document.querySelector(".task-container");
const input = document.querySelector(".input");
const newTaskInput = document.querySelector(".new-entry");
//Light/Night mode
let isDark = true;
const mediaQuery = window.matchMedia("(min-width: 600px)");
const sunBtn = document.querySelector(".sun-btn");
const moonBtn = document.querySelector(".moon-btn");
//Status buttons
const rowBot = document.querySelector(".row-bottom");
const rowBotOuter = document.querySelector(".state-tab-outer");
const stateTab = document.querySelector(".state-tab-inner");
const stateBtns = document.querySelectorAll(".state-btn");
const ongoing = document.querySelector(".ongoing");
const completed = document.querySelector(".completed");
const all = document.querySelector(".all");
const clearBtn = document.querySelector(".clear-completed");
//Outer buttons
const stateTabOuter = document.querySelector(".state-tab-outer");
const stateBtnsOuter = document.querySelectorAll(".state-btn-outer");
const ongoingOuter = document.querySelector(".ongoing-outer");
const completedOuter = document.querySelector(".completed-outer");
const allOuter = document.querySelector(".all-outer");
//count
let count = 0;
const itemCount = document.querySelector(".item-count");

//functions

function hideTasks(tasks) {
  tasks.forEach((row) => {
    row.closest(".row-task").style.display = "none";
  });
}

function showTasks(tasks) {
  tasks.forEach((row) => {
    row.closest(".row-task").style.display = "flex";
  });
}

function toggleBackground() {
  const rows = document.querySelectorAll(".row");
  for (let i = 0; i < rows.length - 2; i++) {
    rows[i].classList.toggle("white-theme");
  }
  rows[rows.length - 2].classList.toggle("bg-white");
  rows[rows.length - 1].classList.toggle("bg-white");
}

//Selecting input
newTaskInput.addEventListener("click", function () {
  if (isDark) {
    input.style.outline = "2px solid white";
  } else {
    input.style.outline = "2px solid black";
  }
});

doc.addEventListener("click", function (e) {
  if (e.target === newTaskInput) {
    return null;
  }
  input.style.outline = "none";
});

//Adding new task
newTaskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let newTask;
    if (isDark) {
      newTask = `
    <div class="row row-task">
      <button class="btn btn-tasks"></button>
      <div class="new-entry">
      ${newTaskInput.value}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="hidden cross-btn"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </div>`;
    } else {
      newTask = `
      <div class="row row-task white-theme">
        <button class="btn btn-tasks"></button>
        <div class="new-entry">
        ${newTaskInput.value}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" class="hidden cross-btn"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
      </div>`;
    }
    taskContainer.insertAdjacentHTML("afterbegin", newTask);
    newTaskInput.value = "";
    count++;
    itemCount.textContent = `${count}`;
  }
});
//Handling check buttons
taskContainer.addEventListener("click", function (e) {
  const btn = e.target.classList;
  const textbox = e.target.nextElementSibling;
  if (btn.contains("btn")) {
    if (!btn.contains("task-btn")) {
      btn.add("task-btn");
      textbox.classList.add("active-task");
    } else {
      btn.remove("task-btn");
      textbox.classList.remove("active-task");
    }
  }
});
//Handling hover
//For cancellation of tasks
taskContainer.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("row-bottom")) return;
  const crossBtn = e.target.closest(".row-task").children[2];
  console.log(crossBtn);
  crossBtn.classList.remove("hidden");
});

//For status hovering
rowBot.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("state-btn")) return;
  const stateBtn = e.target;
  if (isDark) {
    stateBtn.classList.add("dark-hover");
  } else {
    stateBtn.classList.add("light-hover");
  }
});

rowBot.addEventListener("mouseout", function (e) {
  if (!e.target.classList.contains("state-btn")) return;
  const stateBtn = e.target;
  stateBtn.classList.remove("dark-hover");
  stateBtn.classList.remove("light-hover");
});

rowBotOuter.addEventListener("mouseover", function (e) {
  if (!e.target.classList.contains("state-btn-outer")) return;
  const stateBtn = e.target;
  if (isDark) {
    stateBtn.classList.add("dark-hover");
  } else {
    stateBtn.classList.add("light-hover");
  }
});

rowBotOuter.addEventListener("mouseout", function (e) {
  if (!e.target.classList.contains("state-btn-outer")) return;
  const stateBtn = e.target;
  stateBtn.classList.remove("dark-hover");
  stateBtn.classList.remove("light-hover");
});

taskContainer.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("row-bottom")) return;
  const crossBtn = e.target.closest(".row-task").children[2];
  console.log(crossBtn);
  crossBtn.classList.add("hidden");
});

//Handling cross btn click
taskContainer.addEventListener("click", function (e) {
  console.log(e.target);
  if (!e.target.classList.contains("cross-btn")) return;
  const crossBtn = e.target;
  crossBtn.closest(".row-task").remove();
  count--;
  itemCount.textContent = `${count}`;
});

//Handling dark to light mode
sunBtn.addEventListener("click", function () {
  isDark = false;
  sunBtn.style.display = "none";
  moonBtn.style.display = "inline";
  toggleBackground();
  body.style.backgroundColor = "hsl(var(--light-grayish-blue-hover))";
  newTaskInput.style.color = "black";
  if (mediaQuery.matches) {
    body.style.backgroundImage = "url(./images/bg-desktop-light.jpg)";
  } else {
    body.style.backgroundImage = "url(./images/bg-mobile-light.jpg)";
  }
});

moonBtn.addEventListener("click", function () {
  isDark = true;
  sunBtn.style.display = "inline";
  moonBtn.style.display = "none";
  toggleBackground();
  body.style.backgroundColor = "hsl(var(--very-dark-blue))";
  newTaskInput.style.color = "white";
  if (mediaQuery.matches) {
    body.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)";
  } else {
    body.style.backgroundImage = "url(./images/bg-mobile-dark.jpg)";
  }
});

mediaQuery.onchange = function (e) {
  if (!isDark) {
    if (e.matches) {
      body.style.backgroundImage = "url(./images/bg-desktop-light.jpg)";
    } else {
      body.style.backgroundImage = "url(./images/bg-mobile-light.jpg)";
    }
  }
  if (isDark) {
    if (e.matches) {
      body.style.backgroundImage = "url(./images/bg-desktop-dark.jpg)";
    } else {
      body.style.backgroundImage = "url(./images/bg-mobile-dark.jpg)";
    }
  }
};
//Sort by status
stateTab.addEventListener("click", function (e) {
  if (e.target === stateTab) return;
  stateBtns.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");
});

ongoing.addEventListener("click", function () {
  const completedTasks = document.querySelectorAll(".task-btn");
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  hideTasks(completedTasks);
  showTasks(ongoingTasks);
});

completed.addEventListener("click", function () {
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  const completedTasks = document.querySelectorAll(".task-btn");
  hideTasks(ongoingTasks);
  showTasks(completedTasks);
});

all.addEventListener("click", function () {
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  const completedTasks = document.querySelectorAll(".task-btn");
  showTasks(ongoingTasks);
  showTasks(completedTasks);
});

clearBtn.addEventListener("click", function () {
  const completedTasks = document.querySelectorAll(".task-btn");
  count -= completedTasks.length;
  itemCount.textContent = `${count}`;
  completedTasks.forEach((task) => task.closest(".row-task").remove());
});

//outer tab

ongoingOuter.addEventListener("click", function () {
  const completedTasks = document.querySelectorAll(".task-btn");
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  hideTasks(completedTasks);
  showTasks(ongoingTasks);
});

completedOuter.addEventListener("click", function () {
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  const completedTasks = document.querySelectorAll(".task-btn");
  hideTasks(ongoingTasks);
  showTasks(completedTasks);
});

allOuter.addEventListener("click", function () {
  const ongoingTasks = document.querySelectorAll(".btn-tasks:not(.task-btn)");
  const completedTasks = document.querySelectorAll(".task-btn");
  showTasks(ongoingTasks);
  showTasks(completedTasks);
});

stateTabOuter.addEventListener("click", function (e) {
  if (e.target === stateTabOuter) return;
  stateBtnsOuter.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active");
});
