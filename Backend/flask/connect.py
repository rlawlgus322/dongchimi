import cx_Oracle
import os
from pandas import DataFrame

LOCATION = r"C:\Users\multicampus\instantclient_19_8" # 오라클 DB쓰기 위한 유틸 파일
os.environ["PATH"]=LOCATION + ";" + os.environ["PATH"] # 환경변수 등록

def connect():
    connection = cx_Oracle.connect("DCM", "Ssafy1234", "52.78.199.159:1521/xe")
    return connection

def getUserName(connection):
    resoverall = connection.execute(
    """
        SELECT id
        FROM users
    """
    )
    return resoverall

def getUserStorage(connection, id):
    resoverall = connection.execute(
    """
        select category from chimi
        where hid in (
        SELECT chimiId
        FROM storage
        where id = :id)
    """
    )
    return resoverall
    
def getUserLike(connection, id):
    resoverall = connection.execute(
    """
        select category from chimi
        where hid in (
        SELECT chimiId
        FROM chimi_star
        where id = :id)
    """
    )
    return resoverall    

if __name__ == '__main__':
    conn = connect()
    print(getUserLike(conn,1))
