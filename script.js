// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after clicking
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    console.log('Hamburger and menu found!');
    
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Hamburger clicked!');
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        
        console.log('Menu active:', navMenu.classList.contains('active'));
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            console.log('Menu closed by outside click');
        }
    });
} else {
    console.error('Hamburger or nav-menu not found!');
    console.log('Hamburger:', hamburger);
    console.log('Nav menu:', navMenu);
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-cyan)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-link').forEach(el => {
    observer.observe(el);
});

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// Glitch effect on hero title (subtle)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            heroTitle.style.textShadow = '2px 2px 0 rgba(255, 0, 110, 0.7), -2px -2px 0 rgba(0, 240, 255, 0.7)';
            setTimeout(() => {
                heroTitle.style.textShadow = 'none';
            }, 50);
        }
    }, 3000);
}

// Terminal typing effect
const terminalBody = document.querySelector('.terminal-body');
if (terminalBody) {
    const lines = Array.from(terminalBody.querySelectorAll('p'));
    const originalContent = lines.map(line => line.innerHTML);
    
    // Hide all lines initially
    lines.forEach(line => line.style.opacity = '0');
    
    // Show lines one by one
    let delay = 1000;
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.animation = 'fadeIn 0.5s ease-out';
        }, delay + (index * 200));
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    document.querySelector('.nav-menu').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
  });
});

// Parallax effect for background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('.background-circuit');
    if (background) {
        background.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project card tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Dynamic stats counter
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    stat.textContent = '0+';
                    animateValue(stat, 0, number, 1500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add random glitch effect to profile icon
const profileIcon = document.querySelector('.profile-icon');
if (profileIcon) {
    setInterval(() => {
        if (Math.random() > 0.97) {
            profileIcon.style.transform = 'translate(' + (Math.random() * 4 - 2) + 'px, ' + (Math.random() * 4 - 2) + 'px)';
            setTimeout(() => {
                profileIcon.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, 2000);
}

// Cursor trail effect (optional - can be commented out if too distracting)
let cursorTrail = [];
const trailLength = 10;

// Cursor trail effect (desktop mouse only)
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';

        trail.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: var(--primary-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.5;
            animation: trailFade 0.5s ease-out forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 500);
    });
}

// Add CSS for cursor trail animation
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);

const navContainer = document.querySelector('.nav-container');

// Add touch-friendly navigation for mobile
if (window.innerWidth <= 768) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu after clicking (if you add a hamburger menu later)
        });
    });
}

// Preload animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form handling with Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        formStatus.className = 'form-status';
        formStatus.style.display = 'none';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' }
            });

            if (response.ok) {

                // SHOW POPUP
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `
                TRANSMISSION COMPLETE<br>
                <span style="font-size:12px;opacity:.7">Message delivered</span>
                `;
                formStatus.style.display = 'block';

                contactForm.reset();

                // BUTTON → SENT
                btnText.textContent = '> MESSAGE TRANSMITTED';
                submitBtn.querySelector('.btn-icon').style.display = 'none';

                // RESET AFTER 5 SEC
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-icon').style.display = 'inline';
                }, 5000);

            } else {
                throw new Error();
            }

        } catch {

            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Something went wrong';
            formStatus.style.display = 'block';

            submitBtn.disabled = false;
            btnText.textContent = originalText;
        }
    });
}

// Add easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Performance optimization - lazy load images if added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message for developers
console.log('%c👋 Hey there, fellow developer!', 'color: #00f0ff; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #ff006e; font-size: 14px;');
console.log('%cmohitmungra2003@gmail.com', 'color: #00ff88; font-size: 12px;');
