// Modal PopUp
const modalController = ({modal, btnOpen, btnClose}) => {
    const buttonElem = document.querySelector(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity 300ms easy-in-out;
    `;

    const closeModal = event => {
        const target = event.target;

        if (
          target === modalElem || 
          target.closest(btnClose) ||
          event.code === 'Escape'
        ) {
          modalElem.style.opacity = 0;

          setTimeout (() =>{
              modalElem.style.visibility = 'hidden';
          }, 300);

          window.removeEventListener('keydown', closeModal);
        }
    }

    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal)
    };

    buttonElem.addEventListener('click', openModal);

    modalElem.addEventListener('click', closeModal);
}

modalController({
  modal: '.modal',
  btnOpen: '.yt',
  btnClose: '.modal__close'
});
modalController({
  modal: '.modal',
  btnOpen: '.dsk',
  btnClose: '.modal__close'
});

// Darkmode/Lightmode switch
let lightmode = localStorage.getItem('lightmode')
const themeSwitch = document.getElementById('theme-switch')

const enableLightmode = () => {
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode', 'active')
}
const disableLightmode = () => {
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode', null)
}
if(lightmode === 'active') enableLightmode()

themeSwitch.addEventListener('click', () => {
    lightmode = localStorage.getItem('lightmode')
    lightmode !== 'active' ? enableLightmode() : disableLightmode()
})

// Date and time
function updateDateTime() {
  const dateTimeElem = document.getElementById('dateTime');
  if (dateTimeElem) {
    const now = new Date();
    const options = {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
      hour12: true
    };
    dateTimeElem.textContent = now.toLocaleString('en-US', options);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  fetchWeather(LAT, LON);
  setInterval(updateDateTime, 60000);
});

// Form validation
function loadUserData() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  if (username && password) {
    document.getElementById('name').value = username;
    document.getElementById('password1').value = password;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadUserData(); 
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const message = document.getElementById('message');
    let valid = true;

    if (name.value.trim() === '') {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.remove('is-invalid');
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    if (password.value.length < 6) {
      password.classList.add('is-invalid');
      valid = false;
    } else {
      password.classList.remove('is-invalid');
    }

    if (password.value !== password2.value) {
      password2.classList.add('is-invalid');
      valid = false;
    } else {
      password2.classList.remove('is-invalid');
    }

    if (message.value.trim() === '') {
      message.classList.add('is-invalid');
      valid = false;
    } else {
      message.classList.remove('is-invalid');
    }

    if (valid) {
      alert('Form submitted successfully!');
    }
  });
});

// FAQ section
document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          answer.classList.toggle('open');
      });
  });
});

// Drag and Drop
let draggedQuestion = null;

function addDragAndDropListenersToFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-item');

  faqQuestions.forEach(question => {
    question.addEventListener('dragstart', function () {
      draggedQuestion = this;
      setTimeout(() => this.style.display = 'none', 0);
    });

    question.addEventListener('dragend', function () {
      this.style.display = '';
      draggedQuestion = null;
    });

    question.addEventListener('dragover', function (e) {
      e.preventDefault();
    });

    question.addEventListener('drop', function () {
      if (draggedQuestion !== this) {
        this.parentNode.insertBefore(draggedQuestion, this.nextSibling);
      }
    });
  });
}

addDragAndDropListenersToFAQ();

// Sound buttons
function playSound(src) {
  const sound = new Audio(src);
  sound.play();
}
document.addEventListener('DOMContentLoaded', () => {
  const missingButton1 = document.querySelector('.yt');
  const missingButton2 = document.querySelector('.dsk');

  if (missingButton1) {
    missingButton1.addEventListener('click', () => {
      playSound('uhoh.mp3');
    });
  }
  if (missingButton2) {
    missingButton2.addEventListener('click', () => {
      playSound('uhoh.mp3');
    });
  }
});

window.onload = function() {
  checkUserLogin();
  document.getElementById('login-btn').addEventListener('click', login);
  document.getElementById('logout-btn').addEventListener('click', logout);
}

// Login and Logout
function checkUserLogin() {
  const user = localStorage.getItem('username');
  if (user) {
    document.getElementById('user-info').style.display = 'inline';
    document.getElementById('username-display').textContent = `Welcome, ${user}!`;
    document.getElementById('login-form').style.display = 'none';
  } else {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-form').style.display = 'inline';
  }
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  localStorage.setItem('username', username);
  localStorage.setItem('password', password);
  checkUserLogin();
}
// I love Dariya btw <3
function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  checkUserLogin();
}

// Filter
const filterBox = document.querySelectorAll('.game-card-container');

document.querySelector('.container').addEventListener('click', event => {
  if (event.target.tagName !== 'LI') return false;

  let filterClass = event.target.dataset['f'];

  filterBox.forEach( elem =>{
    elem.classList.remove('hide');
    if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
      elem.classList.add('hide');
    }
  });
});

// WeatherAPI
const API_KEY = '9f9a8e09c5df05dbe4274f7a133ce4a0';
const LAT = '51.16';
const LON = '71.47';

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}}&lon=${LON}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const weatherInfo = `${cityName}: ${temperature}°C`;
    document.getElementById('weatherInfo').textContent = weatherInfo;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('weatherInfo').textContent = 'Weather info unavailable';
  }
}
