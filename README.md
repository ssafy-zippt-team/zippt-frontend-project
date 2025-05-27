![zipptLogo](https://github.com/user-attachments/assets/a6446501-31c7-4494-a70c-fe01dce93b99)


## **지도 기반 부동산 웹 서비스, zippt**

> 카카오맵 기반 UI에서 아파트 실거래, 리뷰, 상권, 뉴스까지 한눈에 확인하고 AI 기반 요약 및 유사 단지 추천까지 제공하는 부동산 플랫폼입니다.

---

## 📆 프로젝트 기간

**2025.05.22 ~ 2025.05.28 (7일)**

---

## 📔 프로젝트 개요

- **지도 기반의 부동산 정보 통합 플랫폼**
- 아파트 위치, 실거래가, 사용자 리뷰, 상권 분석 등을 시각화하여 제공합니다.
- AI를 활용해 **아파트 요약 리뷰 생성**, **유사 아파트 추천** 기능 제공
- 실시간 검색, 최근 본 아파트, 뉴스, 매물 통계 등 사용자 중심 기능 탑재
- 벡터 스토어 기반 유사도 검색으로 추천 기능 강화

---

## 👥 팀원 소개

### 👤 이도윤 (팀장)

<img src="https://github.com/user-attachments/assets/c9271593-9bc1-4721-817a-486ecf254ebe" width="140"/>

- **이메일**
    - liftyun@gmail.com
- **담당**
    - FRONTEND
        - 카카오맵 API를 활용한 지도기반 부동산 검색 페이지 구성 및 지도 마커 · 폴리곤 작업
        - Sweet Alert2 적용해 alert 커스텀 작업
        - 지도화면 리스트 및 디테일 컴포넌트 작업
        - JWT 를 활용한 인증/인가 요청 및 회원정보 수정 화면 작업
        - AI 요약 및 평가 기능 컴포넌트 작업
    - BACKEND
        - Spring Security 적용 및 회원 도메인 작업

---

### 👤 허정현

<img src="https://github.com/user-attachments/assets/57ff48a5-61bc-42ca-b493-d5249e8e0531" width="140"/>

- **이메일**
    - gjgmlwjd9@gmail.com
- **담당**
    - FRONTEND
        - 메인화면 디자인 및 퍼블리싱 작업
        - 네이버 검색 API를 활용한 부동산 뉴스 컴포넌트 작업
    - BACKEND
        - AI를 활용한 부동산 평가 및 요약 핵심기능 작업
        - Vector Store를 활용한 텍스트 및 이미지 유사도 검색기능 작업
        - 부동산 · 거래내역 도메인 작업
        - 패키지 구조 설계 및 컨트롤러 공통 응답 클래스 작업
        - 공통 페이지네이션 처리 객체 작업
        - AWS EC2 , S3 등 영속성 인프라 작업

---

### 👤 홍지훈

<img src="https://github.com/user-attachments/assets/45efa241-4c19-4431-a345-1cf5e8ccaff7" width="140"/>

- **이메일**
    - wlgns9807@naver.com
- **담당**
  - FRONTEND
      - 회원관련 로그인, 회원가입, 즐겨찾기, 리뷰, 마이페이지 작업
      - Chart.js 를 활용한 광역시별 매물 통계 및 상권 그래프 컴포넌트 작업
      - vue image zoomer 플러그인을 활용해 디테일 컴포넌트에 Image Zoom on Hover 적용
      - 이미지 유사도 기반 부동산 추천 컴포넌트 작업
  - BACKEND
      - 리뷰, 즐겨찾기, 주소 도메인 작업
      - 공공데이터포탈 OPEN API를 활용해 상권 데이터 가공을 통한 도메인 작업

---

## 🧰 기술 스택

| 분류 | 사용 기술 |
|------|-----------|
| **Language** | `Java`, `JavaScript` |
| **Backend** | `Spring Boot 3.4.5`, `Spring Security`, `Spring AI`, `MyBatis`, `JWT` |
| **Frontend** | `Vue.js`, `Tailwind CSS`, `SweetAlert2`, `Kakao Map`, `Chart.js`, `vue-image-zoomer` |
| **DB** | `MySQL`, `Redis`, `Redis Vector Store` |
| **DevOps** | `Git`, `Docker`, `AWS EC2`, `AWS S3` |

---

## 📁 문서

### 🛠 시스템 아키텍처

![시스템 아키텍처](https://github.com/user-attachments/assets/6f8cea13-f641-4400-af34-59287b4a63cd)

### 🧩 ERD

![ERD](https://github.com/user-attachments/assets/614e422d-dfe5-4a5b-b182-37e6ff93c677)

---

### API SPEC

🧑‍💻 회원 / 인증
<details> <summary><strong>🧑‍💻 회원가입</strong> <code>POST</code></summary>
  
- API Path: /api/v1/join

- 설명: 신규 사용자 등록

    ##  JoinRequest
    ### Header

    ```json
    {}
    ```
    ### Param
    ```json
    {}
    ```
    ### Body
    ```json
    {
    "nickname": "string",
    "username": "string",
    "userEmail": "string",
    "password": "string",
    "phoneNumber": "string"
    }
    ```
    ## JoinResponse
    ### Header

    ```json
    {}
    ```
    ### Body
    ```json
    "ok"

    ```


</details> <details> <summary><strong>🧑‍💻 로그아웃 (AccessToken)</strong> <code>POST</code></summary>

- API Path: /api/v1/logout/Token

- 설명: 로그아웃 처리
  ## LogoutAToken Request
    ### Header
    ```json
    {
    "Authorization": "Bearer {accessToken}"
    }
    ```
    ### Param
    ```json
    {}
    ```
    ---

</details> <details> <summary><strong>🧑‍💻 로그아웃 (RefreshToken)</strong> <code>POST</code></summary>

- API Path: /api/v1/logout/Token

- 설명: 로그아웃 처리
    ## Logout Request
    ### Header
    ```json
    {}
    ```
    ### Param

    ```json
    {
    "refreshToken": "string"  // from cookie
    }
    ```
    ---

</details> <details> <summary><strong>🧑‍💻 회원 정보 수정</strong> <code>PATCH</code></summary>

- API Path: /api/v1/members/memberUpdate

- 설명: 회원 정보 수정
  ## MypageUpdate Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "memberUuid": "string",
    "memberName": "string",
    "email": "string",
    "phoneNumber": "string",
  }
  ```
  ## MypageUpdate Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is3xxRedirection": true,
      "is2xxSuccessful": true,
      "is1xxInformational": true,
      "is4xxClientError": true,
      "is5xxServerError": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```

</details> <details> <summary><strong>🧑‍💻 마이페이지 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/members/mypage/{memberUuid}

- 설명: 마이페이지 정보
  ## MypageList Request
    ### Header
    ```json
    {}
    ```
    ### Param

    ```json
    {
    "memberUuid": "string"  
    }
    ```
    ---
  ## MypageList Response
    ### Header
    ```json
    {}
    ```
    ### Body
    ```json
    {
      "httpStatus": {
        "error": true,
        "is3xxRedirection": true,
        "is2xxSuccessful": true,
        "is1xxInformational": true,
        "is4xxClientError": true,
        "is5xxServerError": true
      },
      "isSuccess": true,
      "message": "string",
      "code": 1073741824,
      "result": {
        "name": "string",
        "memberName": "string",
        "email": "string",
        "phoneNumber": "string",
        "createdAt": "string"
      }
    }
    ```

</details>
🏠 아파트
<details> <summary><strong>🏠 유사 아파트 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/houses/search

- 설명: 외관 유사 아파트 추천
    ## HouseTermSimilar Request
    ### Header

    ```json
    {}
    ```
    ### Param
    ```json
    {
    "term": "string"
    }
    ```
    ---
    ## HouseTermSimilar Response
    ### Header

    ```json
    {}
    ```
    ### Body
    ```json
    {
      "httpStatus": {
        "error": true,
        "is4xxClientError": true,
        "is5xxServerError": true,
        "is1xxInformational": true,
        "is2xxSuccessful": true,
        "is3xxRedirection": true
      },
      "isSuccess": true,
      "message": "string",
      "code": 1073741824,
      "result": [
        {
          "aptSeq": "string",
          "aptNm": "string",
          "imgUrl": "string",
          "latitude": 0.1,
          "longitude": 0.1
        }
      ]
    }
    ```

</details> <details> <summary><strong>🏠 조건 검색</strong> <code>GET</code></summary>

- API Path: /api/v1/houses/condition-list

- 설명: 조건 기반 아파트 필터링
  ## HouseListByCondition Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "page": number,
    "size": number,
    "guCode": "string",
    "dongCode": "string",
    "sortBy": "string"  // e.g. "buildYear" 또는 "bookmark"
  }
  ```
  ## HouseListByCondition Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "dtoList": [
      {
        "aptSeq": "string",
        "umdNm": "string",
        "jibun": "string",
        "aptNm": "string",
        "buildYear": number,
        "latitude": number,
        "longitude": number,
        "imgUrl": "string"
      }
    ],
    "pageNumList": [number],
    "pageRequestDTO": {
      "page": number,
      "size": number
    },
    "prev": boolean,
    "next": boolean,
    "totalCount": number,
    "prevPage": number,
    "nextPage": number,
    "totalPage": number,
    "current": number
  }
  ```

</details> <details> <summary><strong>🏠 아파트 요약</strong> <code>GET</code></summary>

- API Path: /api/v1/Ai/summary/{aptSeq}

- 설명: AI 기반 아파트 요약
  ## HouseSummary Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "aptSeq": "string",
    "umdNm": "string",
    "roadNm": "string",
    "aptNm": "string",
    "jibun": "string",
    "buildYear": number,
    "commercialInfo": "string"
  }
  ```
  ## HouseSummary Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```
