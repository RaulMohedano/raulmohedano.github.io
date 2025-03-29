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
    // document.getElementById("box-interests").textContent = translations[lang].interests;
    // document.getElementById("box-background").textContent = translations[lang].background;
    // document.getElementById("box-research").textContent = translations[lang].currentResearch;

    const currentPath = window.location.pathname.split("/").pop();
    const pageTitleMap = {
        "index.html": "Raul Mohedano. " + translations[lang].profileMessage,
        "education.html": translations[lang].education,
        "competences.html": translations[lang].competences,
        "teaching.html": translations[lang].teaching,
        "research.html": translations[lang].research,
        "publications.html": translations[lang].publications,
        "contact.html": translations[lang].contact
    };
    document.getElementById("page-title").textContent = pageTitleMap[currentPath] || translations[lang].about;

    document.getElementById("lang-en").classList.toggle('active', lang === "en");
    document.getElementById("lang-es").classList.toggle('active', lang === "es");

    localStorage.setItem('selectedLanguage', lang);
}

function loadPageWithTransition(url) {
    const body = document.querySelector('body');
    const newPage = document.createElement('div');
    newPage.classList.add('page-transition');
    body.appendChild(newPage);

    fetch(url)
        .then(response => response.text())
        .then(data => {
            newPage.innerHTML = data;
            setTimeout(() => {
                newPage.classList.add('active');
                setTimeout(() => {
                    body.innerHTML = newPage.innerHTML;
                    includeHTML();
                }, 500); // Match the transition duration
            }, 10); // Small delay to trigger the transition
        });
}

function highlightCurrentSection() {
    const currentPath = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll(".left-bar nav ul li a");
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const url = item.getAttribute('href');
            loadPageWithTransition(url);
            history.pushState(null, '', url);
        });

        if (item.getAttribute("href") === currentPath) {
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