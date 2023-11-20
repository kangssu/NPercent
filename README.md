## N%(NPercent) 💸💰
> 원티드 프리온보딩 백엔드 인턴십에서 기술 과제로 요구사항을 받고 개인으로 진행한 프로젝트입니다. 단, 해당 프로젝트는 자유롭게 해석 및 구현이 가능했기 때문에 가상의 유저들이 지속적인 건강한 소비 습관을 생성하기 위한 목적을 가지고 일부 재해석하여 구현했습니다.

<br/>

## 목차
### [1. 개요](##1.-개요)
#### [1-1. 실행 환경](###1-1.-실행-환경)
#### [1-2. 기술 스택](###1-2.-기술-스택)
#### [1-3. 프로젝트 관리](###1-3.-프로젝트-관리)
### [2. ERD 및 디렉토리 구조](##2.-ERD-및-디렉토리-구조)
#### [2-1. ERD](###2-1.-ERD)
#### [2-2. 디렉토리 구조](###2-2.-디렉토리-구조)
### [3. 기능구현](##3.-기능구현)
### [4. API 명세](##4.-API-명세)
### [5. 트러블 슈팅](##5.-트러블-슈팅)
### [6. 고민의 흔적](##6.-고민의-흔적)

</br>

## 1. 개요
* "요즘 사용하고 있는 돈이 어디에 지출이 되는지 파악이 안되네.."</br>
* "카테고리별로 내가 지정한 예산대로 쓰는지 확인하고 싶은데.."</br>
* "카테고리별 소비 비율도 확인하고, 지난달 대비 소비 증감율도 확인하고 싶은데.."</br>

**N%(앤퍼센트)에서 위 고민들 전부 해결해보세요!**

### 1-1. 실행 환경
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

### 1-2. 기술 스택
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6">&nbsp;
<img src="https://img.shields.io/badge/Nest.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;

### 1-3. 프로젝트 관리
* 프로젝트 시작 전 만들어야 할 API를 노션 보드에 티켓으로 작성하고 각각의 티켓 안에 요구사항들을 정리하여 관리
* 이슈 생성하고 작업 완료 후 PR 생성하여 머지 진행
<details>
<summary>일정 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/c3a2e425-35f1-4bac-b3cf-b175993c127c">
</div>
</details>

<details>
<summary>요구사항 정리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/e00a08cc-46f4-4d7f-9fff-91cc39efe6cb">
</div>
</details>

<details>
<summary>이슈 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/81447805-58b8-46a4-b4c2-2c7fdc10aad0">
</div>
</details>

<details>
<summary>PR 관리</summary>
<div markdown="1">
<img src="https://github.com/kangssu/NPercent/assets/83870420/165d795b-1d33-44de-bc98-67a67be1c6c8">
</div>
</details>

</br>

