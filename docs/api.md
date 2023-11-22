## API 명세
### 1. 회원가입
* **URL**
```
POST /users/sign-up
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|email|`string`|`사용자 이메일`
|2|password|`string`|`사용자 비밀번호`

* **Success Response**
```
{
    "success": true,
    "data": {
        "email": "test123@gmail.com",
        "password": "$2b$10$.tYRR2HgF0QONzm5k6SENuGvtQIH.IPBWDUm1X95x.Xv3uiIAQlRG",
        "updatedAt": "2023-11-22T09:43:07.636Z",
        "id": 4,
        "createdAt": "2023-11-22T09:43:07.636Z"
    }
}
```

* **Fail Response**
```
// 중복 이메일이 존재하는 경우
{
    "statusCode": 409,
    "message": "이미 동일한 email을 가진 유저가 존재합니다."
}
```
</br>

### 2.로그인
* **URL**
```
POST /auth/sign-in
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|email|`string`|`사용자 이메일`
|2|password|`string`|`사용자 비밀번호`

* **Success Response**
```
{
    "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWF0IjoxNzAwNjQ2MzI3LCJleHAiOjE3MDA4MTkxMjd9.4BmJbd6BNVksS1PxI6qOM2fIsJuGfObGXT8kv6-st3Rvc5tD-TBFds8jjxLdqy9sjKTPPnsXM9dhHddU67z3Qg",
    "user": {
        "id": 4,
        "email": "test123@gmail.com",
        "password": "$2b$10$.tYRR2HgF0QONzm5k6SENuGvtQIH.IPBWDUm1X95x.Xv3uiIAQlRG",
        "createdAt": "2023-11-22T09:43:07.636Z",
        "updatedAt": "2023-11-22T09:43:07.636Z"
    }
}
```

* **Fail Response**
```
// 계정이 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 유저입니다."
}

// 비밀번호가 일치하지 않을 경우
{
    "statusCode": 400,
    "message": "비밀번호가 일치하지 않습니다."
}
```

</br>

### 3. 유저 정보 수정
* **URL**
```
PATCH /users
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|password|`string`|`사용자 비밀번호`

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 3,
        "email": "check123@gmail.com",
        "password": "$2b$10$s1aZoeaCR87R6UFasQX0ZuU9513MDD7clARkci2l66kBvArNwBdka",
        "createdAt": "2023-11-14T12:07:32.969Z",
        "updatedAt": "2023-11-22T09:49:15.000Z"
    }
}
```

* **Fail Response**
```
// 이전 비밀번호와 동일할 경우
{
    "statusCode": 400,
    "message": "이전 비밀번호와 동일합니다."
}
```

</br>

