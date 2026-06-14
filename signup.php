<?php
    header("Content-Type: text/html");
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    $filename = 'users.json';
    $users = file_get_contents($filename);
    $users = json_decode($users, true) ?? [];

    $has_user = false;
    foreach($users['users'] as $user => $pass) {
        if ($user == $username) {
            $has_user = true;
            break;
        }
    }

    $library['current_user'] = [$username => $password];
    file_put_contents($filename, json_encode($library, JSON_PRETTY_PRINT));

    
    if (!$username || !$password) echo '<h1 style="color: red">Username or password is empty!!!</h1>';
    elseif ($has_user) {
        echo "<h1 style='color: brown'>Already has this account! Try to Log in</h1>";
    }
    else {
        $users['users'][$username] = $password;

        file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
        echo file_get_contents('chats.html');;
    }
?>
