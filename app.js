var events = {
    "8:00AM": [],
    "9:00AM": [],
    "10:00AM": [],
    "11:00AM": [],
    "12:00PM": [],
    "1:00PM": [],
    "2:00PM": [],
    "3:00PM": [],
    "4:00PM": [],
    "5:00PM": [],
    "6:00PM": [],
    "7:00PM": [],
    "8:00AM": []
}

var getCurrentTime = setInterval(function(){
    var currentDay = moment();
    document.querySelector("#currentDay").innerHTML = currentDay.format('dddd MMMM Do YYYY, h:mm:ss a')
}, 1000)


var checkStorage = function(){
    if (!window.localStorage.getItem('events')) {
        window.localStorage.clear();
        window.localStorage.setItem('events', JSON.stringify(events))
    }
}

var colorHours = function(){
    var now = moment();
    var textBox = document.querySelector(".hour-body")
    document.querySelectorAll('.hour').forEach(function(hour) {
        if (now.isBefore(moment(hour.dataset.time))) {textBox.classList.add("future")}
        if (now === moment(hour.dataset.time)) {textBox.classList.add("present")}
        if (now.isAfter(moment(hour.dataset.time))) {textBox.classList.add("past")}
    })
}

document.querySelector('.hour-body').addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        var eventObject = JSON.parse(window.localStorage.getItem('events')) // returns undefined
        var tasks = eventObject[event.target.parentElement.dataset.time];
        tasks.push(event.target.textContent);
        window.localStorage.setItem('events', JSON.stringify(timeObject));
        textbox.textContent = "";
    }
})

$('.hour').on('click', function(event){
    var modal = document.querySelector('.modal');
    if (event.target.classList.contains("display-events")) {
        modal.style.display = "block";
        var eventObject = JSON.parse(window.localStorage.getItem('scores'))
        var tasks = eventObject[event.target.parentElement.dataset.time];
        tasks.forEach(function(task){
            var eventEl = document.createElement('div');
            eventEl.textContent = task;
            document.querySelector('.modal-content').appendChild(eventEl);
        })
    }
})

colorHours();
checkStorage();