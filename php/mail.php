<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $phone = filter_var($data['phone'], FILTER_SANITIZE_STRING);
    $message = filter_var($data['message'], FILTER_SANITIZE_STRING);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Ungültige E-Mail-Adresse.']);
        exit;
    }

    $to = 'info@gyxfilms.com'; // Ziel-E-Mail-Adresse von Görkem Yalcin
    $subject = "Neue Anfrage von $name";

   $body = "<html><body>";
    $body .= "<style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9; }
                .header { text-align: center; padding-bottom: 20px; }
                .header h2 { color: #007bff; }
                .content { margin-bottom: 20px; }
                .content p { margin: 10px 0; }
                .footer { text-align: center; font-size: 12px; color: #999; }
                .content strong { color: #007bff; }
              </style>";
    $body .= "<div class='container'>";
    $body .= "<div class='header'><h2>Neue Anfrage von $name</h2></div>";
    $body .= "<div class='content'>";
    $body .= "<p><strong>Name:</strong> $name</p>";
    $body .= "<p><strong>E-Mail:</strong> <a href='mailto:$email' style='color: #007bff;'>$email</a></p>";
    $body .= "<p><strong>Telefon:</strong> $phone</p>";
    $body .= "<p><strong>Nachricht:</strong><br>" . nl2br($message) . "</p>";
    $body .= "</div>";
    $body .= "<div class='footer'>GYXFilms</div>";
    $body .= "</div>";
    $body .= "</body></html>";
    // Setze den From-Header
    $headers = "From: GYXFilms Anfrage <info@gyxfilms.de>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Vielen Dank! Ihre Nachricht wurde erfolgreich versendet.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.']);
    }
}
?>
