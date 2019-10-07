
const draw = () => {
    const frontCanvas = document.querySelector('#canvas-test');

    if (frontCanvas.getContext) {
        const ctx = frontCanvas.getContext('2d');

        // ctx.fillStyle = 'rgb(200, 0, 0)';
        // ctx.fillRect(100, 100, 50, 50);

        // ctx.fillStyle = 'rgba(0, 200, 0, 0.5)';
        // ctx.fillRect(125, 125, 50, 50);

        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, Math.PI * 2, true);
        ctx.moveTo(180, 150);
        ctx.arc(150, 150, 30, 0, Math.PI, false);
        ctx.moveTo(138, 130);
        ctx.arc(130, 130, 8, 0, Math.PI * 2, false);
        ctx.moveTo(178, 130);
        ctx.arc(170, 130, 8, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(180, 200, 10, 0.5)';
        ctx.fill();
        ctx.stroke();
    }
}

const erase = () => {
    const frontCanvas = document.querySelector('#canvas-test');
    const ctx = frontCanvas.getContext('2d');
    ctx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);

}

// document.body.addEventListener(event, () => draw());
