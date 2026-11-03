 const themeToggle = document.getElementById('themeToggle');
        const rtlToggle = document.getElementById('rtlToggle');
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const contactForm = document.getElementById('contactForm');
        const dropdowns = document.querySelectorAll('.dropdown');

        // Quote Modal Elements
        const quoteModal = document.getElementById('quoteModal');
        const openQuoteModalBtn = document.getElementById('openQuoteModal');
        const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
        const modalQuoteForm = document.getElementById('modalQuoteForm');

        // ================= SCROLL REVEAL ANIMATION OBSERVER =================
        const observerOptions = {
            threshold: 0.15
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(section => {
            scrollObserver.observe(section);
        });

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

        // ================= SCROLL HEADER SHADOW =================
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            const header = document.getElementById('header');
            
            if (scrollPos > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });

        // ================= STORE MAP SWITCHER =================
        function switchMapLocation(element, mapUrl) {
            document.querySelectorAll('.branch-item').forEach(item => item.classList.remove('active'));
            element.classList.add('active');
            const mapFrame = document.getElementById('storeMapFrame');
            mapFrame.style.opacity = '0.3';
            mapFrame.src = mapUrl;
            setTimeout(() => {
                mapFrame.style.opacity = '1';
            }, 300);
        }

        // ================= INTERACTIVE PAINT VISUALIZER =================
        const colorButtons = document.querySelectorAll('.color-btn');
        const colorOverlay = document.getElementById('colorOverlay');

        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const selectedColor = btn.getAttribute('data-color');
                colorOverlay.style.backgroundColor = selectedColor;
            });
        });

        // ================= FAQ ACCORDION FUNCTIONALITY =================
        const faqCards = document.querySelectorAll('.faq-card');
        faqCards.forEach(card => {
            const header = card.querySelector('.faq-card-header');
            header.addEventListener('click', () => {
                const isOpen = card.classList.contains('open');
                faqCards.forEach(c => c.classList.remove('open'));
                if (!isOpen) {
                    card.classList.add('open');
                }
            });
        });

        // ================= CONTACT FORM SUBMISSION =================
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you for reaching out! Our hardware & paint support team will get back to you shortly.');
                contactForm.reset();
            });
        }