function initTranslations() {
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded!');
        return;
    }

    const currentLang = localStorage.getItem('language') || 'ru';
    const langSelector = document.getElementById('language-switcher');
    if (langSelector) {
        langSelector.value = currentLang;
        
        langSelector.addEventListener('change', function(e) {
            const newLang = e.target.value;
            localStorage.setItem('language', newLang);
            updatePageTranslations(newLang);
            playSound('click');
        });
    }
    
    updatePageTranslations(currentLang);
}

function updatePageTranslations(lang) {
    const currentTranslations = translations[lang];
    if (!currentTranslations) return;

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (currentTranslations[key]) {
            element.placeholder = currentTranslations[key];
        }
    });

    document.querySelectorAll('[data-translate-title]').forEach(element => {
        const key = element.getAttribute('data-translate-title');
        if (currentTranslations[key]) {
            element.title = currentTranslations[key];
        }
    });
}

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const stored = localStorage.getItem('theme');
    const currentTheme = stored || 'dark';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('theme', next);
        playSound('click');
    });
}

function applyTheme(theme) {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    root.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function playSound(type) {
    const audio = new Audio(`sounds/${type}.mp3`);
    audio.play().catch(err => console.log('Sound playback failed'));
}

(function() {
    const savedTheme = localStorage.getItem('theme');
    const initial = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', initial);
})();

document.addEventListener('DOMContentLoaded', function() {
    initTranslations();
    initTheme();
});