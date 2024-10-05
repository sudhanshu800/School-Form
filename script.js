// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Perform validation
        if (validateForm()) {
            // If validation passes, submit the form
            form.submit();
        }
    });

    function validateForm() {
        let isValid = true;
        let messages = [];

        // Validate First Name
        const firstName = document.getElementById('first-name').value.trim();
        if (firstName === '') {
            isValid = false;
            messages.push('First Name is required.');
        }

        // Validate Last Name
        const lastName = document.getElementById('last-name').value.trim();
        if (lastName === '') {
            isValid = false;
            messages.push('Last Name is required.');
        }

        // Validate Date of Birth
        const dob = document.getElementById('dob').value;
        if (dob === '') {
            isValid = false;
            messages.push('Date of Birth is required.');
        } else {
            // Optional: Check if the user is at least a certain age
            const dobDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();
            const month = today.getMonth() - dobDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < dobDate.getDate())) {
                age--;
            }
            if (age < 5) { // Assuming minimum age is 5
                isValid = false;
                messages.push('You must be at least 5 years old to register.');
            }
        }

        // Validate Gender
        const genderElements = document.getElementsByName('gender');
        let genderSelected = false;
        for (let gender of genderElements) {
            if (gender.checked) {
                genderSelected = true;
                break;
            }
        }
        if (!genderSelected) {
            isValid = false;
            messages.push('Please select your gender.');
        }

        // Validate Email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            isValid = false;
            messages.push('Email is required.');
        } else if (!validateEmail(email)) {
            isValid = false;
            messages.push('Please enter a valid email address.');
        }

        // Validate Phone Number
        const phone = document.getElementById('phone').value.trim();
        if (phone === '') {
            isValid = false;
            messages.push('Phone Number is required.');
        } else if (!validatePhone(phone)) {
            isValid = false;
            messages.push('Please enter a valid phone number (e.g., 123-456-7890).');
        }

        // Validate Grade Level
        const grade = document.getElementById('grade').value;
        if (grade === '') {
            isValid = false;
            messages.push('Please select your grade level.');
        }

        // Validate Subjects
        const subjectElements = document.getElementsByName('subjects[]');
        let subjectsSelected = false;
        for (let subject of subjectElements) {
            if (subject.checked) {
                subjectsSelected = true;
                break;
            }
        }
        if (!subjectsSelected) {
            isValid = false;
            messages.push('Please select at least one subject.');
        }

        // If there are validation messages, display them
        if (!isValid) {
            alert(messages.join('\n'));
        }

        return isValid;
    }

    function validateEmail(email) {
        // Simple email regex pattern
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Simple phone regex pattern (e.g., 123-456-7890)
        const re = /^\d{3}-\d{3}-\d{4}$/;
        return re.test(phone);
    }
});
