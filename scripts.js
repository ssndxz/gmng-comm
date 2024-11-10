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

updateDateTime();
setInterval(updateDateTime, 60000);

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
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
    if (password.value !== confirmPassword.value) {
      confirmPassword.classList.add('is-invalid');
      valid = false;
    } else {
      confirmPassword.classList.remove('is-invalid');
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

document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          answer.classList.toggle('open');
      });
  });
});

const gameCards = document.querySelectorAll('.game-card-container');
let draggedItem = null;

gameCards.forEach(card => {
  card.addEventListener('dragstart', function () {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);
  });

  card.addEventListener('dragend', function () {
    this.classList.remove('dragging');
    draggedItem = null;
  });

  card.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  card.addEventListener('drop', function () {
    if (draggedItem !== this) {
      const draggedItemParent = draggedItem.parentNode;
      const targetItemParent = this.parentNode;

      const draggedClone = draggedItem.cloneNode(true);
      const targetClone = this.cloneNode(true);

      draggedItemParent.replaceChild(targetClone, draggedItem);
      targetItemParent.replaceChild(draggedClone, this);

      addDragAndDropListeners(draggedClone);
      addDragAndDropListeners(targetClone);
    }
  });
});

function addDragAndDropListeners(card) {
  card.addEventListener('dragstart', function () {
    draggedItem = this;
  });
  card.addEventListener('dragend', function () {
    this.classList.remove('dragging');
    draggedItem = null;
  });
  card.addEventListener('dragover', function (e) {
    e.preventDefault();
  });
  card.addEventListener('drop', function () {
    if (draggedItem !== this) {
      const draggedItemParent = draggedItem.parentNode;
      const targetItemParent = this.parentNode;

      const draggedClone = draggedItem.cloneNode(true);
      const targetClone = this.cloneNode(true);

      draggedItemParent.replaceChild(targetClone, draggedItem);
      targetItemParent.replaceChild(draggedClone, this);

      addDragAndDropListeners(draggedClone);
      addDragAndDropListeners(targetClone);
    }
  });
}

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

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('password');
  checkUserLogin();
}