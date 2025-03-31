const translations = {
    en: {
        about: "About Me",
        education: "Education",
        competences: "Digital Competences",
        teaching: "Teaching Experience",
        research: "Research",
        publications: "Publications",
        contact: "Contact",
        profileMessage: "Scientific researcher",
        interests: "My Interests",
        background: "My Background and Experience",
        currentResearch: "Current Research"
    },
    es: {
        about: "Sobre Mí",
        education: "Educación",
        competences: "Competencias Digitales",
        teaching: "Experiencia Docente",
        research: "Investigación",
        publications: "Publicaciones",
        contact: "Contacto",
        profileMessage: "Investigador científico",
        interests: "Mis Intereses",
        background: "Mi Trayectoria y Experiencia",
        currentResearch: "Investigación Actual"
    }
};

function changeLanguage(lang) {
    document.getElementById("nav-about").textContent = translations[lang].about;
    document.getElementById("nav-education").textContent = translations[lang].education;
    document.getElementById("nav-competences").textContent = translations[lang].competences;
    document.getElementById("nav-teaching").textContent = translations[lang].teaching;
    document.getElementById("nav-research").textContent = translations[lang].research;
    document.getElementById("nav-publications").textContent = translations[lang].publications;
    document.getElementById("nav-contact").textContent = translations[lang].contact;
    document.getElementById("profile-message").textContent = translations[lang].profileMessage;

    const currentPath = window.location.pathname.split("/").pop();

    const pageTitleMap = {
    "index.html": "Raul Mohedano. " + translations[lang].profileMessage,
    "education.html": translations[lang].education,
    "competences.html": translations[lang].competences,
    "teaching.html": translations[lang].teaching,
    "research.html": translations[lang].research,
    "tracking.html": translations[lang].research,
    "calibration.html": translations[lang].research,
    "nmt.html": translations[lang].research,
    "modifiedrf.html": translations[lang].research,
    "publications.html": translations[lang].publications,
    "contact.html": translations[lang].contact
};

document.getElementById("page-title").textContent = pageTitleMap[currentPath] || translations[lang].about;

    const elements = document.querySelectorAll('[data-en], [data-es]');
    elements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${lang}`);
    });

    document.getElementById("lang-en").classList.toggle('active', lang === "en");
    document.getElementById("lang-es").classList.toggle('active', lang === "es");

    localStorage.setItem('selectedLanguage', lang);
}

function loadPage(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data;
            includeHTML();
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
            changeLanguage(savedLanguage);
            highlightCurrentSection();
        });
}

function highlightCurrentSection() {
    const currentPath = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll(".left-bar nav ul li a");
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const url = item.getAttribute('href');
            loadPage(url);
            history.pushState(null, '', url);
        });

        if (item.getAttribute("href") === currentPath ||
            (currentPath === "nmt.html" && item.getAttribute("href") === "research.html") ||
            (currentPath === "tracking.html" && item.getAttribute("href") === "research.html") ||
            (currentPath === "modifiedrf.html" && item.getAttribute("href") === "research.html") ||
            (currentPath === "calibration.html" && item.getAttribute("href") === "research.html")) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function includeHTML() {
    const elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(el => {
        const file = el.getAttribute('data-include-html');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data;
                const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
                changeLanguage(savedLanguage);
                highlightCurrentSection();
            });
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);