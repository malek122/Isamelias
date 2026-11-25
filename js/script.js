document.addEventListener('DOMContentLoaded', () => {

    // --- Announcement Banner ---
    const banner = document.getElementById('announcement-banner');
    const bannerClose = document.getElementById('banner-close');
    const BANNER_KEY = 'isam-announcement-dismissed';

    if (banner) {
        if (localStorage.getItem(BANNER_KEY) === 'true') {
            banner.classList.add('hidden');
        } else {
            document.body.classList.add('banner-visible');
            // Set CSS var so navbar offset matches actual banner height
            const setBannerH = () => {
                document.documentElement.style.setProperty('--banner-h', banner.offsetHeight + 'px');
            };
            setBannerH();
            window.addEventListener('resize', setBannerH);
        }

        if (bannerClose) {
            bannerClose.addEventListener('click', () => {
                banner.classList.add('hidden');
                document.body.classList.remove('banner-visible');
                document.documentElement.style.removeProperty('--banner-h');
                localStorage.setItem(BANNER_KEY, 'true');
            });
        }
    }

    // --- Intro Overlay ---
    const intro = document.getElementById('intro');
    if (intro) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            intro.classList.add('fade-out');
            intro.addEventListener('transitionend', () => {
                intro.remove();
                document.body.style.overflow = '';
            }, { once: true });
        }, 2600);
    }

    // --- Mobile Menu Logic ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Events Data ---
    // Format: { date: 'YYYY-MM-DD', venue, city }. Past/upcoming is computed from today's date,
    // so the "Upcoming" list updates itself — just add new shows here.
    const events = [
        // 2025
        { date: '2025-01-11', venue: 'La Flèche d\'Or', city: 'Paris, France' },
        { date: '2025-02-15', venue: 'L\'Alimentation Générale', city: 'Paris, France' },
        { date: '2025-05-21', venue: 'La Cité Internationale des Arts', city: 'Paris, France' },
        { date: '2025-05-24', venue: 'Le Chinois', city: 'Paris, France' },
        { date: '2025-05-30', venue: 'Pom & Pépin', city: 'Paris, France' },
        { date: '2025-06-07', venue: 'Festival Orizons', city: 'Périgueux, France' },
        { date: '2025-06-14', venue: 'La Friche la Belle de Mai', city: 'Marseille, France' },
        { date: '2025-06-19', venue: 'Babour Sauvage', city: 'Paris, France' },
        { date: '2025-06-20', venue: 'La Cité des Arts Montmartre', city: 'Paris, France' },
        { date: '2025-06-21', venue: 'Snooze', city: 'Paris, France' },
        { date: '2025-06-21', venue: 'Malakoff en Fête', city: 'Malakoff, France' },
        { date: '2025-06-28', venue: 'Le Relais', city: 'Pantin, France' },
        { date: '2025-07-05', venue: 'Ibraaz', city: 'London, UK' },
        { date: '2025-07-18', venue: 'Festival Les Suds', city: 'Arles, France' },
        { date: '2025-07-19', venue: 'Détours du Monde', city: 'Chanac, France' },
        { date: '2025-07-25', venue: 'Sfinks Festival', city: 'Belgium' },
        { date: '2025-08-28', venue: 'Festival Fisel', city: 'Rostrenen, France' },
        { date: '2025-09-12', venue: 'Festival Arabesques', city: 'Montpellier, France' },
        { date: '2025-09-13', venue: 'Théâtre de la Mer', city: 'Sète, France' },
        { date: '2025-09-19', venue: 'L\'Boulevard Festival', city: 'Casablanca, Morocco' },
        { date: '2025-09-26', venue: 'Bamba Crew', city: 'Nantes, France' },
        { date: '2025-10-18', venue: 'Gwangju Busking Club', city: 'Gwangju, South Korea' },
        { date: '2025-10-25', venue: 'La Station – Gare des Mines', city: 'Paris, France' },
        { date: '2025-11-21', venue: 'Visa For Music', city: 'Rabat, Morocco' },
        { date: '2025-12-31', venue: 'Tunis sur Scène', city: 'Aubervilliers, France' },

        // 2026
        { date: '2026-01-16', venue: 'L\'Alimentation Générale', city: 'Paris, France' },
        { date: '2026-01-23', venue: 'Le Makeda', city: 'Marseille, France' },
        { date: '2026-01-31', venue: 'FGO-Barbara', city: 'Paris, France' },
        { date: '2026-02-12', venue: 'Au Fil des Voix', city: 'Paris, France' },
        { date: '2026-03-20', venue: 'Babel Music XP', city: 'Marseille, France' },
        { date: '2026-04-10', venue: 'L\'Alimentation Générale', city: 'Paris, France' },
        { date: '2026-05-16', venue: '', city: 'Helsinki, Finland' },
        { date: '2026-05-22', venue: 'La Kulture', city: 'Strasbourg, France' },
        { date: '2026-05-23', venue: 'Festival La Rue Libre', city: 'La Salvetat-Peyralès, France' },
        { date: '2026-05-30', venue: 'La Fête du Pois Chiche', city: 'Montaren-et-Saint-Médiers, France' },
        { date: '2026-05-31', venue: 'Musée des Confluences', city: 'Lyon, France' },
        { date: '2026-06-05', venue: 'La Bellevilloise', city: 'Paris, France' },
        { date: '2026-06-06', venue: 'Stereolux', city: 'Nantes, France' },
        { date: '2026-06-13', venue: 'Institut du Monde Arabe (IMA)', city: 'Paris, France' },
        { date: '2026-06-21', venue: 'Canal 93', city: 'Bobigny, France' },
        { date: '2026-06-25', venue: 'Fusion Festival', city: 'Lärz, Germany' },
        { date: '2026-06-27', venue: 'Nuits Métis', city: 'Miramas, France' },
        { date: '2026-07-19', venue: 'Les Vieilles Charrues', city: 'Carhaix, France' },
        { date: '2026-07-25', venue: 'FMM Sines', city: 'Sines, Portugal' },
        { date: '2026-07-31', venue: 'Rhybadi', city: 'Schaffhausen, Switzerland' },
        { date: '2026-09-03', venue: 'L\'Alimentation Générale', city: 'Paris, France' },
        { date: '2026-09-12', venue: '', city: 'Bonac, France' },
        { date: '2026-09-22', venue: 'The Piano Man', city: 'New Delhi, India' },
        { date: '2026-09-24', venue: 'AMPM', city: 'Kolkata, India' },
        { date: '2026-09-26', venue: 'Ziro Festival', city: 'Ziro, India' },
        { date: '2026-09-30', venue: 'Soho House', city: 'Mumbai, India' },
        { date: '2026-10-03', venue: 'The Pleasance Theatre', city: 'London, UK' },
        { date: '2026-10-15', venue: 'MaMA Festival', city: 'Paris, France' },
        { date: '2026-10-23', venue: 'Jodhpur RIFF', city: 'Jodhpur, India' },
        { date: '2026-11-07', venue: 'MuCEM', city: 'Marseille, France' },
        { date: '2026-11-19', venue: 'Cabaret Sauvage', city: 'Paris, France' },
        { date: '2026-12-03', venue: 'Bars en Trans', city: 'Rennes, France' },
        { date: '2026-12-19', venue: 'L\'Alimentation Générale', city: 'Paris, France' }
    ];

    // --- Tour Rendering ---
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const todayKey = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
    const isUpcoming = e => e.date >= todayKey; // ISO strings compare correctly

    function eventHTML(event) {
        const [y, m, d] = event.date.split('-');
        const title = event.venue || event.city;
        const sub = event.venue ? event.city : '';
        return `
            <span class="tour-date"><span class="tour-day">${d}</span> ${MONTHS[parseInt(m, 10) - 1]} ${y}</span>
            <span class="tour-location">
                <span class="tour-venue-name">${title}</span>
                ${sub ? `<span class="tour-city">${sub}</span>` : ''}
            </span>`;
    }

    // Tour stats in the banner (derived from the data above, so it stays accurate)
    const statsEl = document.getElementById('tour-stats');
    if (statsEl) {
        const countries = new Set(events.map(e => e.city.split(',').pop().trim()));
        const played = events.filter(e => !isUpcoming(e)).length;
        statsEl.innerHTML = `<span>${played}+ shows</span><span>${countries.size} countries</span><span>since 2025</span>`;
    }

    // Upcoming shows (always visible, across all years)
    const upcomingWrap = document.getElementById('tour-upcoming');
    const upcomingList = document.getElementById('tour-upcoming-list');
    if (upcomingWrap && upcomingList) {
        const upcoming = events.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
        if (upcoming.length === 0) {
            upcomingWrap.hidden = true;
        } else {
            upcoming.forEach((event, i) => {
                const item = document.createElement('div');
                item.className = 'tour-item tour-item-upcoming' + (i === 0 ? ' is-next' : '');
                item.innerHTML = eventHTML(event) + (i === 0 ? '<span class="tour-badge">Next show</span>' : '');
                upcomingList.appendChild(item);
            });
        }
    }

    // Archive by year, with pagination
    const tourListContainer = document.getElementById('tour-list');
    const tourControls = document.getElementById('tour-controls');
    const EVENTS_PER_PAGE = 8;
    let currentPage = 1;
    let currentEvents = [];

    if (tourListContainer && tourControls) {
        // Past shows only (upcoming ones live in their own block above).
        // Newest year first; within a year, most recent show first.
        const past = events.filter(e => !isUpcoming(e));
        const years = [...new Set(past.map(e => e.date.slice(0, 4)))].sort().reverse();
        const byYear = y => past.filter(e => e.date.startsWith(y)).sort((a, b) => b.date.localeCompare(a.date));

        function renderEvents(list, page) {
            tourListContainer.innerHTML = '';
            const start = (page - 1) * EVENTS_PER_PAGE;
            list.slice(start, start + EVENTS_PER_PAGE).forEach(event => {
                const item = document.createElement('div');
                item.className = 'tour-item';
                item.innerHTML = eventHTML(event);
                tourListContainer.appendChild(item);
            });
            renderPagination(list, page);
        }

        function goToPage(page) {
            currentPage = page;
            renderEvents(currentEvents, currentPage);
            tourControls.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function renderPagination(list, page) {
            let paginationEl = document.getElementById('tour-pagination');
            const totalPages = Math.ceil(list.length / EVENTS_PER_PAGE);

            if (totalPages <= 1) {
                if (paginationEl) paginationEl.remove();
                return;
            }

            if (!paginationEl) {
                paginationEl = document.createElement('div');
                paginationEl.id = 'tour-pagination';
                paginationEl.className = 'tour-pagination';
                tourListContainer.parentNode.insertBefore(paginationEl, tourListContainer.nextSibling);
            }
            paginationEl.innerHTML = '';

            const makeBtn = (label, target, disabled, active) => {
                const b = document.createElement('button');
                b.innerHTML = label;
                b.className = 'pagination-btn' + (active ? ' active' : '');
                b.disabled = disabled;
                b.addEventListener('click', () => goToPage(target));
                paginationEl.appendChild(b);
            };

            makeBtn('&#8592;', page - 1, page === 1, false);
            for (let i = 1; i <= totalPages; i++) makeBtn(String(i), i, false, i === page);
            makeBtn('&#8594;', page + 1, page === totalPages, false);
        }

        function selectYear(year) {
            tourControls.querySelectorAll('.btn-toggle').forEach(b => {
                const on = b.dataset.year === year;
                b.classList.toggle('active', on);
                b.setAttribute('aria-pressed', on);
            });
            currentEvents = byYear(year);
            currentPage = 1;
            renderEvents(currentEvents, currentPage);
        }

        years.forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'btn-toggle';
            btn.dataset.year = year;
            btn.textContent = year;
            btn.addEventListener('click', () => selectYear(year));
            tourControls.appendChild(btn);
        });

        selectYear(years[0]);
    }

    // --- Music Slider ---
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        const sliderWrapper = document.querySelector('.slider-track-wrapper');
        const sliderCards = document.querySelectorAll('.slider-card');
        const prevBtn = document.querySelector('.slider-btn-prev');
        const nextBtn = document.querySelector('.slider-btn-next');
        const gap = 20;
        let currentIndex = 0;

        function getVisibleCount() {
            return window.innerWidth >= 900 ? 3 : window.innerWidth >= 580 ? 2 : 1;
        }

        function getCardWidth() {
            const visible = getVisibleCount();
            return (sliderWrapper.offsetWidth - gap * (visible - 1)) / visible;
        }

        function getMaxIndex() {
            return sliderCards.length - getVisibleCount();
        }

        function applyTransform() {
            const cardWidth = getCardWidth();
            sliderTrack.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= getMaxIndex();
        }

        function setCardWidths() {
            const cardWidth = getCardWidth();
            sliderCards.forEach(card => { card.style.width = cardWidth + 'px'; });
        }

        function init() {
            currentIndex = Math.min(currentIndex, getMaxIndex());
            setCardWidths();
            applyTransform();
        }

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) { currentIndex--; applyTransform(); }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < getMaxIndex()) { currentIndex++; applyTransform(); }
        });

        init();
        window.addEventListener('resize', init);
    }

    // --- Circular Gallery ---
    const galleryEl = document.getElementById('circular-gallery');
    if (galleryEl) {
        const galleryItems = [
            { url: './assets/img/live-stage-arms-up.jpg',                              caption: 'Live' },
            { url: './assets/img/portrait-court.jpg',                                  caption: 'Isam Elias' },
            { url: './assets/img/Gallery.jpeg',                                        caption: 'Live Performance' },
            { url: './assets/img/Artist Section.jpg',                                  caption: 'Isam Elias' },
            { url: './assets/img/live-festival-crowd.jpg',                             caption: 'Festival' },
            { url: './assets/img/13Isam Elias La Vilette Marluziarte.jpg',             caption: 'La Villette' },
            { url: './assets/img/5dab1464-834c-4504-b9e5-099728454be4.jpg',            caption: 'On Stage' },
            { url: './assets/img/b7b1892b-917e-4cde-9965-cd3344ebc889.jpg',            caption: 'Festival' },
            { url: './assets/img/F000E891-08AB-402A-8A98-5FEB001413F7_1_105_c.jpeg',  caption: 'Performance' },
        ];

        const GALLERY_RADIUS = 520; // 9 cards × 260px need ~420px min to avoid overlap
        const anglePerItem = 360 / galleryItems.length;

        galleryItems.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.style.transform = `rotateY(${i * anglePerItem}deg) translateZ(${GALLERY_RADIUS}px)`;
            div.innerHTML = `
                <img src="${item.url}" alt="${item.caption}" loading="lazy" decoding="async">
                <div class="gallery-item-overlay"><p>${item.caption}</p></div>
            `;
            galleryEl.appendChild(div);
        });

        const galleryCards = galleryEl.querySelectorAll('.gallery-item');
        let galleryRotation = 0;
        let galleryScrolling = false;
        let galleryScrollTimeout;

        function updateGalleryOpacities() {
            galleryCards.forEach((card, i) => {
                const itemAngle = i * anglePerItem;
                const rel = ((itemAngle + galleryRotation) % 360 + 360) % 360;
                const norm = rel > 180 ? 360 - rel : rel;
                card.style.opacity = Math.max(0.25, 1 - norm / 180);
            });
        }

        function applyGalleryRotation() {
            galleryEl.style.transform = `rotateY(${galleryRotation}deg)`;
            updateGalleryOpacities();
        }

        window.addEventListener('scroll', () => {
            galleryScrolling = true;
            clearTimeout(galleryScrollTimeout);
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable > 0) {
                galleryRotation = (window.scrollY / scrollable) * 360;
                applyGalleryRotation();
            }
            galleryScrollTimeout = setTimeout(() => { galleryScrolling = false; }, 150);
        }, { passive: true });

        (function autoRotate() {
            if (!galleryScrolling) {
                galleryRotation += 0.025;
                applyGalleryRotation();
            }
            requestAnimationFrame(autoRotate);
        })();
    }

    // --- Articles Slider ---
    const articlesTrack = document.querySelector('.articles-track');
    if (articlesTrack) {
        const articlesWrapper = document.querySelector('.articles-track-wrapper');
        const articleCards = document.querySelectorAll('.article-card');
        const articlesPrevBtn = document.querySelector('.articles-btn-prev');
        const articlesNextBtn = document.querySelector('.articles-btn-next');
        const articlesGap = 24;
        let articlesIndex = 0;

        function getArticlesVisible() {
            return window.innerWidth >= 900 ? 3 : window.innerWidth >= 580 ? 2 : 1;
        }

        function getArticleCardWidth() {
            const visible = getArticlesVisible();
            return (articlesWrapper.offsetWidth - articlesGap * (visible - 1)) / visible;
        }

        function getArticlesMaxIndex() {
            return articleCards.length - getArticlesVisible();
        }

        function applyArticlesTransform() {
            const cardWidth = getArticleCardWidth();
            articlesTrack.style.transform = `translateX(-${articlesIndex * (cardWidth + articlesGap)}px)`;
            articlesPrevBtn.disabled = articlesIndex === 0;
            articlesNextBtn.disabled = articlesIndex >= getArticlesMaxIndex();
        }

        function setArticleCardWidths() {
            const cardWidth = getArticleCardWidth();
            articleCards.forEach(card => { card.style.width = cardWidth + 'px'; });
        }

        function initArticles() {
            articlesIndex = Math.min(articlesIndex, getArticlesMaxIndex());
            setArticleCardWidths();
            applyArticlesTransform();
        }

        articlesPrevBtn.addEventListener('click', () => {
            if (articlesIndex > 0) { articlesIndex--; applyArticlesTransform(); }
        });

        articlesNextBtn.addEventListener('click', () => {
            if (articlesIndex < getArticlesMaxIndex()) { articlesIndex++; applyArticlesTransform(); }
        });

        initArticles();
        window.addEventListener('resize', initArticles);
    }

    // --- Scroll Expand Media ---
    const semSection = document.querySelector('.sem-section');
    if (semSection) {
        const semMediaWrap = document.getElementById('sem-media-wrap');
        const semMediaDim  = document.getElementById('sem-media-dim');
        const semTitleLeft = document.getElementById('sem-title-left');
        const semTitleRight= document.getElementById('sem-title-right');
        const semDate      = document.getElementById('sem-date');
        const semHint      = document.getElementById('sem-hint');
        const semSpace     = semSection.querySelector('.sem-scroll-space');

        function updateSEM() {
            const sectionTop   = semSection.getBoundingClientRect().top + window.scrollY;
            const spaceHeight  = semSpace.offsetHeight;          // 200vh in px
            const scrolled     = Math.max(0, window.scrollY - sectionTop);
            const p            = Math.min(scrolled / spaceHeight, 1); // 0 → 1

            const mobile = window.innerWidth < 768;
            const rawW   = 300 + p * (mobile ? 650 : 1250);
            const rawH   = 400 + p * (mobile ? 200 : 400);
            const w      = Math.min(rawW, window.innerWidth  * 0.95);
            const h      = Math.min(rawH, window.innerHeight * 0.85);
            const tx     = p * (mobile ? 180 : 150);            // vw units

            // Media size
            semMediaWrap.style.width  = w + 'px';
            semMediaWrap.style.height = h + 'px';

            // Media dim fade (0.5 → 0.2)
            semMediaDim.style.opacity = Math.max(0, 0.5 - p * 0.3);

            // Title slide apart
            semTitleLeft.style.transform  = `translateX(-${tx}vw)`;
            semTitleRight.style.transform = `translateX(${tx}vw)`;

            // Date slides left, hint slides right
            semDate.style.transform  = `translateX(-${tx * 0.5}vw)`;
            semHint.style.transform  = `translateX(${tx * 0.5}vw)`;
            semHint.style.opacity    = Math.max(0, 1 - p * 4);
        }

        window.addEventListener('scroll', updateSEM, { passive: true });
        window.addEventListener('resize', updateSEM);
        updateSEM();
    }

});
