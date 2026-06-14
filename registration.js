const login_form = $('.login');
const signup_form = $('.signup');

login_form.css({
    'top': '50%',
    'width': '400px',
    'height': '400px',
    'box-shadow': '0px 0px 20px gray',
    'z-index': 2
});

signup_form.css({
    'top': '35%',
    'width': '300px',
    'height': '300px',
    'box-shadow': '0px 0px 0px',
    'z-index': 1
})

function to_login() {
    login_form.css({
        'box-shadow': '0px 0px 20px gray',
        'z-index': 2
    });

    signup_form.css({
        'box-shadow': '0px 0px 0px',
        'z-index': 1
    });

    login_form.animate({
        'top': '50%',
        'width': '400px',
        'height': '400px',
    }, 500);

    signup_form.animate({
        'top': '35%',
        'width': '300px',
        'height': '300px',
    }, 100)
};

function to_signup() {
    signup_form.css({
        'box-shadow': '0px 0px 20px gray',
        'z-index': 2
    });

    login_form.css({
        'box-shadow': '0px 0px 0px',
        'z-index': 1
    });

    signup_form.animate({
        'top': '50%',
        'width': '400px',
        'height': '400px',
    }, 500);

    login_form.animate({
        'top': '35%',
        'width': '300px',
        'height': '300px',
    }, 100)
};