</details>
💰 실거래
<details> <summary><strong>💰 최신 거래 리스트 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/deals/latest-list/{aptSeq}

- 설명: 최신 거래 리스트
  ## LatestDealList Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "aptSeq": "string",
    "limit": number
  }
  ```
  ---
  ## LatestDealList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": [
      {
        "dealDate": "string",
        "floor": "string",
        "exclusiveAr": "string",
        "dealAmount": "string"
      }
    ]
  }
  ```
</details> <details> <summary><strong>💰 금년도 광역시별 거래량 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/deals/amountStatResponseList

- 설명: 금액별 통계
  ## AmountStatCntResponseList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": {
      "seoul": 0.1,
      "busan": 0.1,
      "ulsan": 0.1,
      "daegu": 0.1,
      "incheon": 0.1,
      "gwangju": 0.1,
      "daejeon": 0.1
    }
  }
  ```

</details> <details> <summary><strong>💰 실거래 리스트</strong> <code>GET</code></summary>

- API Path: /api/v1/deals/list/{aptSeq}

- 설명: 실거래 상세 리스트
  ## DealListByAptSeq Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "page": number,
    "size": number,
    "aptSeq": "string"
  }
  ```
  ---
  ## DealListByAptSeq Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "dtoList": [
      {
        "dealDate": "string",
        "floor": "string",
        "exclusiveAr": "string",
        "dealAmount": "string"
      }
    ],
    "pageNumList": [number],
    "pageRequestDTO": {
      "page": number,
      "size": number
    },
    "prev": boolean,
    "next": boolean,
    "totalCount": number,
    "prevPage": number,
    "nextPage": number,
    "totalPage": number,
    "current": number
  }
  ```
</details>
💬 리뷰
<details> <summary><strong>💬 리뷰 작성</strong> <code>POST</code></summary>

- API Path: /api/v1/reviews/reviewInsert

- 설명: 새 리뷰 등록
  ## ReviewInsert Request
  ### Header
  ```json
  {
    "Authorization": "Bearer {accessToken}"
  }
  ```
  ### Body
  ```json
  {
    /* ReviewSaveVo 필드들 */
      memberUuid: String 
      aptSeq: String                          
      content: String                      
      createdAt: LocalDateTime 
      updatedAt: LocalDateTime 
  }
  ```
  ---
  ## ReviewInsert Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```
