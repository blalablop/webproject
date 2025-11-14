
function initThemeSwitcher() {}
function initTimeDisplay() {
    const timeBtn = document.getElementById('show-time');
    const timeDisplay = document.getElementById('time-display');
    
    if (!timeBtn || !timeDisplay) return;

    timeBtn.addEventListener('click', function() {
        const currentTime = new Date().toLocaleTimeString();
        timeDisplay.textContent = currentTime;
        playSound('click');
    });
}
function initKeyboardNavigation() {
    const menuItems = document.querySelectorAll('.nav-item');
    let currentIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            menuItems[currentIndex].querySelector('a').classList.remove('keyboard-focus');
            
            if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % menuItems.length;
            } else {
                currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
            }
            
            const currentLink = menuItems[currentIndex].querySelector('a');
            currentLink.classList.add('keyboard-focus');
            currentLink.focus();
            playSound('click');
        }
    });
}

function initLanguageSwitcher() {
    const langSelect = document.getElementById('language-switcher');
    if (!langSelect) return;

    const translations = {
        'ru': {
            'menu': 'Меню',
            'about': 'О нас',
            'team': 'Команда',
            'reserve': 'Забронировать',
            'brand': 'Claude Monet',
            'menu-title': 'Меню',
            'search-placeholder': 'Поиск блюд...',
            'dish1-title': 'Стейк от Виктора',
            'dish1-desc': 'Фирменное блюдо Виктора Баринова — идеальное сочетание сочности и вкуса.',
            'dish2-title': 'Крем-суп от Макса',
            'dish2-desc': 'Нежный крем-суп из шампиньонов с французским акцентом.',
            'dish3-title': 'Десерт от Луи',
            'dish3-desc': 'Лёгкий десерт с ягодами и сливочным кремом, как в лучших ресторанах Парижа.'
        },
        'en': {
            'menu': 'Menu',
            'about': 'About',
            'team': 'Team',
            'reserve': 'Reserve',
            'brand': 'Claude Monet',
            'menu-title': 'Menu',
            'search-placeholder': 'Search dishes...',
            'dish1-title': 'Victor\'s Steak',
            'dish1-desc': 'Victor Barinov\'s signature dish — a perfect combination of juiciness and flavor.',
            'dish2-title': 'Max\'s Cream Soup',
            'dish2-desc': 'Delicate mushroom cream soup with a French accent.',
            'dish3-title': 'Louis\'s Dessert',
            'dish3-desc': 'Light dessert with berries and cream, like in the best restaurants in Paris.'
        },
        'kz': {
            'menu': 'Мәзір',
            'about': 'Біз туралы',
            'team': 'Команда',
            'reserve': 'Брондау',
            'brand': 'Claude Monet',
            'menu-title': 'Мәзір',
            'search-placeholder': 'Тағамдарды іздеу...',
            'dish1-title': 'Виктордың стейкі',
            'dish1-desc': 'Виктор Бариновтың фирмалық тағамы — шырындылық пен дәмнің керемет үйлесімі.',
            'dish2-title': 'Макстың крем-сорпасы',
            'dish2-desc': 'Француз акцентімен саңырауқұлақтардан жасалған нәзік крем-сорпа.',
            'dish3-title': 'Луидің десерті',
            'dish3-desc': 'Париждің үздік мейрамханаларындағыдай жидектер мен кілегеймен жасалған жеңіл десерт.'
        }
    };

    const savedLang = localStorage.getItem('language') || 'ru';
    langSelect.value = savedLang;
    updatePageLanguage(translations[savedLang]);

    langSelect.addEventListener('change', function(e) {
        const lang = e.target.value;
        
        switch(lang) {
            case 'ru':
            case 'en':
            case 'kz':
                updatePageLanguage(translations[lang]);
                localStorage.setItem('language', lang);
                playSound('click');
                break;
            default:
                console.error('Unsupported language');
        }
    });
}
function playSound(type) {
    const sounds = {
        click: new Audio('sounds/click.mp3'),
        success: new Audio('sounds/success.mp3'),
        error: new Audio('sounds/error.mp3')
    };
    
    if (sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(err => console.log('Audio playback failed'));
    }
}

function showRatingMessage(rating) {
    const messages = [
        'Пожалуйста, поставьте оценку',
        'Нам жаль, что вам не понравилось',
        'Надеемся в следующий раз будет лучше',
        'Спасибо за оценку!',
        'Рады, что вам понравилось!',
        'Спасибо за высокую оценку!'
    ];
    
    const messageElement = document.getElementById('rating-message');
    if (messageElement) {
        messageElement.textContent = messages[rating];
        messageElement.style.opacity = '0';
        setTimeout(() => {
            messageElement.style.opacity = '1';
        }, 50);
    }
}

function updatePageLanguage(translations) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[key]) {
            element.placeholder = translations[key];
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initRatingSystem();
    initTimeDisplay();
    initKeyboardNavigation();
    initLanguageSwitcher();
});