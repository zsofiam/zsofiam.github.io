let height;
let width;
let snakeList;
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
	moveSnake: function(event){
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
		const color = urlParams.get('skin');
		let fields = document.querySelectorAll("td");
		switch (event.key) {
			//snake head coordinates change according to keys
			// body parts will get the coordinates of the previous body part
			case 'ArrowUp':
				for (let i = snakeList.length - 1; i > 0; i--){
					snakeList[i][0] = snakeList[i - 1][0];
					snakeList[i][1] = snakeList[i - 1][1];
				}
				snakeList[0][0] = snakeList[0][0] - 1;
				break;
			case 'ArrowDown':
				for (let i = snakeList.length - 1; i > 0; i--){
					snakeList[i][0] = snakeList[i - 1][0];
					snakeList[i][1] = snakeList[i - 1][1];
				}
				snakeList[0][0] = snakeList[0][0] + 1;
				break;
			case 'ArrowRight':
				for (let i = snakeList.length - 1; i > 0; i--){
					snakeList[i][0] = snakeList[i - 1][0];
					snakeList[i][1] = snakeList[i - 1][1];
				}
				snakeList[0][1] = snakeList[0][1] + 1;
				break;
			case 'ArrowLeft':
				for (let i = snakeList.length - 1; i > 0; i--){
					snakeList[i][0] = snakeList[i - 1][0];
					snakeList[i][1] = snakeList[i - 1][1];
				}
				snakeList[0][1] = snakeList[0][1] - 1;
				break;
		}
		for (let field of fields) {
			// Clear the table before replacing snake - display movement
			if (field.classList.contains(color)){
				field.classList.remove(color);
				field.classList.add('empty');
			}
		}
		let counter = 0;
		// Go through all of the snake parts (the coordinates)
		let outOfRange = true;
    	for (let item of snakeList){
			// check all field if they match with the current snake part
    		for (let i = 0; i < fields.length; i++) {
				//Put Head
				if (counter === 0 && parseInt(fields[i].getAttribute("row")) === item[0] &&
					parseInt(fields[i].getAttribute("col")) === item[1]) {
					outOfRange = false;

					// if head meets with food
					if (fields[i].classList.contains("food")){
						fields[i].classList.remove("food");
						fields[i].classList.add("snake-head");
						fields[i].classList.add(color);
						fields[i].innerText = ":3";
						head_row = parseInt(fields[i].getAttribute('row'));
						head_col = parseInt(fields[i].getAttribute('col'));
						// this.placeFood(width,height)
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
						counter++;
					} else {
						fields[i].classList.remove("empty");
						fields[i].classList.add(color)
						fields[i].classList.add("snake-head");
						fields[i].innerText = ":3";
						counter++;
					}

				}
				//Put Body
				else if (parseInt(fields[i].getAttribute("row")) === item[0] &&
					parseInt(fields[i].getAttribute("col")) === item[1]) {
					//check if head meets body
					fields[i].classList.remove("empty");
					fields[i].classList.remove("snake-head");
					fields[i].innerText = "";
					if (!fields[i].classList.contains(color)){
						fields[i].classList.add(color);
					}
				}
			}
		}
		if (outOfRange){
			alert("You lost!");
		}
		//Eat food
		let food = document.querySelector(".food");
		let foodX = parseInt(food.getAttribute('row'));
		let foodY = parseInt(food.getAttribute('col'));

		if (foodX === snakeList[0][0] && foodY === snakeList[0][1]) {
			food.classList.toggle("food");
			alert("Ass");
			//Add score
			//Generate new food
		}
	}
};

game.init();