$(document).ready(function() {
    let searchTimer;
    const menuItems = [
        "Стейк от Виктора",
        "Крем-суп от Макса",
        "Десерт от Луи"
    ];
    
    $('#menu-search').autocomplete({
        source: menuItems,
        minLength: 1
    });
    
    $('#menu-search').on('keyup', function() {
        clearTimeout(searchTimer);
        let $this = $(this);
        searchTimer = setTimeout(function() {
            let searchText = $this.val().toLowerCase();
            $('.menu-item').each(function() {
                let $item = $(this);
                let text = $item.text().toLowerCase();
                let matches = text.includes(searchText);
                $item.toggle(matches);
                if (matches && searchText) {
                    highlightText($item, searchText);
                }
            });
        }, 300);
    });

    function highlightText($element, text) {
        if (!text) return;
        $element.find('.card-title, .card-text').each(function() {
            let $this = $(this);
            let content = $this.text();
            let highlightedContent = content.replace(
                new RegExp('(' + text + ')', 'gi'),
                '<span class="highlight">$1</span>'
            );
            $this.html(highlightedContent);
        });
    }

    $(window).scroll(function() {
        let scrolled = $(window).scrollTop();
        let docHeight = $(document).height();
        let winHeight = $(window).height();
        let scrollPercent = (scrolled / (docHeight - winHeight)) * 100;
        $('#scroll-progress').css('width', scrollPercent + '%');
    });

    $('.counter').each(function() {
        let $this = $(this);
        let countTo = $this.data('value');
        
        $({ Counter: 0 }).animate({
            Counter: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.text(Math.ceil(this.Counter));
            }
        });
    });

    $('form').on('submit', function(e) {
        e.preventDefault();
        let $form = $(this);
        let $submitBtn = $form.find('button[type="submit"]');
        let originalText = $submitBtn.text();

        $submitBtn.prop('disabled', true)
            .html('<span class="spinner-border spinner-border-sm"></span> Подождите...');

        setTimeout(function() {
            showNotification('Форма успешно отправлена!', 'success');
            $submitBtn.html('<i class="fas fa-check"></i> Готово!');
            
            setTimeout(function() {
                $submitBtn.prop('disabled', false)
                    .text(originalText);
                $form[0].reset();
            }, 1000);
        }, 2000);
    });

    function showNotification(message, type) {
        let $notification = $('<div>')
            .addClass('notification ' + type)
            .text(message)
            .appendTo('body');

        $notification.animate({ right: '20px', opacity: 1 }, 500);

        setTimeout(function() {
            $notification.animate({ 
                right: '-300px',
                opacity: 0
            }, 500, function() {
                $(this).remove();
            });
        }, 3000);
    }

    $('.copy-btn').on('click', function() {
        let $btn = $(this);
        let $text = $btn.siblings('.code-snippet');
        
        navigator.clipboard.writeText($text.text()).then(function() {
            $btn.html('<i class="fas fa-check"></i>');
            showNotification('Текст скопирован!', 'success');
            
            setTimeout(function() {
                $btn.html('<i class="fas fa-copy"></i>');
            }, 2000);
        });
    });

    function lazyLoadImages() {
        $('.lazy-image').each(function() {
            let $img = $(this);
            if ($img.offset().top < window.innerHeight + $(window).scrollTop() + 100) {
                $img.attr('src', $img.data('src')).removeClass('lazy-image');
            }
        });
    }

    $(window).on('scroll', $.throttle(250, lazyLoadImages));
    lazyLoadImages();
});