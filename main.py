from flask import Flask, render_template

import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/high_scores')
def high_scores():
    scores = data_manager.get_high_scores();
    return render_template('high_scores.html', high_scores=scores)


if __name__ == '__main__':
    app.run(debug=True)