## 2. ERD 및 디렉토리 구조
### 2-1. ERD
![예산erd](https://github.com/kangssu/FoodStreet/assets/83870420/d557f319-9e31-411c-a66d-207e7bf9f0a4)

### 2-2. 디렉토리 구조
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

</br>

## 3. 기능구현
### 3-1. 회원가입
* 이메일 중복체크 및 이메일 형식 유효성 체크
* 패스워드 BCrypt 암호화 처리 (패스워드 불일치 시 등록 불가능)

### 3-2. 로그인
* 이메일, 패스워드 일치 여부 유효성 체크
* 로그인 시 JWT(Json Web Token) 발급 -> 모든 API 요청시 JWT 인가

### 3-3. 카테고리
* 총 11개(식비, 카페/간식, 쇼핑, 교통, 취미, 의료, 여행, 교육, 편의점/마트, 주거, 보험/세금) 기본 카테고리로 지정
* 해당 카테고리는 카테고리 DB에 `user_id=0`으로 저장하여 유저의 카테고리 조회시 조건에 `user_id=0`까지 포함하여 조회
* 기본 카테고리 제외하고 유저가 새롭게 카테고리 생성, 수정, 삭제 가능

### 3-4. 예산 (& 예산 추천)
* 예산은 카테고리별 예산 금액 생성, 수정, 삭제 가능
* 예산 추천은 카테고리 지정 없이 예산 금액만 설정 후 추천받는 기능
* 추천받기 위한 예산 총 금액과 동일한 다른 유저 10명의 카테고리별 평균 비율에 따라 설정한 예산 금액을 계산하여 추천
* 단, 유저들이 많이 사용할 수 있는 기본 카테고리로만 예산 추천

### 3-5 지출 기록
* 카테고리별 지출 금액, 일시, 메모에 대한 내용을 생성, 수정, 삭제 가능
* 지출 리스트는 1️⃣기간 2️⃣기간&&카테고리 3️⃣기간&&최소/최대 금액 4️⃣기간&&카테고리&&최소/최대 금액으로 지출 내역 조회 가능(단, 합계제외 처리된 지출은 지출 합계에서 제외)

### 3-6 오늘 지출 추천
* 유저가 설정한 총 예산대로 지출할 수 있도록 오늘 지출 가능 총액과 카테고리별 오늘 지출 가능 총액 계산하여 제공
* 총 예산에서 남은 일수로 오늘 지출을 추천하고 만약 총 예산을 초과했더라도 최소한의 최소 지출 금액 추천
* 1️⃣총 예산/한달 2️⃣총 예산/남은 일수로 각각 계산하여 `1<2`, `1=2`, `1>2` 총 3가지 경우에 따른 메세지 노출

### 3-7. 오늘 지출 안내
* 오늘 지출한 총액과 카테고리별 오늘 적정 금액, 오늘 지출 금액, 위험도 비율(적정 금액 기준) 제공

### 3-8. 지출 통계
* 지난달 대비 이번달 지출 총 금액과 카테고리별 소비율
* 오늘 일자가 11월11일일 경우 10.01 ~ 10.11과 11.01 ~ 11.11로 비교

</br>

## 4. API 명세
<details>
<summary style="font-size:17px; font-weight:bold;">4-1. 회원가입</summary>
<div markdown="1">

</div>
</details>

<details>
<summary style="font-size:17px; font-weight:bold;">4-2. 로그인</summary>
<div markdown="1">

</div>
</details>

<details>
<summary style="font-size:17px; font-weight:bold;">4-3. 카테고리</summary>
<div markdown="1">

</div>
</details>
<details>
<summary style="font-size:17px; font-weight:bold;">4-4. 예산 (& 예산 추천)</summary>
<div markdown="1">

</div>
</details>

<details>
<summary style="font-size:17px; font-weight:bold;">4-5 지출 기록</summary>
<div markdown="1">

</div>
</details>
<details>
<summary style="font-size:17px; font-weight:bold;">4-6 오늘 지출 추천</summary>
<div markdown="1">

</div>
</details>

<details>
<summary style="font-size:17px; font-weight:bold;">4-7. 오늘 지출 안내</summary>
<div markdown="1">

</div>
</details>
<details>
<summary style="font-size:17px; font-weight:bold;">4-8. 지출 통계</summary>
<div markdown="1">

</div>
</details>

</br>

## 5. 트러블 슈팅
<details>
<summary style="font-weight:bold;">⚡ TypeORM save 사용시 조인컬럼 저장 안되는 이슈</summary>
<div markdown="1">
<p> 
기존에는 DB 테이블로 만든 컬럼들을 Entity에 전부 명시해줬었다. 그 이유는 Entity가 결국 DB 테이블 그 자체라고 생각했기 때문이다. 하지만 팀 프로젝트 당시 조인으로 사용할 때 조인 컬럼은 중복된 값이니까 생략한다는 얘기를 듣고 사용해보기로 했다. 뭐든지 정답은 없다고 생각하기 때문이다.</br>

여기서 기존에 사용하던 방식인 아래 코드처럼 작성했다가 조인컬럼이 저장이 안 되는 것을 발견했다.</br>
<img src="https://github.com/kangssu/NPercent/assets/83870420/758972bc-19cf-4e46-b557-b6c9eeb0e9a0"></br>

위에 방식은 Entity에 DB 테이블로 만든 컬럼이 전부 존재할 경우였고 구글링을 통해 여러 방법을 확인하고 아래 코드로 작성을 하기로 했다. 즉, 조인을 사용했기 때문에 조인된 객체를 불러 그 안에 저장해주는 방식으로 사용해서 해결할 수 있었다.</br>
<img src="https://github.com/kangssu/NPercent/assets/83870420/4f2ef7a2-1e45-4498-b391-36ecb03bad03">
</p>
</div>
</details>

<details>
<summary style="font-weight:bold;">⚡ Budget Entity, Category Entity 조인 관계를 1:1로 설정하여 발생한 이슈</summary>
<div markdown="1">
<p>
하나의 카테고리는 하나의 예산을 갖는다. 예를 들어 한명의 유저가 식비 카테고리를 선택하고 40만원 예산을 설정하여 저장하면 식비 카테고리로 예산을 더 추가할 때는 새롭게 생성하는 것이 아닌 기존의 예산에서 식비 카테고리의 예산을 50만원 이런식으로 수정하기 때문이다.</br>

그렇기 때문에 Budget과 Category의 조인 관계를 1:1로 설정했지만 아래 에러가 발생하였다.</br>
<span style="font-weight:bold;">Error: Duplicate entry '11' for key 'budgets.REL_4bb589bf6db49e8c1fd6af05f4’</span></br>

해당 에러를 발견하고 미쳐 생각하지 못한 부분이 있었다. 기본 카테고리의 경우 여러명의 유저들에게 동일한 id 값으로 들어간다. 예를 들어 A 유저가 categoryId=1(기본 카테고리)를 저장하고 B 유저가 categoryId=1을 또 저장하면 생기게 되는 중복 오류였다.</br>

그래서 결국 하나의 카테고리는 여러가지 예산을 가질 수 있는 1:N 관계로 수정하여 해결할 수 있었다.
</p>
</div>
</details>

</br>

## 6. 고민의 흔적
<details>
<summary style="font-weight:bold;">📝 Entity에 DB 컬럼의 _를 생략하는 방법 없을까?</summary>
<div markdown="1">
<p>
DB 테이블 컬럼을 만들때 created_at 이런식으로 _를 사용하는 경우가 있다. _가 포함되는 컬럼은 Entity에 아래처럼 전부 컬럼 이름을 전부 명시해줘야했다.</br>

<img src="https://github.com/kangssu/NPercent/assets/83870420/fc435b01-a303-44b6-bf80-7ee7b506855c"></br>

항상 위 코드처럼 작성했지만 문득 생략할 수 있는 방법은 없을까?라는 궁금증이 생겼고 구글링으로 방법을 찾게 되었다. app.module.ts 파일에서 TypeORM 옵셥으로 namingStrategy: new SnakeNamingStrategy() 코드를 추가해주면 해결할 수 있었다.
</p>
</div>
</details>

<details>
<summary style="font-weight:bold;">📝 해당 서비스의 카테고리를 어떻게 구현할까?</summary>
<div markdown="1">
<p>
초기 요구사항은 식비, 주거, 교통의 기본 카테고리를 설정해서 고정된 카테고리로만 사용해도 되고 자유롭게 구현하라고 말씀해주셨다. "어떤 카테고리들을 기본 카테고리로 둘까?", "고정 카테고리로만 가는게 맞을까?", "고정 카테고리도 있고 유저가 직접 추가도 할 수 있어야 될 것 같은데?"에 대한 고민들이 하던 도중 문득 토스에서 결제한 내역을 자동으로 소비 카테고리에 맞게 보여주고 소비율도 같이 보여줬던 서비스가 생각났다.</br>

해당 서비스를 확인해보니까 기본 카테고리가 22개 정도 되었고 자유롭게 생성, 수정, 삭제할 수 있어서 원했던 방향과 비슷했기 때문에 참고하기로 결정했다.</br>

그중 11개의 카테고리를 기본 카테고리로 고정으로 DB에 저장해두고 개개인의 유저가 필요한 카테고리를 자유롭게 생성, 수정, 삭제할 수 있도록 구현하게 되었다.
</p>
</div>
</details>

<details>
<summary style="font-weight:bold;">📝 예산 설정하는 프론트 화면은 어떻게 구상할까?</summary>
<div markdown="1">
<p>
처음에 생각했을 때는 예산을 한 번에 여러개 등록하고 기존 예산 수정도 여러개 한 번에 수정할 수 있게 프론트 화면을 구상하고 로직을 생각했지만, 예산 내역이 2-3개가 아니고 20개 이상으로 사용하고 있을 경우를 생각했을 때 수정시 기존 등록되어 있는 값까지 넘길 필요가 있을까?라는 생각이 들었다. 그래서 새로운 예산을 등록할 때는 여러개를 한 번에 등록할 수 있게하고 이미 등록되어 있는 예산을 수정하거나 삭제할 때는 개별적으로 사용할 수 있도록 변경했다.</br>

<img src="https://github.com/kangssu/NPercent/assets/83870420/0c3a68c5-441c-4f10-bb67-eb27d96d8c85"></br>


위 이미지가 프론트 화면에서 보여질 예산 페이지로 생각하고 로직을 구현했던 것 같다. 이전 개인 프로젝트 할 때 프론트도 같이 만들어봤던 경험 때문에 프론트를 먼저 생각해보고 로직을 생각하는 순서로 바뀐 계기가 되었다. 이렇게 생각하게 되니까 이해하기도 쉽고 로직이 머릿속에 그려지기 때문이다.
</p>
</div>
</details>