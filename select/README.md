# selectBox 모듈 실습

## Contents
1. 학습목표
2. 프로젝트 구조
3. 관련문서

### 학습목표
- 실무에 적용할 수 있는 탭 UI 컴포넌트를 직접 만들 수 있는 역량을 키운다.
- 재사용 가능한 코드 작성의 필요성과 그 노하우를 배운다.

### 교육과정
- single selectbox ui component 만들기
- multi selectbox ui component 만들기
- ajax 통신이 가능한 selectbox ui component 만들기
- 위 조건을 만족하는 모듈화된 selectbox ui component 만들기

### 프로젝트 구조

### 환경
- ES5
- Vanilla JS (no jQuery or any other libs)


#### 폴더구조

```
├── README.md                       // 전체 가이드 파일
├── single_select.html              // single selectbox html
├── multi_select.html               // multi selectbox html
├── ajax_select.html                // 다이나믹한 multi selectbox with ajax html
├── module_select.html              // 모듈화로 정리된 multi selectbox with ajax html
├── css                             // css assets
│   ├── reset.css
│   └── select.css
├── js
│   ├── v1
│   │   └── index.js				// single_select js
│   ├── v2
│   │   └── index.js				// multi_select js
│   ├── v3
│   │   └── index.js				// ajax_select js
│   ├── v4
│   │   ├── core					// selectBox core 모듈
│   │   ├── util					// 유틸리티
│   │   ├── view					// selectBox view 모듈
│   │   ├── selectBox.js			// core, view 합쳐진 selectBox js
└── └── └── index.js				// 엔트리 js
```

### 관련문서

[wiki](http://wiki.daumkakao.com/pages/viewpage.action?pageId=480610767)
