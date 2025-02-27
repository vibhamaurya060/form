document.addEventListener("DOMContentLoaded", function () {
    new Sortable(document.getElementById("form-builder"), {
        animation: 150,
    });
});

function addElement(type) {
    const formBuilder = document.getElementById("form-builder");
    const element = document.createElement("div");
    element.classList.add("form-element");
    element.setAttribute("data-type", type);
    
    let html = "";
    if (type === "input") {
        html = `<label>Sample Input</label><input type="text" placeholder="Sample Placeholder">`;
    } else if (type === "select") {
        html = `<label>Sample Select</label><select><option>Sample Option</option><option>Sample Option2</option></select>`;
    } else if (type === "textarea") {
        html = `<label>Sample Textarea</label><textarea placeholder="Sample Placeholder"></textarea>`;
    } else if (type === "checkbox") {
        html = `<label>Sample Checkbox</label><input type="checkbox">`;
    }
    
    element.innerHTML = html + `<button onclick="removeElement(this)">❌</button>`;
    formBuilder.appendChild(element);
}

function removeElement(button) {
    button.parentElement.remove();
}

function saveForm() {
    const elements = document.querySelectorAll(".form-element");
    let jsonData = [];

    elements.forEach((element) => {
        let data = { type: element.getAttribute("data-type"), label: "", placeholder: "" };

        const label = element.querySelector("label");
        if (label) data.label = label.textContent;

        const input = element.querySelector("input, textarea, select");
        if (input) data.placeholder = input.placeholder || "";

        jsonData.push(data);
    });

    console.log("Saved JSON:", JSON.stringify(jsonData, null, 2));
}

function previewForm() {
    const elements = document.querySelectorAll(".form-element");
    const previewContainer = document.getElementById("preview-container");
    previewContainer.innerHTML = "";

    elements.forEach((element) => {
        previewContainer.appendChild(element.cloneNode(true));
    });

    document.getElementById("preview-modal").style.display = "block";
}

function closePreview() {
    document.getElementById("preview-modal").style.display = "none";
}

function copyHTML() {
    const elements = document.querySelectorAll(".form-element");
    let html = "";

    elements.forEach((element) => {
        html += element.innerHTML + "\n";
    });

    navigator.clipboard.writeText(html);
    alert("HTML copied!");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
