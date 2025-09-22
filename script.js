// === FADE-IN AO SCROLL ===
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2 };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// === CONTADORES ANIMADOS ===
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/\D/g,'');
        const increment = target / 200;
        if(count < target){
            counter.innerText = Math.ceil(count + increment).toLocaleString();
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    };
    updateCount();
});

// === BARRAS DE PROGRESSO ===
const bars = document.querySelectorAll('.progress-bar');
bars.forEach(bar => {
    const target = +bar.getAttribute('data-target');
    setTimeout(()=>{ bar.style.width = target + '%'; }, 500);
});

// === GRÁFICO Chart.js ===
const ctx = document.getElementById('plasticChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Plástico nos oceanos', 'Reciclado', 'Outro lixo'],
        datasets: [{ data: [40,25,35], backgroundColor: ['#ef4444','#10b981','#3b82f6'] }]
    },
    options: { 
        responsive:true, 
        plugins:{ 
            legend:{ position:'bottom', labels:{ color: '#000', font:{ size:14 } } } 
        } 
    }
});

// === LIGHT/DARK MODE ===
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark'); // Ativa Tailwind dark:
    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
});

// === CONTAGEM REGRESSIVA ===
const countdown = document.getElementById('countdown');
const campaignEnd = new Date("Dec 31, 2025 23:59:59").getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = campaignEnd - now;

    if(distance < 0){
        countdown.innerHTML = "Campanha encerrada!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
updateCountdown();
setInterval(updateCountdown, 1000);
