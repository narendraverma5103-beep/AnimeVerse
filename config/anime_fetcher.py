from .db_config import get_db_connection

def get_all_anime_master():
    """
    Fetches all anime records from the anime_master table.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("SELECT anime_id, anime_name, common_poster_url, description, common_trailer_url FROM anime_master;")
        return cur.fetchall()
    except Exception as e:
        print(f"Error fetching anime master: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_anime_by_category(category_name):
    """
    Fetches anime list filtered by category (e.g., Movie, Series) from anime_seasons_details joined with anime_master.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        query = """
            SELECT DISTINCT m.anime_id, m.anime_name, m.common_poster_url, s.category 
            FROM anime_master m
            JOIN anime_seasons_details s ON m.anime_id = s.anime_id
            WHERE s.category ILIKE %s;
        """
        cur.execute(query, (f"%{category_name}%",))
        return cur.fetchall()
    except Exception as e:
        print(f"Error fetching by category: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_seasons_by_anime(anime_id):
    """
    Fetches all seasons and details for a specific anime_id.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        query = """
            SELECT season_id, anime_id, season_number, category, 
                   related_season_poster_url, season_trailer_url, 
                   quality, audio_type, subtitle_lang, season_name 
            FROM anime_seasons_details WHERE anime_id = %s;
        """
        cur.execute(query, (anime_id,))
        return cur.fetchall()
    except Exception as e:
        print(f"Error fetching seasons: {e}")
        return []
    finally:
        cur.close()
        conn.close()

def get_episodes_by_season(season_id):
    """
    Fetches all episodes for a specific season_id.
    """
    conn = get_db_connection()
    cur = conn.cursor()
    try:
        query = """
            SELECT episode_id, season_id, episode_number, episode_title, 
                   episode_duration, episode_thumbnail_url, video_file_url 
            FROM anime_episodes WHERE season_id = %s ORDER BY episode_number ASC;
        """
        cur.execute(query, (season_id,))
        return cur.fetchall()
    except Exception as e:
        print(f"Error fetching episodes: {e}")
        return []
    finally:
        cur.close()
        conn.close()