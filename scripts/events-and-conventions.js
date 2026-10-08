const files = [
    '/template-html/header-blueprint.html',
    '/template-html/aside-bar-blueprint.html',
    '/template-html/events-and-conventions-content.html'];

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

import { loadTemplate, addCard } from "./scripts/cards.js";

const template = await loadTemplate("/template-html/cards-template.html", "card-template");
const profileCardTemplate = await loadTemplate("/template-html/cards-template.html", "profile-card-template");
const profileQuoteCardTemplate = await loadTemplate("/template-html/cards-template.html", "profile-quote-card-template");
const eventCardTemplate = await loadTemplate("/template-html/cards-template.html", "event-card-template");


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
// * PROFILE OPTIONS MENU
const profileMenu = document.querySelector("aside nav > button");
const profileMenuCloseButton = document.querySelector("aside nav div >  button");

profileMenu.addEventListener("click", openProfileMenu);
profileMenuCloseButton.addEventListener("click", closeProfileMenu);

function openProfileMenu() {
    const profileMenu = document.querySelector("aside nav div");
    profileMenu.classList.add("openProfileMenu");
}

function closeProfileMenu() {
    const profileMenu = document.querySelector("aside nav div");
    profileMenu.classList.remove("openProfileMenu");
}

const header = document.querySelector("body > header");
const aside = document.querySelector("body > aside");
header.addEventListener("mouseover", sideBarHover);
aside.addEventListener("mouseover", sideBarHover);
header.addEventListener("mouseout", sideBarHoverOut);
aside.addEventListener("mouseout", sideBarHoverOut);
function sideBarHover() {
    header.classList.add("sideBarOpen");
    aside.classList.add("sideBarOpen");
}
function sideBarHoverOut() {
    header.classList.remove("sideBarOpen");
    aside.classList.remove("sideBarOpen");
}

addCard(
    eventCardTemplate,
    "",
    "",
    "Webinar: Together we stand up against aggression in (child) care",
    [""],
    ["Webinar"],
    "2026-01-28",
    "",
    "",
    "",
    "Online",
    { date: "2026-01-28", start: "11:00", end: "17:00" },
    "NvK",
    "15"
);
addCard(
    eventCardTemplate,
    "",
    "",
    "The journey of pediatric medical care towards a transmural future",
    [""],
    ["Congress"],
    "2026-01-31",
    "",
    "",
    "",
    "NYC Congress, Lichtenvoorde",
    { date: "2026-01-31", start: "9:00", end: "17:00" },
    "NvK",
    "23"
);
addCard(
    eventCardTemplate,
    "",
    "",
    "Natoopma; Pediatric Dermatology Day: Pediatrocian and dermatologist: together we achieve more!",
    [""],
    ["Symposium"],
    "2026-02-05",
    "",
    "",
    "",
    "Reehorst, Ede",
    { date: "2026-02-05", start: "08:45", end: "16:30" },
    "NvK",
    "23"
);
addCard(
    eventCardTemplate,
    "",
    "",
    "Congress on psychiatry around pregnancy",
    [""],
    ["Congress"],
    "2026-02-10",
    "",
    "",
    "",
    "NH Hotel",
    { date: "2026-02-10", start: "9:30", end: "16:00" },
    "NvK",
    "23"
);

