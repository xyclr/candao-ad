var Mock = require('/node_modules/mockjs/dist/mock-min.js');
var $ = require('jquery');
Mock.mock(/(updateStatus)/, {
    "code": 0,
    "data": [
        {
            "Cardno": "123456789111",
        }
    ],
    "msg": "成功or失败",
});

Mock.mock(/(adPosList)/, {
    "code": 0,
    "data": {


        "currentPage": 1,
        "pageCount": 4,
        "pageSize": 71268,
        "totalPage": 31000,
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
    "code": 0,
    "data": {
        "currentPage": 1,
        "pageCount": 4,
        "pageSize": 71268,
        "totalPage": 31000,
        "list|10": [
            {
                "id|+1": 1,
                "name": "@ctitle",
                "position|10": [
                    {
                        "id|+10": 32677,
                        "name": "@ctitle"
                    }
                ],
                "material|1-10": [
                    {
                        "id|+1":100,				//素材ID
                        "name":"@ctitle",			//素材名称
                        "type|1-3":1,						//素材类型
                        "thumbnail":"@image",	//缩略图地址
                        "horizontalImg":"@image",	//横屏图片地址
                        "horizontalName":"@ctitle",	//横屏图片名称
                        "verticalImg":"@image",		//竖屏图片地址
                        "verticalName":"@image",		//竖屏图片名称
                        "videoUrl":"http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",		//视频地址
                        "videoTime|+100":100,		//视频时间
                        "webUrl":"http://www.candaochina.com"	//跳转URL
                    }
                ],
                "sequence|+1":1,
                "status|1-2":true,
                "tenant|1-10":[
                    {
                        "id|+3": 12677,
                        "tenantId": 12121,
                        "tenantName": "@ctitle"
                    }
                ]
            }
        ]
    },
    "msg": "成功or失败",
});
Mock.mock(/(allTenant)/, {
    "code": 0,
    "data":{
        'list|10' : [
            {
                "id|+1": 1,
                "tenantName": "@ctitle",
                "tenantId": '10000'
            }
        ]
    },
    "msg": "成功or失败",
});
Mock.mock(/(material)/, {
    "code": 0,
    "data":{
        "list|5":[
            {
                "id|+1":100,				//素材ID
                "name":"@ctitle",			//素材名称
                "type|1-3":1,						//素材类型
                "thumbnail":"@image",	//缩略图地址
                "horizontalImg":"@image",	//横屏图片地址
                "horizontalName":"@ctitle",	//横屏图片名称
                "verticalImg":"@image",		//竖屏图片地址
                "verticalName":"@image",		//竖屏图片名称
                "videoUrl":"http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",		//视频地址
                "videoTime|+100":100,		//视频时间
                "webUrl":"http://www.candaochina.com"	//跳转URL
            }
        ],
        "currentPage": 1,
        "pageCount": 4,
        "pageSize": 71268,
        "totalPage": 31000,
    },
    "msg": "成功or失败",
});
Mock.mock(/(getAdById.json)/, {
    "code": 0,
    "data":[
        {
            "id|+1": 1,
            "name": "@ctitle",
            "position|10": [
                {
                    "id|+10": 32677,
                    "name": "@ctitle"
                }
            ],
            "material|1-10": [
                {
                    "id|+1":100,				//素材ID
                    "name":"@ctitle",			//素材名称
                    "type|1-3":1,						//素材类型
                    "thumbnail":"@image",	//缩略图地址
                    "horizontalImg":"@image",	//横屏图片地址
                    "horizontalName":"@ctitle",	//横屏图片名称
                    "verticalImg":"@image",		//竖屏图片地址
                    "verticalName":"@image",		//竖屏图片名称
                    "videoUrl":"http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",		//视频地址
                    "videoTime|+100":100,		//视频时间
                    "webUrl":"http://www.candaochina.com"	//跳转URL
                }
            ],
            "sequence|+1":1,
            "status|1-2":true,
            "tenant|1-10":[
                {
                    "id|+3": 12677,
                    "tenantId": 12121,
                    "tenantName": "@ctitle"
                }
            ]
        }
    ],
    "msg": "成功or失败",
});

Mock.mock(/(delete.json)/, {
    "code": 0,
    "data": [
        {
            "Cardno": "123456789111",
        }
    ],
    "msg": "成功or失败"
});


module.exports = {
    interFaceUrl : {
        adListItemUpdate : '/ad/advertisement/updateStatus.json',
        adEdit : '/ad/advertisement/edit.json',
        adPosList : '/adPosList',
        material : '/ad/material/list.json',
        adList : '/adList',
        allTenant : '/ad/tenant/allTenant.json',
        getAdById : '/ad/advertisement/getAdById.json',
        positionDelete : '/ad/position/delete.json',
    }
}