const canvas = document.getElementById('liquid-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function draw(time) {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const blobs = [
        { color: '#1a1a2e', speed: 0.0004, r: 400 },
        { color: '#2d1a2e', speed: 0.0003, r: 450 },
        { color: '#162447', speed: 0.0005, r: 350 }
    ];
    
    blobs.forEach((blob, i) => {
        const x = width / 2 + Math.cos(time * blob.speed + i) * (width * 0.2);
        const y = height / 2 + Math.sin(time * blob.speed * 0.8 + i) * (height * 0.2);
        const radius = blob.r + Math.sin(time * 0.001) * 50;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}
draw(0);
