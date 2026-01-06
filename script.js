// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing scripts');
    
    // --- Navigation Toggle for Mobile ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            console.log('Nav toggle clicked');
            mainNav.classList.toggle('active');
            // Change toggle icon
            if (mainNav.classList.contains('active')) {
                navToggle.innerHTML = '✕';
                navToggle.setAttribute('aria-label', 'Close menu');
            } else {
                navToggle.innerHTML = '☰';
                navToggle.setAttribute('aria-label', 'Open menu');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('nav') && !e.target.closest('.nav-toggle') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.innerHTML = '☰';
                navToggle.setAttribute('aria-label', 'Open menu');
            }
        });
    } else {
        console.log('Navigation elements not found');
    }

    // --- Join Modal Functionality ---
    const joinModal = document.getElementById('joinModal');
    
    // Function to open modal
    function openModal() { 
        console.log('Opening modal');
        if (joinModal) {
            joinModal.classList.add('open'); 
            joinModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Function to close modal
    function closeModal() { 
        console.log('Closing modal');
        if (joinModal) {
            joinModal.classList.remove('open'); 
            joinModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Re-enable scrolling
            
            // Reset form messages
            const joinMsg = document.getElementById('joinMsg');
            if (joinMsg) {
                joinMsg.style.display = 'none';
            }
        }
    }
    
    // Add event listeners to all join buttons
    const joinButtons = ['joinBtn', 'joinBtn2', 'joinBtn3', 'joinAside'];
    joinButtons.forEach(function(btnId) {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        } else {
            console.log('Button not found: ' + btnId);
        }
    });
    
    // Close modal button
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (joinModal) {
        joinModal.addEventListener('click', function(e) {
            if (e.target === joinModal) {
                closeModal();
            }
        });
    }

    // --- Join Form Submission ---
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Join form submitted');
            
            const name = document.getElementById('m-name').value.trim();
            const phone = document.getElementById('m-phone').value.trim();
            const email = document.getElementById('m-email').value.trim();
            const type = document.getElementById('m-type').value;
            const state = document.getElementById('m-state').value;
            const joinMsg = document.getElementById('joinMsg');
            
            // Validation
            if (!name || !phone || !email) { 
                showAlert('Please fill all required fields.', 'error');
                return; 
            }
            
            if (!validatePhone(phone)) {
                showAlert('Please enter a valid 10-digit phone number.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate saving to localStorage
            try {
                const members = JSON.parse(localStorage.getItem('hsg_members') || '[]');
                const newMember = {
                    name: name,
                    phone: phone,
                    email: email,
                    type: type,
                    state: state,
                    createdAt: new Date().toISOString()
                };
                members.push(newMember);
                localStorage.setItem('hsg_members', JSON.stringify(members));
                
                // Show success message
                if (joinMsg) {
                    joinMsg.innerHTML = `
                        <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 8px; border: 1px solid #c3e6cb;">
                            <strong>Success!</strong> Thank you, ${name}! Your membership request has been submitted. 
                            We will contact you at ${phone} within 24 hours.
                        </div>
                    `;
                    joinMsg.style.display = 'block';
                }
                
                // Log for debugging
                console.log('New member added:', newMember);
                console.log('Total members:', members.length);
                
                // Reset form and close modal after delay
                setTimeout(function() {
                    joinForm.reset();
                    if (joinMsg) {
                        joinMsg.style.display = 'none';
                    }
                    closeModal();
                    showAlert('Membership application submitted successfully! Check your email for confirmation.', 'success');
                }, 3000);
                
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                showAlert('There was an error processing your request. Please try again.', 'error');
            }
        });
    }

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Contact form submitted');
            
            const name = document.getElementById('cf-name').value.trim();
            const email = document.getElementById('cf-email').value.trim();
            const msg = document.getElementById('cf-msg').value.trim();
            const contactMsg = document.getElementById('contactMsg');
            
            // Validation
            if (!name || !email || !msg) { 
                showAlert('Please fill all required fields.', 'error');
                return; 
            }
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate sending message
            if (contactMsg) {
                contactMsg.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 8px; border: 1px solid #c3e6cb;">
                        <strong>Message Sent!</strong> Thank you, ${name}! We have received your message and will respond to ${email} within 48 hours.
                    </div>
                `;
                contactMsg.style.display = 'block';
                
                // Save contact to localStorage
                try {
                    const contacts = JSON.parse(localStorage.getItem('hsg_contacts') || '[]');
                    contacts.push({
                        name: name,
                        email: email,
                        message: msg,
                        createdAt: new Date().toISOString()
                    });
                    localStorage.setItem('hsg_contacts', JSON.stringify(contacts));
                    console.log('Contact saved:', contacts.length);
                } catch (error) {
                    console.error('Error saving contact:', error);
                }
            }
            
            // Reset form after delay
            setTimeout(function() {
                if (contactMsg) {
                    contactMsg.style.display = 'none';
                }
                contactForm.reset();
                showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 3000);
        });
    }

    // --- Smooth Scrolling for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (navToggle) {
                            navToggle.innerHTML = '☰';
                            navToggle.setAttribute('aria-label', 'Open menu');
                        }
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Helper Functions ---
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }
    
    function showAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: ${type === 'error' ? '#721c24' : '#155724'};
            background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
            border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
            z-index: 10000;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add keyframes for animation
        if (!document.querySelector('#alertStyles')) {
            const style = document.createElement('style');
            style.id = 'alertStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        alertDiv.innerHTML = `
            <strong>${type === 'error' ? 'Error!' : 'Success!'}</strong> ${message}
        `;
        
        // Add to body
        document.body.appendChild(alertDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            alertDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        }, 5000);
    }

    // --- Accessibility: Allow Esc to close modal ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // --- Initialize Bootstrap Carousel ---
    if ($('#carouselExampleCaptions').length) {
        $('#carouselExampleCaptions').carousel({
            interval: 5000, // Change slide every 5 seconds
            pause: 'hover',
            wrap: true
        });
    }

    // --- Image Loading Error Handler ---
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (!this.src.includes('placeholder')) {
                this.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                this.alt = 'Image not available';
            }
        });
    });

    // --- Add active class to current section in navigation ---
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Call on scroll
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Initialize
    highlightCurrentSection();

    console.log('All scripts initialized successfully');
});