</details> <details> <summary><strong>💬 리뷰 수정</strong> <code>PATCH</code></summary>

- API Path: /api/v1/reviews/reviewUpdate

- 설명: 기존 리뷰 수정
  ## ReviewUpdate Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "reviewId": number,
    "content": "string",
    "memberUuid": "string",
    "aptSeq": "string",
    "createdAt": "string",   // ISO 8601 date-time, optional
    "updatedAt": "string"    // ISO 8601 date-time, optional
  }
  ```
  ## ReviewUpdate Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```

</details> <details> <summary><strong>💬 리뷰 삭제</strong> <code>DELETE</code></summary>

- API Path: /api/v1/reviews/{reviewId}

- 설명: 작성된 리뷰 삭제
  ## ReviewDelete Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "reviewId": "string"
  }
  ```
  ---
  ## ReviewDelete Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```

</details> <details> <summary><strong>💬 아파트 리뷰 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/reviews/{aptSeq}

- 설명: 해당 아파트 리뷰 조회
  ## HouseAptReviewSimple Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "page": number,
    "size": number,
    "aptSeq": "string"
  }
  ```
  ---
  ## HouseAptReviewSimple Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "dtoList": [
      {
        "memberName": "string",
        "content": "string",
        "updatedAt": "string"
      }
    ],
    "pageNumList": [number],
    "pageRequestDTO": {
      "page": number,
      "size": number
    },
    "prev": boolean,
    "next": boolean,
    "totalCount": number,
    "prevPage": number,
    "nextPage": number,
    "totalPage": number,
    "current": number
  }
  ```
  ## 

