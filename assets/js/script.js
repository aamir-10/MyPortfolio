document.addEventListener("DOMContentLoaded", function () {

    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline && window.innerWidth > 768) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Add a slight delay for the outline for a fluid effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects for all clickable elements
        const clickables = document.querySelectorAll('a, button, .tilt-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 0, 122, 0.1)';
                cursorOutline.style.borderColor = '#ff007a';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = '#00e6ff';
            });
        });
    }

    // 3. Initialize Particles.js for Hero Background
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00e6ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff007a",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // 4. Initialize Vanilla Tilt (already initialized via data-tilt attributes, but we can configure globally if needed)
    // The library automatically picks up elements with data-tilt.

    // 5. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // 6. Initialize Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed("#typed-text", {
            strings: [
                "Scalable Backends.",
                "Robust Microservices.",
                "Modern Web Applications.",
                "Predictive ML Models.",
                "Data-Driven Solutions."
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }

    // 7. Animated Number Counters
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 100;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when About section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection && window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
        observer.observe(aboutSection);
    } else {
        animateCounters(); // Fallback
    }

    // 8. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
            }
        });
    });

    // 9. Scroll to Top & Navbar
    const scrollBtn = document.getElementById("scroll-top-btn");
    const header = document.querySelector(".glass-nav");

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }

        if (window.scrollY > 50) {
            header.style.background = "rgba(5, 5, 5, 0.9)";
            header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
        } else {
            header.style.background = "rgba(5, 5, 5, 0.6)";
            header.style.boxShadow = "none";
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 10. Cyber Contact Form
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Transmitting...</span> <i data-lucide="loader" class="icon-sm spin"></i>';
            submitBtn.disabled = true;
            if (typeof lucide !== 'undefined') lucide.createIcons();

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    submitBtn.innerHTML = '<span>Transmission Successful</span> <i data-lucide="check-circle"></i>';
                    submitBtn.style.color = "#00ff88";
                    submitBtn.style.borderColor = "#00ff88";
                    submitBtn.style.boxShadow = "0 0 20px #00ff88";
                    form.reset();

                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style = "";
                        submitBtn.disabled = false;
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }, 4000);
                } else {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                submitBtn.innerHTML = '<span>Transmission Failed</span> <i data-lucide="x-circle"></i>';
                submitBtn.style.color = "#ff007a";
                submitBtn.style.borderColor = "#ff007a";
                submitBtn.style.boxShadow = "0 0 20px #ff007a";
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style = "";
                    submitBtn.disabled = false;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }, 4000);
            }
        });
    }

    // 11. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(5,5,5,0.95)';
            navLinks.style.padding = '20px 0';
        });
    }
});