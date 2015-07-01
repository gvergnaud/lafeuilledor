<?php

    if (
        isset($_POST["name"]) &&
        isset($_POST["mail"]) &&
        isset($_POST["subject"]) &&
        isset($_POST["content"])
    ) {

        $to = "gabriel.vergnaud@gmail.com";
        $subject = $_POST["subject"];
        $name = $_POST["name"];
        $from = $_POST["mail"];

        /* En-têtes de l'e-mail */
        $header = 'From: ' . $name . ' <' . $from . '>'."\r\n\r\n";

        /* Envoi de l'e-mail */
        mail($to, $subject, $message, $header);

        echo json_encode(array(
            "status" => "success",
            "msg" => "sended"
        ));

    }
    else{
        echo json_encode(array(
            "status" => "error",
            "msg" => "missing informations"
        ));
    }

?>