### 4. 카테고리 생성
* **URL**
```
POST /categories
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|name|`string`|`카테고리 이름`

* **Success Response**
```
{
    "success": true,
    "data": {
        "name": "피규어",
        "user": {
            "id": 3
        },
        "userId": 3,
        "updatedAt": "2023-11-22T09:51:13.519Z",
        "deletedAt": null,
        "id": 17,
        "createdAt": "2023-11-22T09:51:13.519Z"
    }
}
```

* **Fail Response**
```
// 카테고리 이름이 중복될 경우
{
    "statusCode": 400,
    "message": "중복된 카테고리 이름이 존재합니다."
}
```

</br>

### 5. 카테고리 수정
* **URL**
```
PATCH /categories/:id
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|name|`string`|`카테고리 이름`

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 17,
        "userId": 3,
        "name": "골동품",
        "createdAt": "2023-11-22T09:51:13.519Z",
        "updatedAt": "2023-11-22T09:52:39.000Z",
        "deletedAt": null
    }
}
```

* **Fail Response**
```
// 카테고리 이름이 중복될 경우
{
    "statusCode": 400,
    "message": "중복된 카테고리 이름이 존재합니다."
}
```

</br>

### 6. 전체 카테고리 조회
* **URL**
```
GET /categories
```

* **Success Response**
</br>
`userId=0`인 카테고리는 기본 카테고리로 설정

```
{
    "success": true,
    "data": [
        {
            "id": 3,
            "userId": 0,
            "name": "식비",
            "createdAt": "2023-11-13T13:13:59.627Z",
            "updatedAt": "2023-11-13T13:13:59.627Z",
            "deletedAt": null
        },
        {
            "id": 4,
            "userId": 0,
            "name": "카페/간식",
            "createdAt": "2023-11-13T13:14:00.663Z",
            "updatedAt": "2023-11-13T13:14:00.663Z",
            "deletedAt": null
        },
        {
            "id": 5,
            "userId": 0,
            "name": "쇼핑",
            "createdAt": "2023-11-13T13:14:01.428Z",
            "updatedAt": "2023-11-13T13:14:01.428Z",
            "deletedAt": null
        },
        {
            "id": 6,
            "userId": 0,
            "name": "교통",
            "createdAt": "2023-11-13T13:14:02.159Z",
            "updatedAt": "2023-11-13T13:14:02.159Z",
            "deletedAt": null
        },
        {
            "id": 7,
            "userId": 0,
            "name": "취미",
            "createdAt": "2023-11-13T13:14:02.867Z",
            "updatedAt": "2023-11-13T13:14:02.867Z",
            "deletedAt": null
        },
        {
            "id": 8,
            "userId": 0,
            "name": "의료",
            "createdAt": "2023-11-13T13:14:03.532Z",
            "updatedAt": "2023-11-13T13:14:03.532Z",
            "deletedAt": null
        },
        {
            "id": 9,
            "userId": 0,
            "name": "여행",
            "createdAt": "2023-11-13T13:14:04.207Z",
            "updatedAt": "2023-11-13T13:14:04.207Z",
            "deletedAt": null
        },
        {
            "id": 10,
            "userId": 0,
            "name": "교육",
            "createdAt": "2023-11-13T13:14:04.937Z",
            "updatedAt": "2023-11-13T13:14:04.937Z",
            "deletedAt": null
        },
        {
            "id": 11,
            "userId": 0,
            "name": "편의점/마트",
            "createdAt": "2023-11-13T13:14:05.647Z",
            "updatedAt": "2023-11-13T13:14:05.647Z",
            "deletedAt": null
        },
        {
            "id": 12,
            "userId": 0,
            "name": "주거",
            "createdAt": "2023-11-13T13:14:06.390Z",
            "updatedAt": "2023-11-13T13:14:06.390Z",
            "deletedAt": null
        },
        {
            "id": 13,
            "userId": 0,
            "name": "보험/세금",
            "createdAt": "2023-11-13T13:14:07.165Z",
            "updatedAt": "2023-11-13T13:14:07.165Z",
            "deletedAt": null
        },
        {
            "id": 17,
            "userId": 3,
            "name": "골동품",
            "createdAt": "2023-11-22T09:51:13.519Z",
            "updatedAt": "2023-11-22T09:52:39.000Z",
            "deletedAt": null
        }
    ]
}
```

</br>

### 7. 카테고리 삭제
* **URL**
```
DELETE /categories/:id
```

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 17,
        "updatedAt": "2023-11-22T09:57:52.000Z",
        "deletedAt": "2023-11-22T09:57:52.000Z"
    }
}
```

* **Fail Response**
```
// 카테고리가 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 카테고리 입니다."
}
```

</br>

### 8. 예산 생성
* **URL**
```
POST /budgets
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|categoryId|`number`|`카테고리 아이디`
|2|amount|`string`|`예산 금액`

* **Success Response**
```
{
    "success": true,
    "data": [
        {
            "categoryId": 10,
            "amount": "200000",
            "user": {
                "id": 3
            },
            "userId": 3,
            "updatedAt": "2023-11-22T10:03:59.479Z",
            "deletedAt": null,
            "id": 20,
            "createdAt": "2023-11-22T10:03:59.479Z"
        },
        {
            "categoryId": 11,
            "amount": "300000",
            "user": {
                "id": 3
            },
            "userId": 3,
            "updatedAt": "2023-11-22T10:03:59.491Z",
            "deletedAt": null,
            "id": 21,
            "createdAt": "2023-11-22T10:03:59.491Z"
        }
    ]
}
```

* **Fail Response**
```
// 카테고리가 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 카테고리 입니다."
}

