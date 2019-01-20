let field = document.querySelector("#field");

//add div blocks to container
function addItem(container) {
  for (let i = 0; i < 16; i++) {
    container.insertAdjacentHTML("afterbegin", '<div class="cell"></div>');
  }
}

addItem(field);

//getting an array with numbers from 1 to 15 in random order
function generateTheArray() {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }

  array = array.sort(compareRandom);
  array.push("");
  return array;
}

//coordinates of background-position css property for .cell
let imgCoords = ['',
  '6% 4%', '33% 4%', '59% 4%', '87% 4%', 
  '6% 31%', '33% 31%', '59% 31%', '87% 31%', 
  '6% 58%', '33% 58%', '59% 58%', '87% 58%', 
  '6% 85%', '33% 85%', '59% 85%'
];

let cells = document.querySelectorAll(".cell");

//set the background-position and fill cells with numbers
function fillCells(array) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = array[i];
    cells[i].style.backgroundPosition = imgCoords[cells[i].textContent];
  }
  cells[cells.length - 1].classList.add("empty");
}

let numbers = generateTheArray();
fillCells(numbers);

//move cells
field.addEventListener("click", moveCells);

function moveCells(e) {
  let target = e.target.closest(".cell");

  if (!target || !field.contains(target)) {
    return;
  }

  let empty = document.querySelector(".empty");

  for (let i = 0; i < cells.length; i++) {
    if (target !== cells[3] && target !== cells[7] && target !== cells[11]) {
      if (target === cells[i] && cells[i + 1] === empty) {
        cells[i + 1].textContent = cells[i].textContent;
        cells[i].textContent = "";
        cells[i].classList.add("empty");
        cells[i + 1].classList.remove("empty");
        cells[i + 1].style.backgroundPosition = cells[i].style.backgroundPosition;
        empty = cells[i];
      }
    }
    if (target === cells[i] && cells[i - 1] === empty) {
      cells[i - 1].textContent = cells[i].textContent;
      cells[i].textContent = "";
      cells[i].classList.add("empty");
      cells[i - 1].classList.remove("empty");
      cells[i - 1].style.backgroundPosition = cells[i].style.backgroundPosition;
      empty = cells[i];
    }

    if (target === cells[i] && cells[i - 4] === empty) {
      cells[i - 4].textContent = cells[i].textContent;
      cells[i].textContent = "";
      cells[i].classList.add("empty");
      cells[i - 4].classList.remove("empty");
      cells[i - 4].style.backgroundPosition = cells[i].style.backgroundPosition;
      empty = cells[i];
    }

    if (target === cells[i] && cells[i + 4] === empty) {
      cells[i + 4].textContent = cells[i].textContent;
      cells[i].textContent = "";
      cells[i].classList.add("empty");
      cells[i + 4].classList.remove("empty");
      cells[i + 4].style.backgroundPosition = cells[i].style.backgroundPosition;
      empty = cells[i];
    }
  }
  checkTheOrder();
}

//check the order

function checkTheOrder() {
  let result = document.querySelector(".result");
  let arr = Array.from(cells);

  arr.sort((a, b) => a.textContent - b.textContent).shift();

  let isEqual = arr.every(function (value, index) {
    return value === cells[index];
  });

  if (arr.length === cells.length - 1 && isEqual) {
    result.style.display = "block";
  }
}