</details> <details> <summary><strong>💬 회원 리뷰 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/reviews/{memberUuid}/{aptSeq}

- 설명: 회원이 작성한 리뷰 조회
  ## ReviewList Request
  ### Header

  ```json
  {}
  ```
  ### Param
  
  ```json
  {
    "memberUuid": "string",
    "aptSeq": "string",
    "page": number,
    "size": number
  }
  ```
  ---
  ## ReviewList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "dtoList": [
      {
        "reviewId": number,
        "memberUuid": "string",
        "memberName": "string",
        "content": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "pageNumList": [number],
    "pageRequestDTO": {
      "page": number,
      "size": number
    },
    "prev": boolean,
    "next": boolean,
    "totalCount": number,
    "prevPage": number,
    "nextPage": number,
    "totalPage": number,
    "current": number
  }
  ```
  
</details>
⭐ 즐겨찾기 (북마크)
<details> <summary><strong>⭐ 즐겨찾기 여부 확인</strong> <code>GET</code></summary>

- API Path: /api/v1/bookmarks/check

- 설명: 즐겨찾기 여부 확인
  ## BookmarkCheck Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "aptSeq": "string",
    "memberUuid": "string"
  }
  ```
  ---
  ## BookmarkCheck Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": true
  }
  ```
</details> <details> <summary><strong>⭐ 즐겨찾기 삭제</strong> <code>DELETE</code></summary>

- API Path: /api/v1/bookmarks/{bookmarkId}

- 설명: 즐겨찾기 삭제
  ## BookmarkDelete Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "bookmarkId": "string"
  }
  ```
  ## BookmarkDelete Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```

</details> <details> <summary><strong>⭐ 즐겨찾기 수 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/bookmarks/getBookmarkCnt/{aptSeq}

- 설명: 해당 아파트 즐겨찾기 수
  ## BookmarkCount Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "aptSeq": "string"
  }
  ```
  ---
  ## BookmarkCount Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": number,
    "result": number
  }
  ```

</details> <details> <summary><strong>⭐ 즐겨찾기 토글</strong> <code>PATCH</code></summary>

- API Path: /api/v1/bookmarks/toggle/{memberUuid}

- 설명: 즐겨찾기 추가/제거
  ## FavoriteToggle Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "memberUuid": "string",
    "aptSeq": "string"
  }
  ```
  ---
  ## FavoriteToggle Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": "string"
  }
  ```
  
</details> <details> <summary><strong>⭐ 즐겨찾기 목록</strong> <code>GET</code></summary>

- API Path: /api/v1/bookmarks/list/{memberUuid}

- 설명: 회원 즐겨찾기 목록
  ## BookmarkList Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "memberUuid": "string"
  }
  ```
  ---
  ## BookmarkList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": number,
    "result": [
      {
        "bookmarkId": number,
        "memberUuid": "string",
        "memberName": "string",
        "aptSeq": "string",
        "aptName": "string",
        "createdAt": "string",   // ISO 8601 date-time
        "updatedAt": "string"    // ISO 8601 date-time
      }
    ]
  }
  ```

</details>
📌 검색 캐시
<details> <summary><strong>📌 최근 검색어 등록</strong> <code>POST</code></summary>

- API Path: /api/v1/cache/search/word

- 설명: 검색어를 캐시에 등록
  ## CacheSearchRequest
  ### Header
  ```json
  {
  	"Authorization": accessToekn;
  }
  ```
  ### Param
  ```json
  {
  	
  }
  ```
  ### Body
  ```json
  {
  	searchWord: string;
  }
  ```
</details> <details> <summary><strong>📌 최근 검색어 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/cache/search/list

