import { GameWorld } from "./GameWorld";
import "./styles/style";

let gameWorld = new GameWorld();
gameWorld.initialize();

gameWorld.myButton.addEventListener("click", () => {
    gameWorld.myButton.hidden = true;
    gameWorld.canvas.tabIndex = 1;
    gameWorld.canvas.focus();
    gameWorld.initialize();
});
