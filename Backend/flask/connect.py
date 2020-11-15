import cx_Oracle
import os
from pandas import DataFrame

LOCATION = r"C:\Users\multicampus\instantclient_19_8" # 오라클 DB쓰기 위한 유틸 파일
os.environ["PATH"]=LOCATION + ";" + os.environ["PATH"] # 환경변수 등록

def connect(): 
    connection = cx_Oracle.connect("DCM", "Ssafy1234", "52.78.199.159:1521/xe")
    cursor = connection.cursor()
    return  connection, cursor

def getUserName(cursor):
    resoverall = cursor.execute(
    """
        SELECT id
        FROM users
    """
    )
    return resoverall

def getUserPrefer(cursor, email):
    resoverall = cursor.execute(
    """
        SELECT id,prefer1,prefer2,prefer3
        FROM users
        WHERE email = :uemail
    """
    ,uemail = email
    )
    return resoverall

def getUserStorage(cursor, id):
    resoverall = cursor.execute(
    """
        select category from chimi
        where hid in (
        SELECT chimi_Id
        FROM storage
        where user_Id = :userid)
    """
    ,userid = id
    )
    return resoverall

def getUserStorageName(cursor, id):
    resoverall = cursor.execute(
    """
        select hid from chimi
        where hid in (
        SELECT chimi_Id
        FROM storage
        where user_Id = :userid)
    """
    ,userid = id
    )
    return resoverall
    
def getUserLike(cursor, id):
    resoverall = cursor.execute(
    """
        select category from chimi
        where hid in (
        SELECT chimi_Id
        FROM chimi_star
        where user_Id = :userid
        )
    """
    ,userid = id
    )
    return resoverall    

def getchimi(cursor, category):
    resoverall = cursor.execute(
    # """
    #     select * from chimi
    #     where category like '%:selcategory%' and isstart = True;
       
    # """
    """
        select * from chimi
        where category = :selcategory and isstart = True;
       
    """
    ,selcategory = category
    )
    return resoverall    

if __name__ == '__main__':
    conn, cursor = connect()
    print(getUserLike(cursor,1))
    cursor.close()
    conn.close()
