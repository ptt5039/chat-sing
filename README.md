# Chat Sing

Ứng dụng web chat + voice (hát/karaoke) theo phòng — React 19 + TypeScript + SQLite (Drizzle ORM). Giao diện tiếng Việt.

## Tính năng chính

- Phòng chat thời gian thực, mic queue (xếp hàng lên mic) và chế độ tự do
- Phân quyền phòng: Chủ phòng (áo đen), Quản trị viên (áo cam), Cộng tác viên (áo xanh lá), VIP (áo tím), Thành viên (áo xanh dương), Khách (áo xám)
- Admin/SuperAdmin toàn hệ thống (áo đỏ), dashboard quản trị, nhật ký hoạt động
- Kết bạn, ban khỏi phòng, báo cáo vi phạm, ticket hỗ trợ
- Tặng credit, mua credit (PayPal — cần cấu hình merchant)

## 2 cách chạy

### Cách 1 — Standalone (khuyên dùng)

Server Bun độc lập trong thư mục `standalone/`, không cần nền tảng Muse.
Dùng source `server/src/actions.ts` nguyên vẹn, database SQLite local.

```bash
cd standalone
bun install
bun run start
```

Mở http://localhost:3000

- `PORT` — cổng HTTP (mặc định `3000`)
- `CHAT_SING_DATA` — thư mục chứa `app.db` và file upload (mặc định `./data`)

Lần chạy đầu tiên server tự tạo database và chạy toàn bộ migrations trong
`drizzle/` theo đúng thứ tự. Chi tiết xem `standalone/README.md`.

**Tạo tài khoản SuperAdmin đầu tiên:** sau khi mở web, gọi action
`bootstrapSuperadmin` (mở DevTools → Console):

```js
fetch("/actions", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ action: "bootstrapSuperadmin", args: { password: "mat-khau-manh" } })
}).then(r => r.json()).then(console.log)
```

Sau đó đăng nhập bằng username `superadmin`.

### Cách 2 — Source gốc (cần nền tảng Muse)

Source trong `client/`, `server/`, `drizzle/` là web artifact chạy trên nền
tảng Muse (`space.json`). Cần Bun 1.3.10+:

```bash
bun install
bun run build        # build server + client
bun run typecheck    # kiểm tra TypeScript
```

> **Lưu ý:** package `@hatch/space-sdk` là dependency nội bộ của môi trường
> Muse (`file:/opt/hatch/...`), nên `bun install` ở máy ngoài sẽ báo lỗi
> thiếu package này. Muốn chạy độc lập, dùng **Cách 1**.

## Cấu trúc repo

- `client/src/` — React app (điểm vào `main.tsx`, giao diện chính `App.tsx`)
- `server/src/` — `actions.ts` (toàn bộ logic server), `schema.ts` (Drizzle schema), `privileged.ts` (hash mật khẩu)
- `drizzle/` — SQL migrations cho SQLite (31 files)
- `standalone/` — server Bun chạy độc lập + client đã build
- `space.json` — cấu hình runtime của nền tảng Muse

Không commit `app.db`, `data/`, `blobs/`, `node_modules/` lên git.
