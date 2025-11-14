$(document).ready(function() {
    $('#menu-search').on('keyup', function() {
        let searchText = $(this).val().toLowerCase();
        $('.menu-item').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
        });
    });
    const menuItems = $('.menu-item').map(function() {
        return $(this).find('.card-title').text();
    }).get();

    $('#menu-search').autocomplete({
        source: menuItems,
        minLength: 2
    });

    function highlightText(text) {
        if (!text) return;
        $('.menu-item, .faq-text').each(function() {
            let content = $(this).html();
            let regex = new RegExp('(' + text + ')', 'gi');
            $(this).html(content.replace(regex, '<span class="highlight">$1</span>'));
        });
    }
    $(window).scroll(function() {
        let scroll = $(window).scrollTop();
        let height = $(document).height() - $(window).height();
        let progress = (scroll / height) * 100;
        $('#scroll-progress').css('width', progress + '%');
    });

    $('.counter').each(function() {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    $('form').on('submit', function(e) {
        e.preventDefault();
        let $submitBtn = $(this).find('button[type="submit"]');
        let originalText = $submitBtn.text();

        $submitBtn.prop('disabled', true)
            .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Пожалуйста, подождите...');

        setTimeout(() => {
            $submitBtn.html('<i class="fas fa-check"></i> Готово!')
                .removeClass('btn-primary')
                .addClass('btn-success');

            showNotification('Форма успешно отправлена!', 'success');

            setTimeout(() => {
                $submitBtn.prop('disabled', false)
                    .html(originalText)
                    .removeClass('btn-success')
                    .addClass('btn-primary');
            }, 1000);
        }, 2000);
    });

    function showNotification(message, type = 'info') {
        const $notification = $('<div>')
            .addClass('notification ' + type)
            .text(message)
            .appendTo('body');

        $notification.animate({
            right: '20px',
            opacity: 1
        }, 500);

        setTimeout(() => {
            $notification.animate({
                right: '-300px',
                opacity: 0
            }, 500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    $('.copy-btn').on('click', function() {
        let $this = $(this);
        let textToCopy = $this.prev().text();
        navigator.clipboard.writeText(textToCopy).then(() => {
            $this.text('✓').attr('title', 'Скопировано!');
            showNotification('Текст скопирован в буфер обмена!', 'success');
            setTimeout(() => {
                $this.text('📋').attr('title', 'Копировать');
            }, 1500);
        });
    });

    const lazyImages = document.querySelectorAll('.lazy-image');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy-image');
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '100px 0px' });
        lazyImages.forEach(img => observer.observe(img));
    } else {
        function loadOnScrollFallback() {
            $('.lazy-image').each(function() {
                if ($(this).offset().top < window.innerHeight + $(window).scrollTop() + 100) {
                    $(this).attr('src', $(this).data('src')).removeClass('lazy-image');
                }
            });
        }
        $(window).on('scroll', loadOnScrollFallback);
        loadOnScrollFallback();
    }
});