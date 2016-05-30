var Mock = require('/node_modules/mockjs/dist/mock-min.js');
Mock.mock(/(adListItemDel)/, {
    "code": "0",
    "data": [
        {
            "Cardno": "123456789111",
        }
    ],
    "msg": "成功or失败",
});

Mock.mock(/(adPosList)/, {
    "code": "0",
    "data":{
        "total":'1',
        "pageCount":'4',
        "curPage":'1',
        "list|10": [
            {
                "id|+1": 1,
                "name": "@ctitle"
            }
        ]
    },
    "msg": "成功or失败",
});
Mock.mock(/(adList)/, {
    "code": "0",
    "data":{
        "total":'10',
        "pageCount":'5',
        "curPage":'1',
        "list|10": [
            {
                "id|+1": 1,
                "name": "@ctitle",
                "positionName": "@ctitle",
                "materialName": "@ctitle",
                "materialUrl": "http://d9.sina1b38cd523ee0882fc.png",
                "goUrl": "http://d9.d69f34494961b38cd523ee0882fc.png",
                "sequence|+1":1,
                "status|1-2":true,
                "tenants":{
                    "id":"1111",
                    "tenantId":"100017",
                    "tenantName":"我是租户名称"
                }
            }
        ]
    },
    "msg": "成功or失败",
});
Mock.mock(/(allTenant)/, {
    "code": "0",
    "data|10":[
        {
            "id|+1": 1,
            "tenantName": "@ctitle",
            "tenantId|+1":10000
        }
    ],
    "msg": "成功or失败",
});
Mock.mock(/(material)/, {
    "code": "0",
    "data":{
        "list|5":[
            {
                "id|+1":100,				//素材ID
                "name":"@ctitle",			//素材名称
                "type":"2",						//素材类型
                "horizontalImg":"xxxxxxxxxxxx.img",	//横屏图片
                "verticalImg":"yyyyyyyyyyyy.img",		//竖屏图片
                "videoUrl":"mmmmmm.mp4",		//视频地址
                "webUrl":"http://www.candaochina.com"	//调整URL
            }
        ],
        "total":'1',
        "pageCount":'4',
        "curPage":'1',
    },
    "msg": "成功or失败",
});
Mock.mock(/(getAdById.json)/, {
    "code": "0",
    "data":[
        {
            "id":"1",
            "name":"广告名称",
            "positionId":"1",
            "positionName":"广告位名称",
            "materialId":"素材ID",
            "materialName":"素材名称",
            "sequence":"2",
            "status":"2",
            "tenants":[
                {
                    "id":"1",
                    "tenantId":"100017",
                    "tenantName":"新辣道",
                }
            ]
        }
    ],
    "msg": "成功or失败",
});

module.exports = {
    interFaceUrl : {
        adListItemDel : '/adListItemDel',
        adPosList : '/adPosList',
        material : '/ad/material/list.json',
        adList : '/adList',
        allTenant : '/ad/tenant/allTenant.json',
        getAdById : '/ad/advertisement/getAdById.json',
    }
}