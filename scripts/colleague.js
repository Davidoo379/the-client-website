const files = [
    '/template-html/header-blueprint.html',
    '/template-html/aside-bar-blueprint.html',
    '/template-html/colleague-content.html'];

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

import { loadTemplate, addCard } from "/scripts/cards.js";

const template = await loadTemplate("/template-html/cards-template.html", "card-template");
const profileCardTemplate = await loadTemplate("/template-html/cards-template.html", "profile-card-template");
const profileQuoteCardTemplate = await loadTemplate("/template-html/cards-template.html", "profile-quote-card-template");
const eventCardTemplate = await loadTemplate("/template-html/cards-template.html", "event-card-template");
const comboCardTemplate = await loadTemplate("/template-html/cards-template.html", "combo-card-template");

// * HEADER HAMBURGER MENU
const menuButton = document.querySelector("body > header button");
const menuCloseButton = document.querySelector("body>header nav>button");

menuButton.addEventListener("click", openMenu);
menuCloseButton.addEventListener("click", closeMenu);

function openMenu() {
    const navMenu = document.querySelector("header > nav");
    navMenu.classList.add("openNavMenu");
}

function closeMenu() {
    const navMenu = document.querySelector("header > nav");
    navMenu.classList.remove("openNavMenu");
}

const header = document.querySelector("body > header");
const aside = document.querySelector("body > aside");
header.addEventListener("mouseover", sideBarHover);
header.addEventListener("mouseout", sideBarHoverOut);

function sideBarHover() {
    header.classList.add("sideBarOpen");
    aside.classList.add("sideBarOpen");
}
function sideBarHoverOut() {
    header.classList.remove("sideBarOpen");
    aside.classList.remove("sideBarOpen");
}

addCard(
    template,
    "Elise Thompson",
    "Medical researcher",
    "How do you approach complex clinical decisions in Pediatrics?",
    ["Clinical Decision-Making", "Patient Care"],
    ["Open question"],
    "list"
    // TODO ADD COMMENTS
);
addCard(
    template,
    "Elise Thompson",
    "Medical researcher",
    "How do you create a good space for children?",
    ["Child Care", "Patient Care"],
    ["Open question"],
    "list"
    // TODO ADD COMMENTS
);


