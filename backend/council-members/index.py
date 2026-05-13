import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список членов совета НКО при РОП с поиском и фильтрацией по региону."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    params = event.get('queryStringParameters') or {}
    search = (params.get('search') or '').strip()
    region = (params.get('region') or '').strip()

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    conditions = []
    values = []

    if search:
        conditions.append("(LOWER(name) LIKE LOWER(%s) OR LOWER(organization) LIKE LOWER(%s))")
        values.extend([f'%{search}%', f'%{search}%'])

    if region and region != 'Все':
        conditions.append("region = %s")
        values.append(region)

    where = ('WHERE ' + ' AND '.join(conditions)) if conditions else ''

    cur.execute(f"""
        SELECT num, name, organization, region
        FROM council_members
        {where}
        ORDER BY num
    """, values)

    rows = cur.fetchall()

    cur.execute("SELECT DISTINCT region FROM council_members ORDER BY region")
    regions = ['Все'] + [r[0] for r in cur.fetchall()]

    cur.execute("SELECT COUNT(*) FROM council_members")
    total = cur.fetchone()[0]

    cur.close()
    conn.close()

    members = [
        {'num': r[0], 'name': r[1], 'organization': r[2], 'region': r[3]}
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'members': members, 'regions': regions, 'total': total}, ensure_ascii=False)
    }
