const translations = {
    en: {
        about: "About Me",
        education: "Education",
        competences: "Digital Competences",
        teaching: "Teaching Experience",
        research: "Research",
        publications: "Publications",
        contact: "Contact"
    },
    es: {
        about: "Sobre Mí",
        education: "Educación",
        competences: "Competencias Digitales",
        teaching: "Experiencia Docente",
        research: "Investigación",
        publications: "Publicaciones",
        contact: "Contacto"
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

    document.getElementById("lang-en").style.fontWeight = lang === "en" ? "bold" : "normal";
    document.getElementById("lang-en").style.textDecoration = lang === "en" ? "underline" : "none";
    document.getElementById("lang-es").style.fontWeight = lang === "es" ? "bold" : "normal";
    document.getElementById("lang-es").style.textDecoration = lang === "es" ? "underline" : "none";

    localStorage.setItem('selectedLanguage', lang);
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

function highlightCurrentSection() {
    const currentPath = window.location.pathname.split("/").pop();
    const navItems = document.querySelectorAll(".top-bar nav ul li a");
    navItems.forEach(item => {
        if (item.getAttribute("href") === currentPath) {
            item.style.fontWeight = "bold";
            item.style.textDecoration = "underline";
        } else {
            item.style.fontWeight = "normal";
            item.style.textDecoration = "none";
        }
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);