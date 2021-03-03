let height;
let width;
const game = {
	init: function() {
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const size = urlParams.get('size');
        let boardHeight = 14;
        let boardWidth = 18;
        height = boardHeight;
        width = boardWidth;
        let headRow = 7;
        let headCol = 6;
        // let headRow = 7;
        // let headCol = 6;
		let snakeList = [[7,6],[7,5],[7,4],[7,3],[7,2]];
        switch (size) {
			case 'small':
				boardHeight = 8;
        		boardWidth = 10;
				height = boardHeight;
				width = boardWidth;
        		headRow = 3;
        		headCol = 5;
        		snakeList = [[3,5],[3,4],[3,3],[3,2],[3,1]];
        		// headRow = 3;
        		// headCol = 5;
        		break;
			case 'large':
				boardHeight = 20;
        		boardWidth = 26;
				height = boardHeight;
				width = boardWidth;
        		headRow = 10;
        		headCol = 10;
        		snakeList = [[10,10],[10,9],[10,8],[10,7],[10,6]];
        		// headRow = 10;
        		// headCol = 10;
        		break;
		}
		const color = urlParams.get('skin');
        this.generateBoard(boardHeight, boardWidth);
        this.putSnakeOnTheBoard(color, snakeList, 5);
        this.placeFood(boardHeight, boardWidth);
        document.addEventListener('keydown', this.moveSnake);
	},

	generateBoard: function(height, width) {
		let containerDiv = document.querySelector(".game-field");

		let gameField = this.addTable(containerDiv);

		let cellIndex = 0;
		for (let row = 0; row < height; row++) {
			const rowElement = this.addRow(gameField);
			for (let col = 0; col < width; col++) {
				this.addCell(rowElement, row, col);
                cellIndex++;
			}
		}
	},

	addTable: function(containerDiv) {
		containerDiv.insertAdjacentHTML(
            'beforeend',
            '<table class="center border"><tbody></tbody></table>'
        );
        return containerDiv.lastElementChild.lastElementChild;
	},

	addRow: function(gameField) {
        gameField.insertAdjacentHTML(
            'beforeend',
            '<tr></tr>'
        );
        return gameField.lastElementChild;
    },
    addCell: function (rowElement, row, col) {
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<td row="${row}" col="${col}" class="empty"></td>`);
    },

    putSnakeOnTheBoard: function(color, snakeList, length) {
    	let fields = document.querySelectorAll("td");
    	let counter = 0;
    	for (let item of snakeList){
    		for (let i = 0; i < fields.length; i++) {
    		//Head
				if (counter === 0 && parseInt(fields[i].getAttribute("row")) === item[0] &&
					parseInt(fields[i].getAttribute("col")) === item[1]) {
					fields[i].classList.remove("empty");
					fields[i].classList.add(color)
					fields[i].classList.add("snake-head");
					fields[i].innerText = ":3";
					counter++;
				}
				//Body
				else if (parseInt(fields[i].getAttribute("row")) === item[0] &&
					parseInt(fields[i].getAttribute("col")) === item[1]) {
					fields[i].classList.remove("empty");
					fields[i].classList.add(color);
				}
			}
		}

    },
	generateFoodPosition(height, width){
		let foodRow = Math.floor(Math.random() * height);
		let foodCol = Math.floor(Math.random() * width);
		return [foodRow, foodCol]
	},
	placeFood: function (height, width) {
		let fields = document.querySelectorAll("td");
		let foodNeedsPlace = true;
		while (foodNeedsPlace) {
			let foodRow = this.generateFoodPosition(height, width)[0];
			let foodCol = this.generateFoodPosition(height, width)[1];
			for (let field of fields) {
				if (parseInt(field.getAttribute('row')) === foodRow && parseInt(field.getAttribute('col')) === foodCol){
					if (!field.classList.contains('empty')){
						break;
					} else {
						field.classList.remove("empty");
						field.classList.add('food');
						foodNeedsPlace = false;
					}
				}
			}
		}

	},
	moveSnake: function(event){
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
		const color = urlParams.get('skin');
		let fields = document.querySelectorAll("td");
		let row;
		let col;
		let snakeList = [];
		let length = 0;
		for (let field of fields){
			if (field.classList.contains('snake-head')){
				row = parseInt(field.getAttribute('row'));
				col = parseInt(field.getAttribute('col'));
				length = snakeList.push([row, col]);
			}
		}
		switch (event.key) {
			case 'ArrowUp':
				snakeList[0][0] = snakeList[0][0] - 1;
				break;
			case 'ArrowDown':
				snakeList[0][0] = snakeList[0][0] + 1;
				break;
			case 'ArrowRight':
				snakeList[0][1] = snakeList[0][1] + 1;
				break;
			case 'ArrowLeft':
				snakeList[0][1] = snakeList[0][1] - 1;
				break;
		}
		for (let field of fields) {
			//Head
			if (field.classList.contains('snake-head')){
				field.classList.add("empty");
				field.classList.remove("snake-head");
				field.classList.remove(color);
				field.innerText = "";
			}
			if (parseInt(field.getAttribute("row")) === snakeList[0][0] && parseInt(field.getAttribute("col")) === snakeList[0][1]) {
				if (field.classList.contains("empty")){
					field.classList.remove("empty");
					field.classList.add("snake-head");
					field.classList.add(color);
					field.innerText = ":3";
				}
				else if (field.classList.contains("food")){
					field.classList.remove("food");
					field.classList.add("snake-head");
					field.classList.add(color);
					field.innerText = ":3";
					// this.placeFood(width,height)
					let fields = document.querySelectorAll("td");
					let foodNeedsPlace = true;
					while (foodNeedsPlace) {
						let foodRow = Math.floor(Math.random() * height);
						let foodCol = Math.floor(Math.random() * width);
						for (let field of fields) {
							if (parseInt(field.getAttribute('row')) === foodRow && parseInt(field.getAttribute('col')) === foodCol){
								if (!field.classList.contains('empty')){
									break;
								} else {
									field.classList.remove("empty");
									field.classList.add('food');
									foodNeedsPlace = false;
								}
							}
						}
					}
				}

			}
		}

		//Eat food
		let food = document.querySelector(".food");
		let foodX = parseInt(food.getAttribute('row'));
		let foodY = parseInt(food.getAttribute('col'));

		if (foodX == snakeList[0][0] && foodY == snakeList[0][1]) {
			food.classList.toggle("food");
			alert("Ass");
			//Add score
			//Generate new food
		}
	},
	/*checkForFood: function(snakeX, snakeY) {
		//Eat food
		let food = document.querySelector(".food");
		let foodX = parseInt(food.getAttribute('row'));
		let foodY = parseInt(food.getAttribute('col'));

		if (foodX == snakeX && foodY == snakeY) {
			food.classList.toggle("food");
			alert("Ass");
			//Add score
			//Generate new food
		}
	},*/
};

game.init();