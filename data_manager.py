
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