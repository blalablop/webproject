function initFormValidation() {
  var form = document.querySelector('form[role="form"]');
  if (!form) {
    return;
  }

  var nameError = document.createElement('div');
  nameError.id = 'name-error';
  nameError.className = 'text-danger small mt-1';
  nameError.style.display = 'none';

  var phoneError = document.createElement('div');
  phoneError.id = 'phone-error';
  phoneError.className = 'text-danger small mt-1';
  phoneError.style.display = 'none';

  var dateError = document.createElement('div');
  dateError.id = 'date-error';
  dateError.className = 'text-danger small mt-1';
  dateError.style.display = 'none';

  var timeError = document.createElement('div');
  timeError.id = 'time-error';
  timeError.className = 'text-danger small mt-1';
  timeError.style.display = 'none';

  var guestsError = document.createElement('div');
  guestsError.id = 'guests-error';
  guestsError.className = 'text-danger small mt-1';
  guestsError.style.display = 'none';
  var nameInput = document.getElementById('name');
  var phoneInput = document.getElementById('phone');
  var dateInput = document.getElementById('date');
  var timeInput = document.getElementById('time');
  var guestsInput = document.getElementById('guests');

  if (nameInput) nameInput.parentElement.appendChild(nameError);
  if (phoneInput) phoneInput.parentElement.appendChild(phoneError);
  if (dateInput) dateInput.parentElement.appendChild(dateError);
  if (timeInput) timeInput.parentElement.appendChild(timeError);
  if (guestsInput) guestsInput.parentElement.appendChild(guestsError);

  function showError(inputId, message) {
    var errorElement = document.getElementById(inputId + '-error');
    var inputElement = document.getElementById(inputId);
    if (errorElement && inputElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
      inputElement.classList.add('is-invalid');
      inputElement.classList.remove('is-valid');
    }
  }

  function clearError(inputId) {
    var errorElement = document.getElementById(inputId + '-error');
    var inputElement = document.getElementById(inputId);
    if (errorElement && inputElement) {
      errorElement.style.display = 'none';
      inputElement.classList.remove('is-invalid');
      inputElement.classList.add('is-valid');
    }
  }

  const validateName = (name) => {
    if (!name.trim()) {
      showError('name', 'Пожалуйста, введите ваше имя');
      return false;
    }
    if (name.trim().length < 2) {
      showError('name', 'Имя должно содержать минимум 2 символа');
      return false;
    }
    clearError('name');
    return true;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[0-9]{10,15}$/;
    if (!phone.trim()) {
      showError('phone', 'Пожалуйста, введите номер телефона');
      return false;
    }
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      showError('phone', 'Введите корректный номер телефона (10-15 цифр)');
      return false;
    }
    clearError('phone');
    return true;
  };

  const validateDate = (date) => {
    if (!date) {
      showError('date', 'Пожалуйста, выберите дату');
      return false;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError('date', 'Дата не может быть в прошлом');
      return false;
    }
    clearError('date');
    return true;
  };

  const validateTime = (time) => {
    if (!time) {
      showError('time', 'Пожалуйста, выберите время');
      return false;
    }
    clearError('time');
    return true;
  };

  const validateGuests = (guests) => {
    if (!guests || guests < 1) {
      showError('guests', 'Минимум 1 гость');
      return false;
    }
    if (guests > 20) {
      showError('guests', 'Максимум 20 гостей. Для больших групп звоните нам');
      return false;
    }
    clearError('guests');
    return true;
  };

  const validationMap = {
    name: { validate: validateName, events: ['blur', 'input'] },
    phone: { validate: validatePhone, events: ['blur', 'input'] },
    date: { validate: validateDate, events: ['change'] },
    time: { validate: validateTime, events: ['change'] },
    guests: { validate: validateGuests, events: ['change'] }
  };

  inputs.forEach(input => {
    if (!input) return;
    const config = validationMap[input.id];
    if (!config) return;
    
    config.events.forEach(event => {
      input.addEventListener(event, () => {
        if (event === 'input' && !input.classList.contains('is-invalid')) return;
        config.validate(input.value);
      });
    });
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    if (nameInput) isValid = validateName(nameInput.value) && isValid;
    if (phoneInput) isValid = validatePhone(phoneInput.value) && isValid;
    if (dateInput) isValid = validateDate(dateInput.value) && isValid;
    if (timeInput) isValid = validateTime(timeInput.value) && isValid;
    if (guestsInput) isValid = validateGuests(guestsInput.value) && isValid;

    if (isValid) {
      alert('Спасибо! Ваше бронирование принято. Мы свяжемся с вами в ближайшее время.');
      form.reset();
      document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
      });
    } else {
      alert('Пожалуйста, исправьте ошибки в форме');
    }
  });
}

function initAccordion() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;

  const items = container.querySelectorAll('.accordion-item-custom');
  const toggleAccordion = (item, force = null) => {
    const answer = item.querySelector('.accordion-answer');
    const icon = item.querySelector('.accordion-icon');
    const isActive = force !== null ? force : !item.classList.contains('active');
    
    item.classList.toggle('active', isActive);
    if (answer) answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : null;
    if (icon) icon.textContent = isActive ? '−' : '+';
  };

  items.forEach(item => {
    const question = item.querySelector('.accordion-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      items.forEach(other => other !== item && toggleAccordion(other, false));
      toggleAccordion(item);
    });
  });
}

function initPopupForm() {
  const elements = {
    open: document.getElementById('open-popup'),
    popup: document.getElementById('subscription-popup'),
    close: document.getElementById('close-popup'),
    form: document.getElementById('subscribe-form')
  };

  if (!elements.open || !elements.popup) return;

  const togglePopup = (show = true) => {
    elements.popup.style.display = show ? 'flex' : 'none';
    document.body.style.overflow = show ? 'hidden' : 'auto';
    if (typeof playSound === 'function') {
      playSound(show ? 'click' : 'success');
    }
  };
  elements.open.addEventListener('click', () => togglePopup(true));
  
  if (elements.close) {
    elements.close.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      togglePopup(false);
    });
  }

  elements.form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('popup-email').value;
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    alert('Спасибо за подписку! Мы будем держать вас в курсе наших новостей.');
    elements.form.reset();
    togglePopup(false);
  });
}

function initBackgroundChanger() {
  var btn = document.getElementById('change-bg-color');
  if (!btn) {
    return;
  }

  var colors = [
    '#1a1a2e',
    '#16213e',
    '#0f3460',
    '#1e3a5f',
    '#2c1810',
    '#1f1209',
    '#1a0f0a'
  ];
  var currentIndex = 0;

  btn.onclick = function() {
    currentIndex = currentIndex + 1;
    if (currentIndex >= colors.length) {
      currentIndex = 0;
    }
    document.body.style.backgroundColor = colors[currentIndex];
    document.body.style.backgroundBlendMode = 'overlay';
    btn.style.transform = 'scale(0.95)';
    setTimeout(function() {
      btn.style.transform = 'scale(1)';
    }, 150);
  };
}

function initDateTime() {
  var element = document.getElementById('current-datetime');
  if (!element) {
    return;
  }

  function updateDateTime() {
    var now = new Date();
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    element.textContent = now.toLocaleString('ru-RU', options);
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  initFormValidation();
  initAccordion();
  initPopupForm();
  initBackgroundChanger();
  initDateTime();
});