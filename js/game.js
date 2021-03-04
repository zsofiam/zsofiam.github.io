let height;
let width;
let snakeList;
let outOfRange;
let currentScore;
let gameDisabled = false;
let direction = 'right';
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
		snakeList = [[7,6],[7,5],[7,4],[7,3],[7,2]];
        switch (size) {
			case 'small':
				boardHeight = 8;
        		boardWidth = 10;
				height = boardHeight;
				width = boardWidth;
        		headRow = 3;
        		headCol = 5;
        		snakeList = [[3,5],[3,4],[3,3],[3,2],[3,1]];
        		break;
			case 'large':
				boardHeight = 20;
        		boardWidth = 26;
				height = boardHeight;
				width = boardWidth;
        		headRow = 10;
        		headCol = 10;
        		snakeList = [[10,10],[10,9],[10,8],[10,7],[10,6]];
        		break;
		}
		const color = urlParams.get('skin');
        this.generateBoard(boardHeight, boardWidth);
        this.putSnakeOnTheBoard(color, snakeList);
        this.placeFood(boardHeight, boardWidth);
		document.addEventListener('keydown', this.changeDirection);
		window.setInterval(this.moveSnake,300);
		currentScore = 0;
		scoreField = document.querySelector("#current-score");
		scoreField.setAttribute("score", currentScore);
		console.log(scoreField.getAttribute("score"));
		scoreField.innerHTML = scoreField.getAttribute("score");
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

    putSnakeOnTheBoard: function(color, snakeList) {
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
					fields[i].classList.remove("snake-head");
					if (!fields[i].classList.contains(color)){
						fields[i].classList.add(color);
					}
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
	changeDirection: function(event){
		//changing direction
		switch (event.key) {
			//snake head coordinates change according to keys
			// body parts will get the coordinates of the previous body part
			case 'ArrowUp':
				direction = 'up';
				break;
			case 'ArrowDown':
				direction = 'down';
				break;
			case 'ArrowRight':
				direction = 'right';
				break;
			case 'ArrowLeft':
				direction = 'left';
				break;
		}
	},
	moveSnake: function(event) {
		if (gameDisabled) return;
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const color = urlParams.get('skin');
		let fields = document.querySelectorAll("td");
		let last_index = snakeList.length - 1;
		let last_body_row = snakeList[last_index][0];
		let last_body_col = snakeList[last_index][1];
		// moving
		if (direction === 'up') {
			for (let i = snakeList.length - 1; i > 0; i--) {
				snakeList[i][0] = snakeList[i - 1][0];
				snakeList[i][1] = snakeList[i - 1][1];
			}
			snakeList[0][0] = snakeList[0][0] - 1;
		}
		if (direction === 'down') {
			for (let i = snakeList.length - 1; i > 0; i--) {
				snakeList[i][0] = snakeList[i - 1][0];
				snakeList[i][1] = snakeList[i - 1][1];
			}
			snakeList[0][0] = snakeList[0][0] + 1;
		}
		if (direction === 'right') {
			for (let i = snakeList.length - 1; i > 0; i--) {
				snakeList[i][0] = snakeList[i - 1][0];
				snakeList[i][1] = snakeList[i - 1][1];
			}
			snakeList[0][1] = snakeList[0][1] + 1;
		}
		if (direction === 'left') {
			for (let i = snakeList.length - 1; i > 0; i--) {
				snakeList[i][0] = snakeList[i - 1][0];
				snakeList[i][1] = snakeList[i - 1][1];
			}
			snakeList[0][1] = snakeList[0][1] - 1;
		}


		for (let field of fields) {
			// Clear the table before replacing snake - display movement
			if (field.classList.contains(color)) {
				field.classList.remove(color);
				field.classList.add('empty');
			}
		}
		let new_snake_row;
		let new_snake_col;
		let counter = 0;
		// Go through all of the snake parts (the coordinates)
		outOfRange = false;
		for (let item of snakeList) {
			if (counter === 0) {
				new_snake_row = item[0];
				new_snake_col = item[1];
			}
			// check all field if they match with the current snake part
			for (let i = 0; i < fields.length; i++) {
				//Put Head
				// if hit wall
				if (counter === 0) {
					if (new_snake_row < 0 || new_snake_row > height - 1 ||
						new_snake_col < 0 || new_snake_col > width - 1) {
						outOfRange = true;
						break;
					}
					// if did not hit wall
					else if (parseInt(fields[i].getAttribute("row")) === item[0] &&
						parseInt(fields[i].getAttribute("col")) === item[1]) {
						// if ate food
						if (fields[i].classList.contains("food")) {
							//increase score by 10
							currentScore = parseInt(scoreField.getAttribute("score")) + 10;
							scoreField.setAttribute("score", currentScore);
							scoreField.innerHTML = scoreField.getAttribute("score");
							fields[i].classList.remove("food");
							fields[i].classList.add("snake-head");
							fields[i].classList.add(color);
							fields[i].innerText = ":3";
							// this.placeFood(width,height)
							let foodNeedsPlace = true;
							while (foodNeedsPlace) {
								let foodRow = Math.floor(Math.random() * height);
								let foodCol = Math.floor(Math.random() * width);
								for (let field of fields) {
									if (parseInt(field.getAttribute('row')) === foodRow && parseInt(field.getAttribute('col')) === foodCol) {
										if (!field.classList.contains('empty')) {
											break;
										} else {
											field.classList.remove("empty");
											field.classList.add('food');
											foodNeedsPlace = false;
										}
									}
								}
							}
							counter++;
							// after eating the snake grows
							snakeList.push([last_body_row, last_body_col]);
							//	head does not meet with food
						} else {
							fields[i].classList.remove("empty");
							fields[i].classList.add(color)
							fields[i].classList.add("snake-head");
							fields[i].innerText = ":3";
							counter++;
						}
					}
				}
				//Put Body
				else if (parseInt(fields[i].getAttribute("row")) === item[0] &&
					parseInt(fields[i].getAttribute("col")) === item[1]) {
					//check if snake head hits body
					if (new_snake_row === item[0] && new_snake_col === item[1]) {
						outOfRange = true;
					}
					//check if head meets body
					fields[i].classList.remove("empty");
					fields[i].classList.remove("snake-head");
					fields[i].innerText = "";
					if (!fields[i].classList.contains(color)) {
						fields[i].classList.add(color);
					}
				}
			}
			if (outOfRange) {
				alert("You lost!");
				document.querySelector(".snake-head").innerText = ":(";
				gameDisabled = true;
				alert(`Congratulations! Final score: ${currentScore}`);
				break;
			}
		}
	}
};

game.init();