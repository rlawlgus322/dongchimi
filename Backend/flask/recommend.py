from flask import Flask

app = Flask(__name__)


@app.route('/')
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