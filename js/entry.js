import Board from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = 5000;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  new Board(ctx);
})