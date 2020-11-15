from flask import Flask, request,jsonify
from pandas import DataFrame
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import connect
from flask_cors import CORS
import random
app = Flask(__name__)   
CORS(app, resources={r'*': {'origins': '*'}})
chimi_main_category = ["미술","공예",'디지털드로잉',"사진",'영상',"요리",'음악',"운동"]
chimi_category_dict ={"미술":["유화","수채화","파스텔"],
                    "공예":["가죽","뜨개질","비즈"],
                    '디지털드로잉':["일러스트","이모티콘"],
                    "사진/영상":["편집","촬영"],
                    "요리":["한식","양식","일식","중식","세계음식"],
                    '음악':["작곡","작사","타악기","현악기","관악기","댄스"],
                    "운동":["헬스","홈트","다이어트"]}
chimi_sub_category = ["유화","수채화","파스텔","가죽","뜨개질","비즈","일러스트","이모티콘","편집","촬영"
                        ,"한식","양식","일식","중식","세계음식","기타","작곡","작사","타악기","현악기","관악기","댄스",
                        "헬스","홈트레이닝","다이어트"]
chimi_sub_dict = {"유화":0,"수채화": 0, "파스텔": 0, "가죽": 0, "뜨개질": 0, "비즈": 0, "일러스트": 0, "이모티콘": 0, "편집": 0,
                    "촬영": 0, "한식": 0, "양식": 0, "일식": 0, "중식": 0, "세계음식": 0, "기타": 0, "작곡": 0, "작사": 0, "타악기": 0,
                    "현악기": 0, "관악기": 0, "댄스": 0, "헬스": 0, "홈트레이닝": 0, "다이어트":0}    #사용자 선호도 조사할때


@app.route('/item', methods=['GET'])
def itemRecommend():
    useremail = request.args.get("email") #내가 분석할 유저
    conn, cursor = connect.connect()
    result = connect.getUserName(cursor)
    userlist = [row[0] for row in result.fetchall()]
    print("------------------------userlist-----------------------------")
    print(userlist)
    print("-------------------useremail-----------------------------------")
    print(useremail)
    userInfo = connect.getUserPrefer(cursor,useremail)
    userid = 0
    preferlist=[]
    for row in userInfo.fetchall():
        # print(row)
        userid = row[0]
        preferlist = [row[1], row[2], row[3]] #사용자 선호도
    print("----------------------------------------preferlist--------------------------------------")
    print(preferlist)

    df = DataFrame(
                    columns = userlist,
                    index = chimi_sub_category
                  )
    df.fillna(0, inplace = True)
    print("----------------------------------------df------------------------------------------")
    print(df)

    # 찜하기, 좋아요 
    # 전체사용자 기반 선호도 분석
    for user in userlist :
        category = connect.getUserStorage(cursor, user)
        likes = connect.getUserLike(cursor, user)
        categorylist = [row[0] for row in category.fetchall()]
        for catg in categorylist:
            df.loc[catg,user] += 5 #찜일시 5점 추가
        likelist = [row[0] for row in likes.fetchall()]
        for like in likelist:
            df.loc[like, user] +=3
    print("---------------------------------------df2222222222222222------------------------------")
    print(df)
    item_based_collabor = cosine_similarity(df)
    print("------------------------------itembasecollab----------------------------------")
    print(item_based_collabor)
    item_based_collabor = DataFrame(data = item_based_collabor, index = df.index, columns=df.index)
    print("------------------------------itembasecollab22222222222222----------------------------------")
    print(item_based_collabor)

    #사용자의 선호도
    category = connect.getUserStorage(cursor, userid)
    categorylist = [row[0] for row in category.fetchall()]
    for catg in categorylist:
        chimi_sub_dict[catg] += 2
    likes = connect.getUserLike(cursor, userid)
    likelist = [row[0] for row in likes.fetchall()]
    for like in likelist:
        chimi_sub_dict[catg] += 1
    print("---------------------chimi-sub-dict----------------------")
    print(chimi_sub_dict)
    #1순위,2순위,3순위
    chimi_sub_dict[preferlist[0]] += 3
    chimi_sub_dict[preferlist[1]] += 2
    chimi_sub_dict[preferlist[2]] += 1

    # 사용자의 찜, 좋아요와 1-3순위다 더해서 가중치 분석
    chimi_weight_val = sorted(chimi_sub_dict.items(), reverse=True, key = lambda item: item[1])
    print("----------------------chimi-weight-val-----------------------------")
    print(chimi_weight_val)

    # recommendSet = {}
    # cnt = 0 # 몇개까지 볼건지
    # for key, value in chimi_weight_val:
    #     if cnt == 2 : break
    #     # 비슷한거 추천 위에서 2개까지
    #     recommendSet.update(item_based_collabor[key].sort_values(ascending=False)[:2])
    #     cnt += 1
    # print(recommendSet)

    # recommendList = list(recommendSet)
    ctg_list = []
    cnt = 0
    for key, val in chimi_weight_val:
        ctg_list.append(key)
        cnt += 1
        if cnt == 3:
            break
    
    print("-------------------------------ctg_list------------------------------------")
    print(ctg_list)

    recommendList = []
    for ctg in ctg_list:
        chimilist = connect.getchimi(cursor, ctg)
        chimis = []
        for chimi in chimilist.fetchall():
            print(chimi)
            chimis.append(chimi)
        if len(chimis) >= 3:
          recommendList.extend(random.sample(chimis, 3))
        else:
          recommendList.extend(random.sample(chimis, len(chimis)))
    ####### 수정한부분 ##########    
    print("------------------------recommendList-------------------------------------")
    print(recommendList)



    #TODO 해당 카테고리인 열려있는 파티가져와서 그 중에 찜,추천 많은 애들 추천

    # 디비 해제
    cursor.close()
    conn.close()

    return jsonify({'recommendlist': recommendList})


