import {createInputs} from './players.js';
import {placePlayers} from './field-renderer.js';
import {formations} from './formations.js';
import {readPlayersFromForm} from './players.js';
import { initializeTeamSelects } from './team-colors.js';
import { initializeFormationButtons, initializeSliders, initializeFormSubmits } from './ui-events.js';
// configは？

document.addEventListener("DOMContentLoaded", () => {
  const homeSelect = document.getElementById('homeTeamSelect');
  const awaySelect = document.getElementById('awayTeamSelect');
  // ホーム変更イベント
  const homeChip = document.querySelector('.home-chip');
  const awayChip = document.querySelector('.away-chip');
  homeSelect.addEventListener('change', () => {
    const t = teamColors[homeSelect.value];
    homeChip.style.background = t.color;
    homeChip.style.color = t.text;
    homeChip.textContent = `${t.name}`;
  });

  homeSelect.addEventListener('change', () => updateHomeColor(homeSelect.value));
  awaySelect.addEventListener('change', () => updateAwayColor(awaySelect.value));

  // アウェイ変更イベント
  awaySelect.addEventListener('change', () => {
    const t = teamColors[awaySelect.value];
    awayChip.style.background = t.color;
    awayChip.style.color = t.text;
    awayChip.textContent = `${t.name}`;
  });
  // ===== 入力欄生成 =====================================================


  createInputs("inputsHome");
  createInputs("inputsAway");
  
  initializeTeamSelects()//チームユニフォーム
  initializeFormationButtons();//描画ロジック
  initializeFormSubmits() //イベントハンドラ
  initializeSliders()

  window.addEventListener('load', () => {
      const homeForm = document.getElementById('playerFormHome');
      const players = readPlayersFromForm(homeForm);
      placePlayers(players, formations['4123'], false);
  });
  //////////関数の定義//////////
  function applyFormation(formation){
    const players = readPlayersFromForm(
      document.getElementById("playerFormHome")
    );
    placePlayers(players, formation, false);
  }

  // 初期色設定
  updateHomeColor(homeSelect.value);
  updateAwayColor(awaySelect.value);
});