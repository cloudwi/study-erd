# EveryTime

Spring Boot + React + MySQL 풀스택 애플리케이션

## 기술 스택

### Backend
- Spring Boot 4.0.0
- Java 17
- Spring Data JPA
- MySQL 8.0
- Gradle

### Frontend
- React 18
- Vite
- Nginx

### Infrastructure
- Docker
- Docker Compose

## 시작하기

### 사전 요구사항
- Docker
- Docker Compose

### 실행 방법

1. 전체 서비스 실행
```bash
docker compose up -d
```

2. 서비스 접속
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MySQL: localhost:3306

3. 로그 확인
```bash
docker-compose logs -f
```

4. 서비스 중지
```bash
docker-compose down
```

5. 볼륨 포함 완전 삭제
```bash
docker-compose down -v
```

## 개발 모드

### Backend 개발
```bash
./gradlew bootRun
```

### Frontend 개발
```bash
cd frontend
npm run dev
```

## 데이터베이스 정보

- Host: localhost
- Port: 3306
- Database: everytime
- Username: everytime
- Password: everytime
