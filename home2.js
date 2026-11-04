const themeToggle = document.getElementById('themeToggle');
        const rtlToggle = document.getElementById('rtlToggle');
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Quote Modal Elements
        const quoteModal = document.getElementById('quoteModal');
        const openQuoteModalBtn = document.getElementById('openQuoteModal');
        const heroOpenQuoteBtn = document.getElementById('heroOpenQuote');
        const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
        const modalQuoteForm = document.getElementById('modalQuoteForm');

        // ================= THEME SWITCHER =================
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const icon = themeToggle.querySelector('i');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }

        // ================= RTL TOGGLE =================
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            if (currentDir === 'rtl') {
                document.documentElement.setAttribute('dir', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
            }
        });

        // ================= GET A QUOTE MODAL HANDLERS =================
        const toggleModalState = (open) => {
            if(open) {
                quoteModal.classList.add('active');
            } else {
                quoteModal.classList.remove('active');
            }
        };

        openQuoteModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModalState(true);
        });

        if(heroOpenQuoteBtn) {
            heroOpenQuoteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModalState(true);
            });
        }

        closeQuoteModalBtn.addEventListener('click', () => toggleModalState(false));

        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) {
                toggleModalState(false);
            }
        });

        if (modalQuoteForm) {
            modalQuoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! Your quote request has been submitted successfully. Our sales team will get back to you shortly.');
                modalQuoteForm.reset();
                toggleModalState(false);
            });
        }

        // ================= MOBILE MENU TOGGLE =================
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if(!link.parentElement.classList.contains('dropdown')) {
                    navbar.classList.remove('active');
                    hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });

        dropdowns.forEach(drop => {
            drop.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    drop.classList.toggle('active');
                }
            });
        });

        // ================= NUMBER COUNTING MOTION ANIMATION =================
        const statsSection = document.getElementById('statsSection');
        const statNumbers = document.querySelectorAll('.stat-number');
        let animated = false;

        const runCounter = () => {
            statNumbers.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
                let duration = 2000;
                let startTime = null;

                const updateCount = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    let progress = currentTime - startTime;
                    let currentVal = Math.min(progress / duration, 1) * target;

                    if (decimals > 0) {
                        counter.innerText = currentVal.toFixed(decimals) + suffix;
                    } else {
                        counter.innerText = Math.floor(currentVal) + suffix;
                    }

                    if (progress < duration) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
                    }
                };

                requestAnimationFrame(updateCount);
            });
        };

        const observerOptions = {
            root: null,
            threshold: 0.3
        };

        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    runCounter();
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // ================= SCROLL REVEAL ANIMATIONS =================
        const revealObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, revealObserverOptions);

        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            revealObserver.observe(el);
        });

        // ================= HEADER SHADOW ON SCROLL =================
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            const header = document.getElementById('header');
            
            if (scrollPos > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }); 