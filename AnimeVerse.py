from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    # Ye templates folder ke andar se AnimeVerse.html ko render karega
    return render_template("AnimeVerse.html")

if __name__ == "__main__":
    app.run(debug=True)