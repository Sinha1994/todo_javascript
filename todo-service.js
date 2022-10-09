let todoList = [];
let api = "https://api-nodejs-todolist.herokuapp.com/task";
function bindData() {
  let ulProgressElem = document.querySelector("ul.in-progress");
  let ulCompletedElem = document.querySelector("ul.completed");
  this.todoList.forEach((element) => {
    let listItem = document.createElement("li");
    listItem.textContent = element.description;
    let dateItem = document.createElement("p");
    dateItem.textContent = new Date(element.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    listItem.appendChild(dateItem);
    listItem.classList.add("listItem");
    listItem.setAttribute("ondragstart", "drag(event)");
    listItem.setAttribute("draggable", "true");
    listItem.setAttribute("id", element._id);
    if (element.completed) {
      ulCompletedElem.appendChild(listItem);
    } else {
      ulProgressElem.appendChild(listItem);
    }
  });
}
function getData() {
  fetch(`${api}?limit=10&skip=0`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNjN2U4NGNiYmU0NTAwMTc2MmI2NGIiLCJpYXQiOjE2NjQ5MDg5MzJ9.IgUDnYrUcR8QkHRfyGEGlSrQzTTC7c1R4QSxFrZ_XaU",
      Host: "api-nodejs-todolist.herokuapp.com",
    },
  })
    .then((res) => {
      res.json().then((list) => {
        this.todoList = list.data;
        this.bindData();
      });
    })
    .catch((err) => console.error(err));
}
function addTask(event) {
  let taskBody = {
    description: document.getElementById("task").value,
    completionDate: document.getElementById("completionDate").value,
    completed: false,
  };
  fetch(`${api}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNjN2U4NGNiYmU0NTAwMTc2MmI2NGIiLCJpYXQiOjE2NjQ5MDg5MzJ9.IgUDnYrUcR8QkHRfyGEGlSrQzTTC7c1R4QSxFrZ_XaU",
      Host: "api-nodejs-todolist.herokuapp.com",
    },
    body: JSON.stringify(taskBody),
  })
    .then((res) => document.querySelector("form").reset())
    .catch((err) => console.error(err));
}
function allowDrop(event) {
  event.preventDefault();
}
function drop(event) {
  event.preventDefault();
  let element = event.dataTransfer.getData("task");
  event.target.appendChild(document.getElementById(element));
}
function drag(event) {
  event.dataTransfer.setData("task", event.target.id);
}
window.onload = (evt) => this.getData();
