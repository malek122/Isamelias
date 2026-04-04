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
    const events2025 = [
        { date: '11/01/2025', location: 'La Fleche D\'or, Paris' },
        { date: '15/02/2025', location: 'l\'Alimentation Generale, Paris' },
        { date: '21/05/2025', location: 'La Cite Internationale des Arts, Paris' },
        { date: '24/05/2025', location: 'La Chinois, Paris' },
        { date: '30/05/2025', location: 'Pom & Pépin, Paris' },
        { date: '07/06/2025', location: 'Festival Orizons, Perigueux' },
        { date: '14/06/2025', location: 'La Friche de La Belle de Mai, Marseille' },
        { date: '19/06/2025', location: 'Babour Sauvage, Paris' },
        { date: '20/06/2025', location: 'La Cite des Arts Montmartre, Paris' },
        { date: '21/06/2025', location: 'Snooze, Paris' },
        { date: '21/06/2025', location: 'Malakoff en Fete, Malakoff' },
        { date: '28/06/2025', location: 'Le Relais Pantin, Paris' },
        { date: '05/07/2025', location: 'Ibraaz, London' },
        { date: '18/07/2025', location: 'Festival Les Suds, Arles' },
        { date: '19/07/2025', location: 'Detours du Monde, Chanac' },
        { date: '25/07/2025', location: 'Sfinks Festival, Belgium' },
        { date: '28/08/2025', location: 'Festival Fisel, Rostrenen' },
        { date: '12/09/2025', location: 'Festival Arabesque, Montpellier' },
        { date: '13/09/2025', location: 'Theatre de la Mer, Sete' },
        { date: '19/09/2025', location: 'L\'boulvard Festival, Casablanca' },
        { date: '26/09/2025', location: 'Bamba Crew, Nantes' },
        { date: '18/10/2025', location: 'Gwangju Busking Club, South Korea' },
        { date: '25/10/2025', location: 'La Station Gare des Mines, Paris' },
        { date: '21/11/2025', location: 'Visa For Music, Rabat' },
        { date: '31/12/2025', location: 'Tunis sur Scene, Aubervilliers' }
    ];

    const events2026 = [
        { date: '16/01/2026', location: 'L\'Alimentation Generale, Paris' },
        { date: '23/01/2026', location: 'Le Makeda, Marseille' },
        { date: '31/01/2026', location: 'FGO Barbara, Paris' },
        { date: '12/02/2026', location: 'Au Fils des Voix, Paris' },
        { date: '20/03/2026', location: 'Babel Music XP, Marseille' },
        { date: '10/04/2026', location: 'L\'Alimentation Generale, Paris' },
        { date: '02/05/2026', location: 'Les Pays Des Amplis, Chatillon-en-Michaille' },
        { date: '22/05/2026', location: 'TBA, Strasbourg' },
        { date: '23/05/2026', location: 'Festival La Rue Libre, Le Salvetat-Peyrales' },
        { date: '30/05/2026', location: 'La Fête du Pois Chiche, Montaren-et-Saint-Médiers' },
        { date: '31/05/2026', location: 'Musée de Confluence, Lyon' },
        { date: '06/06/2026', location: 'Stereolux, Nantes' },
        { date: '26/06/2026', location: 'Nuit Metis, Miramas' },
        { date: '19/07/2026', location: 'Les Vieilles Charrues, Carhaix' },
        { date: '25/07/2026', location: 'FMM Sines, Portugal' },
        { date: '31/07/2026', location: 'Rhybadi, Schaffhouse, Switzerland' }
    ];

    // --- Tour Rendering with Pagination ---
    const tourListContainer = document.getElementById('tour-list');
    const btn2025 = document.getElementById('btn-2025');
    const btn2026 = document.getElementById('btn-2026');
    const EVENTS_PER_PAGE = 8;
    let currentPage = 1;
    let currentEvents = events2026;

    if (tourListContainer) {
        function renderEvents(events, page) {
            tourListContainer.innerHTML = '';
            const start = (page - 1) * EVENTS_PER_PAGE;
            const pageEvents = events.slice(start, start + EVENTS_PER_PAGE);

            pageEvents.forEach(event => {
                const item = document.createElement('div');
                item.classList.add('tour-item');
                item.innerHTML = `
                    <span class="tour-date">${event.date}</span>
                    <span class="tour-location">${event.location}</span>
                `;
                tourListContainer.appendChild(item);
            });

            renderPagination(events, page);
        }

        function renderPagination(events, page) {
            let paginationEl = document.getElementById('tour-pagination');
            const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

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

            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&#8592;';
            prevBtn.className = 'pagination-btn';
            prevBtn.disabled = page === 1;
            prevBtn.addEventListener('click', () => {
                currentPage--;
                renderEvents(currentEvents, currentPage);
                tourListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationEl.appendChild(prevBtn);

            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.className = 'pagination-btn' + (i === page ? ' active' : '');
                const pageNum = i;
                pageBtn.addEventListener('click', () => {
                    currentPage = pageNum;
                    renderEvents(currentEvents, currentPage);
                    tourListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                paginationEl.appendChild(pageBtn);
            }

            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&#8594;';
            nextBtn.className = 'pagination-btn';
            nextBtn.disabled = page === totalPages;
            nextBtn.addEventListener('click', () => {
                currentPage++;
                renderEvents(currentEvents, currentPage);
                tourListContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            paginationEl.appendChild(nextBtn);
        }

        // Default: show 2026
        renderEvents(events2026, currentPage);

        btn2025.addEventListener('click', () => {
            btn2025.classList.add('active');
            btn2026.classList.remove('active');
            currentEvents = events2025;
            currentPage = 1;
            renderEvents(events2025, currentPage);
        });

        btn2026.addEventListener('click', () => {
            btn2026.classList.add('active');
            btn2025.classList.remove('active');
            currentEvents = events2026;
            currentPage = 1;
            renderEvents(events2026, currentPage);
        });
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
            { url: './assets/img/Gallery.jpeg',                                        caption: 'Live Performance' },
            { url: './assets/img/Artist Section.jpg',                                  caption: 'Isam Elias' },
            { url: './assets/img/13Isam Elias La Vilette Marluziarte.jpg',             caption: 'La Villette' },
            { url: './assets/img/5dab1464-834c-4504-b9e5-099728454be4.jpg',            caption: 'On Stage' },
            { url: './assets/img/b7b1892b-917e-4cde-9965-cd3344ebc889.jpg',            caption: 'Festival' },
            { url: './assets/img/F000E891-08AB-402A-8A98-5FEB001413F7_1_105_c.jpeg',  caption: 'Performance' },
        ];

        const GALLERY_RADIUS = 480;
        const anglePerItem = 360 / galleryItems.length;

        galleryItems.forEach((item, i) => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.style.transform = `rotateY(${i * anglePerItem}deg) translateZ(${GALLERY_RADIUS}px)`;
            div.innerHTML = `
                <img src="${item.url}" alt="${item.caption}">
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
