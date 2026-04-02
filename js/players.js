import { playerRoles } from './config.js';

const homePlayers = []; // DOM要素
const awayPlayers = []; // DOM要素

export function readPlayersFromForm(formEl) {
  const fd = new FormData(formEl);
  const arr = [];
  for (let i = 1; i <= 11; i++) {
    arr.push({ number: fd.get(`number${i}`), name: fd.get(`name${i}`) });
  }
  return arr;
}

export function createInputs(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  // var role ={ 
  //    0:'GK        ',
  //    1:'Back(R)   ',
  //    2:'Back      ',
  //    3:'Back      ',
  //    4:'Back(L)   ',
  //    5:'Anchor    ',
  //    6:'Atack(R)  ',
  //    7:'Box to Box',
  //    8:'Striker   ',
  //    9:'Ace       ',
  //   10:'Atack(L)  ',
  // }
  let numbers;
  if (containerId === "inputsHome") {
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  } else {
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }      
  for (let i = 0; i <= 10; i++) {
    container.innerHTML += `
      <div>
        ${playerRoles[i]} <input type="number" name="number${i+1}" value="${numbers[i]}" required>
      </div>
    `;
  }
}