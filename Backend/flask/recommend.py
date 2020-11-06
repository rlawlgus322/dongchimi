from flask import Flask, request,jsonify
from pandas import DataFrame
from sklearn.metrics.pairwise import cosine_similarity
import connect
app = Flask(__name__)

# def cos_similarity(v1,v2):
#     dot_product = np.dot(v1, v2)
#     l2_norm = (np.sqrt(sum(np.square(v1))) * np.sqrt(sum(np.square(v2))))
#     similarity = dot_product / l2_norm     

chimi_main_category = ["미술","공예",'디지털드로잉',"사진",'영상',"요리",'음악',"운동"]
chimi_category_dict ={"미술":["유화","수채화","파스텔"],
                    "공예":["가죽","뜨개질","비즈"],
                    '디지털드로잉':["일러스트","이모티콘"],
                    "사진/영상":["편집","촬영"],
                    "요리":["한식","양식","일식","중식","세계음식"],
                    '음악':["작곡","작사","타악기","현악기","관악기","댄스"],
                    "운동":["헬스","홈트레이닝","다이어트"]}
chimi_sub_category = ["유화","수채화","파스텔","가죽","뜨개질","비즈","일러스트","이모티콘","편집","촬영"
                        ,"한식","양식","일식","중식","세계음식","기타","작곡","작사","타악기","현악기","관악기","댄스",
                        "헬스","홈트레이닝","다이어트"]   
chimi_sub_dict = {"유화":0,"수채화": 0, "파스텔": 0, "가죽": 0, "뜨개질": 0, "비즈": 0, "일러스트": 0, "이모티콘": 0, "편집": 0, 
                    "촬영": 0, "한식": 0, "양식": 0, "일식": 0, "중식": 0, "세계음식": 0, "기타": 0, "작곡": 0, "작사": 0, "타악기": 0, 
                    "현악기": 0, "관악기": 0, "댄스": 0, "헬스": 0, "홈트레이닝": 0, "다이어트":0}    #사용자 선호도 조사할때  


@app.route('/item',methods=['GET'])
def itemRecommend():
    useremail = request.GET['email'] #내가 분석할 유저
    conn, cursor = connect.connect() 
    result = connect.getUserName(cursor)
    userlist = [row[0] for row in result.fetchall()] 

    userInfo = connect.getUserPrefer(cursor,useremail)
    userid = 0
    preferlist=[]
    for row in userInfo.fetchall():
        userid = row[0]
        preferlist = [row[1],row[2],row[3]] #사용자 선호도        
    
    df = DataFrame(
                    columns = userlist,
                  index = chimi_sub_category
                  )
    df.fillna(0 ,inplace = True)
    # 임의 값 넣음
    print(df.loc["공예",1])
    df.loc["공예":"뜨개질",7:8] = 4
    df.loc["공예":"자수",1:3] =2
    df.loc["뜨개질":"자수",9:15] =3
    print(df.loc["공예":"자수",1:3])
    print(df)

    # 찜하기, 좋아요 
    # 전체사용자 기반 선호도 분석
    for user in userlist :
        category = connect.getUserStorage(cursor,user)
        likes = connect.getUserLike(cursor,user)
        categorylist = [row[0] for row in category.fetchall()]
        for catg in categorylist:
            df.loc[user,catg[0]] += 5 #찜일시 5점 추가
        likelist = [row[0] for row in likes.fetchall()]
        for like in likelist:
            df.loc[user,like[0]] +=3

    item_based_collabor = cosine_similarity(df)
    print(item_based_collabor)
    item_based_collabor = DataFrame(data = item_based_collabor, index = df.index, columns=df.index)
    print(item_based_collabor)

    #사용자의 선호도
    category = connect.getUserStorage(cursor,userid)
    categorylist = [row[0] for row in category.fetchall()]
    for catg in categorylist:
        chimi_sub_dict[catg] += 2
    likes = connect.getUserLike(cursor,userid)
    likelist = [row[0] for row in likes.fetchall()]
    for like in likelist:
        chimi_sub_dict[catg] += 1

    #1순위,2순위,3순위
    chimi_sub_dict[preferlist[0]] +=3
    chimi_sub_dict[preferlist[1]]+=2
    chimi_sub_dict[preferlist[2]]+=1

    # 사용자의 찜, 좋아요와 1-3순위다 더해서 가중치 분석
    chimi_weight_val = sorted(chimi_sub_dict.items(), reverse=True,  key = lambda item: item[1])

    recommendSet = {}
    flag = 2 # 몇개까지 볼건지
    for key, value in chimi_weight_val:
        if flag == 0 : break
        # 비슷한거 추천 위에서 2개까지
        recommendSet.update(item_based_collabor[key].sort_values(ascending=False)[:2])
        flag -= 1
    recommendList = list(recommendSet)

    # 디비 해제
    cursor.close()
    conn.close()

    return jsonify({'recommendlist': recommendList})