- 설명: 검색어 목록 조회
  ## SearchList Request
  ### Header
  ```json
  {
    "Authorization": "Bearer {accessToken}"
  }
  ```
  ### Param
  ```json
  {
    "userId": "string"
  }
  ```
  ---
  ## SearchList Response
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "userId": "string"
  }
  ```
  ### Body
  ```json
  [
    {
      "searchWord": "string"
    }
  ]
  ```

</details> <details> <summary><strong>📌 검색어 삭제</strong> <code>DELETE</code></summary>

- API Path: /api/v1/cache/search/words

- 설명: 저장된 검색어 삭제
  ## DeleteWords Request
  ### Header
  ```json
  {
    "Authorization": "Bearer {accessToken}"
  }
  ```
  ### Param
  ```json
  {
    "userId": "string"
  }
  ```
  ---

</details> <details> <summary><strong>📌 검색어 개별 삭제</strong> <code>DELETE</code></summary>

- API Path: /api/v1/cache/search/word/{searchWord}

- 설명: 저장된 검색어 삭제
  ## DeleteWord Request
  ### Header
  ```json
  {
  "Authorization": "Bearer {accessToken}"
  }
  ```
  ### Param
  ```json
  {
  "userId": "string",
  "searchWord": "string"
  }
  ```
  ---
  
</details> <details> <summary><strong>📌 최근 아파트 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/cache/recent-view-houses

- 설명: 최근 본 아파트 조회
  ## Recent View Houses Response 
  ### Header
  ```json
  {
  }
  ```
  ### Param
  
  ```json
  {
  }
  ```
  ### Body
  ```json
  {
  	res: list;
  }
  ```

</details>
🛍 상권 및 주소
<details> <summary><strong>🛍 반경 내 상권</strong> <code>GET</code></summary>

- API Path: /api/v1/Commercials/radius

- 설명: 반경 내 상권 조회
  ## CommercialRadius Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "cx": number,
    "cy": number,
    "radius": number
  }
  ```
  ---
  ## CommercialRadius Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  [
    {
      "description": "string",
      "columns": "string",
      "resultCode": "string",
      "resultMsg": "string",
      "trarNo": "string",
      "mainTrarNm": "string",
      "ctrprvnCd": "string",
      "ctrprvnNm": "string",
      "signguCd": "string",
      "signguNm": "string",
      "trarArea": "string",
      "coordNum": "string",
      "coords": "string",
      "stdrt": "string"
    }
  ]
  ```

</details> <details> <summary><strong>🛍 상권 업종 통계</strong> <code>GET</code></summary>

- API Path: /api/v1/Commercials/stat

- 설명: 상권 업종별 통계
  ## CommercialStat Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "cx": number,
    "cy": number,
    "radius": number
  }
  ```
  ---
  ## CommercialStat Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": {
      "categoryCountMap": {
        "additionalProp1": number,
        "additionalProp2": number,
        "additionalProp3": number
      }
    }
  }
  ```
  

</details> <details> <summary><strong>🛍 상권별 업종 리스트</strong> <code>GET</code></summary>

- API Path: /api/v1/Commercials/storeListInArea/{branch}

- 설명: 상권별 업종 리스트
  ## StoreListInArea Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "trarNo": "string"
  }
  ```
  ---
  ## StoreListInArea Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  [
    {
      "bizesId": "string",
      "bizesNm": "string",
      "brchNm": "string",
      "indstClsfCd": "string",
      "indstClsfNm": "string",
      "indstMclsCd": "string",
      "indstMclsNm": "string",
      "indstSclsCd": "string",
      "indstSclsNm": "string",
      "ksicCd": "string",
      "ksicNm": "string",
      "lon": "string",
      "lat": "string"
    }
  ]
  ```

</details> <details> <summary><strong>🛍 시 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/addresses/getCityList

- 설명: 시 리스트 조회
  ## CityList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": [
      {
        "adressSeq": "string",
        "citySeq": "string",
        "guSeq": "string",
        "dongSeq": "string",
        "cityName": "string",
        "guName": "string",
        "dongName": "string"
      }
    ]
  }
  ```
</details> <details> <summary><strong>🛍 구 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/addresses/getGuList/{citySeq}

- 설명: 구 리스트 조회
  ## GuList Request
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "citySeq": "string"
  }
  ```
  ---
  ## GuList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": [
      {
        "adressSeq": "string",
        "citySeq": "string",
        "guSeq": "string",
        "dongSeq": "string",
        "cityName": "string",
        "guName": "string",
        "dongName": "string"
      }
    ]
  }
  ```

