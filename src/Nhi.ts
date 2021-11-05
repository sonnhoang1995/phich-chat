import NhiSprite from "./assets/sprites/nhisprite.png";

export class Nhi {
    static numColumns: number = 3;
    static numRows: number = 2;
    static frameWidth: number = 0;
    static frameHeight: number = 0;
    static sprite: HTMLImageElement;
    currentFrame: number = 0;
    radius: number = 75;
    safeFrame: number = 0;
    height: number;
    width: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    context: CanvasRenderingContext2D;
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        vx: number,
        vy: number
    ) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.height = 75;
        this.width = 40;

        this.loadImage();
    }

    loadImage() {
        if (!Nhi.sprite) {
            Nhi.sprite = new Image();
            Nhi.sprite.src = NhiSprite;
            Nhi.sprite.onload = () => {
                Nhi.frameWidth = Nhi.sprite.width / Nhi.numColumns;
                Nhi.frameHeight = Nhi.sprite.height / Nhi.numRows;
            };
        }
    }

    render() {
        this.safeFrame++;
        let maxFrame = 5;
        if (this.currentFrame > maxFrame) {
            this.currentFrame = 0;
        }

        if (this.safeFrame > 60) {
            this.safeFrame = 0;
        }

        let column = this.currentFrame % Nhi.numColumns;
        let row = Math.floor(this.currentFrame / Nhi.numColumns);

        this.context.drawImage(
            Nhi.sprite,
            column * Nhi.frameWidth,
            row * Nhi.frameHeight,
            Nhi.frameWidth,
            Nhi.frameHeight,
            this.x - this.radius,
            this.y - this.radius - this.radius * 0.4,
            this.radius * 2,
            this.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }

    update(elapsedTime: number) {
        this.x += this.vx * elapsedTime;
    }
}
