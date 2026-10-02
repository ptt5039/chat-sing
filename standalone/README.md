# Chat Sing — Standalone server

Chạy app chat-sing độc lập, không cần nền tảng Muse. Server Bun này thay thế
lớp `@hatch/space-sdk`: phục vụ client đã build sẵn (`public/`), xử lý
`POST /actions` đúng protocol client đang dùng, lưu SQLite local (`data/app.db`)
và file upload trên đĩa (`data/blobs/`).

Source `server/src/actions.ts` được dùng **nguyên vẹn** — shims trong `shims/`
chỉ chuyển hướng 2 import nội bộ (`@hatch/space-sdk`, `@space/privileged`).

## Yêu cầu

- [Bun](https://bun.sh) 1.3+

## Chạy

```bash
cd standalone
bun install
bun run start
```

Mở http://localhost:3000

Biến môi trường:

- `PORT` — cổng HTTP (mặc định `3000`)
- `CHAT_SING_DATA` — thư mục chứa `app.db` và `blobs/` (mặc định `./data`)

Lần chạy đầu tiên server tự tạo database và chạy toàn bộ migrations trong
`../drizzle/` theo đúng thứ tự.

Tài khoản đầu tiên: dùng action `bootstrapSuperadmin` (hoặc đăng ký user
thường rồi promote trong dashboard).

## Cấu trúc

- `server.ts` — HTTP server: static `public/`, `POST /actions`, `GET /blobs/*`
- `lib/sdk-shim.ts` — thay thế `@hatch/space-sdk` (defineAction, Ctx, privileged)
- `lib/db.ts` — SQLite (libsql file + drizzle-orm) + chạy migrations
- `lib/blobs.ts` — lưu file upload trên đĩa local
- `shims/` — packages giả cho `node_modules` (cài bằng `scripts/install-shims.mjs`)
- `public/` — client đã build (cần build lại mỗi khi `client/src` đổi)

## Build lại client

Client trong `public/` được build từ `client/src` bằng toolchain của nền tảng
Muse (cần `@hatch/space-sdk`). Khi code client thay đổi, build lại và copy
`client/dist/*` vào `public/`.
