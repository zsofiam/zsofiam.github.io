from flask import Flask, render_template, request, url_for, redirect, session

import data_manager

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/high_scores')
def high_scores():
    scores = data_manager.get_high_scores()
    return render_template('high_scores.html', high_scores=scores)


@app.route('/applicant/<code>', methods=['GET', 'POST'])
def applicant_details(code):
    if request.method == 'POST':
        new_phone = request.form["new-phone"]
        data_manager.update_applicant_phone(new_phone, code)
    applicant_details = data_manager.get_applicant_by_code(code)
    return render_template('applicant.html', applicant = applicant_details)


@app.route('/save_high_score', methods=['POST'])
def save_high_score():
    if request.method == 'POST':
        name = session['name']
        score = session['score']
        level = session['level']
        data_manager.update_high_score_table(name, score, level)
    return redirect(url_for('high_scores'))


if __name__ == '__main__':
    app.run(debug=True)
