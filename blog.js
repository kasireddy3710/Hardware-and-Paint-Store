 const themeToggle = document.getElementById('themeToggle');
        const rtlToggle = document.getElementById('rtlToggle');
        const hamburger = document.getElementById('hamburger');
        const navbar = document.getElementById('navbar');
        const dropdowns = document.querySelectorAll('.dropdown');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        // Quote Modal Elements
        const quoteModal = document.getElementById('quoteModal');
        const openQuoteModalBtn = document.getElementById('openQuoteModal');
        const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
        const modalQuoteForm = document.getElementById('modalQuoteForm');

        // Calculator Elements
        const projectTypeSelect = document.getElementById('projectType');
        const roomAreaInput = document.getElementById('roomArea');
        const qualityTierSelect = document.getElementById('qualityTier');
        const resGallons = document.getElementById('resGallons');
        const resTime = document.getElementById('resTime');
        const resCost = document.getElementById('resCost');

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
                alert('Thank you! Your quote request has been submitted successfully. Our team will get back to you shortly.');
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

        // ================= BLOG FILTERING =================
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                blogCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // ================= INTERACTIVE DIY CALCULATOR LOGIC =================
        function updateCalculator() {
            const area = parseFloat(roomAreaInput.value) || 0;
            const quality = qualityTierSelect.value;
            const type = projectTypeSelect.value;

            let gallons = Math.ceil(area / 350);
            if (type === 'cabinet') gallons = Math.max(1, Math.ceil(area / 200));

            let baseCostPerGallon = quality === 'premium' ? 65 : 40;
            let materialCost = gallons * baseCostPerGallon;
            let sundries = 35;
            let totalCost = materialCost + sundries;

            let hours = Math.round((area / 60) * 10) / 10;

            resGallons.textContent = `${gallons} Gallon(s)`;
            resTime.textContent = `${hours} Hours`;
            resCost.textContent = `$${totalCost.toFixed(2)}`;
        }

        projectTypeSelect.addEventListener('change', updateCalculator);
        roomAreaInput.addEventListener('input', updateCalculator);
        qualityTierSelect.addEventListener('change', updateCalculator);

        updateCalculator();

        // Sticky Header Shadow on Scroll
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });