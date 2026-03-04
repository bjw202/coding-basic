11회차: AWS EC2 배포 올코스
학습 목표
AWS EC2 인스턴스 생성 및 설정
SSH를 통한 서버 접속 및 관리
Nginx 리버스 프록시 설정
Let's Encrypt SSL 인증서 적용
PM2를 활용한 Node.js 프로세스 관리
S3를 활용한 정적 파일 관리
1. AWS 기초 개념
1.1 AWS 주요 서비스
┌─────────────────────────────────────────────────────────┐
│                    AWS 주요 서비스                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   컴퓨팅                                                │
│   ├── EC2: 가상 서버 (Virtual Machine)                  │
│   ├── Lambda: 서버리스 함수                             │
│   └── ECS/EKS: 컨테이너 오케스트레이션                   │
│                                                         │
│   스토리지                                              │
│   ├── S3: 객체 스토리지 (파일 저장)                      │
│   ├── EBS: 블록 스토리지 (EC2 디스크)                    │
│   └── EFS: 파일 시스템                                  │
│                                                         │
│   데이터베이스                                           │
│   ├── RDS: 관계형 DB (MySQL, PostgreSQL)                │
│   ├── DynamoDB: NoSQL                                   │
│   └── ElastiCache: Redis/Memcached                     │
│                                                         │
│   네트워킹                                              │
│   ├── VPC: 가상 네트워크                                │
│   ├── Route 53: DNS 서비스                              │
│   ├── CloudFront: CDN                                  │
│   └── ELB: 로드 밸런서                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.2 AWS 리전과 가용 영역
┌─────────────────────────────────────────────────────────┐
│                   리전 (Region)                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   서울 리전 (ap-northeast-2)                            │
│   ├── 가용 영역 2a (AZ-a)                               │
│   ├── 가용 영역 2b (AZ-b)                               │
│   ├── 가용 영역 2c (AZ-c)                               │
│   └── 가용 영역 2d (AZ-d)                               │
│                                                         │
│   선택 기준:                                            │
│   • 사용자와 가까운 리전 선택 (지연 시간)                │
│   • 한국 서비스 → ap-northeast-2 (서울)                 │
│   • 일본 서비스 → ap-northeast-1 (도쿄)                 │
│                                                         │
└─────────────────────────────────────────────────────────┘

클릭하여 복사
복사
1.3 AWS 프리 티어
무료 사용 가능 (12개월):
┌────────────────────────────────────────┐
│ EC2     │ t2.micro 750시간/월         │
│ RDS     │ db.t2.micro 750시간/월      │
│ S3      │ 5GB 스토리지               │
│ Lambda  │ 100만 요청/월              │
│ CloudFront │ 50GB 전송/월            │
└────────────────────────────────────────┘

※ 프리 티어 초과 시 요금 발생 주의!
※ 예산 알림 설정 권장

클릭하여 복사
복사
2. EC2 인스턴스 생성
2.1 AWS 콘솔에서 EC2 생성
1. AWS 콘솔 로그인
   https://console.aws.amazon.com

2. EC2 대시보드 이동
   서비스 → EC2 → 인스턴스 시작

3. 이름 및 태그
   Name: my-web-server

4. AMI 선택 (운영체제)
   ✓ Ubuntu Server 24.04 LTS (프리 티어 사용 가능)
   또는
   ✓ Amazon Linux 2023

5. 인스턴스 유형
   ✓ t2.micro (프리 티어)
   또는
   ✓ t3.micro (성능 향상)

6. 키 페어 생성
   • 새 키 페어 생성 클릭
   • 이름: my-key
   • 유형: RSA
   • 형식: .pem (Linux/Mac) 또는 .ppk (Windows PuTTY)
   • 다운로드하여 안전하게 보관!

7. 네트워크 설정
   • VPC: 기본 VPC
   • 서브넷: 기본
   • 퍼블릭 IP 자동 할당: 활성화

8. 보안 그룹 설정
   • 보안 그룹 이름: my-web-sg
   • 규칙:
     - SSH (22): 내 IP
     - HTTP (80): 모든 곳 (0.0.0.0/0)
     - HTTPS (443): 모든 곳 (0.0.0.0/0)
     - Custom (3000): 모든 곳 (개발용, 나중에 제거)

9. 스토리지
   • 기본 8GB → 20GB로 변경 (프리 티어 30GB까지 무료)

10. 인스턴스 시작

클릭하여 복사
복사
2.2 탄력적 IP (Elastic IP) 연결
※ 인스턴스 재시작 시 IP가 바뀌지 않도록 고정 IP 할당

1. EC2 대시보드 → 탄력적 IP
2. 탄력적 IP 주소 할당
3. 할당된 IP 선택 → 작업 → 탄력적 IP 주소 연결
4. 인스턴스 선택 → 연결

※ 탄력적 IP는 사용 중일 때 무료
※ 연결하지 않으면 요금 발생!

클릭하여 복사
복사
3. SSH 접속 및 서버 설정
3.1 SSH 접속
# 키 파일 권한 설정 (최초 1회)
chmod 400 ~/Downloads/my-key.pem

