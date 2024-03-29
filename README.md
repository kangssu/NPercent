## N%(NPercent) 💸💰
> 원티드 프리온보딩 백엔드 인턴십에서 기술 과제로 요구사항을 받고 개인으로 진행한 프로젝트입니다. 단, 해당 프로젝트는 자유롭게 해석 및 구현이 가능했기 때문에 가상의 유저들이 지속적인 건강한 소비 습관을 생성하기 위한 목적을 가지고 일부 재해석하여 구현했습니다.

<br/>

## 목차
#### [1. 개요](#개요)
##### [&nbsp;&nbsp;1-1. 실행 환경](#실행-환경)
##### [&nbsp;&nbsp;1-2. 기술 스택](#기술-스택)
##### [&nbsp;&nbsp;1-3. 프로젝트 관리](#프로젝트-관리)
#### 2. ERD 및 디렉토리 구조
##### &nbsp;&nbsp;2-1. ERD
##### &nbsp;&nbsp;2-2. 디렉토리 구조
#### [3. 기능구현](#기능구현)
#### [4. API 명세](#API-명세)
#### [5. 트러블 슈팅](#트러블-슈팅)
#### [6. 고민의 흔적](#고민의-흔적)

</br>

## 개요
* "요즘 사용하고 있는 돈이 어디에 지출이 되는지 파악이 안되네.."</br>
* "카테고리별로 내가 지정한 예산대로 쓰는지 확인하고 싶은데.."</br>
* "카테고리별 소비 비율도 확인하고, 지난달 대비 소비 증감율도 확인하고 싶은데.."</br>
* **N%(앤퍼센트)에서 위 고민들 전부 해결해보세요!!!**

### 실행 환경
* .local.env / .dev.env 환경변수 파일 생성</br>
해당 프로젝트는 로컬과 데브 환경 실행으로 구분했으며, 아래 항목들이 환경변수 파일에 전부 존재해야 합니다.
```
SERVER_PORT=

DATABASE_HOST=
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_DATABASE=

JWT_SECRET_KEY=
```
* 로컬 실행시
```
npm run start:local
```

* 데브 실행시
```
npm run start:dev
```

### 기술 스택
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/Nest.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;

### 프로젝트 관리
프로젝트 시작 전 만들어야 할 API를 노션 보드에 티켓으로 작성하고</br> 
각각의 티켓 안에 요구사항들을 정리했으며, 티켓마다 이슈 생성하여 PR 생성하여 머지 진행
<details>
<summary>일정 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/54404ddd-3076-47bd-bd36-b970e856115c">
</div>
</details>

<details>
<summary>요구사항 정리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/68609868-9658-4241-bc45-e149e4494bb5">
</div>
</details>

<details>
<summary>이슈 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/1806f6b4-2e7c-443b-b698-6faff7cd713e">
</div>
</details>

<details>
<summary>PR 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/663c8c9a-764a-4db0-a5ac-271722a69725">
</div>
</details>

</br>

## ERD 및 디렉토리 구조

<details>
<summary><strong>ERD</strong></summary>
<div markdown="1">
 
<img src="https://github.com/kangssu/NPercent/assets/83870420/ec3119f5-da24-4492-878d-ec4ea0d32b31">
</div>
</details>

<details>
<summary><strong>디렉토리 구조</strong></summary>
<div markdown="1">
 
