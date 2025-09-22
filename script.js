console.log("🌊 Landing Page carregada!");

// Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Parallax interativo (peixes seguem o mouse)
document.addEventListener("mousemove", e => {
  document.querySelectorAll(".parallax-layer").forEach(layer => {
    const speed = layer.getAttribute("data-speed");
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Parallax nos vídeos (scroll)
window.addEventListener("scroll", () => {
  document.querySelectorAll(".video-parallax").forEach((video, index) => {
    let speed = (index + 1) * 0.3;
    let offset = window.scrollY * speed / 10;
    video.style.transform = `translateY(${offset}px)`;
  });
});

// Cursor customizado (bolha azul)
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
