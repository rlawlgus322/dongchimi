from flask import Flask, request
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
    #     return similarity
# 미술   공예       디지털드로잉       사진       영상       요리       음악     운동
#유화   가죽       일러스트           편집       촬영       한식       작곡     헬스
#수채화   뜨개질   이모티콘           촬영       편집       양식     작사       홈트레이닝
#파스텔   비즈                                     일식       타악기   다이어트
#                                           중식     현악기
#                                           세계음식   관악기
#                                                  기타(etc)
#
#


@app.route('/item',methods=['GET'])
def itemRecommend():
    conn, cursor = connect.connect() 
    result = connect.getUserName(cursor)
    # df = DataFrame(result.fetchall())
    userlist = []
    preferlist = [] #사용자 선호도
    for row in result.fetchall():
        userlist.append(row[0])
        preferlist=[row[1],row[2],row[3]]
        
    userlist = [row[0] for row in result.fetchall()] # 모든 유저를 list로 받아옴
    
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