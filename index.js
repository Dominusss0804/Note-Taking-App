const addButton = document.querySelector(".addButton");
const container = document.querySelector(".container");

// Function to save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll(".textNote textarea").forEach(textarea => {
        notes.push(textarea.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to load notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
        const newNote = document.createElement("div");
        newNote.classList.add("textNote");

        newNote.innerHTML = `
            <textarea placeholder="Write your note here...">${note}</textarea>
            <button class="delete">x</button>
        `;

        container.appendChild(newNote);

        newNote.querySelector(".delete").addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this note?")) {
                container.removeChild(newNote);
                saveNotes(); // Save notes after deletion
            }
        });

        // Save notes on input change
        newNote.querySelector("textarea").addEventListener("input", saveNotes);
    });
}

// Add event listener to the add button
addButton.addEventListener("click", () => {
    const newNote = document.createElement("div");
    newNote.classList.add("textNote");

    newNote.innerHTML = `
        <textarea placeholder="Write your note here..."></textarea>
        <button class="delete">x</button>
    `;

    container.appendChild(newNote);

    newNote.querySelector(".delete").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this note?")) {
            container.removeChild(newNote);
            saveNotes(); // Save notes after deletion
        }
    });

    // Save notes on input change
    newNote.querySelector("textarea").addEventListener("input", saveNotes);

    saveNotes(); // Save notes after adding a new one
});

// Load notes when the page is loaded
window.addEventListener("load", loadNotes);
