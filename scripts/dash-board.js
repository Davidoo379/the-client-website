const files = [
    './template-html/header-blueprint.html',
    './template-html/aside-bar-blueprint.html',
    './template-html/dashboard-content.html'];

// Start all downloads at once
const responses = await Promise.all(files.map(f => fetch(f)));

// Stream them into the page one at a time, in order
for (const res of responses) {
    if (!res.ok) {
        // ! console.error('Failed to load', res.url, res.status);
        continue;
    }
    await res.body
        .pipeThrough(new TextDecoderStream())
        .pipeTo(document.body.streamAppendHTMLUnsafe());
}

import { loadTemplate, addCard } from "./cards.js";

const template = await loadTemplate("../template-html/cards-template.html", "card-template");
const profileCardTemplate = await loadTemplate("../template-html/cards-template.html", "profile-card-template");
const profileQuoteCardTemplate = await loadTemplate("../template-html/cards-template.html", "profile-quote-card-template");
const eventCardTemplate = await loadTemplate("../template-html/cards-template.html", "event-card-template");


const menuButton = document.querySelector("body > header button");
const menuCloseButton = document.querySelector("body>header nav>button");

// * HEADER HAMBURGER MENU
menuButton.addEventListener("click", openMenu);
menuCloseButton.addEventListener("click", closeMenu);

function openMenu() {
    const navMenu = document.querySelector("header>nav");
    navMenu.classList.add("openNavMenu");
}

function closeMenu() {
    const navMenu = document.querySelector("header>nav");
    navMenu.classList.remove("openNavMenu");
}

addCard(
    template,
    "Anthony Martina",
    "Medival researcher",
    "From Data to Decisions: Improving Clinical Insight Through Pediatric care",
    ["Data Interpretation", "Clinical Decision-Making", "Outcome Assessment (Health Care)"],
    ["Project", "Internship"],
    "recommended"
);
addCard(
    profileCardTemplate,
    "Elise Thompson",
    "Doctor",
    "",
    ["Open to questions"],
    [""],
    "recommended",
    "./assets/elise-thompson.png",
    "Admiraal De Ruyter",
    "Neurobiology (cognitive outcomes in childhood)"
);

addCard(
    template,
    "Noor Becker",
    "Medical researcher",
    "How do you approach complex clinical decisions in Pediatrics?",
    ["Clinical Decision-Making", "Patient Care"],
    ["Open question"],
    "recommended"
    // TODO ADD COMMENTS
);

addCard(
    eventCardTemplate,
    "",
    "",
    "Webinar: Together we stand up against aggression in (child) care",
    [""],
    ["Webinar"],
    "recommended",
    "",
    "",
    "",
    "Online",
    { date: "2026-01-28", start: "11:00", end: "17:00" },
    "NvK",
    "15"
);

addCard(
    profileQuoteCardTemplate,
    "Daniel Kim",
    "Mediacal researcher",
    "",
    ["Open to mentoring"],
    [""],
    "bookmarks",
    "",
    "Catharina Hospital",
    "Psychiatry (early intervention in adolescents)",
    "",
    "",
    "",
    "",
    "Well-interpreted data strengthens clinical decisions."
);
addCard(
    profileQuoteCardTemplate,
    "Amara Chinedu Diallo",
    "Fundamental researcher",
    "",
    ["Open to mentoring"],
    [""],
    "bookmarks",
    "",
    "Deventer Hospital",
    "Anesthesiology (perioperative safety)",
    "",
    "",
    "",
    "",
    "Better healthcare happens when we work together"
);

addCard(
    profileCardTemplate,
    "Tami Nikolaus",
    "Medical researcher",
    "",
    ["Open to questions"],
    [""],
    "bookmarks",
    "./assets/tami-nikolaus.png",
    "Gelre Hospital",
    "Hematology (transfusion medicine in children)"
);
