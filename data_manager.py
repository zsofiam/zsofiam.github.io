
from psycopg2.extras import RealDictCursor

import database_common


@database_common.connection_handler
def get_high_scores(cursor: RealDictCursor) -> list:
    query = """
        SELECT *
        FROM high_score
        ORDER BY score"""
    cursor.execute(query)
    return cursor.fetchall()


@database_common.connection_handler
def update_high_score_table(cursor: RealDictCursor, name:str, score:int, level:int):
    query = """
     SELECT score
     FROM high_score
     WHERE level = (%s);
     """
    cursor.execute(query, (level,))
    highest_score = cursor.fetchone().get('score')
    if highest_score < score:
        query = """ 
         UPDATE high_score
         SET 
         score = (%s), 
         name = (%s)
        WHERE level = (%s);
     """
        cursor.execute(query, (score, name, level,))