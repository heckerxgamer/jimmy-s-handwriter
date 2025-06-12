
let swiper = new Swiper('.mySwiper', {
    effect: 'slide',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
});

document.getElementById('generateBtn').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const font = document.getElementById('fontSelect').value;
    const color = document.getElementById('colorPicker').value;

    const words = inputText.split(' ');
    const wordsPerPage = 100;
    const container = document.getElementById('pagesContainer');
    container.innerHTML = '';

    for (let i = 0; i < words.length; i += wordsPerPage) {
        const pageWords = words.slice(i, i + wordsPerPage).join(' ');
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.fontFamily = `'${font}', cursive`;
        slide.style.color = color;
        slide.style.lineHeight = '24px';
        slide.innerText = applyHandwritingEffect(pageWords);
        container.appendChild(slide);
    }

    swiper.update();
});

function applyHandwritingEffect(text) {
    return text.split('').map(char => {
        const jitter = Math.random() * 0.5 - 0.25;
        return Math.random() < 0.03 ? char + ' ' : char;
    }).join('');
}

document.getElementById('downloadBtn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const slides = document.querySelectorAll('.swiper-slide');

    slides.forEach((slide, index) => {
        pdf.setFontSize(12);
        pdf.setTextColor(slide.style.color);
        pdf.setFont(slide.style.fontFamily.split(',')[0], 'normal');
        const text = slide.innerText;
        const lines = pdf.splitTextToSize(text, 180);
        pdf.text(lines, 15, 20);
        if (index < slides.length - 1) pdf.addPage();
    });

    pdf.save('Jimmy-Handwriter.pdf');
});
