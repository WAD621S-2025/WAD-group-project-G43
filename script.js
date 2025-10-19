
function updateClock() {
    const clockEl = document.getElementById("clock");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock(); 


const apiKey = "94a796d8bc18a80fc248d62f0e695860"; 
const city = "Windhoek, Namibia";
const weatherTempEl = document.getElementById("weather-temp");
const weatherDescEl = document.getElementById("weather-desc");
const weatherIconEl = document.getElementById("weather-icon");

async function fetchWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        weatherTempEl.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescEl.textContent = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } catch (error) {
        weatherDescEl.textContent = "Unable to load weather";
        console.error(error);
    }
}
fetchWeather();


async function loadHolidays() {
    const holidaysEl = document.getElementById("holidays");
    try {
        const response = await fetch("holidays.json");
        const holidays = await response.json();
        holidaysEl.innerHTML = ""; 
        holidays.forEach(holiday => {
            const li = document.createElement("li");
            li.textContent = `${holiday.date} - ${holiday.name}`;
            holidaysEl.appendChild(li);
        });
    } catch (error) {
        holidaysEl.innerHTML = "<li>Unable to load holidays</li>";
        console.error(error);
    }
}
loadHolidays();


function updateCountdown() {
    const countdownEl = document.getElementById("countdown");
    const now = new Date();
    const day = now.getDay(); 
    const daysUntilFriday = (5 - day + 7) % 7;
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(17, 0, 0, 0); 

    const diff = nextFriday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${days} days ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
setInterval(updateCountdown, 1000);
updateCountdown(); 
