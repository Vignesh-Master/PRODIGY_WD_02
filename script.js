let isRunning = false;
let startTime = 0;
let lapTimes = [];

const stopwatchDisplay = document.getElementById("stopwatch");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapTimesList = document.getElementById("lapTimes");

function updateStopwatch() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const formattedTime = new Date(elapsedTime).toISOString().substr(11, 8);
    stopwatchDisplay.textContent = formattedTime;
}

function startStop() {
    if (isRunning) {
        clearInterval(intervalID);
        startStopButton.textContent = "Start";
    } else {
        startTime = Date.now() - (startTime ? startTime : 0);
        intervalID = setInterval(updateStopwatch, 10);
        startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(intervalID);
    isRunning = false;
    stopwatchDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
    startTime = 0;
    lapTimes = [];
    lapTimesList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        lapTimes.push(stopwatchDisplay.textContent);
        const lapItem = document.createElement("li");
        lapItem.textContent = stopwatchDisplay.textContent;
        lapTimesList.appendChild(lapItem);
    }
}

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

let intervalID;