```bash
src
 ┣ config
 ┃ ┗ databaseConfig.ts
 ┣ custom
 ┃ ┗ resultApi.ts
 ┣ decorator
 ┃ ┗ userDecorator.ts
 ┣ entity
 ┃ ┣ budget.entity.ts
 ┃ ┣ category.entity.ts
 ┃ ┣ expense.entity.ts
 ┃ ┗ user.entity.ts
 ┣ enum
 ┃ ┣ errorHttpStatus.enum.ts
 ┃ ┗ errorMessage.enum.ts
 ┣ feature
 ┃ ┣ auth
 ┃ ┃ ┣ guard
 ┃ ┃ ┃ ┗ jwt.guard.ts
 ┃ ┃ ┣ strategy
 ┃ ┃ ┃ ┗ jwt.strategy.ts
 ┃ ┃ ┣ auth.controller.ts
 ┃ ┃ ┣ auth.module.ts
 ┃ ┃ ┗ auth.service.ts
 ┃ ┣ budget
 ┃ ┃ ┣ budget.controller.ts
 ┃ ┃ ┣ budget.dto.ts
 ┃ ┃ ┣ budget.lib.ts
 ┃ ┃ ┣ budget.module.ts
 ┃ ┃ ┗ budget.service.ts
 ┃ ┣ category
 ┃ ┃ ┣ category.controller.ts
 ┃ ┃ ┣ category.dto.ts
 ┃ ┃ ┣ category.lib.ts
 ┃ ┃ ┣ category.module.ts
 ┃ ┃ ┗ category.service.ts
 ┃ ┣ expense
 ┃ ┃ ┣ expense.controller.ts
 ┃ ┃ ┣ expense.dto.ts
 ┃ ┃ ┣ expense.lib.ts
 ┃ ┃ ┣ expense.module.ts
 ┃ ┃ ┗ expense.service.ts
 ┃ ┣ search
 ┃ ┃ ┣ search.controller.ts
 ┃ ┃ ┣ search.dto.ts
 ┃ ┃ ┣ search.module.ts
 ┃ ┃ ┗ search.service.ts
 ┃ ┗ user
 ┃ ┃ ┣ user.controller.ts
 ┃ ┃ ┣ user.dto.ts
 ┃ ┃ ┣ user.lib.ts
 ┃ ┃ ┣ user.module.ts
 ┃ ┃ ┗ user.service.ts
 ┣ util
 ┃ ┗ util.ts
 ┣ app.controller.spec.ts
 ┣ app.controller.ts
 ┣ app.module.ts
 ┣ app.service.ts
 ┗ main.ts
```
</div>
</details>

</br>

## 기능구현
### 회원가입
* 이메일 중복체크 및 이메일 형식 유효성 체크
* 패스워드 BCrypt 암호화 처리 (패스워드 불일치 시 등록 불가능)

### 로그인
* 이메일, 패스워드 일치 여부 유효성 체크
* 로그인 시 JWT(Json Web Token) 발급 -> 모든 API 요청시 JWT 인가

### 카테고리
* 총 11개(식비, 카페/간식, 쇼핑, 교통, 취미, 의료, 여행, 교육, 편의점/마트, 주거, 보험/세금) 기본 카테고리로 지정
* 해당 카테고리는 카테고리 DB에 `user_id=0`으로 저장하여 유저의 카테고리 조회시 조건에 `user_id=0`까지 포함하여 조회
* 기본 카테고리 제외하고 유저가 새롭게 카테고리 생성, 수정, 삭제 가능

### 예산 (& 예산 추천)
* 예산은 카테고리별 예산 금액 생성, 수정, 삭제 가능
* 예산 추천은 카테고리 지정 없이 예산 금액만 설정 후 추천받는 기능
* 유저들이 많이 사용할 수 있는 기본 카테고리로만 예산 추천
* 추천받기 위한 예산 총 금액 범위(`max >= 추천 예산 총 금액 >= min`)에 포함된 다른 유저 10명의 카테고리별 평균 비율에 따라 설정한 예산 금액을 계산하여 추천</br>
  (max : `추천 예산 총 금액 + 추천 예산 총 금액 / 2`, min: `추천 예산 총 금액 - 추천 예산 총 금액 / 2`)
* 만약, 추천 예산 총 금액 범위에 포함하는 다른 유저의 내역이 존재하지 않다면 예외 처리

### 지출 기록
* 카테고리별 지출 금액, 일시, 메모에 대한 내용을 생성, 수정, 삭제 가능
* 단, 예산 설정이 되지 않은 카테고리는 지출 내역 작성 불가
* 지출 리스트는 `기간` `기간&&카테고리` `기간&&최소/최대 금액` `기간&&카테고리&&최소/최대 금액`으로 지출 내역 조회 가능(단, 합계제외 처리된 지출은 지출 합계에서 제외)

