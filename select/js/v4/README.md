# 명세서
- selectBox 클릭시 select layer가 오픈된다. 다시 클릭시 닫힌다. 즉, 토글방식이다.
- selectBox 외 다른 곳 클릭시 select layer가 닫힌다.
- select layer에 있는 아이템을 클릭시 선택된 텍스트가 selectBox에 설정이 되고, select layer는 닫힌다.
- multi selectBox가 존재한다. ( gender , name ) => 결과 : 이미지
- 페이지 로딩시 ajax를 통해 random한 user 정보를 받아온다. 
- user 정보를 받아오는데 성공시 gender selectBox를 활성화 시킨다. 
- gender selectBox의 layer item 선택시 해당 gender에 맞는 name selectBox를 활성화 시킨다.
- name selectBox 의 layer item 선택시 해당 gender 와 name 의 맞는 이미지를 보여준다.
- gender의 default 값이 선택되었을때 name selectBox는 비활성화 및 default 값이 , 이미지는 안보여지게 된다.

# 지금까지의 문제점
- 스파게티 코드 ( 유지보수시 전체 코드를 봐야 하는 이슈 )
- 코드의 신뢰성 문제


# 해결해야 할 문제
- 코드 분리 ( 관심사의 분리 )
- 중복코드 공통화 
- 콜백 해결하기
- 모듈화
  - 모듈 === 부품 ( ex. 나사 : 나사의 역활은 무엇인가? )
  - 각각의 모듈이 경계를 가지고 본래 맡은 수행을 하는 것.
  - 로직 수정시 용이 
  - 파일 분리
 
# 목표
- 유지보수가 가능한 코드를 만들자.
- 믿을수 있는 코드를 만들자.


# 구조
- util : 유틸리티
- core : selectbox의 기본적인 로직 ( 기본값 선택된 값으로 바꾸기, 다시 디폴트 값으로 바꾸기, 선택된 / 디폴트 값 구하기 )
- view : selectBox의 행동이나 Dom의 rendering 담당.
- selectBox : core와 view를 포괄하는 selectBox 코드
- index : 사용할 user가 작성하는 코드, 실제 적용해야 할 context 와 선택했을때 callback 함수를 구축.


 # Todo
 - 여러 파일을 번들러를 이용해서 하나의 파일로 번들해보자.
 - 번들했을때 이점을 생각해보자.
