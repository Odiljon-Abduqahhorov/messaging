<?php
    $username = $_POST['username'];
    $contact = $_POST['contact'];
    $message = $_POST['message'];
    $time = $_POST['time'];


    $chats = json_decode(file_get_contents('chats.json'), true);
    $chats[$username][$contact][] =[
        'message_by' => 'owner',
        'message' => $message,
        'time' => $time
    ];

    $chats[$contact][$username][] = [
        'message_by' => 'friend',
        'message' => $message,
        'time' => $time
    ];

    file_put_contents('chats.json', json_encode($chats, JSON_PRETTY_PRINT));
    echo 'ok';
?>