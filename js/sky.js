var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH, HEIGHT,
    ripples = [];

setCanvasSize();
window.onresize = setCanvasSize;

function setCanvasSize() {
    WIDTH = document.documentElement.clientWidth;
    HEIGHT = document.documentElement.clientHeight;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

window.onmousemove = function(e) {
    ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        o: 1
    });
};

function animate() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < ripples.length; i++) {
        var r = ripples[i];
        r.r += 2.5;    // 擴散速度
        r.o -= 0.02;   // 消失速度

        if (r.o <= 0) {
            ripples.splice(i, 1);
            i--;
            continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, " + r.o + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    requestAnimationFrame(animate);
}
animate();
