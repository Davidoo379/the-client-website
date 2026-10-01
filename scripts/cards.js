async function loadTemplate(url, id) {
    const response = await fetch(url);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.getElementById(id);
}

function fillList(container, items) {
    items.forEach(item => {
        if (item === null) return;
        const p = document.createElement("p");
        p.textContent = item;
        container.appendChild(p);
    });
}
function fillTagList(container, items) {
    items.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;

        if (item === "Project") {
            p.classList.add("project-tag");
        }
        if (item === "Open question") {
            p.classList.add("open-question-tag");
        }
        if (item === "Internship") {
            p.classList.add("internship-tag");
        }
        if (item === "Webinar") {
            p.classList.add("webinar-tag");
        }
        if (item === "Congress") {
            p.classList.add("congress-tag");
        }
        if (item === "Symposium") {
            p.classList.add("symposium-tag");
        }

        container.appendChild(p);
    });
}

function fillTime(clone, time) {
    if (!time) return;
    const { date, start, end } = time;

    if (date) {
        const dateEl = clone.querySelector(".date");
        if (dateEl) {
            dateEl.dateTime = date;
            const d = new Date(date + "T00:00"); // "T00:00" keeps it in local time

            const short = clone.querySelector(".dateShort");
            if (short) short.textContent = d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });

            const weekday = clone.querySelector(".weekday");
            if (weekday) weekday.textContent = d.toLocaleDateString("en-US", { weekday: "short" });
        }
    }

    setTimeEl(clone.querySelector(".startTime"), start);
    setTimeEl(clone.querySelector(".endTime"), end);
}

function setTimeEl(el, value) {
    if (!el || !value) return;
    el.dateTime = value;
    el.textContent = value;
}

function addCard(template, name, role, title, meshTerms, cardTags, list, img, institute, subSpecialism, location, time, organizer, attendees) {
    const clone = document.importNode(template.content, true);

    if (name) clone.querySelector(".name")?.append(name);
    if (role) clone.querySelector(".role")?.append(role);
    if (title) clone.querySelector(".title")?.append(title);
    if (attendees) clone.querySelector(".attendees")?.append(attendees);
    if (location) clone.querySelector(".location")?.append(location);
    if (organizer) clone.querySelector(".organizer")?.append(organizer);
    if (institute) clone.querySelector(".institute")?.append(institute);
    if (subSpecialism) clone.querySelector(".subSpecialism")?.append(subSpecialism);

    if (time?.date || time?.start) fillTime(clone, time);

    const meshEl = clone.querySelector(".meshTerms");
    if (meshEl && meshTerms?.length) fillList(meshEl, meshTerms);

    const tagsEl = clone.querySelector(".cardTags");
    if (tagsEl && cardTags?.length) fillTagList(tagsEl, cardTags);

    const imgEl = clone.querySelector(".profileImage");
    if (imgEl && img) {
        imgEl.src = img;
        imgEl.alt = "";
    }

    document.getElementById(list).appendChild(clone);
}

export { loadTemplate, addCard };