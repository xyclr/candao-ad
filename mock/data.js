Mock.mock(/(myRecord)/, {
    "detailTotalpage": "1",
    "detailDatas|10": [
        {
            "id": "366",
            "card_no": "100016000002",
            "deal_no": "201601182005074829",
            "deal_addr": "",
            "deal_type": '@integer(0, 16)',
            "amount": "@float(-10000, 10000, 2,2)",
            "slip_no": "113763",
            "deal_time": "1453118801000",
            "deal_user": "Test"
        }
    ],
    "detailCurrent": "1",
    "cardno": "100016000002",
    "detailTotal": "20"
});


Mock.mock(/(register.json)/, {
    "code": "0",
    "data": [
        {
            "Cardno": "123456789111",
        }
    ],
    "msg": "成功or失败",
});

Mock.mock(/(getVerifyCode.json)/, {
    "code": "0",
    "data": [
        {
            "verifyCode": "@integer(100000, 999999)",
            "timestamp": "111111222323",
        }
    ],
    "msg": "成功or失败",
});

Mock.mock(/(balance)/, {
    "code": "0",
    "data": [
        {
            "balance": "@integer(0, 999999)",
        }
    ],
    "msg": "成功or失败",
});


Mock.mock(/(getMemberInfo.json)/, {
    "code": "0",
    "msg": "",
    "data": [
        {
            "id": "",
            "name": "张三",
            "gender": "1",
            "birthday": "1453118801000",
        }
    ],
});

Mock.mock(/(modifyPassword.json)/, {
    "code": "0",
    "msg": "",
    "data": {},
});