// Cursor customizado
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});