</details> <details> <summary><strong>🛍 동 조회</strong> <code>GET</code></summary>

- API Path: /api/v1/addresses/getDongList/{citySeq}

- 설명: 동 리스트 조회
  ## DongList Request
  ```
  ### Header
  ```json
  {}
  ```
  ### Param
  ```json
  {
    "citySeq": "string",
    "guSeq": "string"
  }
  ```
  ---
  ## DongList Response
  ### Header
  ```json
  {}
  ```
  ### Body
  ```json
  {
    "httpStatus": {
      "error": true,
      "is4xxClientError": true,
      "is5xxServerError": true,
      "is1xxInformational": true,
      "is2xxSuccessful": true,
      "is3xxRedirection": true
    },
    "isSuccess": true,
    "message": "string",
    "code": 1073741824,
    "result": [
      {
        "adressSeq": "string",
        "citySeq": "string",
        "guSeq": "string",
        "dongSeq": "string",
        "cityName": "string",
        "guName": "string",
        "dongName": "string"
      }
    ]
  }
  ```

</details>


## **🖥️ 주요 기능**

## 🏠**메인 페이지(Web)**

| ![메인 화면](https://github.com/user-attachments/assets/c87a260f-313d-4881-a88b-393c579ec718)|
| --- |
| **메인 화면** <br> 서비스의 첫 진입 페이지로, 로그인, 검색, 최근 검색 기록, 뉴스 기능 등의 카테고리를 사용할 수 있습니다. |

### 🔐 **로그인 기능**

| ![로그인 화면](https://github.com/user-attachments/assets/0acba9d6-ef6d-4724-ba9c-bb60b4ae25cc) |![회원가입 화면](https://github.com/user-attachments/assets/691c147e-e603-4883-a207-331550f5dd12)|
| --- | --- |
| **로그인 화면** <br> 로그인을 진행하며 회원가입 페이지로 이동 가능합니다. | **회원가입 화면** <br> 회원가입을 진행할 수 있습니다. |

### 🔎 **메인 화면 : 검색 기능**

| ![장소와 아파트 검색](https://github.com/user-attachments/assets/0059fba5-6bc4-4aa4-9fa4-391d4ec8b5f9) | ![최근 검색어 기능](https://github.com/user-attachments/assets/04cdc345-cdc3-4a95-a5c8-52a4464b3b4f)|
| --- | --- |
| **장소와 아파트 검색** <br> 장소와 아파트 토글 기능으로 사용자가 원하는 필터링 검색기능이 제공됩니다. | **최근 검색어 기능** <br> 최근에 검색한 내역을 저장합니다. 저장된 검색어는 UI 상단에 표시되며, 클릭 시 바로 재검색이 가능해 검색의 편의성을 높입니다. |

### 📊 **메인 화면 :** **사용자 편의 기능**

| ![광역시별 매물 통계](https://github.com/user-attachments/assets/45901d72-b444-4d65-aa0c-eedd03041868)|
| --- |
| **광역시별 매물 통계** <br> 당해 광역시별 매물 통계 데이터를 가져오며, 사용자는 매물 건수와 평균 매매가 를 확인할 수 있습니다. |
| ![오늘의 NEWS](https://github.com/user-attachments/assets/8f0be2de-b447-4c63-994e-55b008b411cd) |
| **오늘의 NEWS** <br> 해당 일자의 최신 뉴스를 사용자가 확인할 수 있는 기능입니다. 매일 업데이트 되는 뉴스 리스트를 통해 부동산 관련 정보에 빠르게 접근 할 수 있습니다. |
| ![최근 본 아파트](https://github.com/user-attachments/assets/ea253563-21ef-4311-bac0-7ad47611f776) |
| **최근 본 아파트**  <br> 
최근 본 아파트는 유지되며,사용자 편의를 위해 슬라이드 카드형 UI로 구성되어 있습니다. |

## 🗺️ **지도(Map)**

### 👤 **지도 :** **기본 UI**

| ![행정 지역 단위 경계 적용](https://github.com/user-attachments/assets/8603566c-feeb-49b2-b183-43575bee7e3a) |
| --- |
| **행정 지역 단위 경계 적용** <br> 지도의 가독성과 상호작 용성을 높이기 위한 기능으로, 사용자가 지도 위 행정 구역(시,군,구)에 커서를 올리거나 클릭할 때 해당 지역의 경계선이 시각적으로 표시됩니다. |
| ![행정 단위 검색](https://github.com/user-attachments/assets/a57419f4-90c8-4a81-ac9a-7e3dc0772bb3) |
| **행정 단위 검색** <br> 지도 상단의 행정단위 검색 UI를 통해 사용자가 관심 지역을 빠르게 탐색할 수 있습니다. |
| ![*검색된 아파트 마킹](https://github.com/user-attachments/assets/623aa89e-b3de-4001-93ca-06ca2f54a9b7) |
| **검색된 아파트 마킹** <br> 검색된 아파트의 마커를 클릭하면 해당 위치로 이동하며 상세 정보가 함께 표시됩니다. |
| ![맵 확대/축소, 스플릿 UI](https://github.com/user-attachments/assets/18a10b2c-a6f8-469b-a3da-0c94db677536) |
| **맵 확대/축소, 스플릿 UI**  <br> 
지도 확대/축소 기능과 리스트 연동형 스플릿 UI를 통해 직관적인 탐색 경험을 제공합니다. |

### 👤 **지도 :** **아파트 관련 핵심 기능**
|  |
| --- |
|![아파트 기준 검색기능](https://github.com/user-attachments/assets/ae34bec3-2f6b-4336-8a7c-3147924b35f8)|
| **아파트 기준 검색기능**  <br> 아파트 기준으로 지도 검색하며 유사한 아파트 내역을 조회할 수 있습니다. |
|![장소 기준 검색기능](https://github.com/user-attachments/assets/d69bc707-90d5-4ff5-b4dc-4e912acf345e)|
| **장소 기준 검색기능**  <br> 장소 기준으로 지도를 검색합니다. |
|![Map_DealListPagenation-ezgif com-speed](https://github.com/user-attachments/assets/a11008e0-c2b4-42bd-8625-60d6cf7e0030)|
| **실거래가 조회와 페이지네이션**  <br> 아파트에 등록된 실거래가 내역을 조회할 수 있으며 페이지네이션 기능이 적용되어 있습니다. |
| ![리뷰 등록 기능](https://github.com/user-attachments/assets/9ed9858c-c646-4177-92d6-3fd681aec4be) |
| **리뷰 등록 기능**  <br> 선택된 아파트의 리뷰 조회와 등록을 할 수 있습니다. 3일전에 등록된 경우 New UI가 활성화 됩니다. |
| ![AI 요약 리뷰 기능](https://github.com/user-attachments/assets/6cf27f44-541e-4bb3-8414-a7ad78e969c4) |
| **AI 요약 리뷰 기능**  <br> 선택한 아파트 정보를 기반으로 AI가 요약 리뷰를 자동 생성해 제공합니다. |
| ![즐겨 찾기 기능](https://github.com/user-attachments/assets/d39048f7-5740-47ab-8b0a-c47331948975) |
|  **즐겨 찾기 기능**  <br> 회원이 아파트를 즐겨찾기에 추가할 수 있으며, 아파트에 등록된 즐겨찾기 수를 집계합니다. |
| ![회원별 즐겨찾기 목록](https://github.com/user-attachments/assets/701c0365-5e4a-4c86-b605-60ef5d2c8f9c) |
|  **회원별 즐겨찾기 목록**  <br> 회원이 추가한 즐겨찾기 목록을 조회합니다. |

| ![아파트 이미지 호버 줌 기능](https://github.com/user-attachments/assets/0bde1996-4ffc-4f26-a787-2773ca9048aa)  |![선택 아파트의 상권 정보](https://github.com/user-attachments/assets/837fa512-52fe-42e9-bd26-31ec05121196) | ![유사 아파트 검색기능](https://github.com/user-attachments/assets/904063a9-fb89-446f-ac31-e1701cfb59cb)|
| --- | --- |--- |
|  **아파트 이미지 호버 줌 기능**  <br> 아파트 이미지에 커서를 두면 이미지를 확대하여 볼수 있습니다. | **선택 아파트의 상권 정보**<br> 선택된 아파트의 상권 정보를 원형 그래프로 제공합니다. | **유사 아파트 검색기능** <br> 기본적인 장소 기능 외에도 아파트 토글 선택 시, 검색어와 유사한 아파트 목록을 제공합니다. |
