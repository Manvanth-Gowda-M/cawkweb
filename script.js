// ========================================
// CAREANYWHERE KITS (CAWK) - JAVASCRIPT
// ========================================

// 1. Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false, // keep native scroll on touch for better mobile feel, but animation still hooks in
    touchMultiplier: 2,
    infinite: false,
})

// Integrate Lenis with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// 2. Loader and Initial Animations (Framer Motion style)
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('#loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.5
    })
    .from('.logo', {
        y: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, "-=0.2")
    .from('.navbar .btn-nav, .hamburger', {
        y: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, "-=0.4")
    .from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
    }, "-=0.2")
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.3")
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, "-=0.6")
    .from('.hero-cta .btn', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    }, "-=0.6")
    .from('.hero-trust .trust-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    }, "-=0.4");
});

// 3. ScrollTrigger Animations
// Navbar shadow and Mobile CTA on scroll
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

lenis.on('scroll', (e) => {
    // Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Section Headers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// Benefit Cards Stagger
gsap.from('.benefit-card', {
    scrollTrigger: {
        trigger: '.benefits-grid',
        start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out"
});

// Product Section
gsap.utils.toArray('.product-showcase').forEach(showcase => {
    const productTl = gsap.timeline({
        scrollTrigger: {
            trigger: showcase,
            start: "top 80%"
        }
    });
    
    productTl.from(showcase.querySelector('.product-image'), {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }).from(showcase.querySelectorAll('.product-details > *'), {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.6");
});

// Steps
gsap.from('.step', {
    scrollTrigger: {
        trigger: '.steps-container',
        start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "back.out(1.5)"
});

// Order Form
gsap.from('.order-form-container', {
    scrollTrigger: {
        trigger: '.order-wrapper',
        start: "top 85%"
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});


// 4. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // Close menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Smooth scroll to target using lenis
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, { offset: -80 });
        }
    });
});

// 5. Order Form Logic
const quantitySelect = document.getElementById('quantity');
const kitTypeSelect = document.getElementById('kitType');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');

function updateOrderSummary() {
    // Disabled dynamically updating prices in the UI as requested 
}

quantitySelect.addEventListener('change', updateOrderSummary);
kitTypeSelect.addEventListener('change', updateOrderSummary);

// Handle Submit
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const quantity = quantitySelect.value;
    const kitType = kitTypeSelect.value;
    
    // Validate phone number
    if (!/^[0-9]{10}$/.test(phone)) {
        showNotification('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    const message = `Hello CAWK, I want to order:\n\nName: ${fullName}\nPhone: ${phone}\nAddress: ${address}\nKit Type: ${kitType}\nQuantity: ${quantity} Kit(s)\n\nPlease share the pricing details. I found you on your website!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919535917824?text=${encodedMessage}`;
    
    showNotification('Redirecting to WhatsApp...', 'success');
    
    // Direct redirect prevents popup blockers compared to setTimeout
    window.location.href = whatsappUrl;
});

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    gsap.fromTo(notification, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );
    
    setTimeout(() => {
        gsap.to(notification, {
            x: 100, opacity: 0, duration: 0.3, onComplete: () => notification.remove()
        });
    }, 3000);
}
