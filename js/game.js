const game = {
	init: function() {
		const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const boardHeight = parseInt(urlParams.get('height'));
        const boardWidth = parseInt(urlParams.get('width'));

        this.generateBoard(boardHeight, boardWidth);
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
            `<td data-row="${row}" data-col="${col}"></td>`);
    },
};

game.init();