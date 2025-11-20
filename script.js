// Wedding Invitation A - Ana & Bruno
// Elegant Wedding Theme

// Envelope opening animation
document.addEventListener('DOMContentLoaded', function() {
    const envelopeOverlay = document.getElementById('envelopeOverlay');
    const waxSeal = document.getElementById('waxSeal');
    const mainContent = document.getElementById('mainContent');
    
    // Handle envelope opening
    waxSeal.addEventListener('click', function() {
        // Hide envelope with fade effect
        envelopeOverlay.style.opacity = '0';
        setTimeout(() => {
            envelopeOverlay.style.display = 'none';
            document.body.classList.remove('preload');
            mainContent.style.opacity = '1';
            mainContent.classList.add('reveal-content');
            
            // Start animations
            initAnimations();
            createEnvelopeRain();
            showGuestAlert();
        }, 1500);
    });
    
    // Auto-open after 3 seconds if not clicked
    setTimeout(() => {
        if (envelopeOverlay.style.display !== 'none') {
            waxSeal.click();
        }
    }, 3000);
});

// Wedding countdown timer
const countdownDate = new Date('2026-06-15T16:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        // Wedding day arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show special message
        const countdownFooter = document.querySelector('.countdown-footer');
        if (countdownFooter) {
            countdownFooter.textContent = '¡Hoy es nuestro gran día!';
            countdownFooter.style.color = 'var(--dorado-elegante)';
            countdownFooter.style.fontWeight = 'bold';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// RSVP Modal functionality
function openRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRSVP() {
    const modal = document.getElementById('rsvpModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('rsvpModal');
    if (event.target === modal) {
        closeRSVP();
    }
});

// RSVP Form handling
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value.trim();
    const attendance = document.getElementById('attendance').value;
    const guestCount = document.getElementById('guestCount').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !attendance) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    // Show response message
    const responseDiv = document.getElementById('responseMessage');
    responseDiv.style.display = 'block';
    
    if (attendance === 'si') {
        responseDiv.innerHTML = `
            <i class="fas fa-heart" style="margin-right: 10px;"></i>
            ¡Gracias ${name}! Hemos recibido tu confirmación. 
            ¡Esperamos verte en nuestra boda el 15 de junio!
        `;
        responseDiv.style.background = 'var(--azul-real)';
        
        // Update guest alert
        updateGuestAlert(`¡${name}, esperamos verte en nuestra boda!`);
    } else {
        responseDiv.innerHTML = `
            <i class="fas fa-heart-broken" style="margin-right: 10px;"></i>
            Lamentamos que no puedas acompañarnos, ${name}. 
            ¡Gracias por informarnos!
        `;
        responseDiv.style.background = 'var(--gris-plata)';
    }
    
    // Hide form and show only message
    document.querySelector('#rsvpForm').style.display = 'none';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeRSVP();
        document.querySelector('#rsvpForm').style.display = 'block';
        responseDiv.style.display = 'none';
        document.getElementById('rsvpForm').reset();
    }, 4000);
});

// Show/hide guest count field based on attendance
document.getElementById('attendance').addEventListener('change', function() {
    const guestCountGroup = document.getElementById('guestCountGroup');
    if (this.value === 'si') {
        guestCountGroup.style.display = 'block';
    } else {
        guestCountGroup.style.display = 'none';
    }
});

// Music functionality
let musicPlaying = false;
const backgroundMusic = document.getElementById('backgroundMusic');

function toggleMusic() {
    const musicButton = document.getElementById('musicButton');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');
    
    if (!musicPlaying) {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.className = 'fas fa-pause';
            musicText.textContent = 'Pausar';
            musicButton.style.background = 'linear-gradient(135deg, var(--dorado-elegante), #ffb300)';
            musicButton.style.color = 'var(--azul-marino)';
        }).catch(error => {
            console.log('Error playing music:', error);
        });
    } else {
        backgroundMusic.pause();
        musicPlaying = false;
        musicIcon.className = 'fas fa-music';
        musicText.textContent = 'Música';
        musicButton.style.background = 'linear-gradient(135deg, var(--azul-marino), var(--azul-real))';
        musicButton.style.color = 'white';
    }
}

// Create falling envelope animation
function createEnvelopeRain() {
    const giftSection = document.querySelector('.gift-section');
    const envelopeRain = giftSection.querySelector('.envelope-rain');
    
    function createEnvelope() {
        const envelope = document.createElement('div');
        envelope.className = 'envelope';
        
        // Random horizontal position
        envelope.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (8-15 seconds)
        const duration = Math.random() * 7 + 8;
        envelope.style.animationDuration = duration + 's';
        
        // Random delay
        envelope.style.animationDelay = Math.random() * 2 + 's';
        
        envelopeRain.appendChild(envelope);
        
        // Remove envelope after animation
        setTimeout(() => {
            if (envelope.parentNode) {
                envelope.parentNode.removeChild(envelope);
            }
        }, (duration + 2) * 1000);
    }
    
    // Create envelopes periodically
    setInterval(createEnvelope, 1500);
    
    // Create initial envelopes
    for (let i = 0; i < 8; i++) {
        setTimeout(createEnvelope, i * 300);
    }
}

// Guest alert functionality
function showGuestAlert() {
    setTimeout(() => {
        const alert = document.getElementById('guestAlert');
        alert.classList.add('visible');
        
        // Hide after 5 seconds
        setTimeout(() => {
            alert.classList.remove('visible');
        }, 5000);
    }, 2000);
}

function updateGuestAlert(message) {
    const alertText = document.getElementById('alertText');
    const alert = document.getElementById('guestAlert');
    
    alertText.textContent = message;
    alert.classList.add('visible');
    
    setTimeout(() => {
        alert.classList.remove('visible');
    }, 4000);
}

// Smooth scrolling for navigation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize animations
function initAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe animated elements
    document.querySelectorAll('.animate').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Add floating animation to rings
document.addEventListener('DOMContentLoaded', () => {
    const rings = document.querySelectorAll('.rings-animation i');
    rings.forEach((ring, index) => {
        ring.style.animationDelay = `${index * 0.3}s`;
    });
});

// Wedding day special effects
function checkWeddingDay() {
    const today = new Date();
    const weddingDay = new Date('2026-06-15');
    
    if (today.toDateString() === weddingDay.toDateString()) {
        // Add special wedding day effects
        document.body.classList.add('wedding-day');
        
        // Create heart particles
        createHeartParticles();
        
        // Change background music to wedding march
        if (backgroundMusic) {
            backgroundMusic.src = 'wedding-march.mp3';
        }
        
        // Show special wedding day message
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 215, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 2s ease-out;
            ">
                <div style="text-align: center; color: var(--azul-marino);">
                    <h1 style="font-size: 4rem; margin-bottom: 1rem;">¡ES HOY!</h1>
                    <p style="font-size: 1.5rem;">Ana & Bruno se casan hoy</p>
                    <i class="fas fa-heart" style="font-size: 3rem; color: red; animation: pulse 1s infinite;"></i>
                </div>
            </div>
        `;
        
        document.body.appendChild(specialMessage);
        
        setTimeout(() => {
            specialMessage.remove();
        }, 5000);
    }
}

function createHeartParticles() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100vh';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }, 500);
}

// Add CSS for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Check if it's the wedding day
checkWeddingDay();

// Console message for developers
console.log(`
    💍 Ana & Bruno Wedding Invitation 💍
    =====================================
    Built with love and JavaScript
    Wedding Date: June 15, 2026
    Theme: Elegant Navy & Gold
    =====================================
    May your love story be as beautiful as this code!
`);