def detailrecommendstore(request):
    storeid = request.GET['store']
    detailReviews = DetailReview.objects.filter(store=storeid) # 이 가게를 방문한 사람들의 리뷰
    print("이 가게를 방문한 사람들의 리뷰 : ",detailReviews)
    storeList = [] # 이 가게를 방문했던 사람들의 userid
    for i in detailReviews:
        tempStores = DetailReview.objects.filter(user=i.user)
        for j in tempStores:

            storeList.append(j.store)

    new_storeList = list(set(storeList)) # 중복 제거한 스토어 목록
    for s in new_storeList:
        if s == int(storeid):
            new_storeList.remove(s)
    qs = {}
    temp=[]
    for i in new_storeList:
        if(len(MainStore.objects.filter(id=i))>0):
            store = MainStore.objects.filter(id=i)
            print(store)
            for j in store:
                temp.append(
                    {
                        'id':j.id,
                        'store_name':j.store_name,
                        'branch':j.branch,
                        'area':j.area,
                        'tel':j.tel,
                        'address':j.address,
                        'latitude':j.latitude,
                        'longitude':j.longitude,
                        'category':j.category,
                        'score':j.score,
                        'image_url':j.image_url,
                        'store_type':j.store_type,
                        'single_room':j.single_room
                    }
                )
    temp = sorted(temp,key=lambda list: list['score'],reverse=True)
    if(len(temp)>=10):
        temp = temp[:10] #찜목록 10이상일 경우 10개만 데이터 가져오게 하기
        print(temp)

    print("##############",len(temp))
    data = {
        'test': storeid
    }

    dump = json.dumps(temp)
    return HttpResponse(dump, content_type='application/json')

if __name__ == '__main__':
# 디비 연결
    conn, cursor = connect.connect()
    result = connect.getUserName(cursor)
    # df = DataFrame(result.fetchall())
    userlist = [row[0] for row in result.fetchall()]
    df = DataFrame(columns = userlist,
                #   columns = [desc[0] for desc in cursor.description]
                  index = ["공예", "뜨개질", "자수"]
                  )
    df.fillna(0,inplace = True)
    # 임의 값 넣음
    print(df.loc["공예",1])
    df.loc["공예":"뜨개질",7:8] = 4
    df.loc["공예":"자수",1:3] =2
    df.loc["뜨개질":"자수",9:15] =3
    print(df.loc["공예":"자수",1:3])
    print(df)
    # 찜하기, 좋아요 
    
    for user in userlist :
        category = connect.getUserStorage(cursor,user)
        likes = connect.getUserLike(cursor,user)
        categorylist = [row[0] for row in category.fetchall()]
        for catg in categorylist:
            df.loc[user,catg[0]] += 5 #찜일시 5점 추가
        likelist = [row[0] for row in likes.fetchall()]
        for like in likelist:
            df.loc[user,like[0]] +=3

    item_based_collabor = cosine_similarity(df)
    print(item_based_collabor)
    item_based_collabor = DataFrame(data = item_based_collabor, index = df.index, columns=df.index)
    print(item_based_collabor)
    chimi = "자수"
    # 비슷한거 추천 위에서 2개까지
    print(item_based_collabor[chimi].sort_values(ascending=False)[:2])

    # 디비 해제
    cursor.close()
    conn.close()