### 오늘 지출 추천
* 식비, 카페/간식, 교통 카테고리로만 오늘 지출 추천</br>
  (*맨 아래 고민의 흔적 리스트 중 📝 오늘 지출 추천에 여행, 운동등의 한 번에 지출되는 카테고리를 포함시켜야 할까? 참고*)
* 유저가 설정한 총 예산대로 지출할 수 있도록 오늘 지출 가능 총액과 카테고리별 오늘 지출 가능 총액 계산하여 제공
* 총 예산에서 남은 일수로 오늘 지출을 추천하고 만약 총 예산을 초과했더라도 최소한의 지출 금액 추천</br>
  (최소 지출 금액 : `(카테고리 비율 / 100 * (총 예산/한달)) / 2`)
* `총 예산/한달` `총 예산/남은 일수`로 각각 계산하여 `1<2`, `1=2`, `1>2` 총 3가지 경우에 따른 메세지 노출

### 오늘 지출 안내
* 식비, 카페/간식, 교통 카테고리로만 오늘 지출 안내</br>
  (*맨 아래 고민의 흔적 리스트 중 📝 오늘 지출 추천에 여행, 운동등의 한 번에 지출되는 카테고리를 포함시켜야 할까? 참고*)
* 오늘 지출한 총액과 카테고리별 오늘 적정 금액, 오늘 지출 금액, 위험도 비율(적정 금액 기준) 제공
* 오늘 지출한 내역이 식비 카테고리 1개라면 나머지 카테고리의 지출 총액, 오늘 지출 금액, 위험도 비율은 전부 `0`으로 제공
* 만약, 오늘 지출한 내역이 아예 없으면 예외 처리

### 지출 통계
* 지난달 대비 이번달 지출 총 금액과 카테고리별 소비율
* 오늘 일자가 11월11일일 경우 10.01 ~ 10.11과 11.01 ~ 11.11로 비교

</br>

## API 명세
|No| Title           | Method  | Path                       | Authorization |
|---|-----------------|:-------:|----------------------------|:-------------:|
|1|회원가입|`POST`|`/users/sign-up`|X|
|2|로그인|`POST`|`/auth/sign-in`|X|
|3|유저정보 수정|`PATCH`|`/users`|O|
|4|카테고리 생성|`POST`|`/categories`|O|
|5|카테고리 수정|`PATCH`|`/categories/:id`|O|
|6|전체 카테고리 조회|`GET`|`/categories`|O|
|7|카테고리 삭제|`DELETE`|`/categories/:id`|O|
|8|예산 생성|`POST`|`/budgets`|O|
|9|예산 수정|`PATCH`|`/budgets/:id`|O|
|10|전체 예산 조회|`GET`|`/budgets`|O|
|11|예산 추천|`POST`|`/budgets/recommend`|O|
|12|예산 삭제|`DELETE`|`/budgets/:id`|O|
|13|지출 생성|`POST`|`/expenses`|O|
|14|지출 수정|`PATCH`|`/expenses/:id`|O|
|15|지출 삭제|`DELETE`|`/expenses/:id`|O|
|16|지출 검색|`POST`|`/search/expenses?startedAt=2023-11-10&endAt=...`|O|
|17|오늘 지출 추천|`GET`|`/expenses/today-recommend`|O|
|18|오늘 지출 안내|`GET`|`/expenses/today-guide`|O|
|19|지출 통계|`GET`|`/expenses/statistics`|O|

</br>

