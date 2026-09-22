async function loadPartial(id, url) {
    const res = await fetch(url);
    document.getElementById(id).innerHTML = await res.text();
}
loadPartial('colleague-card', '/cards/colleague-card.html');
loadPartial('event-card', '/cards/event-card.html');
loadPartial('open-question', '/cards/open-question-card.html');
loadPartial('opportunitie-card', '/cards/opportunitie-card.html');
