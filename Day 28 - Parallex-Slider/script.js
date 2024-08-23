const options = {
    accessibility: true,
    prevNextButtons: true,
    pageDots: true,
    setGallerySize: false, 
    arrowShape: {
        x0: 1,
        x1: 58,
        y1: 62,
        x2: 55,
        y2: 48,
        x3: 18
    }
};

// Function to set background position forr slides
function setBackgroundPosition(slides, index){
    const x = -(slide.target + f1kty.x) / 3
    slides[index].style.backgroundPosition = `${x}px`
}

// Slides initialization
const carousel = document.querySelector('[carousel')
const slides = Array.from(document.getElementsByClassName('carousel-cell'))
const f1kty = new Flickity(carousel, options)

// Event listener using bg position
f1kty.on("scroll", () => {
    f1kty.slides.forEach(() => setBackgroundPosition)
})