[🌟🌟🌟 API 명세 상세보기 🌟🌟🌟](https://github.com/kangssu/NPercent/blob/main/docs/api.md)

</br>

## 트러블 슈팅
<details>
<summary><strong>⚡ TypeORM save 사용시 조인컬럼 저장 안되는 이슈</strong></summary>
<div markdown="1">
<p> 
 
기존에는 DB 테이블로 만든 컬럼들을 Entity에 전부 명시해줬었다. 그 이유는 Entity가 결국 DB 테이블 그 자체라고 생각했기 때문이다.</br>
하지만 팀 프로젝트 당시 조인으로 사용할 때 조인 컬럼은 중복된 값이니까 생략한다는 얘기를 듣고 사용해보기로 했다. 뭐든지 정답은 없다고 생각하기 때문이다.</br>

여기서 기존에 사용하던 방식인 아래 코드처럼 작성했다가 조인컬럼이 저장이 안 되는 것을 발견했다.</br>
```
createCategory(
    userId: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.save({
      ...createCategoryDto,
      userId: userId,
    });
  }
```

위에 방식은 Entity에 DB 테이블로 만든 컬럼이 전부 존재할 경우였고 구글링을 통해 여러 방법을 확인하고</br>
아래 코드로 작성을 하기로 했다. 즉, 조인을 사용했기 때문에 조인된 객체를 불러 그 안에 저장해주는 방식으로 사용해서 해결할 수 있었다.</br>
```
createCategory(
    userId: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.save({
      ...createCategoryDto,
      user: { id: userId },
    });
  }
```
</p>
</div>
</details>

<details>
<summary><strong>⚡ Budget Entity, Category Entity 조인 관계를 1:1로 설정하여 발생한 이슈</strong></summary>
<div markdown="1">
<p>
 
하나의 카테고리는 하나의 예산을 갖는다. 예를 들어 한명의 유저가 식비 카테고리를 선택하고</br>
40만원 예산을 설정하여 저장하면 식비 카테고리로 예산을 더 추가할 때는 새롭게 생성하는 것이 아닌</br>
기존의 예산에서 식비 카테고리의 예산을 50만원 이런식으로 수정하기 때문이다.</br>

그렇기 때문에 Budget과 Category의 조인 관계를 1:1로 설정했지만 아래 에러가 발생하였다.</br>
`Error: Duplicate entry '11' for key 'budgets.REL_4bb589bf6db49e8c1fd6af05f4’`</br>

해당 에러를 발견하고 미쳐 생각하지 못한 부분이 있었다. 기본 카테고리의 경우 여러명의 유저들에게 동일한 id 값으로 들어간다.</br>
예를 들어 A 유저가 categoryId=1(기본 카테고리)를 저장하고 B 유저가 categoryId=1을 또 저장하면 생기게 되는 중복 오류였다.</br>

그래서 결국 하나의 카테고리는 여러가지 예산을 가질 수 있는 1:N 관계로 수정하여 해결할 수 있었다.
</p>
</div>
</details>

</br>

## 고민의 흔적
<details>
<summary><strong>📝 Entity에 DB 컬럼의 _를 생략하는 방법 없을까?</strong></summary>
<div markdown="1">
<p>
 
DB 테이블 컬럼을 만들때 created_at 이런식으로 _를 사용하는 경우가 있다.</br> 
_가 포함되는 컬럼은 Entity에 아래처럼 전부 컬럼 이름을 전부 명시해줘야했다.</br>

```
  @Column({ name: 'expensed_at' })
  expensedAt!: Date;
```

항상 위 코드처럼 작성했지만 문득 생략할 수 있는 방법은 없을까?라는 궁금증이 생겼고</br>
구글링으로 방법을 찾게 되었다. `app.module.ts` 파일에서 TypeORM 옵셥으로 `namingStrategy: new SnakeNamingStrategy()` 코드를 추가해주면 해결할 수 있었다.
</p>
</div>
</details>

<details>
<summary><strong>📝 Entity에서 조인 컬럼을 생략하는 것이 좋을까?</strong></summary>
<div markdown="1">
<p>

Entity가 결국 DB 테이블 그 자체라고 생각했기 때문에 조인컬럼도 항상 명시를 해주다가 이번 팀 프로젝트때 생략해도 된다는 팀원의 얘기를 듣고 생략해서 사용해봤었다.</br>

다만, 생략한다면 TypeORM의 `leftJoinAndSelect`로 가져와서 조건문에 사용해줄 수 있다.</br>
```
async getCategories(userId: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.user','user')
      .where('user.id = :userId', { userId })
      .orWhere('user.id = :defaultUserId', { defaultUserId: 0 })
      .getMany();
  }
```
</br>

Entity에 생략하지 않고 작성하면 조건문에서 바로 사용할 때 TypeORM의 `leftJoinAndSelect`를 생략하여 1줄을 줄일 수 있었다.</br>
```
async getCategories(userId: number): Promise<Category[]> {
    return await this.categoryRepository
      .createQueryBuilder('categories')
      .where('categories.userId = :userId', { userId })
      .orWhere('categories.userId = :defaultUserId', { defaultUserId: 0 })
      .getMany();
  }
```
</br>

솔직히 코드상으로는 1줄의 차이였지만 단순히 조건문에 사용되는 조인컬럼이 필요한 함수가 많아진다면 굳이 Entity에서 생략할 필요가 있을까?라는 생각이 들게 되었고 생략해야하는 타당한 이유를 찾을 수 없었기 때문에 기존에 사용하던 방식으로 전체적으로 리펙토링을 했다.

</p>
</div>
</details>

<details>
<summary><strong>📝 해당 서비스의 카테고리를 어떻게 구현할까?</strong></summary>
<div markdown="1">
<p>
 
초기 요구사항은 고정된 카테고리로만 사용해도 되고 자유롭게 구현하라고 말씀해주셨다.</br>
"고정 카테고리도 있고 유저가 직접 추가도 할 수 있어야 될 것 같은데?"에 대한 고민들이 하던 도중</br>
문득 토스에서 결제한 내역을 자동으로 소비 카테고리에 맞게 보여주고 소비율도 같이 보여줬던 서비스가 생각났다.</br>

해당 서비스를 확인해보니까 기본 카테고리가 22개 정도 되었고</br>
자유롭게 생성, 수정, 삭제할 수 있어서 원했던 방향과 비슷했기 때문에 참고하기로 결정했다.</br>

그중 11개의 카테고리를 기본 카테고리로 고정으로 DB에 저장해두고</br>
개개인의 유저가 필요한 카테고리를 자유롭게 생성, 수정, 삭제할 수 있도록 구현하게 되었다.
</p>
</div>
</details>

<details>
<summary><strong>📝 오늘 지출 추천에 여행, 운동등의 한 번에 지출되는 카테고리를 포함시켜야 할까?</strong></summary>
<div markdown="1">
<p>
 
오늘 지출 추천시 남은 총 예산 금액에서 카테고리별 비율대로 사용할 수 있는 금액을 추천하는 것인데</br>
여행이나 운동은 매일 지출하는 것이 아닌 한 달에 한번 20만원 또는 한 달에 3번 5만원씩 지출되는 것이라면 오늘 지출 추천 서비스와는 맞지 않는다고 생각했다.</br>

그래서 사용자가 매일매일 사용할 수 있는 식비, 카페/간식, 교통 카테고리로만 오늘 지출 추천을 총 예산에서 다른 카테고리의 예산 금액을 제외하여서 계산해주었다.
</p>
</div>
</details>

<details>
<summary><strong>📝 예산 설정하는 프론트 화면은 어떻게 구상할까?</strong></summary>
<div markdown="1">
<p>

처음에는 여러개의 예산을 등록하고 수정할 수 있게 화면을 구상했지만, 예산 내역이 20개 이상으로</br>
등록되어 있을 경우 해당 내역들까지 넘길 필요가 있을까? 라는 생각이 들면서 고민을 하게 되었다.</br>
그래서 아래 이미지처럼 등록시에는 여러개를, 수정시에는 개별로 수정/삭제 할 수 있게 구상했다.</br>

<img src="https://github.com/kangssu/NPercent/assets/83870420/045fbff8-c132-490a-ae87-986768df393a"></br>

이전 개인 프로젝트 할 때 프론트도 같이 만들어봤던 경험 때문에 프론트를 먼저 생각해보고</br>
로직을 생각하는 순서로 바뀐 계기가 되었다. 이렇게 생각하게 되니까 이해하기도 쉽고 로직이 머릿속에 그려지기 때문이다.
</p>
</div>
</details>

<details>
<summary><strong>📝 유저들의 카테고리별 예산 비율의 객체 형식을 어떻게 만들까?</strong></summary>
<div markdown="1">
<p>

자신의 카테고리별 예산 비율이 아닌, 다른 유저들의 카테고리별 예산 비율을 계산하여 가져와서 중복되는 카테고리들끼리 합쳐서 평균 비율을 구하는 것이 목적이였다.</br>

초기에는 아래 코드처럼 userId=1 유저의 카테고리들을 내부 배열로 묶어서 분리하고 싶었다. (아래 결과값 참고)</br>

```
private budgetCategoriesTotalRatio(
    otherUserBudgets: Budget[],
    defaultCategory: string[],
  ) {
    const userCategoryBudgetRatio = otherUserBudgets.reduce((acc, current) => {
      if (defaultCategory.includes(current.category.name)) {
        const categoryBudgetRatio =
          (Number(current.amount) / Number(current.totalAmount)) * 100;

        acc[current.userId] = acc[current.userId] || [];
        acc[current.userId].push({
          categoryName: current.category.name,
          ratio: Math.floor(categoryBudgetRatio * 10) / 10,
        });
      }

      return acc;
    }, {});

    const changedUserCategoryBudgetRatio = Object.keys(
      userCategoryBudgetRatio,
    ).map((key) => {
      return { userId: key, budgetCategoryRatio: userCategoryBudgetRatio[key] };
    });
    return changedUserCategoryBudgetRatio;
  }

// 결과값
userCategoryBudgetRatio :  [
  {
    userId: '1',
    budgetCategoryRatio: [ [Object], [Object], [Object], [Object] ]
  }
]

// 결과값의 Object를 보기 위해 반복
userCategoryBudgetRatio 1:  {
  userId: '1',
  budgetCategoryRatio: [
    { categoryName: '편의점/마트', ratio: 14.2 },
    { categoryName: '식비', ratio: 14.2 },
    { categoryName: '교통', ratio: 42.8 },
    { categoryName: '주거', ratio: 28.5 }
  ]
}
```
</br>

하지만, 이렇게 할 경우 중복된 카테고리들끼리 비율을 합쳐야 하기 때문에 굳이 userId 끼리 묶어야 하나? 라는 의문점에 아래 코드로 다시 수정을 했다.</br>

```
private calculationUserBudgetTotalRatios(
    userBudgetRatios: userBudgetRatiosObject[],
    deduplicationUserIds: number[],
  ) {
    const userBudgetAverageRatios = userBudgetRatios
      .reduce((acc, current) => {
        const existingCategory = acc.find(
          (item) =>
            item.userId !== current.userId &&
            item.categoryName === current.categoryName,
        );

        if (existingCategory) {
          existingCategory.ratio += current.ratio;
        } else {
          acc.push({
            categoryName: current.categoryName,
            ratio: current.ratio,
          });
        }

        return acc;
      }, [])
      .map((item) => ({
        categoryName: item.categoryName,
        ratio: Math.floor((item.ratio / deduplicationUserIds.length) * 10) / 10,
      }));

    return userBudgetAverageRatios;
  }

// 결과값 (각각의 중복되는 카테고리의 비율 합에서 평균까지 구한 값)
userBudgetAverageRatios :  [
  { categoryName: '편의점/마트', ratio: 7.1 },
  { categoryName: '식비', ratio: 23.8 },
  { categoryName: '교통', ratio: 24.7 },
  { categoryName: '주거', ratio: 20.9 },
  { categoryName: '카페/간식', ratio: 6.6 },
  { categoryName: '쇼핑', ratio: 6.6 },
  { categoryName: '여행', ratio: 6.6 }
]
```
</br>

다양한 방법으로 생각하다보니 처음 생각했던 코드보다 수정한 코드가 더 적합한 코드인 것 같다.</br>
이때 느꼈던 것은 한 번 생각하고 끝이 아니라 더 다양하게 생각해보는 것도 중요하다고 생각하게 된 계기였다.

</p>
</div>
</details>
