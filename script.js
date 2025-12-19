// script.js - Fixed version

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing scripts');
    
    // --- Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function() {
            console.log('Nav toggle clicked');
            mainNav.classList.toggle('active');
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
        }
    }
    
    // Function to close modal
    function closeModal() { 
        console.log('Closing modal');
        if (joinModal) {
            joinModal.classList.remove('open'); 
            joinModal.setAttribute('aria-hidden', 'true');
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
            const joinMsg = document.getElementById('joinMsg');
            
            if (!name || !phone || !email) { 
                alert('Please fill all required fields.'); 
                return; 
            }
            
            // Simulate saving to localStorage
            try {
                const members = JSON.parse(localStorage.getItem('hsg_members') || '[]');
                members.push({
                    name: name,
                    phone: phone,
                    email: email,
                    type: document.getElementById('m-type').value,
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('hsg_members', JSON.stringify(members));
                
                if (joinMsg) {
                    joinMsg.textContent = 'Thank you! Your request has been recorded. We will contact you soon.';
                    joinMsg.style.display = 'block';
                }
                
                setTimeout(function() {
                    closeModal();
                    joinForm.reset();
                    if (joinMsg) {
                        joinMsg.style.display = 'none';
                    }
                }, 2000);
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                alert('There was an error processing your request. Please try again.');
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
            
            if (!name || !email) { 
                alert('Please enter name and email.'); 
                return; 
            }
            
            // Simulate sending message
            if (contactMsg) {
                contactMsg.textContent = 'Message sent. Thank you!';
                contactMsg.style.display = 'block';
            }
            
            setTimeout(function() {
                if (contactMsg) {
                    contactMsg.style.display = 'none';
                }
                contactForm.reset();
            }, 2000);
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
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Accessibility: Allow Esc to close modal ---
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    console.log('All scripts initialized successfully');
 
});
