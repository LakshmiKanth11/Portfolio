/* ============================================================
   LAKSHMI KANTH V — PORTFOLIO JAVASCRIPT
   Antigravity Theme — Particles, Custom Cursor, Animations
   ============================================================
   HOW TO EDIT:
   - Typing roles:     Change the "roles" array below
   - Particle count:   Change PARTICLE_COUNT below
   - Animation speed:  Adjust transition durations in CSS
   ============================================================ */

// ── CONFIGURATION (Easy to edit) ──────────────────────────────
const CONFIG = {
    // ★ Change these to update what the hero types out
    roles: [
        "Data Analyst",
        "Python Developer",
        "SQL Specialist",
        "BI Dashboard Creator",
        "Data Storyteller"
    ],
    typingSpeed: 80,       // ms per character
    deletingSpeed: 40,     // ms per character when deleting
    pauseDuration: 2000,   // ms to pause before deleting

    // ★ Particle settings
    PARTICLE_COUNT: 80,
    PARTICLE_COLOR: "rgba(108, 99, 255, 0.4)",
    LINE_COLOR: "rgba(108, 99, 255, 0.08)",
    MAX_LINE_DIST: 150,
};

// ══════════════════════════════════════════════════════════════
//  CUSTOM CURSOR (Glow + magnetic effect)
// ══════════════════════════════════════════════════════════════
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth trailing ring
function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Hover effect on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .btn, .case-card, .skill-category, .cert-card, .contact-card, .highlight, .timeline-content');
interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorRing.classList.add('hover');
        cursorDot.classList.add('trail');
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('hover');
        cursorDot.classList.remove('trail');
    });
});

// Click effect
document.addEventListener('mousedown', () => cursorRing.classList.add('clicking'));
document.addEventListener('mouseup', () => cursorRing.classList.remove('clicking'));


// ══════════════════════════════════════════════════════════════
//  PARTICLES BACKGROUND (Antigravity floating network)
// ══════════════════════════════════════════════════════════════
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion (antigravity push)
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
        }

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.PARTICLE_COLOR;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Initialize particles
for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONFIG.MAX_LINE_DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = CONFIG.LINE_COLOR;
                ctx.globalAlpha = 1 - dist / CONFIG.MAX_LINE_DIST;
                ctx.lineWidth = 0.5;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    animId = requestAnimationFrame(animateParticles);
}
animateParticles();


// ══════════════════════════════════════════════════════════════
//  TYPING ANIMATION (Hero Section)
// ══════════════════════════════════════════════════════════════
const typingEl = document.getElementById('typingText');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = CONFIG.roles[roleIndex];

    if (!isDeleting) {
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, CONFIG.pauseDuration);
            return;
        }
        setTimeout(typeRole, CONFIG.typingSpeed);
    } else {
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % CONFIG.roles.length;
        }
        setTimeout(typeRole, CONFIG.deletingSpeed);
    }
}
setTimeout(typeRole, 600);


// ══════════════════════════════════════════════════════════════
//  SCROLL-TRIGGERED REVEAL ANIMATIONS
// ══════════════════════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ══════════════════════════════════════════════════════════════
//  SKILL BAR FILL ANIMATION
// ══════════════════════════════════════════════════════════════
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const level = fill.getAttribute('data-level');
                fill.style.width = level + '%';
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));


// ══════════════════════════════════════════════════════════════
//  NAVBAR SCROLL EFFECT + ACTIVE LINK
// ══════════════════════════════════════════════════════════════
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Frosted navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});


// ══════════════════════════════════════════════════════════════
//  STAT COUNTER ANIMATION
// ══════════════════════════════════════════════════════════════
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const step = Math.max(1, Math.floor(target / 30));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    counter.textContent = current;
                }, 40);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);


// ══════════════════════════════════════════════════════════════
//  MOBILE HAMBURGER MENU
// ══════════════════════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});


// ══════════════════════════════════════════════════════════════
//  MAGNETIC BUTTON EFFECT
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});


// ══════════════════════════════════════════════════════════════
//  TILT EFFECT ON CARDS
// ══════════════════════════════════════════════════════════════
document.querySelectorAll('.case-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 6;
        const tiltY = (x - 0.5) * -6;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


// ══════════════════════════════════════════════════════════════
//  CURSOR TRAIL SPARKLES
// ══════════════════════════════════════════════════════════════
let sparkleThrottle = 0;
document.addEventListener('mousemove', (e) => {
    sparkleThrottle++;
    if (sparkleThrottle % 4 !== 0) return; // Only every 4th move event

    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 4px;
        height: 4px;
        background: rgba(108, 99, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleFade 0.6s ease-out forwards;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 6px rgba(108, 99, 255, 0.4);
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
});

// Inject sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFade {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0) translateY(-20px); }
    }
`;
document.head.appendChild(sparkleStyle);


console.log('✨ Portfolio loaded — Antigravity mode active!');
