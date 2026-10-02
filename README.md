# Chat Sing

Ứng dụng web chat + voice (hát/karaoke) theo phòng — React 19 + TypeScript + SQLite (Drizzle ORM).

## Tính năng chính

- Phòng chat thời gian thực, mic queue (xếp hàng lên mic) và chế độ tự do
- Phân quyền phòng: Chủ phòng (áo đen), Quản trị viên (áo cam), Cộng tác viên (áo xanh lá), VIP (áo tím), Thành viên (áo xanh dương), Khách (áo xám)
- Admin/SuperAdmin toàn hệ thống (áo đỏ), dashboard quản trị, nhật ký hoạt động
- Kết bạn, ban khỏi phòng, báo cáo vi phạm, ticket hỗ trợ
- Tặng credit, mua credit (PayPal — cần cấu hình merchant)
- Giao diện tiếng Việt

## Yêu cầu

- [Bun](https://bun.sh) 1.3.10 trở lên

## Setup & chạy

```bash
bun install
bun run build        # build server + client
bun run typecheck    # kiểm tra TypeScript (client + server)
```

Database là SQLite, schema và migrations nằm trong `drizzle/` (chạy từ `0001` tới file mới nhất theo thứ tự).

> **Lưu ý:** source này được tách ra từ một web artifact chạy trên nền tảng Muse (file `space.json`). Package `@hatch/space-sdk` là dependency nội bộ của môi trường đó (`file:/opt/hatch/...`), nên `bun install` ở máy ngoài sẽ báo lỗi thiếu package này. Muốn chạy độc lập cần thay thế lớp space-sdk bằng server HTTP tự viết (phục vụ `client/dist/` và gọi các action trong `server/src/actions.ts`).

## Cấu trúc

- `client/src/` — React app (điểm vào `main.tsx`, giao diện chính `App.tsx`)
- `server/src/` — `actions.ts` (logic server), `schema.ts` (Drizzle schema), `privileged.ts`
- `drizzle/` — SQL migrations cho SQLite
- `space.json` — cấu hình runtime của nền tảng Muse

Không commit `app.db`, `blobs/`, `node_modules/` lên git.
