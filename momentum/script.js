//DOM Elements
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const quote = document.querySelector('.quote');
const button = document.querySelector('.refresh-quote');

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const feels = document.querySelector('.temperature-feels');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

//

// let day = 0, evening = 0, morning = 0, night = 0;
const week = ['Sunday', 'Monday', 'Thusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// const link = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=427dfe181598834fa6f0f50641863a4f&units=metric`


//Show time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  //let amPM = hour >= 12 ? 'PM' : 'AM';
  // return hour;
  //AM or PM

  //hour = hour % 12 || 12;
  // hour = 24;
  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

function addZero(num){
  return (parseInt(num, 10) < 10 ? '0' : '') + num;
}

function setDate(){
  let today = new Date();
  let day = today.getDay();
  let month = today.getMonth();
  let num = today.getDate();
  date.textContent = `${week[day]}, ${num} ${months[month].toLowerCase()}`;
}


function setBgGreet() {
  let today = new Date();
  let hours = today.getHours();
  let partOfDay;
  // hours = 7;
  if(hours > 6 && hours < 12){
    //Morning
    greeting.textContent = 'Good morning, ';
    partOfDay = 'morning';
    console.log(partOfDay);
    document.body.style.backgroundImage = `url('../assets/images/morning/03.jpg')`;
  }
  else if(hours > 12 && hours < 18){
    //Afternoon
    greeting.textContent = 'Good afternoon, ';
    partOfDay = 'day'; 
    console.log(partOfDay);
    document.body.style.backgroundImage = `url('../assets/images/day/03.jpg')`;
  }
  else if(hours > 18 && hours < 24){
    //Evening
    greeting.textContent = 'Good evening, ';
    partOfDay = 'evening';
    console.log(partOfDay);
    document.body.style.backgroundImage = `url('../assets/images/evening/03.jpg')`;
  }
  else{
    //Night
    greeting.textContent = 'Good night, ';
    partOfDay = 'night';
    console.log(partOfDay);
    document.body.style.color = 'white';
    document.body.style.backgroundImage = `url('../assets/images/night/03.jpg')`;
  }
}

function getImg(n){

}

function getName() {
  if(localStorage.getItem('name') === null){
    name.textContent = '[Enter Name]';
  }
  else{
    name.textContent = localStorage.getItem('name');
  }
}

function getFocus() {
  if(localStorage.getItem('focus') === null){
    focus.textContent = '[Enter Focus]';
  }
  else{
    focus.textContent = localStorage.getItem('focus');
  }
}

function setName(e){
  if(e.type === 'keypress'){
    if(e.wich == 13 || e.keyCode == 13){
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  }
  else{
    localStorage.setItem('name', e.target.innerText);
  }
}

function setFocus(e){
  if(e.type === 'keypress'){
    if(e.wich == 13 || e.keyCode == 13){
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  }
  else{
    localStorage.setItem('focus', e.target.innerText);
  }
}


//Получить цитату
async function getQuote() {  
  const url = `https://api.kanye.rest/`;
  const res = await fetch(url);
  const data = await res.json(); 
  quote.textContent = data.quote;
}

//weather
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=427dfe181598834fa6f0f50641863a4f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  wind.textContent = data.wind.speed.toFixed(1) + `m/s`;
  feels.textContent = `${data.main.feels_like.toFixed(0)}°C`;
  humidity.textContent = data.main.humidity;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
button.addEventListener('click', getQuote);


//Run
showTime();
setBgGreet();
getName();
getFocus();
setDate();
getQuote();
getWeather();