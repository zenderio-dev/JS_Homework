document.getElementById("editor").addEventListener("submit", applyChanges);
document.getElementById("addPhone").addEventListener("click", addPhone);

function addPhone() {
    const list = document.getElementById("phones");
    if (list.children.length >= 2) {
        alert("Можно добавить максимум 2 телефона");
        return;
    }
    const div = document.createElement("div");
    div.className = "phone";
    div.innerHTML = `
        <input type="text" name="phone">
        <button type="button" class="del">−</button>
    `;
    div.querySelector(".del").onclick = () => div.remove();
    list.append(div);
}

function applyChanges(e) {
    e.preventDefault();
    const f = new FormData(e.target);

    const card = document.getElementById("card");

    card.querySelector(".org").textContent = f.get("org");
    card.querySelector(".name").textContent = f.get("fullname");
    card.querySelector(".job").textContent = f.get("job");

    const nameEl = card.querySelector(".name");
    nameEl.style.color = f.get("name_color");
    nameEl.style.fontSize = f.get("name_size");
    nameEl.style.textAlign = f.get("name_align");

    const jobEl = card.querySelector(".job");
    jobEl.style.color = f.get("job_color");
    jobEl.style.fontSize = f.get("job_size");
    jobEl.style.textAlign = f.get("job_align");

    const phoneBox = card.querySelector(".phones");
    phoneBox.innerHTML = "";

    document.querySelectorAll('input[name="phone"]').forEach(p => {
        if (p.value.trim() !== "") {
            const line = document.createElement("div");
            line.className = "line";
            line.textContent = p.value.trim();
            phoneBox.append(line);
        }
    });

    const emailEl = card.querySelector(".email");
    emailEl.textContent = f.get("email");
    emailEl.style.display = f.get("show_email") ? "block" : "none";

    const addrEl = card.querySelector(".address");
    addrEl.textContent = f.get("address");
    addrEl.style.display = f.get("show_address") ? "block" : "none";
}