# SSH 접속
ssh -i ~/Downloads/my-key.pem ubuntu@<EC2-IP>

# 예시
ssh -i ~/Downloads/my-key.pem ubuntu@15.165.64.164

# 자주 접속하는 경우 SSH 설정 추가
# ~/.ssh/config
Host vibeclass
    HostName 15.165.64.164
    User ubuntu
    IdentityFile ~/Downloads/my-key.pem

# 이후 간단하게 접속
ssh vibeclass

복사
3.2 기본 서버 설정
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 필수 패키지 설치
sudo apt install -y curl git build-essential

# 시간대 설정
sudo timedatectl set-timezone Asia/Seoul

# 스왑 메모리 설정 (t2.micro의 1GB 메모리 보완)
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 확인
free -h

복사
3.3 Node.js 설치
# NVM 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 셸 재시작 또는
source ~/.bashrc

# Node.js 20 LTS 설치
nvm install 20
nvm use 20
nvm alias default 20

# 확인
node -v
npm -v

복사
4. 애플리케이션 배포
4.1 Git으로 코드 가져오기
# 홈 디렉토리로 이동
cd ~

# 프로젝트 클론
git clone https://github.com/username/my-project.git
cd my-project

# 의존성 설치
npm install

# 환경 변수 설정
nano .env.local

# 빌드
npm run build

복사
4.2 환경 변수 설정
# .env.local 또는 .env.production.local
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"
KAKAO_CLIENT_ID="your-kakao-client-id"
KAKAO_CLIENT_SECRET="your-kakao-client-secret"

복사
4.3 PM2로 프로세스 관리
# PM2 전역 설치
npm install -g pm2

# 애플리케이션 시작
pm2 start npm --name "my-app" -- start

# 또는 ecosystem 파일 사용
# ecosystem.config.js 생성

복사
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'my-app',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/my-project',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};

복사
# ecosystem 파일로 시작
pm2 start ecosystem.config.js

# PM2 명령어
pm2 list                    # 프로세스 목록
pm2 logs my-app             # 로그 확인
pm2 logs my-app --lines 100 # 최근 100줄
pm2 monit                   # 모니터링 대시보드
pm2 restart my-app          # 재시작
pm2 stop my-app             # 중지
pm2 delete my-app           # 삭제

# 시스템 시작 시 자동 실행 설정
pm2 startup
pm2 save

# 현재 상태 저장 (재부팅 후 복원)
pm2 save

복사
5. Nginx 리버스 프록시
5.1 Nginx 설치
# Nginx 설치
sudo apt install -y nginx

# 상태 확인
sudo systemctl status nginx

# 시작/중지/재시작
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx  # 설정만 다시 로드

# 부팅 시 자동 시작
sudo systemctl enable nginx

복사
5.2 Nginx 설정
# 기본 설정 백업
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup

# 새 설정 파일 생성
sudo nano /etc/nginx/sites-available/my-app

복사
# /etc/nginx/sites-available/my-app

# HTTP → HTTPS 리다이렉트
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS 서버
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL 설정 (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL 보안 설정
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;

    # 로그
    access_log /var/log/nginx/my-app.access.log;
    error_log /var/log/nginx/my-app.error.log;

    # 프록시 설정
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 타임아웃 설정
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 정적 파일 캐싱
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    # 이미지 캐싱
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # 보안 헤더
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 파일 업로드 크기 제한
    client_max_body_size 10M;
}

복사
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# 기본 설정 제거 (선택사항)
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl reload nginx

