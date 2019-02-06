import Board from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext("2d");
  console.log("Webpack is working!");
  new Board(ctx);
})