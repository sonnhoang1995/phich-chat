export class Popup {
    context: CanvasRenderingContext2D;
    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    render() {
        this.context.font = "22pt Arial";
        this.context.fillStyle = "#000000";
        this.context.fillText("Thôi xong! Phát đã bị Tiểu Nhi bắt :(", 125, 50);
        this.context.beginPath();
        this.context.rect(250, 100, 190, 100);
        this.context.fillStyle = "#FFFFFF";
        this.context.fillStyle = "rgba(225,225,225,0.5)";
        this.context.fillRect(25, 72, 32, 32);
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#000000";
        this.context.stroke();
        this.context.closePath();
        this.context.font = "24pt Kremlin Pro Web";
        this.context.fillStyle = "#000000";
        this.context.fillText("Restart", 300, 165);
    }
}
