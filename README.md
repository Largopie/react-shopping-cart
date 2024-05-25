# 🛒 react-shopping-cart STEP 1

## 🚀 핵심 기능을 한줄로 정의

장바구니 화면에서 선택된 상품의 수량 및 총 결제 금액을 확인하고 주문을 확정할 수 있다.

## 🎯 요구 사항 분석

- API를 호출하여 장바구니 상품 데이터를 불러온다.
- Recoil을 사용하여 클라이언트 상태(개별 상품의 선택 여부, 결제 금액, 배송비 등)를 관리한다.
- 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
  - 상품 선택/해제 시 결제 금액을 동적으로 변경한다.
  - 결제 금액이 10만원 이상일 경우 배송비는 무료이다.
- 장바구니 상품의 수량 변경을 할 수 있다.
- 장바구니에 담긴 상품을 제거할 수 있다.
- 새로고침해도 선택한 상품 상태를 유지해서 보여준다.

## 🖥️ 컴포넌트 구성도

![Drawing 2024-04-21 22 17 23 excalidraw](https://github.com/Largopie/react-shopping-cart/assets/106071687/0cde0e9f-e7dc-4f00-ab52-78252c763bd4)

## ♻️ v0.1

> 프로그램의 한 사이클을 경험할 수 있는 가장 작은 기능으로 구성해본다면?

1. API를 호출하여 장바구니 상품 데이터를 불러온다.
2. 주문금액과 배송비를 포함한 총 결제 금액을 계산한다.
3. 주문 확인 버튼을 눌렀을 때, 주문 정보를 확인할 수 있는 주문 확인 페이지로 이동한다.
   - 상품 종류
   - 상품 총 개수
   - 총 결제 금액

### 📝 추가 기능 구현

- [x] 체크 여부에 따른 상태 관리
- [x] 새로고침해도 선택한 상품 상태 유지
- [x] 장바구니가 비어있는 경우 별도의 페이지 구현
- [x] 장바구니 전체 선택 기능 구현
- [x] 테스트코드
  - [x] 장바구니 데이터 로딩: /cart-items API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러오는지 테스트한다.
  - [x] 상품 선택 기능: 개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경되는지 테스트한다.
  - [x] 결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.
  - [x] 배송비 계산: 결제 금액에 따라 배송비가 정상적으로 계산되는지 (10만원 이상 무료) 테스트한다.
  - [x] 수량 변경 기능: 상품의 수량을 변경할 때 올바르게 반영되는지 테스트한다.
  - [x] 상품 제거 기능: 장바구니에서 상품을 제거할 때 정상적으로 동작하는지 테스트한다.
- [x] 디자인

# 🛒 react-shopping-cart STEP 2

## 🚀 핵심 기능을 한줄로 정의

쿠폰을 적용하고 최종 결제 금액 계산 로직을 구현한다.

## 🎫 쿠폰 정보

### 🏷️ 5,000원 할인 쿠폰

- 쿠폰 코드: `FIXED5000`
- 할인 금액: 5,000원
- 최소 주문 금액: 100,000원
- 만료일: 2024년 11월 30일

### 🏷️ 2개 구매시 1개 무료 쿠폰

- 쿠폰 코드: `BOGO`
- 구매 수량: 2
- 무료 제공 수량: 1
- 만료일: 2024년 5월 30일
- `BOGO` 쿠폰은 장바구니에 동일한 제품을 3개를 담은 상태에서 사용하면, 1개 분량의 금액을 할인한다.
- 3개씩 담은 제품이 여러개인 경우, 1개당 금액이 가장 비싼 제품에 적용한다.

### 🏷️ 5만원 이상 구매 시 무료 배송 쿠폰

- 쿠폰 코드: `FREESHIPPING`
- 최소 주문 금액: 50,000원
- 만료일: 2024년 8월 31일
- 배송비 무료 쿠폰은 도서 및 산간 지역인 경우에도 무료 배송이 가능하다.

### 🏷️ 미라클모닝 30% 할인 쿠폰

- 쿠폰 코드: `MIRACLESALE`
- 할인율: 30%
- 사용 가능 시간: 오전 4시부터 7시까지
- 만료일: 2024년 7월 31일

## 🎯 요구 사항 분석

- `/coupons` API를 호출하여 쿠폰 목록을 불러와서 사용한다.
- 4가지 유형의 쿠폰을 사용할 수 있어야 한다.
- 쿠폰은 한 번에 최대 2개 사용 가능하다.
- 2개 쿠폰을 사용하는 경우 적용 순서에 따라 할인 금액이 달라질 수 있다. 최종 금액은 할인 금액이 더 큰 값을 기준으로 계산한다.
- 쿠폰 적용 후의 최종 결제 금액과 관계 없이, ‘총 주문 금액’이 100,000원 이상일 경우 무료 배송 혜택이 적용된다.
- `'배송지가 제주도 및 도서 산간 지역입니까?'`라는 체크박스에 체크를 했다면, 배송비를 3천원 추가한다.
- 쿠폰 코드를 입력하기 위한 모달창은 **이전 미션에서 만든 모달 컴포넌트 라이브러리를 직접 사용**한다. 필요한 기능이 있다면 추가하여 버전을 업데이트한다.

## 🖥️ 컴포넌트 구성도

## ♻️ v0.1

> 프로그램의 한 사이클을 경험할 수 있는 가장 작은 기능으로 구성해본다면?

1. 5,000원 할인 쿠폰 적용 로직 구현 및 테스트
2. 2개 구매 시 1개 무료 쿠폰 적용 로직 구현 및 테스트
3. 5만원 이상 구매 시 무료 배송 쿠폰 적용 로직 구현 및 테스트
4. 미라클 모닝 30% 할인 쿠폰 적용 로직 구현 및 테스트
5. 할인 금액을 최종 결제 금액에 반영

### 📝 기능 구현

- [x] `/coupons` api를 이용해서 쿠폰 목록 불러오기
- [x] 쿠폰의 유효성 검증 로직 구현
  - [x] 쿠폰 코드가 일치하는지 검증
  - [x] 쿠폰의 유효기간이 만료되었는지 검증
  - [x] 쿠폰의 적용 조건(최소 주문 금액, 사용 가능 시간) 검증
- [x] 5,000원 할인 쿠폰 적용
  - [x] 로직 구현
  - [x] 테스트
- [x] 2개 구매 시 1개 무료 쿠폰 적용
  - [x] 로직 구현
  - [x] 테스트
- [x] 5만원 이상 구매 시 무료 배송 쿠폰 적용
  - [x] 로직 구현
  - [x] 테스트
- [x] 미라클 모닝 30% 할인 쿠폰 적용
  - [x] 로직 구현
  - [x] 테스트
- [x] 두개의 쿠폰을 중복으로 사용하는 경우 가장 높은 할인 금액으로 적용되도록 구현
- [x] 산간 지역 체크 상태에 따른 배송비 금액 조정
- [x] 주문 확인 페이지 구성
- [x] 결제하기 페이지 구성
- [x] 라이브러리 모달 이용하여 쿠폰 선택 페이지 구성

### 🚨 미션 추가 요구 사항

- [x] 결제하기 버튼을 누를 때 `/orders` api를 사용한다.
- [x] 결제 금액 확인 페이지로 이동 후, 다시 장바구니로 돌아오면 장바구니에서 주문한 상품은 사라진다.
- [x] 장바구니로 돌아왔을 때 모든 선택 상태는 초기화한다.
- [x] 쿠폰은 사라지지 않는다.