@app.route('/itemuser',methods=['GET'])
def userRecommend():
    useremail = request.args.get("email") #내가 분석할 유저
    conn, cursor = connect.connect()
    result = connect.getUserName(cursor)
    print("-------------------------result-------------------------------")
    print(result)
    userlist = [row[0] for row in result.fetchall()]
    print("---------------------------------userlist------------------------------------")
    print(userlist)

    userInfo = connect.getUserPrefer(cursor,useremail)
    print("-----------------------------------userInfo-------------------------------")
    print(userInfo)
    userid = 0
    preferlist=[]
    for row in userInfo.fetchall():
        userid = row[0]
        preferlist = [row[1], row[2], row[3]] #사용자 선호도

    df = DataFrame(
                    index = userlist,
                    columns = chimi_sub_category
                  )
    print("----------------------------------df--------------------------------")
    print(df)
    df.fillna(0, inplace = True)
    print("----------------------------------df--------------------------------")
    print(df)



    # 찜하기, 좋아요 
    # 전체사용자 기반 선호도 분석
    for user in userlist :
        category = connect.getUserStorage(cursor, user)
        likes = connect.getUserLike(cursor, user)
        categorylist = [row[0] for row in category.fetchall()]
        for catg in categorylist:
            df.loc[user, catg] += 5 #찜일시 5점 추가
        likelist = [row[0] for row in likes.fetchall()]
        for like in likelist:
            df.loc[user, like] += 3

    user_based_collabor = cosine_similarity(df)
    print("---------------------------------user_based_collabor-------------------------------------------")
    print(user_based_collabor)

    user_based_collabor = DataFrame(data = user_based_collabor, index = df.index, columns=df.index)
    print("---------------------------------user_based_collabor-------------------------------------------")
    print(user_based_collabor)

    maxval = 0
    similar_user = 0
    # 가장 유사도 높은 사람 찾기
    for user in userlist:
        # print(user)
        if user == userid: continue
        # print(userid)
        if maxval < user_based_collabor.loc[userid, user]:
            maxval = user_based_collabor.loc[userid, user]
            similar_user = user

    print("-----------------------------maxval-------------------------------")
    print(maxval)

    print("------------------------similar_user-------------------------------------")
    print(similar_user)

    ctg_list = connect.getSelectedUserPrefer(cursor, similar_user)
    print("--------------------------------ctg_list--------------------------------")
    print(ctg_list, type(ctg_list))

    recommendList = []
    for ctg in ctg_list:
        chimilist = connect.getchimi(cursor, ctg)
        chimis = []
        for chimi in chimilist.fetchall():
            print(chimi)
            chimis.append(chimi)
        if len(chimis) >= 3:
          recommendList.extend(random.sample(chimis, 3))
        else:
          recommendList.extend(random.sample(chimis, len(chimis)))
    ####### 수정한부분 ##########    
    print("------------------------recommendList-------------------------------------")
    print(recommendList)



    #사용자의 선호도
    # chimiName = connect.getUserStorageName(cursor, maxidx + 1)
    # chimiName = connect.getUserStorageName(cursor, maxidx)
    # namedf = pd.DataFrame(chimiName)
    # if len(namedf) > 3:
    #     namedf = namedf.sample(n = 3)
    # # 랜덤으로 3개 뽑아준다
    # print("--------------------------------namedf----------------------------------------")
    # print(namedf)
    # if len(namedf) != 0:
    #     recommendList = list(np.array(namedf.iloc[:, 0]))
    # else:
    #     recommendList = []

    # similar_user_ctg = connect.get

    # recommendList = list(np.array(namedf.iloc[:, 0]))
    # while len(recommendList) < 3:

    
    # print("---------------------------------recommendList---------------------------------")
    # print(recommendList)
    

    # 디비 해제
    cursor.close()
    conn.close()

    return jsonify({'recommendlist': recommendList})

if __name__ == '__main__':
    # app.run(host='localhost', port=8090, debug='True', ssl_context=('./cert/server.crt', './cert/server.key'))
    app.run(host='0.0.0.0', port=8090, debug='True', ssl_context=('./cert/server.crt', './cert/server.key'))