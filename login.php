<?php
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $filename = "users.json";
    $library = file_get_contents($filename);
    $library = json_decode($library, true) ?? [];

    $html = "";
    $has_user = false;

    foreach($library['users'] as $user => $pass) {
        if ($user == $username && $pass == $password) {
            $has_user = true;
            break;
        }
    };

    $library['current_user'] = [$username => $password];
    file_put_contents($filename, json_encode($library, JSON_PRETTY_PRINT));

    header("Content_Type: text/html");
    if (!$username || !$password) echo '<h1 style="color: red">Username or password is empty!!!</h1>';
    elseif ($has_user) {
        echo file_get_contents('chats.html');
    }
    else echo '<h1 style="color: red">No such User</h1>';
?>