// 중복된 카테고리가 같이 들어올 경우
{
    "statusCode": 400,
    "message": "중복된 카테고리 이름이 존재합니다."
}

// 예산에 이미 등록되어 있는 카테고리일 경우
{
    "statusCode": 400,
    "message": "예산에 이미 등록되어 있는 카테고리 입니다."
}
```

</br>

### 9. 예산 수정
* **URL**
```
PATCH /budgets/:id
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|categoryId|`number`|`카테고리 아이디`
|2|amount|`string`|`예산 금액`

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 19,
        "userId": 3,
        "categoryId": 7,
        "amount": "300000",
        "createdAt": "2023-11-22T10:03:07.707Z",
        "updatedAt": "2023-11-22T10:10:03.000Z",
        "deletedAt": null
    }
}
```

* **Fail Response**
```
// 존재하지 않은 예산일 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 예산 입니다."
}

// 예산에 이미 등록되어 있는 카테고리일 경우
{
    "statusCode": 400,
    "message": "예산에 이미 등록되어 있는 카테고리 입니다."
}
```

</br>

### 10. 전체 예산 조회
* **URL**
```
GET /budgets
```

* **Success Response**
```
{
    "success": true,
    "data": [
        {
            "id": 15,
            "userId": 3,
            "categoryId": 3,
            "amount": "200000",
            "createdAt": "2023-11-14T12:07:56.575Z",
            "updatedAt": "2023-11-14T12:07:56.575Z",
            "deletedAt": null
        },
        {
            "id": 16,
            "userId": 3,
            "categoryId": 6,
            "amount": "200000",
            "createdAt": "2023-11-14T12:08:09.026Z",
            "updatedAt": "2023-11-14T12:08:09.026Z",
            "deletedAt": null
        },
        {
            "id": 17,
            "userId": 3,
            "categoryId": 12,
            "amount": "200000",
            "createdAt": "2023-11-14T12:08:16.241Z",
            "updatedAt": "2023-11-14T12:08:16.241Z",
            "deletedAt": null
        },
        {
            "id": 19,
            "userId": 3,
            "categoryId": 7,
            "amount": "300000",
            "createdAt": "2023-11-22T10:03:07.707Z",
            "updatedAt": "2023-11-22T10:10:03.000Z",
            "deletedAt": null
        },
        {
            "id": 20,
            "userId": 3,
            "categoryId": 10,
            "amount": "200000",
            "createdAt": "2023-11-22T10:03:59.479Z",
            "updatedAt": "2023-11-22T10:03:59.479Z",
            "deletedAt": null
        },
        {
            "id": 21,
            "userId": 3,
            "categoryId": 11,
            "amount": "300000",
            "createdAt": "2023-11-22T10:03:59.491Z",
            "updatedAt": "2023-11-22T10:03:59.491Z",
            "deletedAt": null
        }
    ]
}
```

</br>

### 11. 예산 추천
* **URL**
```
GET /budgets/recommend
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|amount|`string`|`추천받을 예산 금액`

* **Success Response**
```
[
    {
        "categoryName": "편의점/마트",
        "recommendAmount": 63899
    },
    {
        "categoryName": "식비",
        "recommendAmount": 214200
    },
    {
        "categoryName": "교통",
        "recommendAmount": 222300
    },
    {
        "categoryName": "주거",
        "recommendAmount": 188100
    },
    {
        "categoryName": "카페/간식",
        "recommendAmount": 59400
    },
    {
        "categoryName": "쇼핑",
        "recommendAmount": 59400
    },
    {
        "categoryName": "여행",
        "recommendAmount": 59400
    }
]
```

