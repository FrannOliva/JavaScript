const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_8t7ta75';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Send Email';
                Toastify({
                    text: "Email enviado correctamente!",
                    duration: 1600,
                    gravity: "bottom",
                    position: 'right',
                }).showToast();;
            }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
    });