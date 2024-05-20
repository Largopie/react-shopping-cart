# react-shopping-cart

## 핵심 기능을 한줄로 정의

장바구니 화면에서 선택된 상품의 수량 및 총 결제 금액을 확인하고 주문을 확정할 수 있다.

## 요구 사항 분석

- API를 호출하여 장바구니 상품 데이터를 불러온다.
- Recoil을 사용하여 클라이언트 상태(개별 상품의 선택 여부, 결제 금액, 배송비 등)를 관리한다.
- 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
  - 상품 선택/해제 시 결제 금액을 동적으로 변경한다.
  - 결제 금액이 10만원 이상일 경우 배송비는 무료이다.
- 장바구니 상품의 수량 변경을 할 수 있다.
- 장바구니에 담긴 상품을 제거할 수 있다.
- 새로고침해도 선택한 상품 상태를 유지해서 보여준다.

## 0.1 버전

1. API를 호출하여 장바구니 상품 데이터를 불러온다.
2. 주문금액과 배송비를 포함한 총 결제 금액을 계산한다.
3. 주문 확인 버튼을 눌렀을 때, 주문 정보를 확인할 수 있는 주문 확인 페이지로 이동한다.
   - 상품 종류
   - 상품 총 개수
   - 총 결제 금액

### 추가 기능 구현

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
