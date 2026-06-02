// STACKLY Premium Medical Devices Scripts

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-item a');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 2. Typing Effect for Hero Subtitle
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const phrases = [
            "Pioneering the future of medical technology.",
            "Engineered for ultimate precision, built for saving lives.",
            "Empowering clinical decisions through diagnostic innovation.",
            "Designing advanced, responsive clinical instruments."
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 70;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 35; // delete faster
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 70;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at the end of the phrase
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // brief pause before next phrase
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing
        setTimeout(type, 1000);
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    // Added '.metric-card' to observe target
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .metric-card');
    
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Unobserve to keep active state after animation triggers
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // trigger when 15% of element is visible
            rootMargin: "0px 0px -50px 0px"
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    // 4. Back and Go to Home Action for 404.html
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // 5. Header Dynamic Styling on Scroll
    const header = document.querySelector('.navbar');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 0';
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.padding = '0';
                header.style.background = 'rgba(0, 0, 0, 0.8)';
            }
        });
    }
});
