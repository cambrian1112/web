document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); // 添加日志

    const form = document.querySelector('#contactForm');
    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-content");
    const modalText = document.getElementById("modalText");
    const span = document.getElementsByClassName("close")[0];
    const icon = document.createElement("div");
    icon.className = "icon";

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted'); // 添加日志
    
        if (validateForm()) {
            console.log('Form is valid'); // 添加日志
    
            const formData = {
                name: document.querySelector('#name').value.trim(),
                email: document.querySelector('#email').value.trim(),
                phone: document.querySelector('#phone').value.trim(),
                gender: document.querySelector('#gender').value.trim(), 
                message: document.querySelector('#message').value.trim() 
            };
    
            // Simulate an AJAX request to submit the form data
            simulateFormSubmission(formData)
                .then(response => {
                    modalText.textContent = response.message;
                    modalContent.className = "modal-content success";
                    icon.className = "icon success";
                    icon.innerHTML = "&#10004;"; // Checkmark icon
                    modalContent.appendChild(icon);
                    modal.style.display = "block";
    
                    if (response.success) {
                        form.reset();
    
                        // Add the new booking to the list
                        const bookingList = document.getElementById('bookingList');
                        const listItem = document.createElement('li');
                        listItem.textContent = `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}, Gender: ${formData.gender}, Message: ${formData.message}`;
                        bookingList.appendChild(listItem);
                    }
                })
                .catch(error => {
                    modalText.textContent = 'An error occurred while processing your request.';
                    modalContent.className = "modal-content error";
                    icon.className = "icon error";
                    icon.innerHTML = "&#10060;"; // Cross icon
                    modalContent.appendChild(icon);
                    modal.style.display = "block";
                    console.error('Error:', error);
                });
        } else {
            modalText.textContent = 'Please fill out all fields correctly.';
            modalContent.className = "modal-content error";
            icon.className = "icon error";
            icon.innerHTML = "&#10060;"; // Cross icon
            modalContent.appendChild(icon);
            modal.style.display = "block";
        }
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        modalContent.removeChild(icon);
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalContent.removeChild(icon);
        }
    }

    function validateForm() {
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const gender = document.querySelector('#gender').value;
        const message = document.querySelector('#message').value.trim();

        // Basic validation
        if (name === '' || email === '' || phone === '' || gender === '' || message === '') {
            return false;
        }

        // Email validation using regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return false;
        }

        // Phone validation using regex (simple example)
        const phonePattern = /^\d{11}$/; // Assuming a 10-digit phone number
        if (!phonePattern.test(phone)) {
            return false;
        }

        return true;
    }

    function simulateFormSubmission() {
        // This function simulates an asynchronous form submission
        // In a real-world scenario, you would replace this with an actual AJAX request
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate a successful submission
                resolve({ success: true, message: 'Thank you for your reservation!' });

                // To simulate a failed submission, uncomment the following line:
                // reject(new Error('Failed to submit form'));
            }, 1000); // Simulate a delay of 1 second
        });
    }
});