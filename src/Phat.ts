import PhatSprite from "./assets/sprites/phatsprite.png";

export class Phat {
    static numColumns: number = 3;
    static numRows: number = 2;
    static frameWidth: number = 0;
    static frameHeight: number = 0;
    static sprite: HTMLImageElement;
    currentFrame: number = 0;
    radius: number = 100;
    safeFrame: number = 0;
    height: number;
    width: number;
    isJumping: boolean;
    jumpLimit: number;
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
        this.width = 50;
        this.isJumping = false;
        this.jumpLimit = 125;
        this.loadImage();
    }

    update(elapsedTime: number) {
        this.jump(elapsedTime);
    }

    jump(elapsedTime: number) {
        this.y = this.y > 325 ? 325 : this.y;

        if (this.isJumping) {
            this.y += this.vy * elapsedTime;

            if (this.y < this.jumpLimit) this.vy = -this.vy;

            if (this.y > 325) {
                this.isJumping = false;
                this.vy = -this.vy;
            }
        }
    }

    loadImage() {
        if (!Phat.sprite) {
            Phat.sprite = new Image();
            Phat.sprite.src = PhatSprite;
            Phat.sprite.onload = () => {
                Phat.frameWidth = Phat.sprite.width / Phat.numColumns;
                Phat.frameHeight = Phat.sprite.height / Phat.numRows;
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

        let column = this.currentFrame % Phat.numColumns;
        let row = Math.floor(this.currentFrame / Phat.numColumns);

        this.context.drawImage(
            Phat.sprite,
            column * Phat.frameWidth,
            row * Phat.frameHeight,
            Phat.frameWidth,
            Phat.frameHeight,
            this.x - this.radius,
            this.y - this.radius - this.radius * 0.4,
            this.radius * 2,
            this.radius * 2.42
        );

        if (this.safeFrame % 5 == 0) this.currentFrame++;
    }
}
