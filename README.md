# 무이담(MUIDAM) 브랜드 사이트

React 19 + Vite + Tailwind CSS 4로 만든 원페이지 브랜드 사이트입니다.

## 내 컴퓨터에서 실행하기

```bash
npm install      # 처음 한 번
npm run dev      # http://localhost:5173 에서 미리보기
npm run build    # 배포용 파일을 dist/ 폴더에 생성
```

## 자주 고치는 곳 (모두 `src/App.jsx` 맨 위)

| 항목 | 상수 이름 | 비고 |
|---|---|---|
| 고객센터 전화·메일·운영시간 | `CONTACT` | 푸터와 구매 문의 메일에 함께 쓰임 |
| 사업자 정보 | `BUSINESS_INFO` | 값을 채운 항목만 푸터에 표시됨 |
| 제품 목록 | `PRODUCTS` | `url`에 상품 페이지 주소를 넣으면 '자세히 보기'가 그쪽으로 연결됨. 비워두면 구매 문의 메일 창이 열림 |
| 스타일 찾기 질문 | `PREFERENCES` | `recommend`에 추천할 제품 `id` |
| 메뉴 | `NAV_ITEMS` | 헤더·모바일·푸터 메뉴에 공통 적용 |

검색·공유 미리보기 문구(제목, 설명, OG 태그)는 `index.html`에 있습니다.

## 수정 내용 반영(배포)하기

```bash
git add -A
git commit -m "수정 내용 요약"
git push
```

Vercel·Netlify 같은 호스팅이 이 GitHub 저장소에 연결되어 있다면 push만으로 자동 배포됩니다.
