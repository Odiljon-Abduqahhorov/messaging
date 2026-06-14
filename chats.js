function get_chats(username) {
    $.getJSON('chats.json?t=' + new Date().getTime(), (data) => {
        let html = '';
        
        Object.keys(data[username]).forEach(user => {
            html += `
                    <div class="chat"><p>${user}</p></div>
                    `;
        });

        $('.chats_list').html(html);
    }).fail(() => {alert("Chats cant be loaded")});
};

function get_username(callback) {
    $.getJSON('users.json?t=' + new Date().getTime(), (data) => {
        let username = Object.keys(data['current_user'])[0];
        callback(username);
    }).fail(() => {alert("Erorr while getting username")});
};

function load_chat(username, user) {
    $.getJSON('chats.json?t=' + new Date().getTime(), (data) => {
        let messages = [];
        let times = [];
        let owners = [];
        $('.chat_name').html(user);

        let has_chatted = Object.keys(data[username]).includes(user);
        let html = '';

        if (has_chatted) {
            data[username][user].forEach(message => {
                let ind = messages.length;
                for (let i = 0; i < messages.length; i++) {
                    if (times[i] > message['time']) {
                        ind = i;
                        break;
                    }
                }
                messages.splice(ind, 0, message['message']);
                times.splice(ind, 0, message['time']);
                owners.splice(ind, 0, message['message_by']);
            })

            for (let i = 0; i < messages.length; i++) {
                let by_who = (owners[i] == 'owner') ? "flex-end" : "flex-start";
                let color = (owners[i] == 'owner') ? "rgb(255, 205, 140)" : "rgb(255, 205, 140, 0.3)";

                html += `<p class="message" style="align-self: ${by_who}; background-color: ${color}">${messages[i]}</p>`;
            }
        }
        else html = "<p class='new_chat'>New Chat</p>";



        $('.messages').html(html);
    }).fail(() => {alert("error while loading the chat")});
}

function send(username, contact, message) {
    $.ajax({
        url: "send_message.php",
        type: 'POST',
        data: {
            username: username,
            contact: contact,
            message: message,
            time: new Date().getTime()
        },

        success: () => {console.log("sent...")},
        fail: () => {alert("Error while sending the message")}

    });
}

function search_user(username, input) {
    $.getJSON('users.json?t=' + new Date().getTime(), (data) => {
        let has_user = false;
        Object.keys(data['users']).forEach(user => {
            
            if (user == input) {
                $(".search_res").html(`<div class="chat"><p>${user}</p></div>`);
                has_user = true;
            }
        });

       if (!has_user) $(".search_res").html(`<p>Nothing Found</p>`);
    }).fail(() => {alert("Error while getting users.info")});
}

get_username((username) => {
    $('h1').html("Welcome " + username);
    get_chats(username);

    let interval;
    let contact;

    $(document).on('click', '.chat', (e) => {
        contact = $(e.currentTarget).find('p').text();
        interval = setInterval(() => {
            load_chat(username, contact);
        }, 100);

        $('.search').animate({
            "top": '-10%',
        });

        $('.messaging').css({
            "z-index": 1,
        });
    });

    $(document).on('click', '.back', () => {
        clearInterval(interval);
        $('.search').animate({
            "top": '8%',
        });

        $('.messaging').css({
            "z-index": -1,
        });
    })

    $(document).on('click', '.send', () => {
        let message = $('input').val();
        if (message) {
            send(username, contact, message);
            $('input').val("");
        }
    });

    $(document).on("focus", '.search_input', () => {
        $(".search").animate({
            'width': '300px',
            'height': '400px',
        }, 500);

        $(".search").css({
            "box-shadow": "0 0 10px grey",
        });
    });

    $(document).on("blur", '.search_input', () => {
        $(".search").animate({
            'width': '220px',
            'height': '30px',
        }, 500);

        $(".search").css({
            "box-shadow": "0 0 0px",
        });
    });


    $('.search_input input').on('keyup', (input) => {
        $(".search_res").html('');
        let input_value = input.currentTarget.value;
        if (input_value) search_user(username, input_value);
    });
});

