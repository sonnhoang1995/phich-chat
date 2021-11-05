import BackgroundSprite from "./assets/images/backgroundsprite.png";

export class Background {
    static sprite: HTMLImageElement;
    height: number;
    width: number;
    speed: number = 2;
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
        this.height = 400;
        this.width = 1000;

        this.loadImage();
    }

    update(elapsedTime: number) {}

    loadImage() {
        Background.sprite = new Image();

        Background.sprite.src = BackgroundSprite;
    }

    render() {
        this.x -= this.speed;
        this.context.drawImage(Background.sprite, this.x, this.y);
        this.context.drawImage(Background.sprite, this.x - this.width, this.y);
        if (this.x < 0) this.x = 1000;
    }
}