* **Fail Response**
```
// 추천 예산 총 금액의 범위에 다른 유저의 예산 총 금액이 존재하지 않을 경우
{
    "statusCode": 400,
    "message": "추천 예산 금액 범위의 내역이 없습니다."
}
```

</br>

### 12. 예산 삭제
* **URL**
```
DELETE /budgets/:id
```

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 21,
        "updatedAt": "2023-11-22T10:14:32.000Z",
        "deletedAt": "2023-11-22T10:14:32.000Z"
    }
}
```

* **Fail Response**
```
// 예산이 존재하지 않을 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 예산 입니다."
}
```

</br>

### 13. 지출 생성
* **URL**
```
POST /expenses
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|categoryId|`number`|`카테고리 아이디`
|2|amount|`string`|`지출 금액`
|3|comment|`string`|`지출 내용`
|4|expensedAt|`string`|`지출 날짜`
|5|isExcludingTotal|`boolean`|`합계 포함 여부`

* **Success Response**
```
{
    "success": true,
    "data": {
        "categoryId": 11,
        "amount": "3500",
        "comment": "수입과자",
        "expensedAt": "2023-11-22",
        "isExcludingTotal": true,
        "user": {
            "id": 3
        },
        "userId": 3,
        "updatedAt": "2023-11-22T10:17:39.865Z",
        "deletedAt": null,
        "id": 20,
        "createdAt": "2023-11-22T10:17:39.865Z"
    }
}
```

* **Fail Response**
```
// 지출한 카테고리로 등록된 예산이 없을 경우
{
    "statusCode": 400,
    "message": "해당 카테고리로 등록된 예산이 없습니다."
}
```

</br>

### 14. 지출 수정
* **URL**
```
PATCH /expenses/:id
```

* **Request Body**

