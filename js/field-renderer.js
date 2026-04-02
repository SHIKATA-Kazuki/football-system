import { homePlayers, awayPlayers } from './players.js';

function placePlayers(players, positions, isOpponent) {
  const field = document.getElementById("field");
  const arr = isOpponent ? awayPlayers : homePlayers;

  while (arr.length < players.length) {
    const div = document.createElement("div");
    div.className = isOpponent ? "player away" : "player home"; // ← home/awayクラスを付与
    field.appendChild(div);
    arr.push(div);
  }
  while (arr.length > players.length) {
    const removed = arr.pop();
    removed.remove();
  }
  // 位置とテキスト更新
  for (let i = 0; i < players.length; i++) {
    const el = arr[i];
    el.className = isOpponent ? "player away" : "player home";
    el.style.left = `${positions[i][0]}%`;
    el.style.top = `${positions[i][1]}%`;
    el.innerHTML = `<strong>${players[i].number}</strong>`;
  }
}