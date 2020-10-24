//DOM Elements
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const quote = document.querySelector('.quote');
const button = document.querySelector('.refresh-quote');
const next = document.querySelector('.next');
const bg = document.createElement('img');
const body = document.querySelector('body');

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const feels = document.querySelector('.temperature-feels');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

//TODO: Доделать текст при наборе, дезигн

// let day = 0, evening = 0, morning = 0, night = 0;
const week = ['Sunday', 'Monday', 'Thusday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let img = [];
let iter = 0;
let prevHour;
let pressed = true;

//Show time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  //test for bci
  if(prevHour !== hour){
    prevHour = hour;
    if(iter < img.length){
      iter += 1;
    }
    else{
      iter = 1;
    }
    setBgGreet();
  }
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
  let hours = new Date().getHours();
  bg.src = img[hours];
  bg.onload = () => {
    body.style.backgroundImage = `url(${bg.src})`;
  }
  if(hours >= 6 && hours < 12){
    //Morning
    greeting.textContent = 'Good morning, ';
  }
  else if(hours >= 12 && hours < 18){
    //Afternoon
    greeting.textContent = 'Good afternoon, ';
  }
  else if(hours >= 18 && hours < 24){
    //Evening
    greeting.textContent = 'Good evening, ';
  }
  else{
    //Night
    greeting.textContent = 'Good night, ';
  }
}

function fillArray(){
  for(let i = 0; i < 24; i++){
    img[i] = Math.floor(1 + Math.random() * (19 + 1 - 1));
  }
  img = img.map((item, i) => {
    if(i >= 6 && i < 12){
      return `/assets/images/morning/${addZero(img[i])}.jpg`
    }
    else if (i >= 12 && i < 18){
      return `/assets/images/day/${addZero(img[i])}.jpg`
    }
    else if(i >= 18 && i < 24){
      return `/assets/images/evening/${addZero(img[i])}.jpg`
    }
    else{
      return `/assets/images/night/${addZero(img[i])}.jpg`
    }
  });
  prevHour = new Date().getHours();
  // prevHour = new Date().getMinutes();
  iter = prevHour;
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

function setName(event){
  if(event.type === 'keypress'){
    if(pressed){
      event.target.innerText = '';
      pressed = false;
    }
  }
  if (event.code === 'Enter') {
    name.blur();
  }
  if(event.type === 'blur'){
    pressed = true;
    if(event.target.innerText !== ''){
      localStorage.setItem('name', event.target.innerText);
    }
    else{
      name.textContent = localStorage.name;
    }
  }
  if(event.type === 'click'){
    localStorage.setItem('name', event.target.innerText);
    event.target.innerText = '';
  }
}

function setFocus(event){
  if(event.type === 'keypress'){
    if(pressed){
      event.target.innerText = '';
      pressed = false;
    }
  }
  if (event.code === 'Enter') {
    focus.blur();
  }
  if(event.type === 'blur'){
    pressed = true;
    if(event.target.innerText !== ''){
      localStorage.setItem('focus', event.target.innerText);
    }
    else{
      focus.textContent = localStorage.focus;
    }
  }
  if(event.type === 'click'){
    localStorage.setItem('focus', event.target.innerText);
    event.target.innerText = '';
  }
}

function nextImage(){
  next.disabled = true;
  if(iter < img.length-1){
    iter += 1;
  }
  else{
    iter = 0;
  }
  bg.src = img[iter];
  bg.onload = () => {
    body.style.backgroundImage = `url(${bg.src})`;
    setTimeout(function() { next.disabled = false }, 1000);
  }
}

//Получить цитату
async function getQuote() {  
  const url = `https://api.adviceslip.com/advice`;
  const res = await fetch(url);
  const data = await res.json(); 
  quote.textContent = data.slip.advice;
}

//weather
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=427dfe181598834fa6f0f50641863a4f&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if(data.cod === "404"){
    return alert(`Error: ${data.message}!`);
  }
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  wind.textContent = data.wind.speed.toFixed(1) + `m/s`;
  feels.textContent = `${data.main.pressure}`;
  humidity.textContent = data.main.humidity;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if(event.type === 'keypress'){
    if(pressed){
      event.target.innerText = '';
      pressed = false;
    }
  }
  if (event.code === 'Enter') {
    if(event.target.innerText === ''){
      city.blur();
    }
    getWeather();
    city.blur();
  }
  if(event.type === 'blur'){
    pressed = true;
    if(event.target.innerText !== ''){
      localStorage.setItem('city', event.target.innerText);
    }
    else{
      city.textContent = localStorage.city;
    }
  }
  if(event.type === 'click'){
    localStorage.setItem('city', event.target.innerText);
    event.target.innerText = '';
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', setCity);
city.addEventListener('blur', setCity);

name.addEventListener('click', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setFocus);

button.addEventListener('click', getQuote);
next.addEventListener('click', nextImage);


//Run
fillArray();
showTime();
setBgGreet();
getName();
getFocus();
setDate();
getQuote();
// setCity('');
getWeather();