document.addEventListener('DOMContentLoaded', () => {
    // Get all elements
    const home = document.getElementById('home');
    const quadrants = document.querySelectorAll('.quadrant');
    const contentPages = document.querySelectorAll('.content-page');
    const closeButtons = document.querySelectorAll('.close-btn');
    const yesButton = document.getElementById('yes-btn');

    // Quadrant click handlers
    quadrants.forEach(quadrant => {
        quadrant.addEventListener('click', () => {
            const pageId = quadrant.getAttribute('data-page');
            const targetPage = document.getElementById(pageId);

            if (targetPage) {
                // Hide home with animation
                gsap.to(home, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.5,
                    onComplete: () => {
                        home.classList.add('hidden');
                    }
                });

                // Show target page with animation
                targetPage.classList.add('active');
                gsap.from(targetPage, {
                    opacity: 0,
                    y: 50,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                });

                // Animate content cards
                const cards = targetPage.querySelectorAll('.info-card, .memory-item, .letter, .confession-letter');
                gsap.from(cards, {
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.5,
                    delay: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Close button handlers
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentPage = btn.closest('.content-page');

            // Hide current page
            gsap.to(currentPage, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    currentPage.classList.remove('active');
                }
            });

            // Show home
            home.classList.remove('hidden');
            gsap.to(home, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
    });

    // Yes button confetti
    if (yesButton) {
        yesButton.addEventListener('click', () => {
            // Trigger confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const colors = ['#FFC5D3', '#FF8DA1', '#FFA6C9', '#FFE5EC', '#FF5C8A'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            // Show message
            setTimeout(() => {
                alert('Cảm ơn em! Anh hứa sẽ làm em hạnh phúc mỗi ngày! ❤️❤️❤️');
            }, 1000);
        });
    }

    // Heart Particles System
    const container = document.getElementById('particles-js');

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = "❤️";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100vh";
        heart.style.fontSize = (Math.random() * 20 + 15) + "px";
        heart.style.opacity = Math.random() * 0.6 + 0.2;
        heart.style.transition = "all 6s linear";
        heart.style.zIndex = "-1";
        heart.style.pointerEvents = "none";

        container.appendChild(heart);

        setTimeout(() => {
            heart.style.top = "-10vh";
            heart.style.transform = `translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => {
            heart.remove();
        }, 6500);
    }

    // Create hearts periodically
    setInterval(createHeart, 400);

    // Initial animation for home screen
    gsap.from('.quadrant-container', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    });

    gsap.from('.home-title', {
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.5
    });

    gsap.from('.home-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.7
    });
});
