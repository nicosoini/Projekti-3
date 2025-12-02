$(function () {
    const $ul = $('#myUL');
    const $input = $('#myInput');
    const $addBtn = $('#addBtn');
    const $clearBtn = $('#clearBtn');
    const $inputWarning = $('#inputWarning');

    function addClosebutton(li) {
        const $li = $(li);
        const taskText = $.trim($li.text());

        const $btn = $('<button>', {
            type: 'button',
            class: 'close-btn',
            'aria-label': `Remove task ${taskText}`,
            html: '&times;'
        });

        $btn.on('click', function (e) {
            e.stopPropagation();

            //  FADE OUT ennen poistoa
            $li.fadeOut(200, function () {
                $li.remove();
            });
        });

        $li.append($btn);
    }

    // lisää sulkunapit vanhoille li-elementeille
    $ul.find('li').each(function () {
        addClosebutton(this);
    });

    // toggle "checked" kun klikataan LI:tä
    $ul.on('click', 'li', function (e) {
        if (e.target === this) {
            $(this).toggleClass('checked');
        }
    });

    function newElement() {
        const text = $.trim($input.val());

        if (!text) {
            $input.addClass('input-error');
            if ($inputWarning.length) {
                $inputWarning.prop('hidden', false);
            }
            $input.trigger('focus');
            return;
        }

        //  Fade IN kun uusi listaus
        const $li = $('<li style="display:none;">').text(text);

        addClosebutton($li[0]);
        $ul.append($li);

        // Fade In -efekti
        $li.fadeIn(400);

        $input.val('');
        $input.removeClass('input-error');

        if ($inputWarning.length) {
            $inputWarning.prop('hidden', true);
        }

        $input.trigger('focus');
    }

    $addBtn.on('click', newElement);

    $input.on('keydown', function (e) {
        if (e.key === 'Enter' || e.which === 13) {
            newElement();
        }
    });

    if ($clearBtn.length) {
        $clearBtn.on('click', function () {
            //  Tyhjennys fade-outilla
            $ul.find('li').fadeOut(200, function () {
                $(this).remove();
            });
        });
    }

    // poista varoitus kirjoittaessa
    $input.on('input', function () {
        if ($.trim($input.val()).length > 0) {
            $input.removeClass('input-error');
            if ($inputWarning.length) {
                $inputWarning.prop('hidden', true);
            }
        }
    });

    
});
