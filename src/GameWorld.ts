import { Nhi } from "./Nhi";
import { Background } from "./Background";
import { Phat } from "./Phat";
import { Popup } from "./Popup";

export class GameWorld {
    position: number = 0;
    rAF_id: number = 0;
    startTime: DOMHighResTimeStamp = 0;
    elapsedTime: number = 0;
    fps: number = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    rectX: number = 0;
    rectY: number = 0;
    gameTimePassed: number = 0;
    nhis: Nhi[] = [];
    phat: Phat;
    background: Background;
    enemySpawnRate: number = 90;
    popup: Popup;

    constructor() {
        this.canvas = document.getElementById("my-canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d")!;
        this.canvas.tabIndex = 1;
        this.canvas.focus();
        this.phat = new Phat(this.context, 100, 325, 0, -300);
        this.background = new Background(this.context, 0, -300, 0, 0);
        this.popup = new Popup(this.context);
    }

    initialize() {
        this.createWorld();
        this.startTime = performance.now();
        requestAnimationFrame(this.loop.bind(this));
    }

    createWorld() {
        this.nhis = [];
    }

    loop(timestamp: DOMHighResTimeStamp) {
        this.elapsedTime = (timestamp - this.startTime) / 1000;
        this.startTime = timestamp;
        this.fps = Math.round(1 / this.elapsedTime);
        this.elapsedTime = Math.min(this.elapsedTime, 0.1);
        this.spawnEnemy();
        this.enemySpawnRate++;
        for (let i = 0; i < this.nhis.length; i++) {
            this.nhis[i].update(this.elapsedTime);
        }

        this.handleInput();

        if (this.detectCollision()) {
            cancelAnimationFrame(this.rAF_id);
            this.popup.render();
            return false;
        }

        this.checkScore();
        this.phat.update(this.elapsedTime);

        this.clearCanvas();

        this.background.render();

        for (let i = 0; i < this.nhis.length; i++) {
            this.nhis[i].render();
        }

        this.phat.render();

        this.rAF_id = requestAnimationFrame(this.loop.bind(this));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleInput() {
        this.canvas.addEventListener(
            "keydown",
            this.keyDownEventHandler.bind(this),
            false
        );
        this.canvas.addEventListener(
            "click",
            this.clickEventHandler.bind(this),
            false
        );
        this.canvas.addEventListener(
            "touchstart",
            this.touchEventHanlder.bind(this),
            false
        );
    }

    keyDownEventHandler(event: KeyboardEvent) {
        if (event.code == "Space") {
            this.phat.isJumping = true;
        }
        return false;
    }

    clickEventHandler(event: MouseEvent) {
        if (this.detectCollision()) {
            let rect = {
                x: 250,
                y: 100,
                width: 190,
                height: 100
            };
            let mousePosition = this.getMousePosition(this.canvas, event);

            if (this.isInside(mousePosition, rect)) {
                this.phat = new Phat(this.context, 100, 325, 0, -300);
                this.initialize();
            }
        }
    }

    touchEventHanlder(event: TouchEvent) {
        if (event.type == "touchstart") {
            this.phat.isJumping = true;
        }
        return false;
    }

    detectCollision() {
        let nhi: Nhi;

        for (let i = 0; i < this.nhis.length; i++) {
            nhi = this.nhis[i];
            if (
                this.rectIntersect(
                    this.phat.x - 75,
                    this.phat.y + 50,
                    this.phat.width,
                    this.phat.height,
                    nhi.x,
                    nhi.y,
                    nhi.width,
                    nhi.height
                )
            ) {
                return true;
            }
        }
    }

    rectIntersect(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
    ) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }

        return true;
    }

    checkScore() {
        if (this.nhis[0] && this.nhis[0].x < 0) {
            this.nhis.shift();
        }
    }

    spawnEnemy() {
        let newNhi = new Nhi(this.context, 1000, 325, -300, 0);
        if (this.enemySpawnRate == 120) {
            this.nhis.push(newNhi);
            this.enemySpawnRate = 0;
        }
    }

    getMousePosition(
        canvas: HTMLCanvasElement,
        event: MouseEvent
    ): { x: number; y: number } {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    isInside(
        position: { x: number; y: number },
        rect: { x: number; y: number; width: number; height: number }
    ) {
        return (
            position.x > rect.x &&
            position.x < rect.x + rect.width &&
            position.y < rect.y + rect.height &&
            position.y > rect.y
        );
    }
}
