const submitBtn = document.querySelector("form");
const todo = document.getElementById("todo");
const list = document.querySelector("ul");
const eachList = document.getElementsByTagName("li");
const deleteAllBtn = document.getElementById("deleteAll");
const close = document.getElementsByClassName("close");
const dueDate = document.getElementById("dueDate");

let todos = [];

submitBtn.addEventListener("click", submitClicked);
deleteAllBtn.addEventListener("click", clearAllEvents);
list.addEventListener("click", doneClearEvents);

function submitClicked(e) {
  e.preventDefault();
  addEvents(todo.value, dueDate.value);
}

function addEvents(item, dueDate) {
  //date validation//
  let dueDateChecked = false;
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();

    let todayChecked = false;

  let dueDateArr = dueDate.split("-");
  if (dueDateArr[0] > year) {
    dueDateChecked = true;
  } else if (dueDateArr[0] == year && dueDateArr[1] > month) {
    dueDateChecked = true;
  } else if (
    dueDateArr[0] == year &&
    dueDateArr[1] == month &&
    dueDateArr[2] > date
  ) {
    dueDateChecked = true;
  }
  else if (dueDateArr[0] == year && dueDateArr[1] == month && dueDateArr[2] == date){
    dueDateChecked = true;
    todayChecked = true;
  } 
  else {
    dueDateChecked = false;
  }

  //Express date in clean manner
  if(dueDateArr[1] < 10){
      switch(dueDateArr[1]){
          case '01':
            dueDateArr[1] = 1;
              break;
          case '02':
            dueDateArr[1] = 2;
              break;
          case '03':
            dueDateArr[1] = 3;
              break;
          case '04':
            dueDateArr[1] = 4;
              break;
          case '05':
            dueDateArr[1] = 5;
              break;
          case '06':
            dueDateArr[1] = 6;
              break;
          case '07':
            dueDateArr[1] = 7;
              break;
          case '08':
            dueDateArr[1] = 8;
              break;
          case '09':
            dueDateArr[1] = 9;
              break;
      }
  }
  if (dueDateArr[2]<10){
      switch(dueDateArr[2]){
          case '01':
            dueDateArr[2] = 1;
              break;
          case '02':
            dueDateArr[2] = 2;
              break;
          case '03':
            dueDateArr[2] = 3;
              break;
          case '04':
            dueDateArr[2] = 4;
              break;
          case '05':
            dueDateArr[2] = 5;
              break;
          case '06':
            dueDateArr[2] = 6;
              break;
          case '07':
            dueDateArr[2] = 7;
              break;
          case '08':
            dueDateArr[2] = 8;
              break;
          case '09':
            dueDateArr[2] = 9;
              break;
      }
  }
  let cleanDate = `${dueDateArr[0]}-${dueDateArr[1]}-${dueDateArr[2]}`

  //add to-do
  if (item != "" && dueDateChecked && !todayChecked) {
    let todo = {
      name: item,
      due: cleanDate,
      id: Date.now(),
      done: false,
      dueToday: false
    };

    todos.push(todo);
    addToLocalStorage(todos);
  }
  else if (item != "" && dueDateChecked && todayChecked) {
    let todo = {
      name: item,
      due: cleanDate,
      id: Date.now(),
      done: false,
      dueToday: true
    };

    todos.push(todo);
    addToLocalStorage(todos);
    dateChecker(todos);
  }
}


function renderEvents(todos) {
  todo.value = "";
  dueDate.value = "";
  let ul = document.querySelector("ul");

  ul.innerHTML = "";

  todos.forEach(function (item) {
    let list = document.createElement("li");
    list.setAttribute("id", item.id);
    list.setAttribute('class', "list");
    list.setAttribute("dueToday", item.dueToday);
    list.innerHTML = `${item.name}<span class='close'>\u00D7</span><strong class='dates'>  ${item.due}</strong>`;
    ul.appendChild(list);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  renderEvents(todos);
}

function getFromLocalStorage() {
  let reference = localStorage.getItem("todos");
  if (reference) {
    todos = JSON.parse(reference);
    renderEvents(todos);
    dateChecker(todos);
  }
}

getFromLocalStorage();


function dateChecker(todos){
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let year = today.getFullYear();
    let todayDate = `${year}-${month}-${date}`;

    todos.forEach(function(item) {
        if(item.due === todayDate){
            item.dueToday = true;
        }
    })
    addToLocalStorage(todos);
    checkDueToday();
}

function checkDueToday(){
    for (let i = 0; i < eachList.length; i++){
        if (eachList[i].getAttribute("dueToday") == "true") {
            eachList[i].style.backgroundColor = '#e95d5d';
        } else if (eachList[i].getAttribute("dueToday") == "false") {
        eachList[i].style.backgroundColor = "#fff";
        }
    }
}


function doneClearEvents(e) {
  if (e.target.className == "close") {
    deleteEvents(e.target.parentElement.getAttribute("id"));
  } 
}


function deleteEvents(id) {
  let newTodos = [];
  todos.forEach(function (item) {
    if (id != item.id) {
      newTodos.push(item);
    }
    todos = [...newTodos];
  });
  addToLocalStorage(todos);
}

function clearAllEvents() {
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  let ul = document.querySelector("ul");
  removeAllChildNodes(ul);
}

//Display time//
window.onload = function () {
  let target = document.getElementById("time");
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();

  let writtenMonth = "";
  switch (month) {
    case 1:
      writtenMonth = "January";
      break;
    case 2:
      writtenMonth = "February";
      break;
    case 3:
      writtenMonth = "March";
      break;
    case 4:
      writtenMonth = "April";
      break;
    case 5:
      writtenMonth = "May";
      break;
    case 6:
      writtenMonth = "June";
      break;
    case 7:
      writtenMonth = "July";
      break;
    case 8:
      writtenMonth = "August";
      break;
    case 9:
      writtenMonth = "September";
      break;
    case 10:
      writtenMonth = "Ocotber";
      break;
    case 11:
      writtenMonth = "November";
      break;
    case 12:
      writtenMonth = "December";
      break;
  }

  let writtenDay = "";
  switch (day) {
    case 0:
      writtenDay = "Sunday";
      break;
    case 1:
      writtenDay = "Monday";
      break;
    case 2:
      writtenDay = "Tuesday";
      break;
    case 3:
      writtenDay = "Wednesday";
      break;
    case 4:
      writtenDay = "Thursday";
      break;
    case 5:
      writtenDay = "Friday";
      break;
    case 6:
      writtenDay = "Saturday";
      break;
  }

  target.innerHTML = `${writtenMonth} ${date}, ${writtenDay}`;
  
};
