import psycopg2

# Database Connection URL for Anime_Verse / Neon PostgreSQL
DATABASE_URL = "postgresql://neondb_owner:npg_2cJt9UwGoaZe@ep-snowy-math-b3oxu2qm-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

def get_db_connection():
    """
    Establishes a connection to the Neon PostgreSQL database and returns the connection object.
    """
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise e