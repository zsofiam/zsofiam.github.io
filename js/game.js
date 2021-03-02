const game = {
	init: function() {
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const size = urlParams.get('size');
        let boardHeight = 14;
        let boardWidth = 18;
        switch (size) {
			case 'small':
				boardHeight = 8;
        		boardWidth = 10;
        		break;
			case 'large':
				boardHeight = 20;
        		boardWidth = 26;
        		break;
		}
        this.generateBoard(boardHeight, boardWidth);
        this.putSnakeOnTheBoard(9, 12, 5);
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
            `<td row="${row}" col="${col}"></td>`);
    },

    putSnakeOnTheBoard: function(headRow, headCol, length) {
    	let fields = document.querySelectorAll("td");
    	for (let i = 0; i < fields.length; i++) {
    		//Head
    		if (fields[i].getAttribute("row") == headRow && fields[i].getAttribute("col") == headCol) {
    			fields[i].classList.add("snake-head");
    			fields[i].innerText = ":3";
    		}
    		//Body
    		else if (fields[i].getAttribute("row") == headRow && (fields[i].getAttribute("col") > headCol-length) && fields[i].getAttribute("col") < headCol) {
				fields[i].classList.add("snake");
    		}
    	}
    }
	placeFood: function () {

	}
};

game.init();