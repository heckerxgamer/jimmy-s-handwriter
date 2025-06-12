let pages = [];
let currentPage = 0;

function generateNotes() {
    const inputText = document.getElementById('inputText').value;
    const font = document.getElementById('fontSelect').value;
    const color = document.getElementById('colorPicker').value;

    if (inputText.trim() === "") {
        alert("Please paste some text!");
        return;
    }

    pages = splitTextIntoPages(inputText, 1000); // Approx 1000 characters per page
    currentPage = 0;

    displayPage(font, color);
}

function splitTextIntoPages(text, maxCharsPerPage) {
    let result = [];
    for (let i = 0; i < text.length; i += maxCharsPerPage) {
        result.push(text.substring(i, i + maxCharsPerPage));
    }
    return result;
}

function displayPage(font, color) {
    const noteArea = document.getElementById('notePages');
    noteArea.style.fontFamily = font;
    noteArea.style.color = color;
    noteArea.textContent = pages[currentPage];
    document.getElementById('pageNumber').textContent = `Page ${currentPage + 1} of ${pages.length}`;
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        const font = document.getElementById('fontSelect').value;
        const color = document.getElementById('colorPicker').value;
        displayPage(font, color);
    }
}

function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        const font = document.getElementById('fontSelect').value;
        const color = document.getElementById('colorPicker').value;
        displayPage(font, color);
    }
}

function downloadPDF() {
    const element = document.createElement('div');

    pages.forEach(page => {
        const pageDiv = document.createElement('div');
        pageDiv.style.padding = '40px 30px 40px 60px';
        pageDiv.style.fontFamily = document.getElementById('fontSelect').value;
        pageDiv.style.color = document.getElementById('colorPicker').value;
        pageDiv.style.fontSize = '20px';
        pageDiv.style.lineHeight = '2em';
        pageDiv.style.width = '210mm';
        pageDiv.style.minHeight = '297mm';
        pageDiv.style.border = '1px solid #ddd';
        pageDiv.style.marginBottom = '20px';
        pageDiv.style.background = 'repeating-linear-gradient(white, white 28px, #c0c0c0 29px)';
        pageDiv.style.position = 'relative';
        pageDiv.style.whiteSpace = 'pre-wrap';
        pageDiv.textContent = page;

        const redLine = document.createElement('div');
        redLine.style.position = 'absolute';
        redLine.style.left = '50px';
        redLine.style.top = '0';
        redLine.style.height = '100%';
        redLine.style.width = '2px';
        redLine.style.backgroundColor = 'red';
        pageDiv.appendChild(redLine);

        element.appendChild(pageDiv);
    });

    html2pdf().from(element).set({
        margin: 10,
        filename: 'handwritten-notes.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' }
    }).save();
}