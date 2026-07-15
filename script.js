// --- Initialisation de Vercel Analytics ---
// Note : Pour un site en HTML pur, on utilise généralement le script auto-injecté par Vercel 
// ou la version injectée via le tableau de bord Vercel. 
// Si tu veux le faire manuellement en JS, utilise cette méthode compatible :

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DARK MODE TOGGLE ---
    const themeSwitch = document.getElementById('theme-switch');

    if (themeSwitch) {
        const themeIcon = themeSwitch.querySelector('i');

        // Appliquer le thème sauvegardé dès le départ
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // --- 2. MENU MOBILE & ACTIVE LINK ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Gestion du lien actif au scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. FILTRES DE PROJETS ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('bg-white');
                btn.classList.remove('text-white');
            });
            button.classList.add('active');
            button.classList.remove('bg-white');

            const filterValue = button.getAttribute('data-filter');

            let visibleCount = 0;
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
                    visibleCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });

            const noProjectsMsg = document.getElementById('no-projects-msg');
            if (noProjectsMsg) {
                if (visibleCount === 0) {
                    setTimeout(() => {
                        noProjectsMsg.style.display = 'flex';
                        setTimeout(() => { noProjectsMsg.style.opacity = '1'; noProjectsMsg.style.transform = 'scale(1)'; }, 10);
                    }, 300);
                } else {
                    noProjectsMsg.style.opacity = '0';
                    noProjectsMsg.style.transform = 'scale(0.9)';
                    setTimeout(() => { noProjectsMsg.style.display = 'none'; }, 300);
                }
            }
        });
    });

    // --- 4. SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentGallery = [];
    let currentIndex = 0;
    let isGallery = false;

    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const type = trigger.getAttribute('data-type');

            if (type === 'video') {
                isGallery = false;
                lightboxImg.style.display = 'none';
                lightboxVideo.style.display = 'block';
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                lightboxVideo.src = trigger.getAttribute('data-src');
                lightboxVideo.load();
            } else if (type === 'gallery') {
                isGallery = true;
                currentGallery = trigger.getAttribute('data-gallery').split(',');
                currentIndex = 0;
                lightboxImg.style.display = 'block';
                lightboxVideo.style.display = 'none';
                if (prevBtn) prevBtn.style.display = 'flex';
                if (nextBtn) nextBtn.style.display = 'flex';
                lightboxImg.src = currentGallery[currentIndex].trim();
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove('active');
            if (lightboxVideo) lightboxVideo.pause();
            document.body.style.overflow = 'auto';
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            if (form.action && form.action.startsWith("mailto:")) return;
            event.preventDefault();

            // Detect page language from the <html lang="en"> tag
            const lang = document.documentElement.lang;

            // Set default English messages
            let msgSuccess = "MESSAGE SENT SUCCESSFULLY!";
            let msgError = "ERROR SENDING MESSAGE.";
            let msgSending = "SENDING...";
            let msgBtn = "SEND MESSAGE";

            // Swap to French if needed
            if (lang === "fr") {
                msgSuccess = "MESSAGE ENVOYÉ AVEC SUCCÈS !";
                msgError = "ERREUR LORS DE L'ENVOI.";
                msgSending = "ENVOI EN COURS...";
                msgBtn = "ENVOYER";
            }
            // Swap to Italian if needed
            else if (lang === "it") {
                msgSuccess = "MESSAGGIO INVIATO CON SUCCESSO!";
                msgError = "ERRORE DURANTE L'INVIO.";
                msgSending = "INVIO IN CORSO...";
                msgBtn = "INVIA MESSAGGIO";
            }

            const status = document.getElementById("form-status");
            const btn = form.querySelector('button');
            btn.innerHTML = `<i class='fas fa-circle-notch fa-spin'></i> ${msgSending}`;

            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    status.innerHTML = msgSuccess;
                    status.style.color = "var(--green)";
                    form.reset();
                } else {
                    status.innerHTML = msgError;
                    status.style.color = "var(--pink)";
                }
            }).finally(() => {
                setTimeout(() => { btn.innerHTML = `<i class='fas fa-paper-plane'></i> ${msgBtn}`; }, 2000);
            });
        });
    }
});


const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
    // Position du point central (instantanée)
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';

    // Position de l'anneau (décalée pour centrer)
    ring.style.left = (e.clientX - 11) + 'px';
    ring.style.top = (e.clientY - 11) + 'px';
});

// Ajouter l'effet de survol
const interactables = document.querySelectorAll('a, button, .brutal-btn, .project-card');

interactables.forEach(link => {
    link.addEventListener('mouseover', () => {
        document.body.classList.add('cursor-hover');
    });
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});