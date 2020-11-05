import cx_Oracle
import os

LOCATION = r"C:\Users\multicampus\instantclient_19_8" # 오라클 DB쓰기 위한 유틸 파일
os.environ["PATH"]=LOCATION + ";" + os.environ["PATH"] # 환경변수 등록

# Connect as user "hr" with password "welcome" to the "orclpdb1" service running on this computer.
# cx0=cx_Oracle.makedsn("oracle", 1521, "xe")
connection = cx_Oracle.connect("DCM", "Ssafy1234", "52.78.199.159:1521/xe")

cursor = connection.cursor()
# cursor.execute("""
#         SELECT username
#         FROM users
#         WHERE department_id = :did AND employee_id > :eid""",
#         did = 50,
#         eid = 190)
cursor.execute("""
        SELECT username
        FROM users"""
)
for username in cursor:
    print("Values:", username)

cursor.close()
connection.close()