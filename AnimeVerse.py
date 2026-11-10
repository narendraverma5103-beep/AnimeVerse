from flask import Flask, render_template, jsonify
# मुख्य फाइल पूरी तरह से साफ है, कोई डेटाबेस इम्पोर्ट नहीं!
from config.anime_fetcher import (
    get_all_anime_master,
    get_anime_by_category, 
    get_seasons_by_anime, 
    get_episodes_by_season
)

app = Flask(__name__)

@app.route("/")
def home():
    # होम पेज के लिए सारा मास्टर डेटा और मूवीज़ का डेटा फेच करके भेज रहे हैं
    all_anime = get_all_anime_master()
    movies_list = get_anime_by_category("Movie")
    
    return render_template("AnimeVerse.html", anime_list=all_anime, movies_list=movies_list)

@app.route("/watch/<anime_name>")
def watch_anime(anime_name):
    return render_template("watch.html", anime_name=anime_name)


# --- DATA FETCHING API ROUTES ---

@app.route("/api/movies")
def api_movies():
    movies = get_anime_by_category("Movie")
    return jsonify(movies)

@app.route("/api/series")
def api_series():
    series = get_anime_by_category("Series")
    return jsonify(series)

@app.route("/api/anime/<anime_id>/seasons")
def api_anime_seasons(anime_id):
    seasons = get_seasons_by_anime(anime_id)
    return jsonify(seasons)

@app.route("/api/season/<int:season_id>/episodes")
def api_season_episodes(season_id):
    episodes = get_episodes_by_season(season_id)
    return jsonify(episodes)


if __name__ == "__main__":
    app.run(debug=True)