복사
6. SSL 인증서 (Let's Encrypt)
6.1 Certbot 설치
# Certbot 및 Nginx 플러그인 설치
sudo apt install -y certbot python3-certbot-nginx

복사
6.2 인증서 발급
# DNS 설정이 완료되어 있어야 함!
# 도메인이 EC2 IP를 가리키는지 확인
nslookup yourdomain.com

# 인증서 발급 (Nginx 자동 설정)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 이메일 입력 및 약관 동의 후 진행
# 성공 시 인증서 경로 출력됨

# 인증서 확인
sudo certbot certificates

# 인증서 위치
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem

복사
6.3 자동 갱신 설정
# 자동 갱신 테스트
sudo certbot renew --dry-run

# Certbot은 자동으로 cron/systemd 타이머 설정
# 확인
sudo systemctl list-timers | grep certbot

# 수동 갱신이 필요한 경우
sudo certbot renew

복사
7. 보안 설정
7.1 방화벽 (UFW)
# UFW 설치 및 설정
sudo apt install -y ufw

# 기본 정책 설정
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 허용할 포트
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# UFW 활성화
sudo ufw enable

# 상태 확인
sudo ufw status verbose

복사
7.2 SSH 보안 강화
# SSH 설정 편집
sudo nano /etc/ssh/sshd_config

# 권장 설정
Port 22                         # 또는 다른 포트로 변경
PermitRootLogin no              # 루트 로그인 비활성화
PasswordAuthentication no        # 비밀번호 인증 비활성화 (키만 허용)
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# SSH 재시작
sudo systemctl restart sshd

복사
7.3 Fail2ban 설치
# Fail2ban 설치 (SSH 무차별 대입 공격 방지)
sudo apt install -y fail2ban

# 설정 복사
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# 설정 편집
sudo nano /etc/fail2ban/jail.local

복사
# /etc/fail2ban/jail.local
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

복사
# Fail2ban 재시작
sudo systemctl restart fail2ban

# 상태 확인
sudo fail2ban-client status sshd

복사
8. AWS S3 정적 파일 관리
8.1 S3 버킷 생성
AWS 콘솔에서:

1. S3 → 버킷 만들기
2. 버킷 이름: my-app-assets (고유해야 함)
3. 리전: 서울 (ap-northeast-2)
4. 퍼블릭 액세스 차단: 해제 (정적 파일 공개용)
5. 버킷 만들기

버킷 정책 설정:
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-app-assets/*"
        }
    ]
}

클릭하여 복사
복사
8.2 AWS CLI 설정
# AWS CLI 설치
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# IAM 사용자 생성 (AWS 콘솔에서)
# → 프로그래밍 방식 액세스 → S3 권한 부여
# → 액세스 키 ID / 비밀 액세스 키 발급

# AWS CLI 설정
aws configure
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ...
# Default region name: ap-northeast-2
# Default output format: json

# 확인
aws s3 ls

복사
8.3 파일 업로드
# 단일 파일 업로드
aws s3 cp ./image.jpg s3://my-app-assets/images/

# 디렉토리 동기화
aws s3 sync ./public s3://my-app-assets/public/

# 삭제된 파일도 동기화
aws s3 sync ./public s3://my-app-assets/public/ --delete

# 특정 파일 타입만
aws s3 sync ./public s3://my-app-assets/public/ --exclude "*" --include "*.jpg" --include "*.png"

복사
8.4 Next.js에서 S3 사용
// lib/s3.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  file: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

복사
9. 배포 자동화 스크립트
9.1 배포 스크립트
#!/bin/bash
# deploy.sh

set -e  # 오류 시 중단

echo "🚀 배포 시작..."

# 프로젝트 디렉토리
APP_DIR="/home/ubuntu/my-project"
cd $APP_DIR

# Git 최신 코드
echo "📦 코드 업데이트..."
git pull origin main

# 의존성 설치
echo "📚 의존성 설치..."
npm ci

# Prisma 클라이언트 생성
echo "🗄️ Prisma 생성..."
npx prisma generate

# 빌드
echo "🔨 빌드 중..."
npm run build

# PM2 재시작
echo "🔄 서버 재시작..."
pm2 restart my-app

echo "✅ 배포 완료!"

복사
# 실행 권한 부여
chmod +x deploy.sh

# 실행
./deploy.sh

복사
9.2 로컬에서 원격 배포
# 로컬 컴퓨터에서 실행
ssh vibeclass "cd ~/my-project && git pull && npm ci && npm run build && pm2 restart my-app"

# 또는 스크립트 파일로
ssh vibeclass "./deploy.sh"

복사
10. 모니터링 및 로그
10.1 시스템 모니터링
# 디스크 사용량
df -h

# 메모리 사용량
free -h

# CPU 및 프로세스
htop

# 네트워크 연결
netstat -tuln
ss -tuln

# 포트 사용 확인
sudo lsof -i :3000

복사
10.2 로그 확인
# PM2 로그
pm2 logs my-app
pm2 logs my-app --lines 500

# Nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 시스템 로그
sudo tail -f /var/log/syslog

# 특정 시간대 로그
sudo journalctl --since "1 hour ago"
sudo journalctl -u nginx --since today

복사
10.3 PM2 모니터링
# 실시간 대시보드
pm2 monit

# 웹 대시보드 (선택사항)
pm2 plus  # PM2 Plus 계정 필요

# 상태 저장
pm2 save

# 로그 관리
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

복사
정리
배포 체크리스트
□ EC2 인스턴스 생성
  □ Ubuntu 24.04 LTS
  □ 보안 그룹 설정 (22, 80, 443)
  □ 탄력적 IP 연결

□ 서버 초기 설정
  □ 시스템 업데이트
  □ 스왑 메모리 설정
  □ Node.js 설치 (NVM)

□ 애플리케이션 배포
  □ Git 클론
  □ 환경 변수 설정
  □ 빌드
  □ PM2 설정

□ Nginx 설정
  □ 리버스 프록시 설정
  □ SSL 인증서 (Let's Encrypt)

□ 보안
  □ UFW 방화벽
  □ SSH 보안 강화
  □ Fail2ban

클릭하여 복사
복사
핵심 명령어
# SSH 접속
ssh -i key.pem ubuntu@<IP>

# PM2
pm2 start/stop/restart/logs

# Nginx
sudo nginx -t && sudo systemctl reload nginx

# 인증서
sudo certbot --nginx -d domain.com
sudo certbot renew

# 배포
git pull && npm ci && npm run build && pm2 restart app

복사
다음 단계
12회차에서는 GitHub Actions CI/CD와 Vercel/Cloudflare 배포를 배웁니다