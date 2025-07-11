// email.js
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Format current date and time
    function getCurrentDateTime() {
        const now = new Date();
        return now.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const userName = formData.get('user_name').trim();
        const userEmail = formData.get('user_email').trim();
        const userMessage = formData.get('message').trim();

        // Validate form data
        if (!userName || !userEmail || !userMessage) {
            formMessage.textContent = 'Semua field harus diisi!';
            formMessage.className = 'form-message error';
            return;
        }

        // Validate email format
        if (!isValidEmail(userEmail)) {
            formMessage.textContent = 'Format email tidak valid!';
            formMessage.className = 'form-message error';
            return;
        }

        // Show loading message
        formMessage.textContent = 'Mengirim pesan...';
        formMessage.className = 'form-message loading';

        // Prepare template parameters that match your HTML template
        const templateParams = {
            name: userName,           // {{name}} in your template
            user_email: userEmail,   // {{user_email}} for sender's email
            message: userMessage,    // {{message}} in your template
            time: getCurrentDateTime(), // {{time}} in your template
            reply_to: userEmail      // This sets the reply-to address
        };

        // Send email using EmailJS
        emailjs.send(
            'service_p823w1h',
            'template_z0ad7ab',
            templateParams
        )
            .then(function (response) {
                // Success
                console.log('SUCCESS!', response.status, response.text);
                formMessage.textContent = 'Pesan berhasil dikirim! Terima kasih.';
                formMessage.className = 'form-message success';

                // Reset form
                contactForm.reset();
            })
            .catch(function (error) {
                // Error
                console.error('FAILED...', error);
                formMessage.textContent = 'Gagal mengirim pesan. Silakan coba lagi.';
                formMessage.className = 'form-message error';
            });
    });
});