|No| Name           | Type  | Description                       
|---|-----------------|:-------:|----------------------------
|1|categoryId|`number`|`카테고리 아이디`
|2|amount|`string`|`지출 금액`
|3|comment|`string`|`지출 내용`
|4|expensedAt|`string`|`지출 날짜`
|5|isExcludingTotal|`boolean`|`합계 포함 여부`

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 20,
        "userId": 3,
        "categoryId": 11,
        "amount": "3500",
        "comment": "외국 수입 과자",
        "expensedAt": "2023-11-21T15:00:00.000Z",
        "createdAt": "2023-11-22T10:17:39.865Z",
        "updatedAt": "2023-11-22T10:19:04.000Z",
        "deletedAt": null
    }
}
```

* **Fail Response**
```
// 존재하지 않은 지출일 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 지출 내역 입니다."
}
```

</br>

### 15. 지출 삭제
* **URL**
```
DELETE /expenses/:id
```

* **Success Response**
```
{
    "success": true,
    "data": {
        "id": 20,
        "updatedAt": "2023-11-22T10:20:09.000Z",
        "deletedAt": "2023-11-22T10:20:09.000Z"
    }
}
```

* **Fail Response**
```
// 존재하지 않은 지출일 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 지출 내역 입니다."
}
```

</br>

### 16. 지출 검색
```
POST /search/expenses?startedAt=2023-10-10&endAt=2023-11-15&isExcludingTotal=true
```

* **Success Response**
```
{
    "success": true,
    "data": [
        {
            "id": 12,
            "userId": 3,
            "categoryId": 3,
            "amount": "3000",
            "comment": "붕어빵",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-12T15:00:00.000Z",
            "createdAt": "2023-11-17T13:08:46.391Z",
            "updatedAt": "2023-11-17T13:08:46.391Z",
            "deletedAt": null
        },
        {
            "id": 13,
            "userId": 3,
            "categoryId": 3,
            "amount": "23000",
            "comment": "피자",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-12T15:00:00.000Z",
            "createdAt": "2023-11-17T13:08:53.669Z",
            "updatedAt": "2023-11-17T13:08:53.669Z",
            "deletedAt": null
        },
        {
            "id": 14,
            "userId": 3,
            "categoryId": 6,
            "amount": "1450",
            "comment": "출근지하철",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-12T15:00:00.000Z",
            "createdAt": "2023-11-17T13:09:22.100Z",
            "updatedAt": "2023-11-17T13:09:22.100Z",
            "deletedAt": null
        },
        {
            "id": 15,
            "userId": 3,
            "categoryId": 6,
            "amount": "1450",
            "comment": "퇴근지하철",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-12T15:00:00.000Z",
            "createdAt": "2023-11-17T13:09:26.083Z",
            "updatedAt": "2023-11-17T13:09:26.083Z",
            "deletedAt": null
        },
        {
            "id": 16,
            "userId": 3,
            "categoryId": 6,
            "amount": "1450",
            "comment": "퇴근버스",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-17T15:00:00.000Z",
            "createdAt": "2023-11-17T13:29:25.558Z",
            "updatedAt": "2023-11-17T13:29:25.558Z",
            "deletedAt": null
        },
        {
            "id": 17,
            "userId": 3,
            "categoryId": 6,
            "amount": "1450",
            "comment": "퇴근버스",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-16T15:00:00.000Z",
            "createdAt": "2023-11-17T13:29:40.124Z",
            "updatedAt": "2023-11-17T13:29:40.124Z",
            "deletedAt": null
        },
        {
            "id": 18,
            "userId": 3,
            "categoryId": 3,
            "amount": "12000",
            "comment": "순대국",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-16T15:00:00.000Z",
            "createdAt": "2023-11-19T15:01:35.308Z",
            "updatedAt": "2023-11-19T15:01:35.308Z",
            "deletedAt": null
        },
        {
            "id": 19,
            "userId": 3,
            "categoryId": 11,
            "amount": "1000",
            "comment": "구미젤리",
            "isExcludingTotal": true,
            "expensedAt": "2023-10-16T15:00:00.000Z",
            "createdAt": "2023-11-19T15:03:11.029Z",
            "updatedAt": "2023-11-19T15:03:11.029Z",
            "deletedAt": null
        }
    ]
}
```

</br>

### 17. 오늘 지출 추천
```
GET /expenses/today-recommend
```

* **Success Response**
```
{
    "success": true,
    "data": [
        {
            "massage": "하루 사용 금액보다 더 아껴쓰고 있어요!",
            "categoryName": "식비",
            "useAmount": 18070
        },
        {
            "massage": "하루 사용 금액보다 더 아껴쓰고 있어요!",
            "categoryName": "교통",
            "useAmount": 18070
        }
    ]
}
```

* **Fail Response**
```
// 존재하지 않은 예산일 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 예산 입니다."
}
```

</br>

### 18. 오늘 지출 안내
```
GET /expenses/today-guide
```

* **Success Response**
```
{
    "success": true,
    "data": [
        {
            "totalExpenses": 3500,
            "categoryName": "식비",
            "useAmount": 17850,
            "expenseAmount": 0
        },
        {
            "totalExpenses": 3500,
            "categoryName": "교통",
            "useAmount": 17850,
            "expenseAmount": 0
        }
    ]
}
```

* **Fail Response**
```
// 존재하지 않은 예산일 경우
{
    "statusCode": 404,
    "message": "존재하지 않는 예산 입니다."
}

// 오늘 지출 내역이 없을 경우
{
    "statusCode": 404,
    "message": "오늘 지출 내역이 없습니다!"
}
```

</br>

### 19. 지출 통계
```
GET /expenses/statistics
```

* **Success Response**
```
{
    "success": true,
    "data": {
        "lastMonthTotalAmountCompareRatio": 55,
        "lastMonthCateogiesCompareRatio": [
            {
                "categoryName": "식비",
                "ratio": 34
            },
            {
                "categoryName": "카페/간식",
                "ratio": 100
            },
            {
                "categoryName": "편의점/마트",
                "ratio": 250
            },
            {
                "categoryName": "교통",
                "ratio": 0
            }
        ]
    }
}
```