document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact-form');
    
    if (!form) {
        console.error('Das Formular mit der ID "contact-form" konnte nicht gefunden werden.');
        return;
    }

    const sendButton = document.getElementById('sendButton');
    const feedbackMessage = document.createElement('div');
    feedbackMessage.style.display = 'none';
    form.appendChild(feedbackMessage);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        sendButton.disabled = true;
        sendButton.innerText = 'Senden...';

        var formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
        };

        fetch('/php/mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            sendButton.disabled = false;
            sendButton.innerText = 'Nachricht senden';
            feedbackMessage.innerText = data.message;
            feedbackMessage.style.display = 'block';
            if(data.status === 'success') {
                feedbackMessage.style.color = 'green';
                form.reset();
            } else {
                feedbackMessage.style.color = 'red';
            }
        })
        .catch((error) => {
            sendButton.disabled = false;
            sendButton.innerText = 'Nachricht senden';
            feedbackMessage.innerText = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.';
            feedbackMessage.style.color = 'red';
            feedbackMessage.style.display = 'block';
        });
    });
});
