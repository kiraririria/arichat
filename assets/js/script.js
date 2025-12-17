// Навигация и мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Активное состояние навигации при скролле
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function setActiveNavItem() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href.includes(current)) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavItem);

    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.feature-card, .video-wrapper, .download-card, .wiki-article').forEach(el => {
        observer.observe(el);
    });

    // Создание частиц
    function createParticles() {
        const colors = [
            'rgba(79, 182, 243, 0.1)',  // ari-blue
            'rgba(200, 100, 104, 0.1)', // chat-red
            'rgba(57, 90, 194, 0.1)',   // accent-blue
            'rgba(41, 52, 108, 0.1)'    // dark-accent
        ];

        const particlesContainer = document.querySelector('.particles') || document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        // Очищаем существующие частицы
        particlesContainer.innerHTML = '';

        // Создаем новые частицы
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Случайные свойства
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const posX = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 20 + 20;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${posX}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);
        }
    }

    // Создаем частицы
    createParticles();

    // Обновляем частицы при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createParticles, 250);
    });

    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => {
        el.textContent = currentYear;
    });

    // Загрузка видео
    function loadVideos() {
        const videoContainers = document.querySelectorAll('.video-wrapper iframe');

        videoContainers.forEach(container => {
            container.setAttribute('loading', 'lazy');
        });
    }

    loadVideos();

    // Активная ссылка в вики
    const wikiLinks = document.querySelectorAll('.wiki-nav-link');
    wikiLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            wikiLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Прокручиваем к секции
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Добавляем анимацию
                targetSection.style.animation = 'none';
                setTimeout(() => {
                    targetSection.style.animation = 'fadeIn 0.5s ease-out';
                }, 10);
            }
        });
    });
});

// Добавление CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    
    .video-wrapper:nth-child(1) { animation-delay: 0.2s; }
    .video-wrapper:nth-child(2) { animation-delay: 0.4s; }
    
    .download-card:nth-child(1) { animation-delay: 0.1s; }
    .download-card:nth-child(2) { animation-delay: 0.3s; }
`;
document.head.appendChild(style);