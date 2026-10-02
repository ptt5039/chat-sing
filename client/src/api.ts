// Typed RPC client. Types come straight from `server/src/actions.ts` — no
// codegen. `import type` keeps the server runtime out of the client bundle.

import type { Actions } from "../../server/src/actions";
import { createActionClient } from "@hatch/space-sdk/client";

const rawApi = createActionClient<typeof Actions>();

const ERROR_TRANSLATIONS: Record<string, string> = {
  "Session expired.": "Phiên đăng nhập đã hết hạn.",
  "This session is no longer valid.": "Phiên đăng nhập không còn hợp lệ.",
  "Name or password is incorrect.": "Tên đăng nhập hoặc mật khẩu không đúng.",
  "That username is reserved.": "Tên đăng nhập này được dành riêng.",
  "That username is already in use. Sign in instead.": "Tên đăng nhập này đã được sử dụng. Hãy đăng nhập.",
  "That email is already attached to an account.": "Email này đã được liên kết với một tài khoản.",
  "Could not create your account.": "Không thể tạo tài khoản.",
  "This account has been deleted. An administrator can restore it.": "Tài khoản này đã bị xóa. Quản trị viên hệ thống có thể khôi phục.",
  "This account is locked by an administrator.": "Tài khoản này đã bị quản trị viên hệ thống khóa.",
  "That reset code is invalid or expired.": "Mã đặt lại không hợp lệ hoặc đã hết hạn.",
  "That confirmation code is invalid or expired.": "Mã xác nhận không hợp lệ hoặc đã hết hạn.",
  "Enter your current password.": "Hãy nhập mật khẩu hiện tại.",
  "Current password is incorrect.": "Mật khẩu hiện tại không đúng.",
  "Administrator access required.": "Cần quyền quản trị viên hệ thống.",
  "Super Admin access required.": "Cần quyền Siêu quản trị viên.",
  "Room not found.": "Không tìm thấy phòng.",
  "User not found.": "Không tìm thấy người dùng.",
  "That person is no longer in the room.": "Người này không còn trong phòng.",
  "You are not in this room.": "Bạn không ở trong phòng này.",
  "Join the room first.": "Hãy vào phòng trước.",
  "Join the room before managing its mic queue.": "Hãy vào phòng trước khi quản lý hàng chờ mic.",
  "Join the room before changing its chat background.": "Hãy vào phòng trước khi đổi nền trò chuyện.",
  "Join the room before managing its ban list.": "Hãy vào phòng trước khi quản lý danh sách cấm.",
  "Join the room before giving a heart.": "Hãy vào phòng trước khi tặng tim.",
  "Collaborator, room administrator, or owner access required.": "Cần quyền Cộng tác viên, Quản trị viên hoặc Chủ phòng.",
  "Collaborator, room administrator, owner, or system administrator access required.": "Cần quyền Cộng tác viên, Quản trị viên, Chủ phòng hoặc quản trị viên hệ thống.",
  "Collaborator or higher access required.": "Cần quyền Cộng tác viên trở lên.",
  "Room administrator or higher access required.": "Cần quyền Quản trị viên trở lên.",
  "Room administrator, owner, or system administrator access required.": "Cần quyền Quản trị viên, Chủ phòng hoặc quản trị viên hệ thống.",
  "Only room administrators and above can send photos.": "Chỉ Quản trị viên trở lên mới có thể gửi ảnh.",
  "A moderator has muted you in this room.": "Bạn đã bị quản trị viên tắt tiếng trong phòng này.",
  "A moderator has muted your microphone.": "Mic của bạn đã bị quản trị viên tắt.",
  "Visitors cannot send emoji or icons in chat.": "Khách vãng lai không thể gửi biểu tượng trong trò chuyện.",
  "This room is in Free Mode. Turn on your microphone directly.": "Phòng đang ở Chế Độ Tự Do. Hãy bật mic trực tiếp.",
  "Choose a person first.": "Hãy chọn một người trước.",
  "Unmute this person before adding them to the mic queue.": "Hãy bật tiếng cho người này trước khi thêm vào hàng chờ mic.",
  "Could not add that person to the queue.": "Không thể thêm người này vào hàng chờ.",
  "That person is not in the mic queue.": "Người này không ở trong hàng chờ mic.",
  "No one is currently up on mic.": "Hiện không có ai đang cầm mic.",
  "Join the queue and wait for your turn before starting the microphone.": "Hãy vào hàng chờ và đợi đến lượt trước khi bật mic.",
  "You cannot send a friend request to yourself.": "Bạn không thể gửi lời mời kết bạn cho chính mình.",
  "This friend request is no longer pending.": "Lời mời kết bạn này không còn chờ xử lý.",
  "You cannot ban yourself.": "Bạn không thể tự cấm mình.",
  "You cannot change your own room tier.": "Bạn không thể tự đổi cấp trong phòng.",
  "There is no singer to receive this gift.": "Hiện không có người hát để nhận quà.",
  "You cannot gift credits to yourself.": "Bạn không thể tự tặng tín dụng cho mình.",
  "You do not have enough credits.": "Bạn không có đủ tín dụng.",
  "There is no singer on mic right now.": "Hiện không có người hát đang cầm mic.",
  "You cannot give a heart to yourself.": "Bạn không thể tự tặng tim cho mình.",
  "You can own up to 10 rooms. Delete one of your rooms before creating another.": "Bạn chỉ có thể sở hữu tối đa 10 phòng. Hãy xóa một phòng trước khi tạo phòng mới.",
  "Could not create the room.": "Không thể tạo phòng.",
  "Only the room owner can change the room password.": "Chỉ Chủ phòng mới có thể đổi mật khẩu phòng.",
  "Enter the room password.": "Hãy nhập mật khẩu phòng.",
  "That room password is incorrect.": "Mật khẩu phòng không đúng.",
  "Enter the subroom password.": "Hãy nhập mật khẩu phòng nhỏ.",
  "That subroom password is incorrect.": "Mật khẩu phòng nhỏ không đúng.",
  "Join the main room before entering a subroom.": "Hãy vào phòng lớn trước khi vào phòng nhỏ.",
  "Join the main room before creating a subroom.": "Hãy vào phòng lớn trước khi tạo phòng nhỏ.",
  "Passwords are only available for subrooms.": "Chỉ phòng nhỏ mới có thể đặt mật khẩu.",
  "Only the subroom owner can change the subroom password.": "Chỉ chủ phòng nhỏ mới có thể đổi mật khẩu.",
  "This room can have up to 20 subrooms.": "Mỗi phòng lớn chỉ có thể có tối đa 20 phòng nhỏ.",
  "Parent room not found.": "Không tìm thấy phòng lớn.",
  "Could not create the subroom.": "Không thể tạo phòng nhỏ.",
  "The mic queue is temporarily paused.": "Hàng chờ mic đang tạm dừng.",
  "Queue controls are only available in Queue Mode.": "Điều khiển hàng chờ chỉ dùng được trong Chế Độ Xếp Hàng.",
  "Join the room before holding the microphone.": "Hãy vào phòng trước khi giữ micro.",
  "Mic hold is only available in Queue Mode.": "Chỉ có thể giữ micro trong Chế Độ Xếp Hàng.",
  "A moderator is holding the microphone.": "Quản trị viên đang giữ micro.",
  "That room no longer exists.": "Phòng này không còn tồn tại.",
  "You are banned from this room.": "Bạn đã bị cấm khỏi phòng này.",
  "Choose a valid JPEG, PNG, or WebP image under 7.5 MB.": "Hãy chọn ảnh JPEG, PNG hoặc WebP hợp lệ dưới 7,5 MB.",
  "Choose a valid JPG, PNG, or WebP image under 7.5 MB.": "Hãy chọn ảnh JPG, PNG hoặc WebP hợp lệ dưới 7,5 MB.",
};

function vietnameseError(message: string) {
  return ERROR_TRANSLATIONS[message] ?? "Không thể hoàn tất thao tác. Vui lòng thử lại.";
}

export const api = new Proxy(rawApi, {
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    if (typeof value !== "function") return value;
    return async (...args: unknown[]) => {
      const result: unknown = await value.apply(target, args);
      if (result && typeof result === "object" && "error" in result && typeof result.error === "string") {
        return { ...result, error: vietnameseError(result.error) };
      }
      return result;
    };
  },
}) as typeof rawApi;

export type { ApiRequest, ApiResponse } from "@hatch/space-sdk/client";
