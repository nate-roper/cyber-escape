// Access the timer and progress bar elements
let timerElement = document.getElementById('timer');
let progressBarElement = document.getElementById('progress-bar');

// Function to format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateTimer() {
    elapsedTime += 1; // Increment elapsed time
    localStorage.setItem('elapsedTime', elapsedTime); // Save to local storage
    const timerElement = document.getElementById('timer'); // Find the timer element
    if (timerElement) {
        timerElement.textContent = `Time Elapsed: ${elapsedTime} seconds`; // Update the content
    }
}

setInterval(updateTimer, 1000); // Update the timer every second

// Timer logic
let elapsedTime = parseInt(localStorage.getItem('elapsedTime') || '0', 10);
let totalDuration = 300; // Example: Total duration for full progress is 5 minutes

// Start the timer if not already running
if (!localStorage.getItem('timerRunning')) {
    localStorage.setItem('timerRunning', 'true');
    setInterval(() => {
        elapsedTime += 1;
        localStorage.setItem('elapsedTime', elapsedTime.toString());
        
        // Update timer display
        if (timerElement) {
            timerElement.textContent = formatTime(elapsedTime);
        }

        // Update progress bar width
        if (progressBarElement) {
            let progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100);
            progressBarElement.style.width = `${progressPercentage}%`;
        }
    }, 1000);
}

// Display initial time and progress
if (timerElement) {
    timerElement.textContent = formatTime(elapsedTime);
}
if (progressBarElement) {
    let initialProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
    progressBarElement.style.width = `${initialProgress}%`;
}

