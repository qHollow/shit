//DOM Elements
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const date = document.querySelector('.date');
const quote = document.querySelector('.quote');
const button = document.querySelector('.refresh-quote');
const next = document.querySelector('.next');

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
let iter = 1;
let prevHour;


//Show time
function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();
  time.innerHTML = `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  //test for bci
  if(prevHour !== min){
    prevHour = min;
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
  if(hours >= 6 && hours < 12){
    //Morning
    greeting.textContent = 'Good morning, ';
    document.body.style.backgroundImage = img[hours];
  }
  else if(hours >= 12 && hours < 18){
    //Afternoon
    greeting.textContent = 'Good afternoon, ';
    document.body.style.backgroundImage = img[hours];
  }
  else if(hours >= 18 && hours < 24){
    //Evening
    greeting.textContent = 'Good evening, ';
    document.body.style.backgroundImage = img[hours];
  }
  else{
    //Night
    greeting.textContent = 'Good night, ';
    document.body.style.backgroundImage = img[hours];
  }
}

function fillArray(){
  for(let i = 0; i < 24; i++){
    img[i] = Math.floor(1 + Math.random() * (19 + 1 - 1));
  }
  img = img.map((item, i) => {
    if(i >= 6 && i < 12){
      return `url('../assets/images/morning/${addZero(img[i])}.jpg')`
    }
    else if (i >= 12 && i < 18){
      return `url('../assets/images/day/${addZero(img[i])}.jpg')`
    }
    else if(i >= 18 && i < 24){
      return `url('../assets/images/evening/${addZero(img[i])}.jpg')`
    }
    else{
      return `url('../assets/images/night/${addZero(img[i])}.jpg')`
    }
  });
  // prevHour = new Date().getHours();
  prevHour = new Date().getMinutes();
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

function nextImage(){
  if(iter < img.length-1){
    iter += 1;
  }
  else{
    iter = 1;
  }
  // iter += 1;
  document.body.style.backgroundImage = img[iter];
  console.log(iter);
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
next.addEventListener('click', nextImage);


//Run
fillArray();
showTime();
setBgGreet();
getName();
getFocus();
setDate();
getQuote();
getWeather();