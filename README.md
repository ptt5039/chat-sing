# Chat Sing

Ứng dụng web chat + voice (hát/karaoke) theo phòng, xây bằng React + TypeScript + SQLite (Drizzle ORM).

## Tính năng chính

- Phòng chat theo thời gian thực, mic queue (xếp hàng lên mic) và chế độ tự do
- Phân quyền phòng: Chủ phòng (áo đen), Quản trị viên (áo cam), Cộng tác viên (áo xanh lá), VIP (áo tím), Thành viên (áo xanh dương), Khách (áo xám)
- Admin/SuperAdmin toàn hệ thống (áo đỏ), dashboard quản trị, nhật ký hoạt động
- Kết bạn, ban khỏi phòng, báo cáo vi phạm, ticket hỗ trợ
- Tặng credit, mua credit (PayPal — cần cấu hình merchant)
- Giao diện tiếng Việt

## Chạy local

```bash
bun install
bun run dev
```

> Không commit `app.db`, `blobs/`, `node_modules/` lên git.
