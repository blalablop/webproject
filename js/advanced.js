
const playSound = (soundType) => {
    const sounds = {
        click: new Audio('sounds/click.mp3'),
        success: new Audio('sounds/success.mp3'),
        error: new Audio('sounds/error.mp3')
    };
    if (sounds[soundType]) {
        sounds[soundType].play().catch(err => console.log('Audio playback failed:', err));
    }
};

const initThemeToggle = () => {};

const initRatingSystem = () => {
    const ratingContainer = document.querySelector('.rating-container');
    if (!ratingContainer) return;

    const stars = ratingContainer.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                s.classList.toggle('active', i <= index);
            });
            playSound('click');
            showRatingMessage(index + 1);
        });
    });
};

const initDynamicContent = () => {
    const loadMoreBtn = document.getElementById('load-more');
    const menuContainer = document.querySelector('.menu-container');
    
    if (!loadMoreBtn || !menuContainer) return;

    const additionalDishes = [
        {
            name: 'Французский омлет',
            description: 'Нежный омлет с травами и сыром',
            image: 'images/omelet.jpg'
        },
        {
            name: 'Рататуй',
            description: 'Классическое овощное блюдо прованской кухни',
            image: 'images/ratatouille.jpg'
        }
    ];

    let currentIndex = 0;

    loadMoreBtn.addEventListener('click', () => {
        if (currentIndex < additionalDishes.length) {
            const dish = additionalDishes[currentIndex];
            const dishElement = document.createElement('div');
            dishElement.className = 'col';
            dishElement.innerHTML = `
                <div class="card h-100 shadow-sm menu-item" style="opacity: 0">
                    <img src="${dish.image}" class="card-img-top" alt="${dish.name}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${dish.name}</h5>
                        <p class="card-text">${dish.description}</p>
                    </div>
                </div>
            `;
            menuContainer.appendChild(dishElement);
            
            setTimeout(() => {
                const card = dishElement.querySelector('.menu-item');
                card.style.transition = 'opacity 0.5s ease';
                card.style.opacity = '1';
            }, 100);

            currentIndex++;
            playSound('success');

            if (currentIndex >= additionalDishes.length) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'Все блюда загружены';
            }
        }
    });
};

const initLanguageSwitcher = () => {
    const langSwitcher = document.getElementById('language-switcher');
    if (!langSwitcher) return;

    const translations = {
        'ru': {
            'menu-title': 'Меню',
            'about-title': 'О нас',
            'team-title': 'Команда',
            'reserve-btn': 'Забронировать'
        },
        'en': {
            'menu-title': 'Menu',
            'about-title': 'About Us',
            'team-title': 'Team',
            'reserve-btn': 'Reserve'
        },
        'kz': {
            'menu-title': 'Мәзір',
            'about-title': 'Біз туралы',
            'team-title': 'Команда',
            'reserve-btn': 'Брондау'
        }
    };

    langSwitcher.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (translations[selectedLang] && translations[selectedLang][key]) {
                element.textContent = translations[selectedLang][key];
            }
        });
        
        playSound('click');
    });
};

const initTimeGreeting = () => {
    const greetingElement = document.getElementById('time-greeting');
    if (!greetingElement) return;

    const updateGreeting = () => {
        const hour = new Date().getHours();
        let greeting;
        
        switch(true) {
            case hour >= 5 && hour < 12:
                greeting = 'Доброе утро';
                break;
            case hour >= 12 && hour < 18:
                greeting = 'Добрый день';
                break;
            case hour >= 18 && hour < 23:
                greeting = 'Добрый вечер';
                break;
            default:
                greeting = 'Доброй ночи';
        }
        
        greetingElement.textContent = greeting;
    };

    updateGreeting();
    setInterval(updateGreeting, 60000); 
};

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initRatingSystem();
    initDynamicContent();
    initLanguageSwitcher();
    initTimeGreeting();
});