$(document).ready(function () {
    $('input.btn').click(function () {
        const login = $('input[name=login]');
        if (login.val()){
            const csrf = $('input[name=csrfmiddlewaretoken]');
            var answer = $('.answer');
            $.ajax({
                url: 'ajax-check/',
                data: {
                    login: login.val()
                }
                ,
                method: 'post',
                headers: {'X-CSRFToken': csrf.val()},
                success: function(data)
                {
                    if (data.result === 'good'){
                        alert(
                            data.title+
                            data.text+
                            data.button+
                            data.button_url
                        )
                    } else if (data.result === 'bad'){
                        alert(
                            data.title+
                            data.text
                        )
                    }
                },
            })
        } else {
            alert('Поле Login пропущено/')
        }
    })
    })
