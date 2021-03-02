const game = {
	init: function() {
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const size = urlParams.get('size');
        let boardHeight = 14;
        let boardWidth = 18;
        let headRow = 7;
        let headCol = 6;
        switch (size) {
			case 'small':
				boardHeight = 8;
        		boardWidth = 10;
        		headRow = 3;
        		headCol = 5;
        		break;
			case 'large':
				boardHeight = 20;
        		boardWidth = 26;
        		headRow = 10;
        		headCol = 10;
        		break;
		}
		const color = urlParams.get('skin');
        this.generateBoard(boardHeight, boardWidth);
        this.putSnakeOnTheBoard(color, headRow, headCol, 5);
        this.placeFood(boardHeight, boardWidth);
	},

	generateBoard: function(height, width) {
		let containerDiv = document.querySelector(".game-field");

		gameField = this.addTable(containerDiv);

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

    putSnakeOnTheBoard: function(color, headRow, headCol, length) {
    	let fields = document.querySelectorAll("td");
    	for (let i = 0; i < fields.length; i++) {
    		//Head
    		if (fields[i].getAttribute("row") == headRow && fields[i].getAttribute("col") == headCol) {
    			fields[i].classList.remove("empty");
    			fields[i].classList.add(color)
    			fields[i].classList.add("snake-head");
    			fields[i].innerText = ":3";
    		}
    		//Body
    		else if (fields[i].getAttribute("row") == headRow && (fields[i].getAttribute("col") > headCol-length) && fields[i].getAttribute("col") < headCol) {
				fields[i].classList.remove("empty");
    			fields[i].classList.add(color);
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

	}
};

game.init();