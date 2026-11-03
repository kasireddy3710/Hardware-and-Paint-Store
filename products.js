const themeToggle = document.getElementById('themeToggle');
        const rtlToggle = document.getElementById('rtlToggle');
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');
        const dropdowns = document.querySelectorAll('.dropdown');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        // Quote Modal Elements
        const quoteModal = document.getElementById('quoteModal');
        const openQuoteModalBtn = document.getElementById('openQuoteModal');
        const heroOpenQuoteBtn = document.getElementById('heroOpenQuote');
        const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
        const modalQuoteForm = document.getElementById('modalQuoteForm');

        // Quote Calculator Elements
        const projectTypeSelect = document.getElementById('projectType');
        const projectScaleInput = document.getElementById('projectScale');
        const estimatedPriceEl = document.getElementById('estimatedPrice');

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
                alert('Thank you! Your quote request has been submitted successfully. Our products team will get back to you shortly.');
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

        dropdowns.forEach(drop => {
            drop.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    drop.classList.toggle('active');
                }
            });
        });

        // ================= PRODUCT FILTERING WITH FADE EFFECT =================
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 200);
                });
            });
        });

        // ================= INSTANT QUOTE ESTIMATOR LOGIC =================
        function updateEstimate() {
            const baseRate = parseFloat(projectTypeSelect.value) || 0;
            const scale = parseInt(projectScaleInput.value) || 1;
            const total = baseRate * scale * 10;
            estimatedPriceEl.textContent = '$' + total.toFixed(2);
        }

        projectTypeSelect.addEventListener('change', updateEstimate);
        projectScaleInput.addEventListener('input', updateEstimate);

        // Header shadow on scroll for sticky header
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                header.style.boxShadow = 'none';
            }
        });