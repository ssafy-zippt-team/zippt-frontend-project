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

- **담당**:  
- **이메일**: dylee@example.com

---

### 👤 허정현

<img src="https://github.com/user-attachments/assets/57ff48a5-61bc-42ca-b493-d5249e8e0531" width="140"/>

- **담당**:  
- **이메일**: hjh@example.com

---

### 👤 홍지훈

<img src="https://github.com/user-attachments/assets/45efa241-4c19-4431-a345-1cf5e8ccaff7" width="140"/>

- **담당**:  
- **이메일**: jh.hong@example.com

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
