from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    # Ye templates folder ke andar se AnimeVerse.html ko render karega
    return render_template("AnimeVerse.html")

@app.route("/watch/<anime_name>")
def watch_anime(anime_name):
    # Jab user kisi anime card par click karega, ye route watch.html ko open karega 
    # aur URL se anime ka naam pass karega
    return render_template("watch.html", anime_name=anime_name)

if __name__ == "__main__":
    app.run(debug=True)