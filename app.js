var events = [
  {
    time: "8:00AM",
    events: [],
  },
  {
    time: "9:00AM",
    events: [],
  },
  {
    time: "10:00AM",
    events: [],
  },
  {
    time: "11:00AM",
    events: [],
  },
  {
    time: "12:00PM",
    events: [],
  },
  {
    time: "1:00PM",
    events: [],
  },
  {
    time: "2:00PM",
    events: [],
  },
  {
    time: "3:00PM",
    events: [],
  },
  {
    time: "4:00PM",
    events: [],
  },
  {
    time: "5:00PM",
    events: [],
  },
  {
    time: "6:00PM",
    events: [],
  },
  {
    time: "7:00PM",
    events: [],
  },
  {
    time: "8:00PM",
    events: [],
  },
];

var getCurrentTime = setInterval(function () {
  // works
  var currentDay = moment();
  document.querySelector("#currentDay").innerHTML = currentDay.format(
    "dddd MMMM Do YYYY, h:mm:ss a"
  );
}, 1000);

var checkStorage = function () {
  if (window.localStorage.getItem("events").length === 0) {
    window.localStorage.removeItem("events");
    window.localStorage.setItem("events", JSON.stringify(events));
  }
  if (!window.localStorage.getItem("events")) {
    window.localStorage.setItem("events", JSON.stringify(events));
  }
};

document
  .querySelector(".hour-body")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      var eventObject = JSON.parse(window.localStorage.getItem("events"));
      console.log(eventObject);
      var tasks = eventObject[event.target.parentElement.dataset.time];
      console.log(tasks);
      tasks.push(event.target.textContent);
      window.localStorage.setItem("events", JSON.stringify(tasks));
    }
  });

var colorHours = function () {
  var now = moment();
  var textBox = document.querySelector(".hour-body");
  document.querySelectorAll(".hour").forEach(function (hour) {
    if (now.valueOf() < moment(hour.dataset.time).valueOf()) {
      textBox.classList.add("future");
    }
    if (now.valueOf() === moment(hour.dataset.time).valueOf()) {
      textBox.classList.add("present");
    }
    if (now.valueOf() > moment(hour.dataset.time).valueOf()) {
      textBox.classList.add("past");
    }
  });
};

$(".hour").on("click", function (event) {
  var modal = document.querySelector(".modal");
  if (event.target.classList.contains("display-events")) {
    modal.style.display = "block";
    var eventObject = JSON.parse(window.localStorage.getItem("scores"));
    var tasks = eventObject[event.target.parentElement.dataset.time];
    tasks.forEach(function (task) {
      var eventEl = document.createElement("div");
      eventEl.textContent = task;
      document.querySelector(".modal-content").appendChild(eventEl);
    });
  }
});

colorHours();
checkStorage();
