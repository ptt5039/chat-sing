import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode, type TouchEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SafeAreaTopScrim, fileToBase64 } from "@hatch/space-sdk/client";
import { api, type ApiResponse } from "./api";
import kawaiiCatsWallpaper from "./assets/wallpapers/kawaii-cats.jpg";
import dreamyKittenWallpaper from "./assets/wallpapers/dreamy-kitten.jpg";
import pastelCloudsWallpaper from "./assets/wallpapers/pastel-clouds.jpg";
import pastelDaisiesWallpaper from "./assets/wallpapers/pastel-daisies.jpg";

const TOKEN_KEY = "radio-room-session";
type Locale = "en" | "vi";
type SupportedImageMime = "image/jpeg" | "image/png" | "image/webp";
type ReportAttachmentMime = SupportedImageMime | "image/gif" | "application/pdf" | "text/plain" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function isSupportedImageMime(value: string): value is SupportedImageMime {
  return value === "image/jpeg" || value === "image/png" || value === "image/webp";
}

function isReportAttachmentMime(value: string): value is ReportAttachmentMime {
  return isSupportedImageMime(value) || value === "image/gif" || value === "application/pdf" || value === "text/plain" || value === "application/msword" || value === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
}

function reportAttachmentMimeFor(file: File): ReportAttachmentMime | null {
  if (isReportAttachmentMime(file.type)) return file.type;
  const extension = file.name.toLowerCase().split(".").pop();
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "gif") return "image/gif";
  if (extension === "pdf") return "application/pdf";
  if (extension === "txt") return "text/plain";
  if (extension === "doc") return "application/msword";
  if (extension === "docx") return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return null;
}

function formatFileSize(bytes: number) {
  return bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`;
}

function twoDigits(value: number) {
  return value < 10 ? `0${value}` : String(value);
}

function formatDateTime(value: string, _locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return date.toLocaleString("vi-VN");
  }
}

function vietnameseRoomEvent(value: string) {
  const roleNames: Record<string, string> = {
    "mod1": "Mod 1 - Cộng tác viên",
    "Mod 1": "Mod 1 - Cộng tác viên",
    "Mod 1 - Collaborator": "Mod 1 - Cộng tác viên",
    "Mod 1 - Cộng tác viên": "Mod 1 - Cộng tác viên",
    "mod2": "VIP",
    "Mod 2": "VIP",
    "mod3": "Mod 3 - Quản trị viên",
    "Mod 3": "Mod 3 - Quản trị viên",
    "Mod 3 - Room administrator": "Mod 3 - Quản trị viên",
    "Mod 3 - Quản trị viên": "Mod 3 - Quản trị viên",
    "blackshirt": "Áo đen",
    "Black shirt": "Áo đen",
    "member": "Thành viên",
    "visitor": "Khách vãng lai",
  };
  const translatedRole = (role: string) => roleNames[role] ?? role;
  let match = value.match(/^(.+) joined\.$/);
  if (match) return `${match[1] ?? ""} đã vào phòng.`;
  match = value.match(/^(.+) promoted (.+) to (.+)\.$/);
  if (match) return `${match[1] ?? ""} đã thăng ${match[2] ?? ""} lên ${translatedRole(match[3] ?? "")}.`;
  match = value.match(/^(.+) demoted (.+) to (.+)\.$/);
  if (match) return `${match[1] ?? ""} đã hạ ${match[2] ?? ""} xuống ${translatedRole(match[3] ?? "")}.`;
  match = value.match(/^(.+) muted (.+)\.$/);
  if (match) return `${match[1] ?? ""} đã tắt tiếng ${match[2] ?? ""}.`;
  match = value.match(/^(.+) unmuted (.+)\.$/);
  if (match) return `${match[1] ?? ""} đã bật tiếng ${match[2] ?? ""}.`;
  match = value.match(/^(.+) removed (.+)\.$/);
  if (match) return `${match[1] ?? ""} đã mời ${match[2] ?? ""} ra khỏi phòng.`;
  return value;
}

function isDesktopViewport() {
  try {
    if (typeof window.matchMedia === "function") return window.matchMedia("(min-width: 780px)").matches;
  } catch {
    // Some older embedded Safari versions expose matchMedia but throw here.
  }
  return typeof window.innerWidth === "number" && window.innerWidth >= 780;
}

function chatBackgroundStyle(background: string, imageUrl: string | null, imageFit: "contain" | "cover", fade: number): CSSProperties {
  if (imageUrl) {
    const overlay = Math.max(0, Math.min(100, fade)) / 100;
    return {
    "--chat-bg": "#173235",
    "--chat-ink": "#ffffff",
    "--chat-muted": "#d7e5e2",
    backgroundImage: `linear-gradient(rgba(23, 50, 53, ${overlay}), rgba(23, 50, 53, ${overlay})), url(${JSON.stringify(imageUrl)})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: imageFit,
    } as CSSProperties;
  }
  if (background === "transparent") return { "--chat-bg": "transparent", "--chat-ink": "var(--text)", "--chat-muted": "var(--dim)" } as CSSProperties;
  const match = /^#([0-9a-f]{6})$/i.exec(background);
  const value = match?.[1] ?? "ffffff";
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const isDark = (red * 299 + green * 587 + blue * 114) / 1000 < 142;
  return { "--chat-bg": `#${value}`, "--chat-ink": isDark ? "#ffffff" : "#092427", "--chat-muted": isDark ? "#d7e5e2" : "#536d6c" } as CSSProperties;
}

const copy = {
  en: {
    language: "Language", english: "English", vietnamese: "Vietnamese",
    openMic: "Open mic, open conversation", heroLineOne: "Find your room.", heroLineTwo: "Join the chorus.",
    intro: "Chat in real time, take the mic, or simply listen. Sign in to keep your identity and role protected.",
    accountAccess: "Account access", accountOptions: "Account options", signIn: "Sign in", createAccount: "Create account",
    displayName: "Username", yourName: "Your username", email: "Email", yourEmail: "you@example.com", password: "Password", atLeastSix: "At least 6 characters", yourPassword: "Your password",
    confirmPassword: "Confirm password", repeatPassword: "Repeat your password", pleaseWait: "Please wait…", passwordsMismatch: "Passwords do not match.", forgotPassword: "Forgot password?", resetPassword: "Reset password", resetInstructions: "Enter your account email. If it matches an account and email delivery is connected, a 6-digit reset code will arrive.", sendResetCode: "Send reset code", resetCode: "6-digit reset code", enterResetCode: "Enter code", backToSignIn: "Back to sign in", resetRequestReady: "If that email matches an account, check it for a reset code. Email delivery must be connected first.", passwordReset: "Password updated. Sign in with your new password.",
    tuningRooms: "Tuning the rooms…", couldNotLoadRooms: "Could not load the rooms.", startAgain: "Start again",
    onTheAir: "On the air", goodToSee: "Good to see you", personalStatus: "Change personal status", signOut: "Sign out", youAre: "You’re a", credits: "Credits", creditBalance: "Credit balance", earnCredits: "Earn 1 credit for every hour online", buyCredits: "Buy credits", buyCreditsAvailable: "Buy credits available", buyCreditsControlHint: "Let members see credit packages and start checkout.", buyCreditsOn: "On", buyCreditsOff: "Off", buyCreditsUnavailable: "Credit purchases are currently unavailable.", buyWithPayPal: "Buy with PayPal", paypalSetupNeeded: "PayPal checkout needs a secure merchant connection before purchases can open.", purchaseHistory: "Purchase history", creditHistory: "Credit history", noCreditActivity: "No credit activity yet", onlineEarned: "Earned online", creditPurchase: "Credits bought", giftSent: "Gift sent", giftReceived: "Gift received", adminGrant: "Granted by Super Admin", giveCredits: "Give credits", creditPackages: "Credit packages", addPackage: "Add package", packageCredits: "Credits in package", packagePrice: "Price (USD)", purchaseLog: "Purchase log", noPurchases: "No purchases yet", searchUsers: "Search users", searchRooms: "Search rooms", previous: "Previous", next: "Next", page: "Page", privateRoom: "Private room", roomPassword: "Room password", enterRoomPassword: "Enter room password", setRoomPassword: "Set room password", removeRoomPassword: "Remove password", roomPasswordHint: "Guests must enter this password before joining.", giftCredits: "Gift credits", giftSinger: "Gift the singer", creditAmount: "Credit amount", gift: "Gift", gifted: "Credits sent", defaultDisplayName: "Display name", editDisplayName: "Change display name", yourRoomName: "Your name in this room", editRoomName: "Change my room name", renameRoom: "Rename room", newRoomName: "New room name", passwordSecurity: "Profile & security",
    secureAccount: "Secure this account", changeSignInPassword: "Manage your email and sign-in password", setPasswordAnotherDevice: "Add recovery details for this account",
    currentPassword: "Current password", newPassword: "New password", confirmNewPassword: "Confirm new password", saving: "Saving…", changePassword: "Change password", setPassword: "Set password", cancel: "Cancel", areYouSure: "Are you sure?", confirm: "Confirm", newPasswordsMismatch: "New passwords do not match.",
    emailStatus: "Email", verified: "Verified", notVerified: "Not verified", noEmail: "No email added", addOrChangeEmail: "Add or change email", sendConfirmation: "Send confirmation code", confirmationCode: "Confirmation code", verifyEmail: "Verify email", emailServiceNeeded: "Email delivery is ready to connect, but no provider is connected yet.", confirmationSent: "Confirmation code sent. Check your email.", emailVerified: "Email confirmed.",
    openRoom: "Open a new room", openRoomHint: "Everyone can create rooms · up to 10 per person", roomName: "Room name", roomPlaceholder: "Late-night songs", open: "Open", roomPicture: "Room picture", roomPictureOptions: "Room picture options", changeRoomPicture: "Change room picture", removeRoomPicture: "Remove room picture", chatBackground: "Chat background", chooseChatBackground: "Choose chat background", backgroundFade: "Background fade", standardWallpapers: "Cute wallpapers", wallpaperCats: "Kawaii cats", wallpaperKitten: "Dreamy kitten", wallpaperClouds: "Pastel clouds", wallpaperDaisies: "Pastel daisies", applyingWallpaper: "Applying wallpaper…", whiteBackground: "White", transparentBackground: "Transparent", photoBackground: "Photo", chooseBackgroundPhoto: "Choose background photo", changeBackgroundPhoto: "Change background photo", removeBackgroundPhoto: "Remove background photo", invalidBackgroundPhoto: "Choose a JPG, PNG, or WebP image under 7.5 MB.", singerCoverPhoto: "Singer cover photo", singerCoverHint: "Shown on the stage when you’re singing without your camera.", changePhoto: "Change photo", removePhoto: "Remove photo", userId: "User ID",
    rooms: "Rooms", quiet: "The air is quiet", quietCreator: "Open the first room and invite the conversation in.", quietMember: "Open the first room and invite the conversation in.", owner: "Owner", ownedBy: "Owned by", deleteRoom: "Delete room", deleteRoomConfirm: "Delete {name}? This permanently removes its messages, queue, and room history.",
    hereNow: "here now", joined: "joined", waitingVoices: "Waiting for voices", activeNow: "Active now", inactive: "Inactive",
    enteringRoom: "Entering the room…", couldNotOpenRoom: "Could not open this room.", backToRooms: "Back to rooms", liveRoom: "Live room", leaveRoom: "Leave room",
    isOnMic: "is on mic", areOnMic: "are on mic", turn: "turn", singerTurn: "Singer turn", isUpNext: "is up next", joinQueueTakeMic: "Join the queue to take the mic",
    giveHeart: "Give heart", yourHeartCount: "Hearts from this room", hearts: "hearts", heart: "heart", heartReady: "Ready", heartAgain: "Again in",
    muted: "Muted", starting: "Starting…", startCamera: "Turn on camera", stopCamera: "Turn off camera", cameraUnavailable: "Camera access is not available in this browser.", cameraBlocked: "Camera access was blocked. Allow camera access, then try again.", singerCamera: "Singer camera", leaveMic: "Leave mic", joinMic: "Join mic", queueFirst: "Queue first", leaveLiveAudio: "Leave live audio", startingMicrophone: "Starting microphone", joinLiveAudio: "Join live audio", waitMicTurn: "Wait for your mic turn",
    unmuteMyMic: "Unmute my mic", muteMyMic: "Mute my mic", shareBackgroundSound: "Share background sound", stopBackgroundSound: "Stop sharing background sound", backgroundSoundStarting: "Adjusting sound…", backgroundSoundHint: "Start background sound directly—your microphone does not need to be on first.", backgroundSoundError: "Could not change the microphone sound mode.", hotMic: "Hot mic", leaveHotMic: "End hot mic", startHearing: "Start hearing live audio", tapHear: "Tap to hear audio",
    micQueue: "Mic queue", minuteTurns: "minute turns", setTime: "Set time", defaultTurnLength: "Default turn length", minutes: "minutes", save: "Save", micMode: "Microphone mode", freeMode: "Free Mode", queueMode: "Queue Mode", freeModeHint: "Everyone can turn on their microphone at the same time. There is no queue.", queueModeHint: "One person takes the microphone at a time through the FIFO queue.", changeMicMode: "Change microphone mode", displayOptions: "Display options", freeMicPrompt: "Free Mode is on — join the live conversation whenever you’re ready.",
    queueManagement: "Queue management", selectPerson: "Select a person", addToQueue: "Add to queue", makeSinger: "Make singer", moveUp: "Move up", removeFromQueue: "Remove from queue", clearQueue: "Clear queue", clearQueueConfirm: "Clear everyone from the mic queue? The current singer’s music will also stop.", removeQueueConfirm: "Remove {name} from the mic queue?", noPeopleToAdd: "Everyone available is already in the queue.",
    nowOnMic: "Now on mic", upNext: "Up next", startYourMic: "Start your mic", noWaiting: "No one is waiting. Be the first to take a turn.", addTime: "Add time", min: "min", you: "you", waiting: "Waiting", joining: "Joining…", joinMicQueue: "Join mic queue", endMyTurn: "End my turn", leaveQueue: "Leave queue", inLine: "in line", yourTurnTap: "It’s your turn — tap Join mic beside your name", 
    peopleRoles: "People & roles", peopleRoom: "People in the room", onMic: "On mic", mutedByModerator: "Muted by moderator", roomTier: "Room tier", visitorRole: "Visitor", memberRole: "Member", modOne: "Mod 1 - Cộng tác viên", modTwo: "VIP", modThree: "Mod 3 - Quản trị viên", blackShirt: "Black shirt", demote: "Demote", promote: "Promote", promoteTo: "Promote to", demoteTo: "Demote to", unmute: "Unmute", mute: "Mute", removeFromRoom: "Remove from room", personSettings: "Person settings", roomSettings: "Room settings", changeRoomPersonName: "Change room name", addFriend: "Add friend", requestSent: "Request sent", friends: "Friends", friendRequests: "Friend requests", accept: "Accept", decline: "Decline", noFriends: "No friends yet.", noFriendRequests: "No pending friend requests.", banFromRoom: "Ban from room", banConfirm: "Ban {name}? They will not be able to re-enter this room.", roomBanList: "Room ban list", bannedBy: "Banned by", unban: "Unban", noBannedUsers: "No one is banned from this room.",
    conversation: "Room conversation", noMessages: "No messages yet.", firstHello: "Say the first hello.", formerMember: "Former member", message: "Message", youMuted: "You are muted", addConversation: "Add to the conversation…", sendMessage: "Send message", sendPhoto: "Send photo", photoSending: "Sending photo…", photoUploadHint: "JPG, PNG, or WebP · up to 7.5 MB", invalidChatPhoto: "Choose a JPG, PNG, or WebP image under 7.5 MB.", chatPhoto: "Photo shared by", openChatPhoto: "View full photo", closeChatPhoto: "Close full photo", openEmojiPicker: "Add emoji", closeEmojiPicker: "Close emoji picker", emojiPicker: "Emoji picker",
    adminDashboard: "Admin dashboard", adminUsers: "Users", adminRooms: "Rooms", masterLogs: "Master logs", activity: "Activity", timestamp: "Timestamp", logsRetained: "Activity is kept for 30 days.", superAdmin: "Super Admin", promoteAdmin: "Promote to admin", demoteAdmin: "Demote admin", ipAddress: "Last IP address", ipUnknown: "Not recorded", lastSeen: "Last seen", accountLocked: "Account locked", networkBlocked: "IP blocked", lockAccount: "Lock account", unlockAccount: "Unlock account", blockIp: "Block IP", unblockIp: "Unblock IP", roomOwner: "Room owner", transferOwnership: "Change owner", chooseNewOwner: "Choose a new owner", newRoomOwner: "New room owner", roomLevel: "Level", upgradeLevelTwo: "Upgrade to level 2", downgradeLevelOne: "Downgrade to level 1", levelTwoCamera: "Camera unlocks at level 2", lockRoom: "Lock room", unlockRoom: "Unlock room", lockReason: "Reason for locking", communityReview: "Community standards review", adminConfirmAction: "Apply this admin action?", lockedRoom: "Locked", deleted: "Deleted", deleteUser: "Delete user", restoreUser: "Restore user", restoreRoom: "Restore room", noAdminData: "No admin data available.",
    report: "Report", reportUser: "Report user", reportRoom: "Report room", reportReason: "Reason", reportDetails: "What happened?", reportDetailsHint: "Share enough detail for the admin team to review.", reportEvidence: "Evidence files", addEvidence: "Add images or files", evidenceHint: "Up to 3 JPG, PNG, WebP, GIF, PDF, TXT, DOC, or DOCX files · 7.5 MB each · 15 MB total", unsupportedEvidence: "Choose a supported file under 7.5 MB.", tooManyEvidence: "You can attach up to 3 files.", removeEvidence: "Remove file", attachments: "Attachments", openAttachment: "Open attachment", submitReport: "Send report", reportSent: "Report sent to the admin team.", harassment: "Harassment", hate: "Hateful conduct", spam: "Spam or scam", sexual: "Sexual content", violence: "Violence or threats", impersonation: "Impersonation", other: "Other",
    support: "Support", contactSupport: "Contact the admin team", supportHint: "Ask for help with your account, a room, or using the site.", supportSubject: "Subject", supportDetails: "How can we help?", sendSupport: "Send to support", supportSent: "Your support ticket was created.", waitingAdmin: "Waiting for an available admin", acceptedByAdmin: "Accepted by", startSupportChat: "Start support chat", messageAdmin: "Message the admin team", adminInbox: "Reports & support", reports: "Reports", supportRequests: "Support requests", activeSupportQueue: "Active queue", supportHistory: "History", ticketNumber: "Ticket", openCases: "Open", reviewing: "Reviewing", accepted: "Accepted", resolved: "Resolved", dismissed: "Dismissed", markReviewing: "Review", resolve: "Resolve", dismiss: "Dismiss", reviewNote: "Admin note", noReports: "No reports yet.", noSupport: "No support requests yet.", noActiveSupport: "No active support requests.",
    micUnavailable: "Microphone access is not available in this browser.", couldNotJoinMic: "Could not join the microphone.", turnEnded: "Your mic turn has ended. Join the queue again for another turn.", moderatorMuted: "A moderator muted you in this room.", participant: "participant",
  },
  vi: {
    language: "Ngôn ngữ", english: "Tiếng Anh", vietnamese: "Tiếng Việt",
    openMic: "Mở mic, mở lời", heroLineOne: "Tìm phòng của bạn.", heroLineTwo: "Cùng hòa giọng.",
    intro: "Trò chuyện tức thì, cầm mic hoặc chỉ lắng nghe. Đăng nhập để bảo vệ danh tính và vai trò của bạn.",
    accountAccess: "Truy cập tài khoản", accountOptions: "Tùy chọn tài khoản", signIn: "Đăng nhập", createAccount: "Tạo tài khoản",
    displayName: "Tên đăng nhập", yourName: "Tên đăng nhập của bạn", email: "Email", yourEmail: "ban@example.com", password: "Mật khẩu", atLeastSix: "Ít nhất 6 ký tự", yourPassword: "Mật khẩu của bạn",
    confirmPassword: "Xác nhận mật khẩu", repeatPassword: "Nhập lại mật khẩu", pleaseWait: "Vui lòng chờ…", passwordsMismatch: "Mật khẩu không khớp.", forgotPassword: "Quên mật khẩu?", resetPassword: "Đặt lại mật khẩu", resetInstructions: "Nhập email của tài khoản. Nếu khớp và dịch vụ email đã được kết nối, mã đặt lại gồm 6 chữ số sẽ được gửi đến.", sendResetCode: "Gửi mã đặt lại", resetCode: "Mã đặt lại 6 chữ số", enterResetCode: "Nhập mã", backToSignIn: "Quay lại đăng nhập", resetRequestReady: "Nếu email khớp với tài khoản, hãy kiểm tra mã đặt lại. Dịch vụ email phải được kết nối trước.", passwordReset: "Mật khẩu đã được cập nhật. Hãy đăng nhập bằng mật khẩu mới.",
    tuningRooms: "Đang kết nối các phòng…", couldNotLoadRooms: "Không thể tải danh sách phòng.", startAgain: "Bắt đầu lại",
    onTheAir: "Đang phát sóng", goodToSee: "Rất vui gặp lại", personalStatus: "thay đổi trạng thái cá nhân", signOut: "Đăng xuất", youAre: "Vai trò của bạn:", credits: "Tín dụng", creditBalance: "Số dư tín dụng", earnCredits: "Nhận 1 tín dụng cho mỗi giờ trực tuyến", buyCredits: "Mua tín dụng", buyCreditsAvailable: "Cho phép mua tín dụng", buyCreditsControlHint: "Cho phép thành viên xem gói tín dụng và bắt đầu thanh toán.", buyCreditsOn: "Bật", buyCreditsOff: "Tắt", buyCreditsUnavailable: "Hiện không thể mua tín dụng.", buyWithPayPal: "Mua bằng PayPal", paypalSetupNeeded: "Thanh toán PayPal cần kết nối tài khoản người bán an toàn trước khi có thể mua.", purchaseHistory: "Lịch sử mua", creditHistory: "Lịch sử tín dụng", noCreditActivity: "Chưa có hoạt động tín dụng", onlineEarned: "Nhận khi trực tuyến", creditPurchase: "Đã mua tín dụng", giftSent: "Quà đã gửi", giftReceived: "Quà đã nhận", adminGrant: "Được Siêu quản trị viên tặng", giveCredits: "Tặng tín dụng", creditPackages: "Gói tín dụng", addPackage: "Thêm gói", packageCredits: "Tín dụng trong gói", packagePrice: "Giá (USD)", purchaseLog: "Nhật ký mua", noPurchases: "Chưa có giao dịch mua", searchUsers: "Tìm người dùng", searchRooms: "Tìm phòng", previous: "Trước", next: "Tiếp", page: "Trang", privateRoom: "Phòng riêng tư", roomPassword: "Mật khẩu phòng", enterRoomPassword: "Nhập mật khẩu phòng", setRoomPassword: "Đặt mật khẩu phòng", removeRoomPassword: "Xóa mật khẩu", roomPasswordHint: "Khách phải nhập mật khẩu này trước khi vào.", giftCredits: "Tặng tín dụng", giftSinger: "Tặng người hát", creditAmount: "Số tín dụng", gift: "Tặng", gifted: "Đã gửi tín dụng", defaultDisplayName: "Tên hiển thị", editDisplayName: "Đổi tên hiển thị", yourRoomName: "Tên của bạn trong phòng này", editRoomName: "Đổi tên của tôi trong phòng", renameRoom: "Đổi tên phòng", newRoomName: "Tên phòng mới", passwordSecurity: "Hồ sơ & bảo mật",
    secureAccount: "Bảo vệ tài khoản", changeSignInPassword: "Quản lý email và mật khẩu đăng nhập", setPasswordAnotherDevice: "Thêm thông tin khôi phục cho tài khoản này",
    currentPassword: "Mật khẩu hiện tại", newPassword: "Mật khẩu mới", confirmNewPassword: "Xác nhận mật khẩu mới", saving: "Đang lưu…", changePassword: "Đổi mật khẩu", setPassword: "Đặt mật khẩu", cancel: "Hủy", areYouSure: "Bạn có chắc không?", confirm: "Xác nhận", newPasswordsMismatch: "Mật khẩu mới không khớp.",
    emailStatus: "Email", verified: "Đã xác minh", notVerified: "Chưa xác minh", noEmail: "Chưa thêm email", addOrChangeEmail: "Thêm hoặc đổi email", sendConfirmation: "Gửi mã xác nhận", confirmationCode: "Mã xác nhận", verifyEmail: "Xác minh email", emailServiceNeeded: "Luồng gửi email đã sẵn sàng, nhưng chưa kết nối nhà cung cấp.", confirmationSent: "Đã gửi mã xác nhận. Hãy kiểm tra email.", emailVerified: "Đã xác nhận email.",
    openRoom: "Mở phòng mới", openRoomHint: "Mọi người đều có thể tạo · tối đa 10 phòng mỗi người", roomName: "Tên phòng", roomPlaceholder: "Những bài hát đêm khuya", open: "Mở", roomPicture: "Ảnh phòng", roomPictureOptions: "Tùy chọn ảnh phòng", changeRoomPicture: "Đổi ảnh phòng", removeRoomPicture: "Xóa ảnh phòng", chatBackground: "Nền trò chuyện", chooseChatBackground: "Chọn nền trò chuyện", backgroundFade: "Độ mờ nền", standardWallpapers: "Hình nền dễ thương", wallpaperCats: "Mèo kawaii", wallpaperKitten: "Mèo con mơ mộng", wallpaperClouds: "Mây pastel", wallpaperDaisies: "Cúc pastel", applyingWallpaper: "Đang áp dụng hình nền…", whiteBackground: "Trắng", transparentBackground: "Trong suốt", photoBackground: "Ảnh", chooseBackgroundPhoto: "Chọn ảnh nền", changeBackgroundPhoto: "Đổi ảnh nền", removeBackgroundPhoto: "Xóa ảnh nền", invalidBackgroundPhoto: "Chọn ảnh JPG, PNG hoặc WebP dưới 7,5 MB.", singerCoverPhoto: "Ảnh bìa người hát", singerCoverHint: "Hiển thị trên sân khấu khi bạn hát mà không bật camera.", changePhoto: "Đổi ảnh", removePhoto: "Xóa ảnh", userId: "ID người dùng",
    rooms: "Phòng", quiet: "Không gian đang yên ắng", quietCreator: "Mở phòng đầu tiên và bắt đầu cuộc trò chuyện.", quietMember: "Mở phòng đầu tiên và bắt đầu cuộc trò chuyện.", owner: "Chủ phòng", ownedBy: "Chủ phòng", deleteRoom: "Xóa phòng", deleteRoomConfirm: "Xóa {name}? Tin nhắn, hàng chờ và lịch sử của phòng sẽ bị xóa vĩnh viễn.",
    hereNow: "đang ở đây", joined: "đã tham gia", waitingVoices: "Đang chờ tiếng nói", activeNow: "Đang hoạt động", inactive: "Không hoạt động",
    enteringRoom: "Đang vào phòng…", couldNotOpenRoom: "Không thể mở phòng này.", backToRooms: "Quay lại danh sách phòng", liveRoom: "Phòng trực tiếp", leaveRoom: "Rời phòng",
    isOnMic: "đang cầm mic", areOnMic: "đang cầm mic", turn: "lượt", singerTurn: "Lượt người hát", isUpNext: "sắp đến lượt", joinQueueTakeMic: "Vào hàng chờ để cầm mic",
    giveHeart: "Tặng tim", yourHeartCount: "Tim từ phòng này", hearts: "tim", heart: "tim", heartReady: "Sẵn sàng", heartAgain: "Tặng lại sau",
    muted: "Đã tắt tiếng", starting: "Đang bật…", startCamera: "Bật camera", stopCamera: "Tắt camera", cameraUnavailable: "Trình duyệt này không hỗ trợ truy cập camera.", cameraBlocked: "Quyền truy cập camera đã bị chặn. Hãy cho phép camera rồi thử lại.", singerCamera: "Camera người hát", leaveMic: "Rời mic", joinMic: "Bật mic", queueFirst: "Vào hàng chờ", leaveLiveAudio: "Rời âm thanh trực tiếp", startingMicrophone: "Đang bật mic", joinLiveAudio: "Tham gia âm thanh trực tiếp", waitMicTurn: "Chờ đến lượt cầm mic",
    unmuteMyMic: "Bật tiếng mic", muteMyMic: "Tắt tiếng mic", shareBackgroundSound: "Chia sẻ âm thanh nền", stopBackgroundSound: "Dừng chia sẻ âm thanh nền", backgroundSoundStarting: "Đang điều chỉnh âm thanh…", backgroundSoundHint: "Bật âm thanh nền trực tiếp—không cần bật mic trước.", backgroundSoundError: "Không thể đổi chế độ âm thanh của mic.", hotMic: "Mic thông báo", leaveHotMic: "Tắt mic thông báo", startHearing: "Bắt đầu nghe âm thanh trực tiếp", tapHear: "Chạm để nghe",
    micQueue: "Hàng chờ mic", minuteTurns: "phút mỗi lượt", setTime: "Đặt thời gian", defaultTurnLength: "Thời lượng mặc định", minutes: "phút", save: "Lưu", micMode: "Chế độ mic", freeMode: "Chế Độ Tự Do", queueMode: "Chế Độ Xếp Hàng", freeModeHint: "Mọi người có thể bật mic cùng lúc. Không có hàng chờ.", queueModeHint: "Mỗi lượt chỉ một người cầm mic theo thứ tự hàng chờ.", changeMicMode: "Đổi chế độ mic", displayOptions: "Tùy chọn hiển thị", freeMicPrompt: "Chế Độ Tự Do đang bật — hãy tham gia trò chuyện trực tiếp khi bạn sẵn sàng.",
    queueManagement: "Quản lý hàng chờ", selectPerson: "Chọn một người", addToQueue: "Thêm vào hàng", makeSinger: "Cho hát ngay", moveUp: "Đẩy lên", removeFromQueue: "Xóa khỏi hàng", clearQueue: "Xóa toàn bộ hàng", clearQueueConfirm: "Xóa mọi người khỏi hàng chờ mic? Nhạc của người đang hát cũng sẽ dừng.", removeQueueConfirm: "Xóa {name} khỏi hàng chờ mic?", noPeopleToAdd: "Mọi người có thể tham gia đều đã ở trong hàng.",
    nowOnMic: "Đang cầm mic", upNext: "Tiếp theo", startYourMic: "Bật mic của bạn", noWaiting: "Chưa có ai chờ. Hãy nhận lượt đầu tiên.", addTime: "Thêm thời gian", min: "phút", you: "bạn", waiting: "Đang chờ", joining: "Đang tham gia…", joinMicQueue: "Vào hàng chờ mic", endMyTurn: "Kết thúc lượt", leaveQueue: "Rời hàng chờ", inLine: "trong hàng", yourTurnTap: "Đến lượt bạn — chạm Bật mic bên cạnh tên", 
    peopleRoles: "Mọi người & vai trò", peopleRoom: "Người trong phòng", onMic: "Đang cầm mic", mutedByModerator: "Bị điều hành viên tắt tiếng", roomTier: "Cấp trong phòng", visitorRole: "Khách vãng lai", memberRole: "Thành viên", modOne: "Mod 1 - Cộng tác viên", modTwo: "VIP", modThree: "Mod 3 - Quản trị viên", blackShirt: "Áo đen", demote: "Hạ cấp", promote: "Thăng cấp", promoteTo: "Thăng lên", demoteTo: "Hạ xuống", unmute: "Bật tiếng", mute: "Tắt tiếng", removeFromRoom: "Mời ra khỏi phòng", personSettings: "Cài đặt người dùng", roomSettings: "Cài đặt phòng", changeRoomPersonName: "Đổi tên trong phòng", addFriend: "Kết bạn", requestSent: "Đã gửi lời mời", friends: "Bạn bè", friendRequests: "Lời mời kết bạn", accept: "Chấp nhận", decline: "Từ chối", noFriends: "Chưa có bạn bè.", noFriendRequests: "Không có lời mời đang chờ.", banFromRoom: "Cấm khỏi phòng", banConfirm: "Cấm {name}? Người này sẽ không thể vào lại phòng.", roomBanList: "Danh sách cấm của phòng", bannedBy: "Bị cấm bởi", unban: "Bỏ cấm", noBannedUsers: "Không có ai bị cấm khỏi phòng.",
    conversation: "Cuộc trò chuyện trong phòng", noMessages: "Chưa có tin nhắn.", firstHello: "Hãy gửi lời chào đầu tiên.", formerMember: "Thành viên cũ", message: "Tin nhắn", youMuted: "Bạn đã bị tắt tiếng", addConversation: "Tham gia trò chuyện…", sendMessage: "Gửi tin nhắn", sendPhoto: "Gửi ảnh", photoSending: "Đang gửi ảnh…", photoUploadHint: "JPG, PNG hoặc WebP · tối đa 7,5 MB", invalidChatPhoto: "Chọn ảnh JPG, PNG hoặc WebP dưới 7,5 MB.", chatPhoto: "Ảnh do", openChatPhoto: "Xem ảnh đầy đủ", closeChatPhoto: "Đóng ảnh đầy đủ", openEmojiPicker: "Thêm biểu tượng cảm xúc", closeEmojiPicker: "Đóng bảng biểu tượng cảm xúc", emojiPicker: "Bảng biểu tượng cảm xúc",
    adminDashboard: "Bảng quản trị", adminUsers: "Người dùng", adminRooms: "Phòng", masterLogs: "Nhật ký tổng", activity: "Hoạt động", timestamp: "Thời gian", logsRetained: "Hoạt động được lưu trong 30 ngày.", superAdmin: "Siêu quản trị viên", promoteAdmin: "Thăng lên quản trị viên", demoteAdmin: "Hạ cấp quản trị viên", ipAddress: "Địa chỉ IP gần nhất", ipUnknown: "Chưa ghi nhận", lastSeen: "Ghi nhận lúc", accountLocked: "Tài khoản đã khóa", networkBlocked: "IP đã chặn", lockAccount: "Khóa tài khoản", unlockAccount: "Mở khóa tài khoản", blockIp: "Chặn IP", unblockIp: "Bỏ chặn IP", roomOwner: "Chủ phòng", transferOwnership: "Đổi chủ phòng", chooseNewOwner: "Chọn chủ phòng mới", newRoomOwner: "Chủ phòng mới", roomLevel: "Cấp", upgradeLevelTwo: "Nâng lên cấp 2", downgradeLevelOne: "Hạ xuống cấp 1", levelTwoCamera: "Camera mở khóa ở cấp 2", lockRoom: "Khóa phòng", unlockRoom: "Mở khóa phòng", lockReason: "Lý do khóa", communityReview: "Xem xét tiêu chuẩn cộng đồng", adminConfirmAction: "Áp dụng thao tác quản trị này?", lockedRoom: "Đã khóa", deleted: "Đã xóa", deleteUser: "Xóa người dùng", restoreUser: "Khôi phục người dùng", restoreRoom: "Khôi phục phòng", noAdminData: "Không có dữ liệu quản trị.",
    report: "Báo cáo", reportUser: "Báo cáo người dùng", reportRoom: "Báo cáo phòng", reportReason: "Lý do", reportDetails: "Điều gì đã xảy ra?", reportDetailsHint: "Cung cấp đủ chi tiết để đội ngũ quản trị xem xét.", reportEvidence: "Tệp bằng chứng", addEvidence: "Thêm hình ảnh hoặc tệp", evidenceHint: "Tối đa 3 tệp JPG, PNG, WebP, GIF, PDF, TXT, DOC hoặc DOCX · 7,5 MB mỗi tệp · tổng cộng 15 MB", unsupportedEvidence: "Chọn tệp được hỗ trợ có dung lượng dưới 7,5 MB.", tooManyEvidence: "Bạn có thể đính kèm tối đa 3 tệp.", removeEvidence: "Xóa tệp", attachments: "Tệp đính kèm", openAttachment: "Mở tệp đính kèm", submitReport: "Gửi báo cáo", reportSent: "Báo cáo đã được gửi đến đội ngũ quản trị.", harassment: "Quấy rối", hate: "Hành vi thù ghét", spam: "Spam hoặc lừa đảo", sexual: "Nội dung tình dục", violence: "Bạo lực hoặc đe dọa", impersonation: "Mạo danh", other: "Khác",
    support: "Hỗ trợ", contactSupport: "Liên hệ đội ngũ quản trị", supportHint: "Yêu cầu trợ giúp về tài khoản, phòng hoặc cách sử dụng trang.", supportSubject: "Chủ đề", supportDetails: "Chúng tôi có thể giúp gì?", sendSupport: "Gửi đến hỗ trợ", supportSent: "Phiếu hỗ trợ của bạn đã được tạo.", waitingAdmin: "Đang chờ quản trị viên rảnh", acceptedByAdmin: "Được tiếp nhận bởi", startSupportChat: "Bắt đầu trò chuyện hỗ trợ", messageAdmin: "Nhắn cho đội ngũ quản trị", adminInbox: "Báo cáo & hỗ trợ", reports: "Báo cáo", supportRequests: "Yêu cầu hỗ trợ", activeSupportQueue: "Hàng chờ đang hoạt động", supportHistory: "Lịch sử", ticketNumber: "Phiếu", openCases: "Mở", reviewing: "Đang xem xét", accepted: "Đã tiếp nhận", resolved: "Đã giải quyết", dismissed: "Đã bỏ qua", markReviewing: "Xem xét", resolve: "Giải quyết", dismiss: "Bỏ qua", reviewNote: "Ghi chú quản trị", noReports: "Chưa có báo cáo.", noSupport: "Chưa có yêu cầu hỗ trợ.", noActiveSupport: "Không có yêu cầu hỗ trợ đang hoạt động.",
    micUnavailable: "Trình duyệt này không hỗ trợ truy cập mic.", couldNotJoinMic: "Không thể tham gia mic.", turnEnded: "Lượt mic của bạn đã kết thúc. Hãy vào hàng chờ để nhận lượt khác.", moderatorMuted: "Điều hành viên đã tắt tiếng của bạn trong phòng này.", participant: "người tham gia",
  },
} as const;

const CHAT_EMOJIS = ["😀", "😂", "🥰", "😍", "😊", "😎", "🤩", "🥳", "🤗", "😉", "😢", "😭", "😮", "😅", "🙏", "👏", "👍", "❤️", "🔥", "🎉", "🎤", "🎵", "💃", "🕺"] as const;

const CHAT_WALLPAPERS = [
  { id: "kawaii-cats", nameKey: "wallpaperCats", src: kawaiiCatsWallpaper },
  { id: "dreamy-kitten", nameKey: "wallpaperKitten", src: dreamyKittenWallpaper },
  { id: "pastel-clouds", nameKey: "wallpaperClouds", src: pastelCloudsWallpaper },
  { id: "pastel-daisies", nameKey: "wallpaperDaisies", src: pastelDaisiesWallpaper },
] as const;

type CopyKey = keyof typeof copy.en;
type LocaleContextValue = { locale: Locale; t: (key: CopyKey) => string };
const LocaleContext = createContext<LocaleContextValue | null>(null);

function readLocale(): Locale {
  return "vi";
}

function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("Locale provider is missing");
  return value;
}

// Some embedded webviews disable DOM storage even though the rest of the app is
// available. Storage must never be able to prevent the first screen rendering.
function readSessionToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveSessionToken(token: string) {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // The in-memory React state still keeps this visit signed in.
  }
}

function clearSessionToken() {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // There may be no writable storage to clear.
  }
}

type Participant = ApiResponse<typeof api, "roomSnapshot">["participants"][number];
type RoomTier = Participant["roomTier"];
const ROOM_TIER_ORDER: RoomTier[] = ["visitor", "member", "mod2", "mod1", "mod3", "blackshirt", "owner"];
const PEOPLE_TIER_ORDER: RoomTier[] = ["superadmin", "admin", "owner", "blackshirt", "mod3", "mod1", "mod2", "member", "visitor"];
type RoomConfirmation =
  | { kind: "leave" }
  | { kind: "role"; person: Participant; direction: "promote" | "demote"; nextTier: RoomTier }
  | { kind: "kick"; person: Participant }
  | { kind: "ban"; person: Participant }
  | { kind: "queue-remove"; userId: number; name: string }
  | { kind: "queue-clear" };

function Icon({ name, size = 20 }: { name: "mic" | "send" | "plus" | "users" | "door" | "shield" | "mute" | "back" | "music" | "clock" | "queue" | "heart" | "smile" | "camera" | "image" | "edit" | "shirt" | "trash" | "menu" | "grid" | "star" | "wifi" | "record" | "collapse" | "gear"; size?: number }) {
  const paths: Record<string, ReactNode> = {
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8.5 21h7"/></>,
    send: <><path d="m3 11 17-8-7.5 18-2.1-7.4L3 11Z"/><path d="m10.4 13.6 4.2-4.2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-2a5.5 5.5 0 0 1 11 0v2M16 5.4a3 3 0 0 1 0 5.2M17 14a5 5 0 0 1 3.5 4.8V20"/></>,
    door: <><path d="M4 21V3h11v18M15 12h6M18 9l3 3-3 3"/><circle cx="11" cy="12" r=".5"/></>,
    shield: <path d="M12 3 5 6v5c0 4.8 2.8 8 7 10 4.2-2 7-5.2 7-10V6l-7-3Z"/>,
    mute: <><path d="m4 9 4-4 8 14M9 9v3a3 3 0 0 0 4.2 2.7M15 11V6a3 3 0 0 0-5.5-1.6M5 11a7 7 0 0 0 11.5 5.4M19 11a7 7 0 0 1-.8 3.2M12 18v3M8.5 21h7"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    queue: <><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></>,
    heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.8Z"/>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.4 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="9" r=".7" fill="currentColor" stroke="none"/></>,
    camera: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m4 17 4.5-4.5 3.5 3 2.5-2.5 5.5 5"/></>,
    edit: <><path d="M4 20h4l11-11a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></>, 
    shirt: <><path d="M8 4 3 7l2 5 3-1v9h8v-9l3 1 2-5-5-3c-.6 1.5-1.9 2.4-4 2.4S8.6 5.5 8 4Z" fill="currentColor"/><path d="m9 4 3 2.4L15 4"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
    wifi: <><path d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a4 4 0 0 1 4 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></>,
    record: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4" fill="currentColor"/></>,
    collapse: <><path d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"/><path d="m4 4 5 5M20 4l-5 5M4 20l5-5M20 20l-5-5"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function RoleBadge({ role }: { role: string }) {
  const { locale, t } = useLocale();
  if (role === "user") return null;
  const label = role === "owner" ? t("owner") : role === "superadmin" ? t("superAdmin") : locale === "vi" ? (role === "admin" ? "quản trị viên" : "điều hành viên") : role;
  return <span className={`role-badge ${role}`}><Icon name="shield" size={13}/>{label}</span>;
}

function Notice({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "error" }) {
  return <p className={`notice ${tone}`}>{children}</p>;
}

function ConfirmationDialog({ message, confirmLabel, onConfirm, onCancel }: { message: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void }) {
  const { t } = useLocale();
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onCancel(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onCancel]);
  return <div className="dialog-backdrop" role="presentation">
    <section className="confirmation-dialog" role="dialog" aria-modal="true" aria-labelledby="confirmation-title" aria-describedby="confirmation-message">
      <h2 id="confirmation-title">{t("areYouSure")}</h2>
      <p id="confirmation-message">{message}</p>
      <div className="confirmation-actions">
        <button type="button" className="cancel-button" onClick={onCancel} autoFocus>{t("cancel")}</button>
        <button type="button" className="confirm-button" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </section>
  </div>;
}

function ChatPhotoDialog({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const { t } = useLocale();
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);
  return <div className="photo-lightbox" role="presentation" onClick={onClose}>
    <section className="photo-lightbox-dialog" role="dialog" aria-modal="true" aria-label={t("openChatPhoto")} onClick={(event) => event.stopPropagation()}>
      <button type="button" className="photo-lightbox-close" onClick={onClose} aria-label={t("closeChatPhoto")} autoFocus>×</button>
      <img src={src} alt={alt}/>
    </section>
  </div>;
}

type ReportTarget = { type: "user" | "room"; id: number; name: string };
type ReportCategory = "harassment" | "hate" | "spam" | "sexual" | "violence" | "impersonation" | "other";

function ReportDialog({ token, target, onClose }: { token: string; target: ReportTarget; onClose: () => void }) {
  const { t } = useLocale();
  const [category, setCategory] = useState<ReportCategory>("harassment");
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const submit = useMutation({ mutationFn: async () => {
    const encoded = await Promise.all(attachments.map(async (file) => {
      const mimeType = reportAttachmentMimeFor(file);
      if (!mimeType) throw new Error(t("unsupportedEvidence"));
      const data = await fileToBase64(file);
      return { dataBase64: data.dataBase64, mimeType, fileName: file.name };
    }));
    return api.submitReport({ token, targetType: target.type, targetId: target.id, category, details, attachments: encoded });
  }});
  const sent = submit.data?.ok === true;
  const totalAttachmentBytes = attachments.reduce((sum, file) => sum + file.size, 0);
  return <div className="dialog-backdrop" role="presentation"><section className="confirmation-dialog report-dialog" role="dialog" aria-modal="true" aria-labelledby="report-dialog-title">
    <h2 id="report-dialog-title">{target.type === "user" ? t("reportUser") : t("reportRoom")}</h2>
    <p><strong>{target.name}</strong></p>
    {sent ? <><Notice>{t("reportSent")}</Notice><div className="confirmation-actions"><button type="button" className="confirm-button" onClick={onClose}>{t("confirm")}</button></div></> : <form onSubmit={(event) => { event.preventDefault(); setAttachmentError(""); submit.mutate(); }}>
      <label htmlFor="report-category">{t("reportReason")}</label><select id="report-category" value={category} onChange={(event) => setCategory(event.target.value as ReportCategory)}><option value="harassment">{t("harassment")}</option><option value="hate">{t("hate")}</option><option value="spam">{t("spam")}</option><option value="sexual">{t("sexual")}</option><option value="violence">{t("violence")}</option><option value="impersonation">{t("impersonation")}</option><option value="other">{t("other")}</option></select>
      <label htmlFor="report-details">{t("reportDetails")}</label><textarea id="report-details" value={details} onChange={(event) => setDetails(event.target.value)} placeholder={t("reportDetailsHint")} minLength={10} maxLength={1500} rows={5} required/>
      <div className="report-evidence-field"><span>{t("reportEvidence")}</span><label className="report-file-picker">{t("addEvidence")}<input id="report-evidence" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,.doc,.docx" disabled={submit.isPending || attachments.length >= 3} onChange={(event) => {
        const picked = Array.from(event.currentTarget.files ?? []);
        event.currentTarget.value = "";
        if (attachments.length + picked.length > 3) { setAttachmentError(t("tooManyEvidence")); return; }
        const invalid = picked.some((file) => !reportAttachmentMimeFor(file) || file.size === 0 || file.size > 7_500_000);
        if (invalid) { setAttachmentError(t("unsupportedEvidence")); return; }
        const next = [...attachments, ...picked];
        if (next.reduce((sum, file) => sum + file.size, 0) > 15_000_000) { setAttachmentError(t("evidenceHint")); return; }
        setAttachmentError(""); setAttachments(next);
      }}/></label><small>{t("evidenceHint")}</small></div>
      {attachments.length > 0 && <div className="report-file-list">{attachments.map((file, index) => <div key={`${file.name}-${file.lastModified}-${index}`}><span><strong>{file.name}</strong><small>{formatFileSize(file.size)}</small></span><button type="button" aria-label={`${t("removeEvidence")}: ${file.name}`} onClick={() => setAttachments((current) => current.filter((_, currentIndex) => currentIndex !== index))}>×</button></div>)}</div>}
      {(attachmentError || submit.data?.error || submit.error) && <Notice tone="error">{attachmentError || submit.data?.error || (submit.error instanceof Error ? submit.error.message : t("unsupportedEvidence"))}</Notice>}
      <div className="confirmation-actions"><button type="button" className="cancel-button" onClick={onClose}>{t("cancel")}</button><button className="confirm-button" disabled={submit.isPending || details.trim().length < 10 || totalAttachmentBytes > 15_000_000}>{submit.isPending ? t("pleaseWait") : t("submitReport")}</button></div>
    </form>}
  </section></div>;
}

function SupportChatPanel({ token, onClose, embedded = false }: { token: string; onClose?: () => void; embedded?: boolean }) {
  const { locale, t } = useLocale();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const chat = useQuery({ queryKey: ["support-chat", token], queryFn: () => api.getMySupportChat({ token }), refetchInterval: 2000 });
  const createTicket = useMutation({
    mutationFn: () => api.submitSupportRequest({ token, details: message }),
    onSuccess: (result) => { if (result.ok) { setMessage(""); queryClient.invalidateQueries({ queryKey: ["support-chat", token] }); } },
  });
  const sendMessage = useMutation({
    mutationFn: (ticketId: number) => api.sendSupportMessage({ token, ticketId, body: message }),
    onSuccess: (result) => { if (result.ok) { setMessage(""); queryClient.invalidateQueries({ queryKey: ["support-chat", token] }); } },
  });
  const ticket = chat.data?.ticket;
  const pending = createTicket.isPending || sendMessage.isPending;
  return <section className={`support-chat-panel ${embedded ? "embedded" : ""}`} role={embedded ? "region" : "dialog"} aria-modal={embedded ? undefined : "false"} aria-labelledby="support-chat-title">
    <header><div><strong id="support-chat-title">{t("contactSupport")}</strong>{ticket && <small>{t("ticketNumber")} #{ticket.id} · {ticket.status === "open" ? t("waitingAdmin") : ticket.adminName ? `${t("acceptedByAdmin")} ${ticket.adminName}` : t("support")}</small>}</div>{!embedded && onClose && <button type="button" onClick={onClose} aria-label={t("cancel")}>×</button>}</header>
    {!ticket ? <div className="support-chat-empty"><p>{t("supportHint")}</p></div> : <div className="support-chat-messages">{ticket.messages.map((entry) => <article className={entry.fromAdmin ? "from-admin" : "from-user"} key={entry.id}><strong>{entry.fromAdmin ? t("support") : entry.senderName}</strong><p>{entry.body}</p><time>{new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(new Date(entry.createdAt))}</time></article>)}</div>}
    <form onSubmit={(event) => { event.preventDefault(); if (!message.trim()) return; if (ticket) sendMessage.mutate(ticket.id); else createTicket.mutate(); }}><label className="sr-only" htmlFor="support-chat-message">{ticket ? t("messageAdmin") : t("startSupportChat")}</label><textarea id="support-chat-message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder={ticket ? t("messageAdmin") : t("supportDetails")} minLength={ticket ? 1 : 2} maxLength={1500} rows={3} required/><button className="confirm-button" disabled={pending || message.trim().length < (ticket ? 1 : 2)}>{pending ? t("pleaseWait") : ticket ? t("sendMessage") : t("startSupportChat")}</button></form>
    {(chat.data?.error || createTicket.data?.error || sendMessage.data?.error) && <Notice tone="error">{chat.data?.error || createTicket.data?.error || sendMessage.data?.error}</Notice>}
  </section>;
}

function Welcome({ onReady }: { onReady: (token: string) => void }) {
  const { t } = useLocale();
  const [mode, setMode] = useState<"signin" | "create" | "forgot" | "reset">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [formError, setFormError] = useState("");
  const [formNotice, setFormNotice] = useState("");
  const signIn = useMutation({ mutationFn: () => api.loginUser({ name, password }) });
  const register = useMutation({ mutationFn: () => api.registerUser({ name, email, password }) });
  const requestReset = useMutation({ mutationFn: () => api.requestPasswordReset({ email }) });
  const resetPassword = useMutation({ mutationFn: () => api.resetPassword({ email, code: resetCode, newPassword: password }) });
  const pending = signIn.isPending || register.isPending || requestReset.isPending || resetPassword.isPending;
  async function submit(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    setFormNotice("");
    if ((mode === "create" || mode === "reset") && password !== confirmPassword) {
      setFormError(t("passwordsMismatch"));
      return;
    }
    if (mode === "forgot") {
      const result = await requestReset.mutateAsync();
      if (result.ok) { setMode("reset"); setFormNotice(t("resetRequestReady")); }
      return;
    }
    if (mode === "reset") {
      const result = await resetPassword.mutateAsync();
      if (result.ok) {
        setMode("signin");
        setPassword(""); setConfirmPassword(""); setResetCode("");
        setFormNotice(t("passwordReset"));
      }
      return;
    }
    const result = mode === "signin" ? await signIn.mutateAsync() : await register.mutateAsync();
    if (result.ok && result.token) {
      saveSessionToken(result.token);
      onReady(result.token);
    }
  }
  function switchMode(nextMode: "signin" | "create" | "forgot") {
    setMode(nextMode);
    setPassword("");
    setConfirmPassword("");
    setResetCode("");
    setFormError("");
    setFormNotice("");
    signIn.reset(); register.reset(); requestReset.reset(); resetPassword.reset();
  }
  const serverError = mode === "signin" ? signIn.data?.error : mode === "create" ? register.data?.error : mode === "reset" ? resetPassword.data?.error : undefined;
  const showAccountTabs = mode === "signin" || mode === "create";
  return <main className="welcome-shell">
    <section className="welcome-copy">
      <div className="signal-mark" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      <p className="eyebrow">{t("openMic")}</p>
      <h1>{t("heroLineOne")}<br/><em>{t("heroLineTwo")}</em></h1>
      <p className="intro">{t("intro")}</p>
    </section>
    <section className="auth-panel" aria-label={t("accountAccess")}>
      {showAccountTabs ? <div className="auth-tabs" role="tablist" aria-label={t("accountOptions")}>
        <button type="button" role="tab" aria-selected={mode === "signin"} className={mode === "signin" ? "active" : ""} onClick={() => switchMode("signin")}>{t("signIn")}</button>
        <button type="button" role="tab" aria-selected={mode === "create"} className={mode === "create" ? "active" : ""} onClick={() => switchMode("create")}>{t("createAccount")}</button>
      </div> : <div className="auth-recovery-heading"><button type="button" className="text-button" onClick={() => switchMode("signin")}>← {t("backToSignIn")}</button><h2>{t("resetPassword")}</h2></div>}
      <form className="welcome-form" onSubmit={submit}>
        {(mode === "signin" || mode === "create") && <><label htmlFor="display-name">{t("displayName")}</label><input id="display-name" value={name} onChange={(e) => setName(e.target.value)} minLength={2} maxLength={24} autoComplete="username" placeholder={t("yourName")} required/></>}
        {(mode === "create" || mode === "forgot" || mode === "reset") && <><label htmlFor="account-email">{t("email")}</label><input id="account-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} autoComplete="email" placeholder={t("yourEmail")} required/></>}
        {mode === "reset" && <><label htmlFor="reset-code">{t("resetCode")}</label><input id="reset-code" value={resetCode} onChange={(e) => setResetCode(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" placeholder={t("enterResetCode")} required/></>}
        {mode !== "forgot" && <><label htmlFor="password">{mode === "reset" ? t("newPassword") : t("password")}</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={mode === "signin" ? 1 : 6} maxLength={72} autoComplete={mode === "signin" ? "current-password" : "new-password"} placeholder={mode === "signin" ? t("yourPassword") : t("atLeastSix")} required/></>}
        {(mode === "create" || mode === "reset") && <><label htmlFor="confirm-password">{mode === "reset" ? t("confirmNewPassword") : t("confirmPassword")}</label><input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} minLength={6} maxLength={72} autoComplete="new-password" placeholder={t("repeatPassword")} required/></>}
        {mode === "forgot" && <p className="form-note recovery-note">{t("resetInstructions")}</p>}
        <button className="primary-button auth-submit" disabled={pending}>{pending ? t("pleaseWait") : mode === "signin" ? t("signIn") : mode === "create" ? t("createAccount") : mode === "forgot" ? t("sendResetCode") : t("resetPassword")}</button>
        {mode === "signin" && <button type="button" className="text-button forgot-link" onClick={() => switchMode("forgot")}>{t("forgotPassword")}</button>}
        {(formError || serverError) && <Notice tone="error">{formError || serverError}</Notice>}
        {formNotice && <Notice>{formNotice}</Notice>}
      </form>
    </section>
  </main>;
}

type AdminAction =
  | { kind: "user"; userId: number; label: string; action: "lock" | "unlock" | "block_ip" | "unblock_ip" | "delete" | "restore" | "promote_admin" | "demote_admin" }
  | { kind: "room"; roomId: number; label: string; action: "lock" | "unlock" | "delete" | "restore" | "upgrade" | "downgrade"; reason?: string }
  | { kind: "owner"; roomId: number; targetUserId: number; label: string };

function Home({ token, onOpenRoom, onSignOut, supportOpen, onSetSupportOpen }: { token: string; onOpenRoom: (id: number) => void; onSignOut: () => void; supportOpen: boolean; onSetSupportOpen: (open: boolean) => void }) {
  const { locale, t } = useLocale();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [securityOpen, setSecurityOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [privateJoin, setPrivateJoin] = useState<{ id: number; name: string } | null>(null);
  const [privateRoomPassword, setPrivateRoomPassword] = useState("");
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [displayNameDraft, setDisplayNameDraft] = useState("");
  const [editingPersonalStatus, setEditingPersonalStatus] = useState(false);
  const [personalStatusDraft, setPersonalStatusDraft] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailNotice, setEmailNotice] = useState("");
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);
  const [deletingRoom, setDeletingRoom] = useState<{ id: number; name: string } | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<"users" | "rooms" | "credits" | "reports" | "support" | "logs">("users");
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [adminReplyDrafts, setAdminReplyDrafts] = useState<Record<number, string>>({});
  const [packageCredits, setPackageCredits] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [creditGrantAmounts, setCreditGrantAmounts] = useState<Record<number, string>>({});
  const [adminUserSearch, setAdminUserSearch] = useState("");
  const [adminRoomSearch, setAdminRoomSearch] = useState("");
  const [lobbySearch, setLobbySearch] = useState("");
  const [lobbyPage, setLobbyPage] = useState(1);
  const lobbySwipeStart = useRef<{ x: number; y: number } | null>(null);
  const suppressLobbyRoomClick = useRef(false);
  const [desktopLobby, setDesktopLobby] = useState(isDesktopViewport);
  const [adminUserPage, setAdminUserPage] = useState(1);
  const [adminRoomPage, setAdminRoomPage] = useState(1);
  const [roomLockReasons, setRoomLockReasons] = useState<Record<number, string>>({});
  const [roomOwnerTargets, setRoomOwnerTargets] = useState<Record<number, string>>({});
  const [pendingAdminAction, setPendingAdminAction] = useState<AdminAction | null>(null);
  const home = useQuery({ queryKey: ["home", token], queryFn: () => api.getHome({ token }), refetchInterval: 5000 });
  const friends = useQuery({ queryKey: ["friends", token], queryFn: () => api.getFriends({ token }), refetchInterval: 5000 });
  const respondFriend = useMutation({
    mutationFn: (input: { requestId: number; response: "accept" | "decline" }) => api.respondFriendRequest({ token, ...input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends", token] });
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });
  useEffect(() => {
    const syncFromViewport = () => {
      setDesktopLobby(isDesktopViewport());
      setLobbyPage(1);
    };
    let desktopQuery: MediaQueryList | null = null;
    try {
      if (typeof window.matchMedia === "function") desktopQuery = window.matchMedia("(min-width: 780px)");
    } catch {
      desktopQuery = null;
    }
    syncFromViewport();
    if (desktopQuery && typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", syncFromViewport);
      return () => desktopQuery?.removeEventListener("change", syncFromViewport);
    }
    if (desktopQuery && typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(syncFromViewport);
      return () => desktopQuery?.removeListener(syncFromViewport);
    }
    window.addEventListener("resize", syncFromViewport);
    return () => window.removeEventListener("resize", syncFromViewport);
  }, []);
  useEffect(() => {
    if (!editingPersonalStatus && home.data?.user?.personalStatus !== undefined) setPersonalStatusDraft(home.data.user.personalStatus ?? "");
  }, [editingPersonalStatus, home.data?.user?.personalStatus]);
  const creditStore = useQuery({ queryKey: ["credit-store", token], queryFn: () => api.getCreditStore({ token }), enabled: creditsOpen });
  const adminDashboard = useQuery({ queryKey: ["admin-dashboard", token], queryFn: () => api.getAdminDashboard({ token }), enabled: adminOpen && (home.data?.user?.role === "admin" || home.data?.user?.role === "superadmin"), refetchInterval: adminOpen ? 5000 : false });
  const adminCredits = useQuery({ queryKey: ["admin-credits", token], queryFn: () => api.getAdminCreditDashboard({ token }), enabled: adminOpen && adminTab === "credits" && (home.data?.user?.role === "admin" || home.data?.user?.role === "superadmin") });
  const adminInbox = useQuery({ queryKey: ["admin-inbox", token], queryFn: () => api.getAdminInbox({ token }), enabled: adminOpen && (adminTab === "reports" || adminTab === "support") && (home.data?.user?.role === "admin" || home.data?.user?.role === "superadmin"), refetchInterval: adminOpen && (adminTab === "reports" || adminTab === "support") ? 5000 : false });
  const adminLogs = useQuery({ queryKey: ["admin-master-logs", token], queryFn: () => api.getAdminMasterLogs({ token }), enabled: adminOpen && adminTab === "logs" && (home.data?.user?.role === "admin" || home.data?.user?.role === "superadmin"), refetchInterval: adminOpen && adminTab === "logs" ? 5000 : false });
  const createRoom = useMutation({
    mutationFn: () => api.createRoom({ token, name: roomName }),
    onSuccess: (result) => {
      if (result.ok && result.roomId) { setRoomName(""); setCreating(false); onOpenRoom(result.roomId); }
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
  const join = useMutation({ mutationFn: (input: { roomId: number; password?: string }) => api.joinRoom({ token, ...input }), onSuccess: (result, input) => { if (result.ok) { setPrivateJoin(null); setPrivateRoomPassword(""); onOpenRoom(input.roomId); } } });
  const deleteRoom = useMutation({
    mutationFn: (roomId: number) => api.deleteRoom({ token, roomId }),
    onSuccess: (result) => {
      if (result.ok) { setDeletingRoom(null); setPendingAdminAction(null); }
      queryClient.invalidateQueries({ queryKey: ["home", token] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
    },
  });
  const manageUserAccess = useMutation({
    mutationFn: (input: { targetUserId: number; action: "lock" | "unlock" | "block_ip" | "unblock_ip" | "delete" | "restore" | "promote_admin" | "demote_admin" }) => api.manageUserAccess({ token, ...input }),
    onSuccess: (result) => {
      if (result.ok) setPendingAdminAction(null);
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const manageRoomLock = useMutation({
    mutationFn: (input: { roomId: number; locked: boolean; reason?: string }) => api.manageRoomLock({ token, ...input }),
    onSuccess: (result) => {
      if (result.ok) setPendingAdminAction(null);
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const setRoomLevel = useMutation({
    mutationFn: (input: { roomId: number; level: 1 | 2 }) => api.setRoomLevel({ token, ...input }),
    onSuccess: (result) => {
      if (result.ok) setPendingAdminAction(null);
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const restoreRoom = useMutation({
    mutationFn: (roomId: number) => api.restoreRoom({ token, roomId }),
    onSuccess: (result) => {
      if (result.ok) setPendingAdminAction(null);
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const buyCredits = useMutation({
    mutationFn: (packageId: number) => api.createPayPalCreditCheckout({ token, packageId }),
    onSuccess: (result) => { if (result.ok && result.checkoutUrl) window.open(result.checkoutUrl, "_blank", "noopener,noreferrer"); },
  });
  const grantCredits = useMutation({
    mutationFn: (input: { targetUserId: number; amount: number }) => api.grantCredits({ token, ...input }),
    onSuccess: (result, input) => {
      if (result.ok) setCreditGrantAmounts((current) => ({ ...current, [input.targetUserId]: "" }));
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["credit-store"] });
      queryClient.invalidateQueries({ queryKey: ["home"] });
    },
  });
  const addCreditPackage = useMutation({
    mutationFn: () => api.addCreditPackage({ token, credits: Number(packageCredits), priceCents: Math.round(Number(packagePrice) * 100) }),
    onSuccess: (result) => {
      if (result.ok) { setPackageCredits(""); setPackagePrice(""); }
      queryClient.invalidateQueries({ queryKey: ["admin-credits", token] });
      queryClient.invalidateQueries({ queryKey: ["credit-store", token] });
    },
  });
  const setBuyCreditsEnabled = useMutation({
    mutationFn: (enabled: boolean) => api.setBuyCreditsEnabled({ token, enabled }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-credits", token] });
      queryClient.invalidateQueries({ queryKey: ["credit-store", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const transferRoomOwnership = useMutation({
    mutationFn: (input: { roomId: number; targetUserId: number }) => api.transferRoomOwnership({ token, ...input }),
    onSuccess: (result, input) => {
      if (result.ok) {
        setPendingAdminAction(null);
        setRoomOwnerTargets((current) => ({ ...current, [input.roomId]: "" }));
      }
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard", token] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
      queryClient.invalidateQueries({ queryKey: ["room"] });
    },
  });
  const acceptSupportTicket = useMutation({ mutationFn: (ticketId: number) => api.acceptSupportTicket({ token, ticketId }), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-inbox", token] }) });
  const sendAdminSupportMessage = useMutation({
    mutationFn: (input: { ticketId: number; body: string }) => api.sendSupportMessage({ token, ...input }),
    onSuccess: (result, input) => { if (result.ok) setAdminReplyDrafts((current) => ({ ...current, [input.ticketId]: "" })); queryClient.invalidateQueries({ queryKey: ["admin-inbox", token] }); },
  });
  const reviewAdminInboxItem = useMutation({
    mutationFn: (input: { itemType: "report" | "support"; itemId: number; status: "open" | "reviewing" | "resolved" | "dismissed" }) => api.reviewAdminInboxItem({ token, ...input, reviewNote: reviewNotes[`${input.itemType}-${input.itemId}`] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inbox", token] });
      queryClient.invalidateQueries({ queryKey: ["admin-master-logs", token] });
    },
  });
  const updateDisplayName = useMutation({
    mutationFn: () => api.updateDisplayName({ token, displayName: displayNameDraft }),
    onSuccess: (result) => {
      if (result.ok) setEditingDisplayName(false);
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updatePersonalStatus = useMutation({
    mutationFn: () => api.updatePersonalStatus({ token, personalStatus: personalStatusDraft }),
    onSuccess: (result) => {
      if (result.ok) setEditingPersonalStatus(false);
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updateSingerCoverPhoto = useMutation({
    mutationFn: async (file: File | null) => {
      if (!file) return api.updateSingerCoverPhoto({ token, image: null });
      if (!isSupportedImageMime(file.type) || file.size > 7_500_000) return { ok: false, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP dưới 7,5 MB." };
      const image = await fileToBase64(file);
      if (!isSupportedImageMime(image.mimeType)) return { ok: false, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP." };
      return api.updateSingerCoverPhoto({ token, image: { dataBase64: image.dataBase64, mimeType: image.mimeType } });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["home", token] }),
  });
  const updatePassword = useMutation({
    mutationFn: () => api.setPassword({ token, currentPassword, newPassword }),
    onSuccess: (result) => {
      if (!result.ok) return;
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError("");
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updateEmail = useMutation({
    mutationFn: () => api.setAccountEmail({ token, currentPassword, email: accountEmail }),
    onSuccess: (result) => {
      if (!result.ok) return;
      setEmailNotice(result.emailDelivery === "sent" ? t("confirmationSent") : t("emailServiceNeeded"));
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const resendVerification = useMutation({
    mutationFn: () => api.resendVerificationEmail({ token }),
    onSuccess: (result) => {
      if (!result.ok) return;
      setEmailNotice(result.emailDelivery === "sent" ? t("confirmationSent") : result.emailDelivery === "not_configured" ? t("emailServiceNeeded") : t("emailVerified"));
    },
  });
  const confirmEmail = useMutation({
    mutationFn: () => api.verifyEmail({ token, code: emailCode }),
    onSuccess: (result) => {
      if (!result.ok) return;
      setEmailCode("");
      setEmailNotice(t("emailVerified"));
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  if (home.isPending) return <main className="center-state"><div className="pulse-dot"/><p>{t("tuningRooms")}</p></main>;
  if (home.error || !home.data?.ok || !home.data.user) return <main className="center-state"><Notice tone="error">{home.data?.error ?? t("couldNotLoadRooms")}</Notice><button className="primary-button" onClick={onSignOut}>{t("startAgain")}</button></main>;
  const { user, rooms } = home.data;
  const buyCreditsEnabled = home.data.buyCreditsEnabled !== false;
  const canCreate = true;
  const roleLabel = user.role === "superadmin" ? t("superAdmin") : locale === "vi" ? (user.role === "admin" ? "quản trị viên" : user.role === "moderator" ? "điều hành viên" : "thành viên") : user.role;
  const lobbyPageSize = desktopLobby ? 12 : 10;
  const normalizedLobbySearch = lobbySearch.trim().toLowerCase().replace(/^#/, "");
  const filteredLobbyRooms = normalizedLobbySearch
    ? rooms.filter((room) => room.name.toLowerCase().includes(normalizedLobbySearch) || String(room.id) === normalizedLobbySearch)
    : rooms;
  const lobbyPages = Math.max(1, Math.ceil(filteredLobbyRooms.length / lobbyPageSize));
  const currentLobbyPage = Math.min(lobbyPage, lobbyPages);
  const visibleRooms = filteredLobbyRooms.slice((currentLobbyPage - 1) * lobbyPageSize, currentLobbyPage * lobbyPageSize);
  const changeLobbyPage = (direction: -1 | 1) => setLobbyPage(Math.max(1, Math.min(lobbyPages, currentLobbyPage + direction)));
  const beginLobbySwipe = (event: TouchEvent<HTMLDivElement>) => {
    if (desktopLobby || lobbyPages <= 1) return;
    const touch = event.touches[0];
    if (touch) lobbySwipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const finishLobbySwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = lobbySwipeStart.current;
    lobbySwipeStart.current = null;
    if (desktopLobby || lobbyPages <= 1 || !start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
    suppressLobbyRoomClick.current = true;
    changeLobbyPage(deltaX < 0 ? 1 : -1);
    window.setTimeout(() => { suppressLobbyRoomClick.current = false; }, 350);
  };
  const enterLobbyRoom = (room: (typeof rooms)[number]) => {
    if (room.locked && user.role !== "admin" && user.role !== "superadmin") return;
    if (room.joined) onOpenRoom(room.id);
    else if (room.isPrivate) setPrivateJoin({ id: room.id, name: room.name });
    else join.mutate({ roomId: room.id });
  };
  const openExactLobbySearchMatch = () => {
    const query = lobbySearch.trim();
    if (!query || join.isPending) return;
    const normalizedId = query.replace(/^#/, "");
    const exactRoom = rooms.find((room) => String(room.id) === normalizedId)
      ?? rooms.find((room) => room.name.trim().toLowerCase() === query.toLowerCase());
    if (exactRoom) enterLobbyRoom(exactRoom);
  };
  const adminPageSize = 10;
  const filteredAdminUsers = (adminDashboard.data?.users ?? []).filter((person) => `${person.displayName} ${person.name}`.toLowerCase().includes(adminUserSearch.trim().toLowerCase()));
  const filteredAdminRooms = (adminDashboard.data?.rooms ?? []).filter((room) => room.name.toLowerCase().includes(adminRoomSearch.trim().toLowerCase()));
  const adminUserPages = Math.max(1, Math.ceil(filteredAdminUsers.length / adminPageSize));
  const adminRoomPages = Math.max(1, Math.ceil(filteredAdminRooms.length / adminPageSize));
  const visibleAdminUsers = filteredAdminUsers.slice((Math.min(adminUserPage, adminUserPages) - 1) * adminPageSize, Math.min(adminUserPage, adminUserPages) * adminPageSize);
  const visibleAdminRooms = filteredAdminRooms.slice((Math.min(adminRoomPage, adminRoomPages) - 1) * adminPageSize, Math.min(adminRoomPage, adminRoomPages) * adminPageSize);
  const supportRequests = adminInbox.data?.supportRequests ?? [];
  const isArchivedSupportRequest = (item: (typeof supportRequests)[number]) => item.status === "resolved" || item.status === "dismissed" || (typeof item.assignedTo === "number" && item.assignedTo !== user.id);
  const activeSupportRequests = supportRequests.filter((item) => !isArchivedSupportRequest(item));
  const supportRequestHistory = supportRequests.filter(isArchivedSupportRequest);
  const supportTicketBody = (item: (typeof supportRequests)[number], canManage: boolean) => {
    const key = `support-${item.id}`;
    const canReply = canManage && item.status === "accepted" && item.assignedTo === user.id;
    return <>
      <div className="admin-support-messages">{item.messages.map((entry) => <article className={entry.fromAdmin ? "from-admin" : "from-user"} key={entry.id}><strong>{entry.fromAdmin ? entry.senderName : item.userName}</strong><p>{entry.body}</p><time>{new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(new Date(entry.createdAt))}</time></article>)}</div>
      {canManage && item.status === "open" && <button type="button" className="small-button" disabled={acceptSupportTicket.isPending} onClick={() => acceptSupportTicket.mutate(item.id)}>{t("accepted")}</button>}
      {canReply && <form className="admin-support-reply" onSubmit={(event) => { event.preventDefault(); const body = adminReplyDrafts[item.id]?.trim(); if (body) sendAdminSupportMessage.mutate({ ticketId: item.id, body }); }}><label className="sr-only" htmlFor={`support-reply-${item.id}`}>{t("messageAdmin")}</label><textarea id={`support-reply-${item.id}`} value={adminReplyDrafts[item.id] ?? ""} onChange={(event) => setAdminReplyDrafts((current) => ({ ...current, [item.id]: event.target.value }))} maxLength={1500} rows={2}/><button className="small-button" disabled={sendAdminSupportMessage.isPending || !(adminReplyDrafts[item.id]?.trim())}>{t("sendMessage")}</button></form>}
      {canManage ? <><label><span>{t("reviewNote")}</span><textarea value={reviewNotes[key] ?? item.reviewNote ?? ""} onChange={(event) => setReviewNotes((current) => ({ ...current, [key]: event.target.value }))} maxLength={1000} rows={2}/></label><div className="inbox-actions"><button type="button" disabled={reviewAdminInboxItem.isPending} onClick={() => reviewAdminInboxItem.mutate({ itemType: "support", itemId: item.id, status: "resolved" })}>{t("resolve")}</button><button type="button" disabled={reviewAdminInboxItem.isPending} onClick={() => reviewAdminInboxItem.mutate({ itemType: "support", itemId: item.id, status: "dismissed" })}>{t("dismiss")}</button></div></> : item.reviewNote ? <div className="archived-review-note"><strong>{t("reviewNote")}</strong><p>{item.reviewNote}</p></div> : null}
    </>;
  };
  const isAdmin = user.role === "admin" || user.role === "superadmin";
  const fitLobbyToViewport = !adminOpen && !supportOpen && !friendsOpen && !securityOpen && !creditsOpen && !creating;
  return <main className={`home-shell ${adminOpen ? "admin-view" : supportOpen ? "support-view" : friendsOpen ? "friends-view" : "hot-view"} ${fitLobbyToViewport ? "fit-lobby" : ""}`}>
    <section className="desktop-lobby-hero" aria-label={t("goodToSee")}>
      <div className="desktop-lobby-identity">
        {user.singerCoverPhotoUrl ? <img src={user.singerCoverPhotoUrl} alt=""/> : <span aria-hidden="true">{user.displayName.slice(0, 1).toUpperCase()}</span>}
        <div className="desktop-lobby-profile-copy">
          {editingDisplayName ? <form className="desktop-display-name-editor" onSubmit={(event) => { event.preventDefault(); if (!displayNameDraft.trim()) { setDisplayNameDraft(user.displayName); setEditingDisplayName(false); return; } updateDisplayName.mutate(); }}>
            <label className="sr-only" htmlFor="desktop-display-name">{t("defaultDisplayName")}</label>
            <input id="desktop-display-name" value={displayNameDraft} onChange={(event) => setDisplayNameDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setDisplayNameDraft(user.displayName); setEditingDisplayName(false); } }} minLength={2} maxLength={32} autoFocus disabled={updateDisplayName.isPending}/>
          </form> : <button type="button" className="desktop-display-name" title={`${t("userId")} #${user.id}`} onClick={() => { setDisplayNameDraft(user.displayName); setEditingDisplayName(true); }}><strong>{user.displayName}</strong><Icon name="edit" size={14}/></button>}
          <p><i aria-hidden="true"/> {t("onTheAir")} · {roleLabel}</p>
          {editingPersonalStatus ? <form className="personal-status-form" onSubmit={(event) => { event.preventDefault(); updatePersonalStatus.mutate(); }}>
            <label className="sr-only" htmlFor="personal-status">{t("personalStatus")}</label>
            <input id="personal-status" value={personalStatusDraft} onChange={(event) => setPersonalStatusDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setPersonalStatusDraft(user.personalStatus ?? ""); setEditingPersonalStatus(false); } }} maxLength={80} placeholder={t("personalStatus")} autoFocus disabled={updatePersonalStatus.isPending}/>
          </form> : <button type="button" className={user.personalStatus ? "personal-status-display" : "personal-status-display empty"} onClick={() => { setPersonalStatusDraft(user.personalStatus ?? ""); setEditingPersonalStatus(true); }} aria-label={t("personalStatus")}>{user.personalStatus || t("personalStatus")}</button>}
          {updatePersonalStatus.data?.error && <small className="personal-status-error">{updatePersonalStatus.data.error}</small>}
        </div>
      </div>
      <div className="desktop-lobby-tools">
        <div className="desktop-lobby-actions">
          <button type="button" className="desktop-create-room" onClick={() => setCreating((open) => !open)}><Icon name="plus"/>{t("openRoom")}</button>
          <button type="button" className={securityOpen ? "desktop-round-action active" : "desktop-round-action"} onClick={() => { const next = !securityOpen; setSecurityOpen(next); if (next) setAccountEmail(user.email ?? ""); }} aria-label={t("passwordSecurity")} aria-pressed={securityOpen}><Icon name="shield"/></button>
          <button type="button" className={creditsOpen ? "desktop-round-action active" : "desktop-round-action"} onClick={() => setCreditsOpen((open) => !open)} aria-label={t("credits")} aria-pressed={creditsOpen}><Icon name="users"/></button>
          
          <button type="button" className="desktop-round-action" onClick={() => setConfirmingSignOut(true)} aria-label={t("signOut")}><Icon name="door"/></button>
        </div>
        <label className="desktop-room-search"><span className="sr-only">{t("searchRooms")}</span><input type="search" inputMode="search" value={lobbySearch} onChange={(event) => { setLobbySearch(event.target.value); setLobbyPage(1); }} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); openExactLobbySearchMatch(); } }} placeholder={locale === "vi" ? "Nhập tên hoặc mã số phòng" : "Enter a room name or ID"}/><Icon name="back"/></label>
      </div>
    </section>
    <nav className="desktop-lobby-tabs" aria-label={t("rooms")}>
      <button type="button" className={!supportOpen && !adminOpen && !friendsOpen ? "active" : ""} aria-pressed={!supportOpen && !adminOpen && !friendsOpen} onClick={() => { onSetSupportOpen(false); setAdminOpen(false); setFriendsOpen(false); }}>NỔI BẬT</button>
      <button type="button" className={friendsOpen && !supportOpen && !adminOpen ? "active" : ""} aria-pressed={friendsOpen && !supportOpen && !adminOpen} onClick={() => { onSetSupportOpen(false); setAdminOpen(false); setFriendsOpen(true); }}>{t("friends")}{(friends.data?.incoming.length ?? 0) > 0 && <span className="tab-count">{friends.data?.incoming.length}</span>}</button>
      <button type="button" className={supportOpen && !adminOpen ? "active" : ""} aria-pressed={supportOpen && !adminOpen} onClick={() => { setFriendsOpen(false); setAdminOpen(false); onSetSupportOpen(true); }}>{t("support")}</button>
      {isAdmin && <button type="button" className={adminOpen ? "active" : ""} aria-pressed={adminOpen} onClick={() => { setFriendsOpen(false); onSetSupportOpen(false); setAdminOpen(true); }}>{t("adminDashboard")}</button>}
    </nav>
    <header className="home-top mobile-lobby-only">
      <div><p className="eyebrow">{t("onTheAir")}</p><h1>{t("goodToSee")}, {editingDisplayName ? <form className="mobile-display-name-editor" onSubmit={(event) => { event.preventDefault(); if (!displayNameDraft.trim()) { setDisplayNameDraft(user.displayName); setEditingDisplayName(false); return; } updateDisplayName.mutate(); }}><label className="sr-only" htmlFor="mobile-display-name">{t("defaultDisplayName")}</label><input id="mobile-display-name" value={displayNameDraft} onChange={(event) => setDisplayNameDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setDisplayNameDraft(user.displayName); setEditingDisplayName(false); } }} minLength={2} maxLength={32} autoFocus disabled={updateDisplayName.isPending}/></form> : <button type="button" className="mobile-display-name" title={`${t("userId")} #${user.id}`} onClick={() => { setDisplayNameDraft(user.displayName); setEditingDisplayName(true); }}><em>{user.displayName}</em><Icon name="edit" size={12}/></button>}</h1></div>
      <div className="header-actions"><button className="icon-button" onClick={() => setConfirmingSignOut(true)} aria-label={t("signOut")}><Icon name="door"/></button></div>
    </header>
    <div className="role-line mobile-lobby-only"><span>{t("youAre")} {roleLabel}</span><RoleBadge role={user.role}/><span className="user-id">{t("userId")} #{user.id}</span><button type="button" className={`mobile-friends-button ${friendsOpen ? "active" : ""}`} onClick={() => { setFriendsOpen((open) => !open); setAdminOpen(false); onSetSupportOpen(false); }}><Icon name="users" size={15}/>{t("friends")}{(friends.data?.incoming.length ?? 0) > 0 && <b>{friends.data?.incoming.length}</b>}</button></div>
    <section className={`credit-strip ${creditsOpen ? "is-open" : ""}`}>
      <button type="button" className="credit-toggle" onClick={() => setCreditsOpen((open) => !open)} aria-expanded={creditsOpen}>
        <span className="credit-balance"><strong>{home.data.credit?.balance ?? 0}</strong> {t("credits")}</span><small>{t("earnCredits")}</small>{buyCreditsEnabled && <b>{t("buyCredits")}</b>}
      </button>
      {creditsOpen && <div className="credit-store" aria-label={t("credits")}>
        {buyCreditsEnabled ? <div className="credit-packages">
          {creditStore.data?.packages.map((pack) => <button type="button" key={pack.id} onClick={() => buyCredits.mutate(pack.id)} disabled={buyCredits.isPending}><strong>{pack.credits} {t("credits")}</strong><span>${(pack.priceCents / 100).toFixed(2)}</span><small>{t("buyWithPayPal")}</small></button>)}
        </div> : <p className="credit-unavailable">{t("buyCreditsUnavailable")}</p>}
        {buyCredits.data?.error && <Notice tone="error">{buyCredits.data.error}</Notice>}
        <section className="credit-ledger" aria-label={t("creditHistory")}><h3>{t("creditHistory")}</h3>
          {!creditStore.isPending && (creditStore.data?.transactions.length ?? 0) === 0 ? <p>{t("noCreditActivity")}</p> : <div>{creditStore.data?.transactions.map((entry) => {
            const label = entry.kind === "online_earned" ? t("onlineEarned") : entry.kind === "purchase" ? t("creditPurchase") : entry.kind === "gift_sent" ? t("giftSent") : entry.kind === "gift_received" ? t("giftReceived") : t("adminGrant");
            return <article key={entry.id}><div><strong>{label}</strong><small>{entry.relatedName ? ` · ${entry.relatedName}` : ""}{entry.roomName ? ` · ${entry.roomName}` : ""}</small></div><div className={entry.amount >= 0 ? "positive" : "negative"}><b>{entry.amount > 0 ? "+" : ""}{entry.amount}</b><small>{formatDateTime(entry.createdAt, locale)}</small></div></article>;
          })}</div>}
        </section>
      </div>}
    </section>
    <section className={`security-strip ${securityOpen ? "is-open" : ""}`}>
      <button type="button" className="security-toggle" onClick={() => { const next = !securityOpen; setSecurityOpen(next); if (next) setAccountEmail(user.email ?? ""); setPasswordError(""); setEmailNotice(""); updatePassword.reset(); updateEmail.reset(); resendVerification.reset(); confirmEmail.reset(); }} aria-expanded={securityOpen}>
        <span><Icon name="shield"/></span>
        <div><strong>{t("passwordSecurity")}</strong><small>{user.hasPassword ? t("changeSignInPassword") : t("setPasswordAnotherDevice")}</small></div>
      </button>
      {securityOpen && <div className="security-form">
        <section className="singer-cover-setting" aria-label={t("singerCoverPhoto")}>
          {user.singerCoverPhotoUrl ? <img src={user.singerCoverPhotoUrl} alt=""/> : <div className="photo-placeholder" aria-hidden="true">{user.displayName.slice(0, 1).toUpperCase()}</div>}
          <div><strong>{t("singerCoverPhoto")}</strong><small>{t("singerCoverHint")}</small><div className="photo-actions"><label className="small-button">{updateSingerCoverPhoto.isPending ? t("saving") : t("changePhoto")}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={updateSingerCoverPhoto.isPending} onChange={(event) => { const input = event.currentTarget; const file = input.files?.[0]; if (file) updateSingerCoverPhoto.mutate(file); input.value = ""; }}/></label>{user.singerCoverPhotoUrl && <button type="button" className="cancel-button" disabled={updateSingerCoverPhoto.isPending} onClick={() => updateSingerCoverPhoto.mutate(null)}>{t("removePhoto")}</button>}</div>{updateSingerCoverPhoto.data?.error && <Notice tone="error">{updateSingerCoverPhoto.data.error}</Notice>}</div>
        </section>
        <section className="email-security" aria-label={t("emailStatus")}>
          <div className="email-status"><strong>{t("emailStatus")}</strong><span>{user.email ?? t("noEmail")}</span>{user.email && <small className={user.emailVerified ? "verified" : "pending"}>{user.emailVerified ? t("verified") : t("notVerified")}</small>}</div>
          <form onSubmit={(event) => { event.preventDefault(); setEmailNotice(""); updateEmail.mutate(); }}>
            <label htmlFor="security-email">{t("addOrChangeEmail")}</label>
            <input id="security-email" type="email" value={accountEmail} onChange={(event) => setAccountEmail(event.target.value)} maxLength={254} autoComplete="email" placeholder={t("yourEmail")} required/>
            {user.hasPassword && <><label htmlFor="email-current-password">{t("currentPassword")}</label><input id="email-current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} maxLength={72} autoComplete="current-password" required/></>}
            <button className="small-button security-inline-button" disabled={updateEmail.isPending}>{updateEmail.isPending ? t("saving") : t("save")}</button>
          </form>
          {user.email && !user.emailVerified && <div className="verification-tools">
            <button type="button" className="text-button" onClick={() => resendVerification.mutate()} disabled={resendVerification.isPending}>{t("sendConfirmation")}</button>
            <form onSubmit={(event) => { event.preventDefault(); confirmEmail.mutate(); }}>
              <label className="sr-only" htmlFor="confirmation-code">{t("confirmationCode")}</label>
              <input id="confirmation-code" value={emailCode} onChange={(event) => setEmailCode(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" placeholder={t("confirmationCode")} required/>
              <button className="small-button" disabled={confirmEmail.isPending || emailCode.length !== 6}>{t("verifyEmail")}</button>
            </form>
          </div>}
          {(updateEmail.data?.error || resendVerification.data?.error || confirmEmail.data?.error) && <Notice tone="error">{updateEmail.data?.error || resendVerification.data?.error || confirmEmail.data?.error}</Notice>}
          {emailNotice && <Notice>{emailNotice}</Notice>}
        </section>
        <form className="password-form" onSubmit={(event) => {
          event.preventDefault();
          setPasswordError("");
          if (newPassword !== confirmNewPassword) { setPasswordError(t("newPasswordsMismatch")); return; }
          updatePassword.mutate();
        }}>
          {user.hasPassword && <><label htmlFor="current-password">{t("currentPassword")}</label><input id="current-password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} maxLength={72} autoComplete="current-password" required/></>}
          <label htmlFor="new-password">{t("newPassword")}</label>
          <input id="new-password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} minLength={6} maxLength={72} autoComplete="new-password" placeholder={t("atLeastSix")} required/>
          <label htmlFor="confirm-new-password">{t("confirmNewPassword")}</label>
          <input id="confirm-new-password" type="password" value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} minLength={6} maxLength={72} autoComplete="new-password" required/>
          <div className="security-actions"><button className="primary-button" disabled={updatePassword.isPending || newPassword.length < 6}>{updatePassword.isPending ? t("saving") : user.hasPassword ? t("changePassword") : t("setPassword")}</button><button type="button" className="cancel-button" onClick={() => setSecurityOpen(false)}>{t("cancel")}</button></div>
          {(passwordError || updatePassword.data?.error) && <Notice tone="error">{passwordError || updatePassword.data?.error}</Notice>}
        </form>
      </div>}
    </section>
    {canCreate && <section className="create-strip">
      {!creating ? <button className="create-room-button" onClick={() => setCreating(true)}><span><Icon name="plus"/></span><div><strong>{t("openRoom")}</strong><small>{t("openRoomHint")}</small></div></button> :
      <form onSubmit={(e) => { e.preventDefault(); createRoom.mutate(); }} className="create-form">
        <label htmlFor="room-name">{t("roomName")}</label>
        <div className="name-row"><input id="room-name" value={roomName} onChange={(e) => setRoomName(e.target.value)} placeholder={t("roomPlaceholder")} minLength={2} maxLength={42} autoFocus required/><button className="primary-button" disabled={createRoom.isPending}>{t("open")}</button></div>
        <button type="button" className="cancel-button" onClick={() => setCreating(false)}>{t("cancel")}</button>
        {createRoom.data?.error && <Notice tone="error">{createRoom.data.error}</Notice>}
      </form>}
    </section>}
    {!adminOpen && !supportOpen && !friendsOpen && <section className="rooms-section">
      <div className="section-heading"><h2>{t("rooms")}</h2><span>{filteredLobbyRooms.length}</span></div>
      {filteredLobbyRooms.length === 0 ? <div className="empty-room"><div className="empty-wave" aria-hidden="true"><i/><i/><i/><i/><i/></div><h3>{rooms.length === 0 ? t("quiet") : t("noAdminData")}</h3><p>{rooms.length === 0 ? (canCreate ? t("quietCreator") : t("quietMember")) : t("searchRooms")}</p></div> :
      <><div className="room-list" onTouchStart={beginLobbySwipe} onTouchEnd={finishLobbySwipe} onTouchCancel={() => { lobbySwipeStart.current = null; }}>{visibleRooms.map((room, index) => <article className="room-row" key={room.id}>
        <div className="desktop-room-cover" aria-hidden="true">{room.profileImageUrl ? <img src={room.profileImageUrl} alt=""/> : <span>{room.name.slice(0, 1).toUpperCase()}</span>}</div>
        {room.profileImageUrl && <img className="room-profile-image" src={room.profileImageUrl} alt=""/>}
        <div className="room-number">{twoDigits((currentLobbyPage - 1) * lobbyPageSize + index + 1)}</div>
        <button className="room-main" disabled={room.locked && user.role !== "admin" && user.role !== "superadmin"} onClick={() => { if (suppressLobbyRoomClick.current) return; enterLobbyRoom(room); }}>
          <span className="room-name-line"><strong>{room.name}</strong>{room.isOwner && <RoleBadge role="owner"/>}{room.isPrivate && <span className="private-room-badge">{t("privateRoom")}</span>}{room.locked && <span className="locked-room-badge">{t("lockedRoom")}</span>}</span>
          <span className="mobile-room-summary">{t("roomLevel")} {room.level} · {room.activeCount > 0 ? `${room.activeCount} ${t("hereNow")}` : room.participantCount > 0 ? `${room.participantCount} ${t("joined")}` : t("waitingVoices")}</span>
          <span className="desktop-room-meta"><strong>{room.name}</strong><small>ID: {room.id}</small><small>Online: {room.activeCount}</small></span>
        </button>
        {user.role !== "admin" && user.role !== "superadmin" && <button type="button" className="room-report" aria-label={`${t("reportRoom")}: ${room.name}`} onClick={() => setReportTarget({ type: "room", id: room.id, name: room.name })}>{t("report")}</button>}
        {room.canDelete ? <button type="button" className="room-delete" aria-label={`${t("deleteRoom")} ${room.name}`} onClick={() => setDeletingRoom({ id: room.id, name: room.name })}><Icon name="trash" size={19}/></button> : <span className={`live-pin ${room.activeCount > 0 ? "active" : ""}`} aria-label={room.activeCount > 0 ? t("activeNow") : t("inactive")}/>} 
      </article>)}</div>
      {lobbyPages > 1 && <nav className="lobby-pagination" aria-label={`${t("page")} ${currentLobbyPage} / ${lobbyPages}`}>
        <button type="button" className="lobby-page-arrow previous" aria-label={t("previous")} disabled={currentLobbyPage <= 1} onClick={() => changeLobbyPage(-1)}><Icon name="back" size={21}/></button>
        <div className="lobby-pagination-dots">{Array.from({ length: lobbyPages }, (_, pageIndex) => { const pageNumber = pageIndex + 1; return <button key={pageNumber} type="button" className={pageNumber === currentLobbyPage ? "active" : ""} aria-label={`${t("page")} ${pageNumber}`} aria-current={pageNumber === currentLobbyPage ? "page" : undefined} onClick={() => setLobbyPage(pageNumber)}><span className="sr-only">{t("page")} {pageNumber}</span></button>; })}</div>
        <button type="button" className="lobby-page-arrow next" aria-label={t("next")} disabled={currentLobbyPage >= lobbyPages} onClick={() => changeLobbyPage(1)}><Icon name="back" size={21}/></button>
      </nav>}</>}
      {(join.data?.error || deleteRoom.data?.error) && <Notice tone="error">{join.data?.error || deleteRoom.data?.error}</Notice>}
    </section>}
    {friendsOpen && !supportOpen && !adminOpen && <section className="friends-panel" aria-label={t("friends")}>
      <div className="section-heading"><h2>{t("friends")}</h2><span>{friends.data?.friends.length ?? 0}</span></div>
      {friends.isPending ? <div className="admin-loading"><div className="pulse-dot"/><span>{t("pleaseWait")}</span></div> : <>
        <div className="friend-request-section"><h3>{t("friendRequests")}</h3>
          {(friends.data?.incoming.length ?? 0) === 0 ? <p>{t("noFriendRequests")}</p> : friends.data?.incoming.map((request) => <article className="friend-row" key={request.requestId}><div className="avatar">{request.name.slice(0, 1).toUpperCase()}</div><strong>{request.name}</strong><div><button type="button" className="small-button" disabled={respondFriend.isPending} onClick={() => respondFriend.mutate({ requestId: request.requestId, response: "accept" })}>{t("accept")}</button><button type="button" className="cancel-button" disabled={respondFriend.isPending} onClick={() => respondFriend.mutate({ requestId: request.requestId, response: "decline" })}>{t("decline")}</button></div></article>)}
        </div>
        <div className="friend-list-section"><h3>{t("friends")}</h3>
          {(friends.data?.friends.length ?? 0) === 0 ? <p>{t("noFriends")}</p> : friends.data?.friends.map((friend) => <article className="friend-row" key={friend.userId}><div className="avatar">{friend.name.slice(0, 1).toUpperCase()}</div><strong>{friend.name}</strong></article>)}
          {(friends.data?.outgoing.length ?? 0) > 0 && <div className="outgoing-friends"><h3>{t("requestSent")}</h3>{friends.data?.outgoing.map((request) => <p key={request.requestId}>{request.name}</p>)}</div>}
        </div>
      </>}
      {(friends.data?.error || respondFriend.data?.error) && <Notice tone="error">{friends.data?.error || respondFriend.data?.error}</Notice>}
    </section>}
    {supportOpen && !adminOpen && <section className="support-tab-content" aria-label={t("support")}><SupportChatPanel token={token} embedded/></section>}
    {isAdmin && <section className={`admin-dashboard ${adminOpen ? "is-open" : ""}`}>
      <button type="button" className="admin-dashboard-toggle mobile-lobby-only" onClick={() => setAdminOpen((open) => !open)} aria-expanded={adminOpen}>
        <span><Icon name="shield"/></span><div><strong>{t("adminDashboard")}</strong><small>{t("adminUsers")} · {t("adminRooms")} · {t("masterLogs")}</small></div>
      </button>
      {adminOpen && <div className="admin-dashboard-body">
        <div className="admin-tabs" role="tablist" aria-label={t("adminDashboard")}>
          <button type="button" role="tab" aria-selected={adminTab === "users"} className={adminTab === "users" ? "active" : ""} onClick={() => setAdminTab("users")}>{t("adminUsers")} <span>{adminDashboard.data?.users.length ?? 0}</span></button>
          <button type="button" role="tab" aria-selected={adminTab === "rooms"} className={adminTab === "rooms" ? "active" : ""} onClick={() => setAdminTab("rooms")}>{t("adminRooms")} <span>{adminDashboard.data?.rooms.length ?? 0}</span></button>
          <button type="button" role="tab" aria-selected={adminTab === "reports"} className={adminTab === "reports" ? "active" : ""} onClick={() => setAdminTab("reports")}>{t("reports")} <span>{adminInbox.data?.reports.filter((item) => item.status === "open").length ?? 0}</span></button>
          <button type="button" role="tab" aria-selected={adminTab === "support"} className={adminTab === "support" ? "active" : ""} onClick={() => setAdminTab("support")}>{t("support")} <span>{adminInbox.data?.supportRequests.filter((item) => item.status === "open").length ?? 0}</span></button>
          <button type="button" role="tab" aria-selected={adminTab === "credits"} className={adminTab === "credits" ? "active" : ""} onClick={() => setAdminTab("credits")}>{t("credits")}</button>
          <button type="button" role="tab" aria-selected={adminTab === "logs"} className={adminTab === "logs" ? "active" : ""} onClick={() => setAdminTab("logs")}>{t("masterLogs")}</button>
        </div>
        {adminDashboard.isPending && <div className="admin-loading"><div className="pulse-dot"/><span>{t("pleaseWait")}</span></div>}
        {(adminDashboard.data?.error || adminInbox.data?.error || adminLogs.data?.error || reviewAdminInboxItem.data?.error || acceptSupportTicket.data?.error || sendAdminSupportMessage.data?.error || manageUserAccess.data?.error || grantCredits.data?.error || manageRoomLock.data?.error || restoreRoom.data?.error || transferRoomOwnership.data?.error || setBuyCreditsEnabled.data?.error) && <Notice tone="error">{adminDashboard.data?.error || adminInbox.data?.error || adminLogs.data?.error || reviewAdminInboxItem.data?.error || acceptSupportTicket.data?.error || sendAdminSupportMessage.data?.error || manageUserAccess.data?.error || grantCredits.data?.error || manageRoomLock.data?.error || restoreRoom.data?.error || transferRoomOwnership.data?.error || setBuyCreditsEnabled.data?.error}</Notice>}
        {adminDashboard.data?.ok && adminTab === "users" && <div className="admin-records">
          <label className="admin-search"><span className="sr-only">{t("searchUsers")}</span><input type="search" value={adminUserSearch} onChange={(event) => { setAdminUserSearch(event.target.value); setAdminUserPage(1); }} placeholder={t("searchUsers")}/></label>
          {filteredAdminUsers.length === 0 ? <p className="admin-empty">{t("noAdminData")}</p> : visibleAdminUsers.map((person) => <article className={`admin-record ${person.deletedAt ? "deleted" : ""}`} key={person.id} title={`${t("userId")} #${person.id}`}>
            <div className="admin-record-heading"><div className="avatar">{person.displayName.slice(0, 1).toUpperCase()}</div><div><strong>{person.displayName}</strong><small>@{person.name} · {t("userId")} #{person.id} · {person.role}</small></div><div className="admin-statuses">{person.deletedAt && <span className="danger-status">{t("deleted")}</span>}{person.accountLocked && <span>{t("accountLocked")}</span>}{person.ipBlocked && <span className="danger-status">{t("networkBlocked")}</span>}</div></div>
            <dl className="admin-details"><div><dt>{t("email")}</dt><dd>{person.email ?? "—"}</dd></div><div><dt>{t("ipAddress")}</dt><dd className="ip-value">{person.lastIpAddress ?? t("ipUnknown")}</dd></div><div><dt>{t("lastSeen")}</dt><dd>{person.ipLastSeenAt ? formatDateTime(person.ipLastSeenAt, locale) : "—"}</dd></div></dl>
            {user.role === "superadmin" && person.id !== user.id && !person.deletedAt && <form className="admin-credit-grant" onSubmit={(event) => { event.preventDefault(); const amount = Number(creditGrantAmounts[person.id] ?? ""); if (Number.isInteger(amount) && amount > 0) grantCredits.mutate({ targetUserId: person.id, amount }); }}>
              <label htmlFor={`credit-grant-${person.id}`}>{t("giveCredits")}</label><input id={`credit-grant-${person.id}`} type="number" min="1" max="1000000" inputMode="numeric" value={creditGrantAmounts[person.id] ?? ""} onChange={(event) => setCreditGrantAmounts((current) => ({ ...current, [person.id]: event.target.value }))} placeholder={t("creditAmount")} required/><button type="submit" className="small-button" disabled={grantCredits.isPending}>{t("giveCredits")}</button>
            </form>}
            {person.role !== "superadmin" && (person.role !== "admin" || user.role === "superadmin") && <div className="admin-actions">
              {person.deletedAt ? <button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: "restore", label: `${t("restoreUser")}: ${person.displayName}` })}>{t("restoreUser")}</button> : person.role === "admin" ? <>
                <button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: "demote_admin", label: `${t("demoteAdmin")}: ${person.displayName}` })}>{t("demoteAdmin")}</button>
                <button type="button" className="small-button danger" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: "delete", label: `${t("deleteUser")}: ${person.displayName}` })}>{t("deleteUser")}</button>
              </> : <>
                <button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: person.accountLocked ? "unlock" : "lock", label: `${person.accountLocked ? t("unlockAccount") : t("lockAccount")}: ${person.displayName}` })}>{person.accountLocked ? t("unlockAccount") : t("lockAccount")}</button>
                <button type="button" className="small-button" disabled={!person.lastIpAddress} onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: person.ipBlocked ? "unblock_ip" : "block_ip", label: `${person.ipBlocked ? t("unblockIp") : t("blockIp")}: ${person.lastIpAddress ?? person.displayName}` })}>{person.ipBlocked ? t("unblockIp") : t("blockIp")}</button>
                {user.role === "superadmin" && <button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: "promote_admin", label: `${t("promoteAdmin")}: ${person.displayName}` })}>{t("promoteAdmin")}</button>}
                <button type="button" className="small-button danger" onClick={() => setPendingAdminAction({ kind: "user", userId: person.id, action: "delete", label: `${t("deleteUser")}: ${person.displayName}` })}>{t("deleteUser")}</button>
              </>}
            </div>}
          </article>)}
          {adminUserPages > 1 && <div className="admin-pagination"><button type="button" disabled={adminUserPage <= 1} onClick={() => setAdminUserPage((page) => Math.max(1, page - 1))}>{t("previous")}</button><span>{t("page")} {Math.min(adminUserPage, adminUserPages)} / {adminUserPages}</span><button type="button" disabled={adminUserPage >= adminUserPages} onClick={() => setAdminUserPage((page) => Math.min(adminUserPages, page + 1))}>{t("next")}</button></div>}
        </div>}
        {adminDashboard.data?.ok && adminTab === "rooms" && <div className="admin-records">
          <label className="admin-search"><span className="sr-only">{t("searchRooms")}</span><input type="search" value={adminRoomSearch} onChange={(event) => { setAdminRoomSearch(event.target.value); setAdminRoomPage(1); }} placeholder={t("searchRooms")}/></label>
          {filteredAdminRooms.length === 0 ? <p className="admin-empty">{t("noAdminData")}</p> : visibleAdminRooms.map((adminRoom) => <article className={`admin-record ${adminRoom.deletedAt ? "deleted" : ""}`} key={adminRoom.id}>
            <div className="admin-record-heading"><div className="room-admin-number">#{adminRoom.id}</div><div><strong>{adminRoom.name}</strong><small>{t("roomOwner")}: {adminRoom.ownerName} · {t("roomLevel")} {adminRoom.level} · {adminRoom.participantCount} {t("joined")}</small></div><div className="admin-statuses">{adminRoom.deletedAt && <span className="danger-status">{t("deleted")}</span>}{adminRoom.locked && <span className="danger-status">{t("lockedRoom")}</span>}</div></div>
            {adminRoom.locked && adminRoom.lockReason && <p className="room-lock-note">{adminRoom.lockReason}</p>}
            {adminRoom.deletedAt ? <div className="admin-actions"><button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "room", roomId: adminRoom.id, action: "restore", label: `${t("restoreRoom")}: ${adminRoom.name}` })}>{t("restoreRoom")}</button></div> : <>
              {!adminRoom.locked && <label className="admin-reason"><span>{t("lockReason")}</span><input value={roomLockReasons[adminRoom.id] ?? ""} onChange={(event) => setRoomLockReasons((current) => ({ ...current, [adminRoom.id]: event.target.value }))} maxLength={240} placeholder={t("communityReview")}/></label>}
              <div className="admin-actions"><button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "room", roomId: adminRoom.id, action: adminRoom.level < 2 ? "upgrade" : "downgrade", label: `${adminRoom.level < 2 ? t("upgradeLevelTwo") : t("downgradeLevelOne")}: ${adminRoom.name}` })}>{adminRoom.level < 2 ? t("upgradeLevelTwo") : t("downgradeLevelOne")}</button><button type="button" className="small-button" onClick={() => setPendingAdminAction({ kind: "room", roomId: adminRoom.id, action: adminRoom.locked ? "unlock" : "lock", reason: roomLockReasons[adminRoom.id], label: `${adminRoom.locked ? t("unlockRoom") : t("lockRoom")}: ${adminRoom.name}` })}>{adminRoom.locked ? t("unlockRoom") : t("lockRoom")}</button><button type="button" className="small-button danger" onClick={() => setPendingAdminAction({ kind: "room", roomId: adminRoom.id, action: "delete", label: `${t("deleteRoom")}: ${adminRoom.name}` })}>{t("deleteRoom")}</button></div>
              <form className="owner-transfer-form" onSubmit={(event) => { event.preventDefault(); const targetUserId = Number(roomOwnerTargets[adminRoom.id] ?? ""); const target = adminDashboard.data?.users.find((person) => person.id === targetUserId); if (target) setPendingAdminAction({ kind: "owner", roomId: adminRoom.id, targetUserId, label: `${t("transferOwnership")}: ${adminRoom.name} → ${target.displayName}` }); }}>
                <label htmlFor={`room-owner-${adminRoom.id}`}>{t("newRoomOwner")}</label><select id={`room-owner-${adminRoom.id}`} value={roomOwnerTargets[adminRoom.id] ?? ""} onChange={(event) => setRoomOwnerTargets((current) => ({ ...current, [adminRoom.id]: event.target.value }))} required><option value="">{t("chooseNewOwner")}</option>{adminDashboard.data.users.filter((person) => !person.deletedAt && person.id !== adminRoom.ownerId).map((person) => <option key={person.id} value={person.id}>{person.displayName} (@{person.name})</option>)}</select><button className="small-button" disabled={transferRoomOwnership.isPending}>{t("transferOwnership")}</button>
              </form>
            </>}
          </article>)}
          {adminRoomPages > 1 && <div className="admin-pagination"><button type="button" disabled={adminRoomPage <= 1} onClick={() => setAdminRoomPage((page) => Math.max(1, page - 1))}>{t("previous")}</button><span>{t("page")} {Math.min(adminRoomPage, adminRoomPages)} / {adminRoomPages}</span><button type="button" disabled={adminRoomPage >= adminRoomPages} onClick={() => setAdminRoomPage((page) => Math.min(adminRoomPages, page + 1))}>{t("next")}</button></div>}
        </div>}
        {adminTab === "reports" && <section className="admin-inbox-panel">
          <div className="inbox-column"><div className="master-log-heading"><h3>{t("reports")}</h3><p>{adminInbox.data?.reports.length ?? 0}</p></div>
            {adminInbox.isPending ? <div className="admin-loading"><div className="pulse-dot"/><span>{t("pleaseWait")}</span></div> : (adminInbox.data?.reports.length ?? 0) === 0 ? <p className="admin-empty">{t("noReports")}</p> : <div className="inbox-list">{adminInbox.data?.reports.map((item) => { const key = `report-${item.id}`; return <article className="inbox-item" key={key}><div className="inbox-heading"><strong>{item.targetType === "user" ? t("reportUser") : t("reportRoom")}: {item.targetName}</strong><span className={`case-status ${item.status}`}>{item.status === "open" ? t("openCases") : t(item.status)}</span></div><small>{item.reporterName} · {t("userId")} #{item.reporterId} · {formatDateTime(item.createdAt, locale)}</small><b>{t(item.category)}</b><p>{item.details}</p>{item.attachments.length > 0 && <div className="report-attachments"><strong>{t("attachments")}</strong>{item.attachments.map((attachment) => <a key={attachment.id} href={attachment.url} target="_blank" rel="noreferrer" download={attachment.fileName} aria-label={`${t("openAttachment")}: ${attachment.fileName}`}><span>{attachment.fileName}</span><small>{formatFileSize(attachment.sizeBytes)}</small></a>)}</div>}<label><span>{t("reviewNote")}</span><textarea value={reviewNotes[key] ?? item.reviewNote ?? ""} onChange={(event) => setReviewNotes((current) => ({ ...current, [key]: event.target.value }))} maxLength={1000} rows={2}/></label><div className="inbox-actions"><button type="button" disabled={reviewAdminInboxItem.isPending} onClick={() => reviewAdminInboxItem.mutate({ itemType: "report", itemId: item.id, status: "reviewing" })}>{t("markReviewing")}</button><button type="button" disabled={reviewAdminInboxItem.isPending} onClick={() => reviewAdminInboxItem.mutate({ itemType: "report", itemId: item.id, status: "resolved" })}>{t("resolve")}</button><button type="button" disabled={reviewAdminInboxItem.isPending} onClick={() => reviewAdminInboxItem.mutate({ itemType: "report", itemId: item.id, status: "dismissed" })}>{t("dismiss")}</button></div></article>; })}</div>}
          </div>
        </section>}
        {adminTab === "support" && <section className="admin-inbox-panel">
          <div className="inbox-column"><div className="master-log-heading"><h3>{t("supportRequests")}</h3><p>{supportRequests.length}</p></div>
            {adminInbox.isPending ? <div className="admin-loading"><div className="pulse-dot"/><span>{t("pleaseWait")}</span></div> : supportRequests.length === 0 ? <p className="admin-empty">{t("noSupport")}</p> : <>
              <section className="support-queue-section" aria-labelledby="active-support-heading"><div className="support-subheading"><h4 id="active-support-heading">{t("activeSupportQueue")}</h4><span>{activeSupportRequests.length}</span></div>
                {activeSupportRequests.length === 0 ? <p className="admin-empty">{t("noActiveSupport")}</p> : <div className="inbox-list">{activeSupportRequests.map((item) => <article className="inbox-item support-ticket" key={`support-${item.id}`}><div className="inbox-heading"><strong>{t("ticketNumber")} #{item.id} · {item.userName}</strong><span className={`case-status ${item.status}`}>{item.status === "open" ? t("openCases") : t(item.status)}</span></div><small>{t("userId")} #{item.userId} · {formatDateTime(item.createdAt, locale)}{item.adminName ? ` · ${t("acceptedByAdmin")} ${item.adminName}` : ""}</small>{supportTicketBody(item, true)}</article>)}</div>}
              </section>
              <details className="support-history">
                <summary><strong>{t("supportHistory")}</strong><span>{supportRequestHistory.length}</span></summary>
                {supportRequestHistory.length === 0 ? <p className="admin-empty">{t("noSupport")}</p> : <div className="inbox-list history-list">{supportRequestHistory.map((item) => <details className="inbox-item support-ticket archived-support-ticket" key={`support-history-${item.id}`}><summary><div className="inbox-heading"><strong>{t("ticketNumber")} #{item.id} · {item.userName}</strong><span className={`case-status ${item.status}`}>{item.status === "open" ? t("openCases") : t(item.status)}</span></div><small className="ticket-summary-meta">{t("userId")} #{item.userId} · {formatDateTime(item.createdAt, locale)}{item.adminName ? ` · ${t("acceptedByAdmin")} ${item.adminName}` : ""}</small></summary><div className="support-ticket-body">{supportTicketBody(item, false)}</div></details>)}</div>}
              </details>
            </>}
          </div>
        </section>}
        {adminTab === "logs" && <section className="master-log-panel">
          <div className="master-log-heading"><h3>{t("masterLogs")}</h3><p>{t("logsRetained")}</p></div>
          {adminLogs.isPending ? <div className="admin-loading"><div className="pulse-dot"/><span>{t("pleaseWait")}</span></div> : (adminLogs.data?.logs.length ?? 0) === 0 ? <p className="admin-empty">{t("noAdminData")}</p> : <div className="master-log-list">{adminLogs.data?.logs.map((entry) => <article className="master-log-entry" key={entry.id}>
            <div className="master-log-meta"><strong>{entry.actorName}</strong><span>{entry.userId ? `${t("userId")} #${entry.userId}` : "—"}</span><time dateTime={entry.createdAt}>{formatDateTime(entry.createdAt, locale)}</time></div>
            <p>{entry.details}</p><small>{entry.roomName ? `${entry.roomName} · ` : ""}{entry.action}</small>
          </article>)}</div>}
        </section>}
        {adminTab === "credits" && <div className="admin-credit-panel">
          <section className="buy-credit-setting" aria-label={t("buyCreditsAvailable")}>
            <div><strong>{t("buyCreditsAvailable")}</strong><small>{t("buyCreditsControlHint")}</small></div>
            <button type="button" role="switch" aria-checked={adminCredits.data?.buyCreditsEnabled ?? false} className={adminCredits.data?.buyCreditsEnabled ? "on" : ""} disabled={!adminCredits.data?.ok || setBuyCreditsEnabled.isPending} onClick={() => setBuyCreditsEnabled.mutate(!(adminCredits.data?.buyCreditsEnabled ?? false))}><span aria-hidden="true"/><b>{adminCredits.data?.buyCreditsEnabled ? t("buyCreditsOn") : t("buyCreditsOff")}</b></button>
          </section>
          <form className="package-form" onSubmit={(event) => { event.preventDefault(); addCreditPackage.mutate(); }}>
            <h3>{t("addPackage")}</h3>
            <label htmlFor="package-credits">{t("packageCredits")}</label><input id="package-credits" type="number" min="1" max="1000000" inputMode="numeric" value={packageCredits} onChange={(event) => setPackageCredits(event.target.value)} required/>
            <label htmlFor="package-price">{t("packagePrice")}</label><input id="package-price" type="number" min="0.01" max="1000000" step="0.01" inputMode="decimal" value={packagePrice} onChange={(event) => setPackagePrice(event.target.value)} required/>
            <button className="small-button" disabled={addCreditPackage.isPending}>{t("addPackage")}</button>
            {addCreditPackage.data?.error && <Notice tone="error">{addCreditPackage.data.error}</Notice>}
          </form>
          <section><h3>{t("creditPackages")}</h3><div className="admin-package-list">{adminCredits.data?.packages.map((pack) => <article key={pack.id}><strong>{pack.credits} {t("credits")}</strong><span>${(pack.priceCents / 100).toFixed(2)}</span></article>)}</div></section>
          <section><h3>{t("purchaseLog")}</h3>{!adminCredits.isPending && (adminCredits.data?.purchases.length ?? 0) === 0 ? <p className="admin-empty">{t("noPurchases")}</p> : <div className="purchase-log">{adminCredits.data?.purchases.map((purchase) => <article key={purchase.id}><div><strong>{purchase.userName}</strong><small>{purchase.credits} {t("credits")} · ${(purchase.priceCents / 100).toFixed(2)}</small></div><div><span>{purchase.status}</span><small>{formatDateTime(purchase.createdAt, locale)}</small></div></article>)}</div>}</section>
          {adminCredits.data?.error && <Notice tone="error">{adminCredits.data.error}</Notice>}
        </div>}
      </div>}
    </section>}
    {reportTarget && <ReportDialog key={`${reportTarget.type}-${reportTarget.id}`} token={token} target={reportTarget} onClose={() => setReportTarget(null)}/>} 
    {privateJoin && <div className="dialog-backdrop" role="presentation"><form className="confirmation-dialog private-room-dialog" role="dialog" aria-modal="true" onSubmit={(event) => { event.preventDefault(); join.mutate({ roomId: privateJoin.id, password: privateRoomPassword }); }}>
      <h2>{privateJoin.name}</h2><p>{t("enterRoomPassword")}</p><label htmlFor="private-room-password">{t("roomPassword")}</label><input id="private-room-password" type="password" minLength={4} maxLength={72} value={privateRoomPassword} onChange={(event) => setPrivateRoomPassword(event.target.value)} autoFocus required/>
      {join.data?.error && <Notice tone="error">{join.data.error}</Notice>}<div className="confirmation-actions"><button type="button" className="cancel-button" onClick={() => { setPrivateJoin(null); setPrivateRoomPassword(""); join.reset(); }}>{t("cancel")}</button><button className="confirm-button" disabled={join.isPending}>{t("open")}</button></div>
    </form></div>}
    {pendingAdminAction && <ConfirmationDialog message={`${pendingAdminAction.label}. ${t("adminConfirmAction")}`} confirmLabel={t("confirm")} onCancel={() => setPendingAdminAction(null)} onConfirm={() => {
      if (pendingAdminAction.kind === "user") manageUserAccess.mutate({ targetUserId: pendingAdminAction.userId, action: pendingAdminAction.action });
      else if (pendingAdminAction.kind === "owner") transferRoomOwnership.mutate({ roomId: pendingAdminAction.roomId, targetUserId: pendingAdminAction.targetUserId });
      else if (pendingAdminAction.action === "restore") restoreRoom.mutate(pendingAdminAction.roomId);
      else if (pendingAdminAction.action === "delete") deleteRoom.mutate(pendingAdminAction.roomId);
      else if (pendingAdminAction.action === "upgrade" || pendingAdminAction.action === "downgrade") setRoomLevel.mutate({ roomId: pendingAdminAction.roomId, level: pendingAdminAction.action === "upgrade" ? 2 : 1 });
      else manageRoomLock.mutate({ roomId: pendingAdminAction.roomId, locked: pendingAdminAction.action === "lock", reason: pendingAdminAction.reason });
    }}/>} 
    {confirmingSignOut && <ConfirmationDialog
      message={locale === "vi" ? "Bạn có chắc muốn đăng xuất không? Bạn sẽ mất vị trí trong mọi hàng chờ mic." : "Are you sure you want to sign out? You’ll lose your position in any mic queue."}
      confirmLabel={t("signOut")}
      onCancel={() => setConfirmingSignOut(false)}
      onConfirm={onSignOut}
    />}
    {deletingRoom && <ConfirmationDialog
      message={t("deleteRoomConfirm").replace("{name}", deletingRoom.name)}
      confirmLabel={t("deleteRoom")}
      onCancel={() => setDeletingRoom(null)}
      onConfirm={() => deleteRoom.mutate(deletingRoom.id)}
    />}
  </main>;
}

function StreamVideo({ stream, label, mirrored = false, onOrientationChange }: { stream: MediaStream; label: string; mirrored?: boolean; onOrientationChange?: (portrait: boolean) => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.srcObject = stream;
    void video.play().catch(() => undefined);
    return () => { video.srcObject = null; };
  }, [stream]);
  return <video ref={ref} className={mirrored ? "mirrored" : ""} autoPlay playsInline muted aria-label={label} onLoadedMetadata={(event) => onOrientationChange?.(event.currentTarget.videoHeight > event.currentTarget.videoWidth)}/>;
}

function RemoteAudio({ stream, name, onPlaybackBlocked, onPlaybackStarted }: { stream: MediaStream; name: string; onPlaybackBlocked: () => void; onPlaybackStarted: () => void }) {
  const { locale } = useLocale();
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = ref.current;
    if (!audio) return;
    audio.srcObject = stream;
    // A remote track can arrive after the original button gesture. Some
    // embedded mobile browsers reject that delayed play attempt, so surface a
    // real user-gesture fallback instead of silently swallowing the failure.
    void audio.play().then(onPlaybackStarted).catch(onPlaybackBlocked);
    return () => { audio.srcObject = null; };
  }, [stream, onPlaybackBlocked, onPlaybackStarted]);
  return <audio ref={ref} autoPlay playsInline aria-label={locale === "vi" ? `Âm thanh từ ${name}` : `Audio from ${name}`}/>;
}

function microphoneErrorMessage(error: unknown, locale: Locale) {
  if (locale === "vi") {
    if (!(error instanceof DOMException)) return "Không thể bật mic. Vui lòng thử lại.";
    if (error.name === "NotAllowedError" || error.name === "SecurityError") return "Quyền truy cập mic đã bị chặn. Hãy cho phép ứng dụng dùng mic rồi thử lại.";
    if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") return "Không tìm thấy mic trên thiết bị này.";
    if (error.name === "NotReadableError" || error.name === "TrackStartError" || error.name === "AbortError") return "Mic đang được ứng dụng khác sử dụng. Hãy đóng ứng dụng đó rồi thử lại.";
    if (error.name === "OverconstrainedError" || error.name === "ConstraintNotSatisfiedError") return "Mic này không hỗ trợ các cài đặt âm thanh cần thiết.";
    return "Không thể bật mic. Hãy kiểm tra quyền truy cập trên thiết bị rồi thử lại.";
  }
  if (!(error instanceof DOMException)) return "Could not start the microphone. Please try again.";
  if (error.name === "NotAllowedError" || error.name === "SecurityError") return "Microphone access was blocked. Allow microphone access for this app, then try again.";
  if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") return "No microphone was found on this device.";
  if (error.name === "NotReadableError" || error.name === "TrackStartError" || error.name === "AbortError") return "Your microphone is busy in another app. Close it there, then try again.";
  if (error.name === "OverconstrainedError" || error.name === "ConstraintNotSatisfiedError") return "This microphone does not support the requested audio settings.";
  return "Could not start the microphone. Check the device permission and try again.";
}

function Room({ token, roomId, onBack, supportOpen, onToggleSupport }: { token: string; roomId: number; onBack: () => void; supportOpen: boolean; onToggleSupport: () => void }) {
  const { locale, t } = useLocale();
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [expandedPhoto, setExpandedPhoto] = useState<{ src: string; alt: string } | null>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [voiceStarting, setVoiceStarting] = useState(false);
  const [myMicMuted, setMyMicMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [singerVisualPortrait, setSingerVisualPortrait] = useState(false);
  const [cameraStarting, setCameraStarting] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [giftAmount, setGiftAmount] = useState("1");
  const [giftNotice, setGiftNotice] = useState("");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [voiceError, setVoiceError] = useState("");
  const [backgroundSoundOn, setBackgroundSoundOn] = useState(false);
  const [backgroundSoundStarting, setBackgroundSoundStarting] = useState(false);
  const [backgroundSoundError, setBackgroundSoundError] = useState("");
  const [micSettingsOpen, setMicSettingsOpen] = useState(false);
  const [editingRoomUserId, setEditingRoomUserId] = useState<number | null>(null);
  const [participantMenuId, setParticipantMenuId] = useState<number | null>(null);
  const [roomDisplayNameDraft, setRoomDisplayNameDraft] = useState("");
  const [editingRoomTitle, setEditingRoomTitle] = useState(false);
  const [roomTitleDraft, setRoomTitleDraft] = useState("");
  const [roomPasswordOpen, setRoomPasswordOpen] = useState(false);
  const [roomPictureMenuOpen, setRoomPictureMenuOpen] = useState(false);
  const [roomPasswordDraft, setRoomPasswordDraft] = useState("");
  const [pendingConfirmation, setPendingConfirmation] = useState<RoomConfirmation | null>(null);
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  const [defaultMinutes, setDefaultMinutes] = useState("5");
  const [clockNow, setClockNow] = useState(Date.now());
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const [backgroundFadeDraft, setBackgroundFadeDraft] = useState(75);
  const [remoteStreams, setRemoteStreams] = useState<Map<number, MediaStream>>(new Map());
  const [participantSearch, setParticipantSearch] = useState("");
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const [roomFavorite, setRoomFavorite] = useState(false);
  const [recordingOn, setRecordingOn] = useState(false);
  const roomPictureRef = useRef<HTMLDivElement | null>(null);
  const participantsPanelRef = useRef<HTMLDetailsElement | null>(null);
  const micQueuePanelRef = useRef<HTMLElement | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunks = useRef<Blob[]>([]);
  const localStream = useRef<MediaStream | null>(null);
  const backgroundSoundStartedVoice = useRef(false);
  const peers = useRef<Map<number, RTCPeerConnection>>(new Map());
  const pendingCandidates = useRef<Map<number, RTCIceCandidateInit[]>>(new Map());
  const remoteAudioRoot = useRef<HTMLDivElement>(null);
  const messageList = useRef<HTMLDivElement>(null);
  const previousMessageCount = useRef(0);
  const messageInput = useRef<HTMLTextAreaElement>(null);

  const snapshot = useQuery({ queryKey: ["room", roomId, token], queryFn: () => api.roomSnapshot({ token, roomId }), refetchInterval: 2000 });
  const send = useMutation({ mutationFn: (text: string) => api.sendMessage({ token, roomId, body: text }), onSuccess: (result) => { if (result.ok) { setBody(""); setEmojiOpen(false); queryClient.invalidateQueries({ queryKey: ["room", roomId] }); } } });
  const sendPhoto = useMutation({
    mutationFn: async (file: File) => {
      setPhotoError("");
      if (!isSupportedImageMime(file.type) || file.size > 7_500_000) return { ok: false, error: t("invalidChatPhoto") };
      const image = await fileToBase64(file);
      if (!isSupportedImageMime(image.mimeType)) return { ok: false, error: t("invalidChatPhoto") };
      return api.sendChatPhoto({ token, roomId, image: { dataBase64: image.dataBase64, mimeType: image.mimeType } });
    },
    onSuccess: (result) => {
      if (result.ok) queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      else setPhotoError(result.error ?? t("invalidChatPhoto"));
    },
    onError: () => setPhotoError(t("invalidChatPhoto")),
  });
  const presence = useMutation({ mutationFn: (active: boolean) => api.setVoicePresence({ token, roomId, active }) });
  const joinQueue = useMutation({
    mutationFn: () => api.joinMicQueue({ token, roomId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const leaveQueue = useMutation({
    mutationFn: () => api.leaveMicQueue({ token, roomId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const giveHeart = useMutation({
    mutationFn: () => api.giveSingerHeart({ token, roomId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const giftCredits = useMutation({
    mutationFn: (amount: number) => api.giftSingerCredits({ token, roomId, amount }),
    onSuccess: (result) => {
      setGiftNotice(result.ok ? t("gifted") : "");
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const manageQueue = useMutation({
    mutationFn: (input: { action: "add" | "singNow" | "moveUp" | "remove" | "clear"; targetUserId?: number }) => api.manageMicQueue({ token, roomId, ...input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const setMicMode = useMutation({
    mutationFn: (mode: "free" | "queue") => api.setRoomMicMode({ token, roomId, mode }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });
  const setDefaultTime = useMutation({
    mutationFn: (durationMinutes: number) => api.setDefaultMicTime({ token, roomId, durationMinutes }),
    onSuccess: (result) => {
      if (result.ok) setMicSettingsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });
  const addMicTime = useMutation({
    mutationFn: (minutes: number) => api.addMicTime({ token, roomId, minutes }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const moderate = useMutation({ mutationFn: (input: { targetUserId: number; action: "mute" | "unmute" | "kick" }) => api.moderateUser({ token, roomId, ...input }), onSuccess: () => { setParticipantMenuId(null); queryClient.invalidateQueries({ queryKey: ["room", roomId] }); } });
  const manageBan = useMutation({
    mutationFn: (input: { targetUserId: number; action: "ban" | "unban" }) => api.manageRoomBan({ token, roomId, ...input }),
    onSuccess: () => { setParticipantMenuId(null); queryClient.invalidateQueries({ queryKey: ["room", roomId] }); },
  });
  const sendFriend = useMutation({
    mutationFn: (targetUserId: number) => api.sendFriendRequest({ token, targetUserId }),
    onSuccess: () => { setParticipantMenuId(null); queryClient.invalidateQueries({ queryKey: ["room", roomId] }); queryClient.invalidateQueries({ queryKey: ["friends", token] }); },
  });
  const respondRoomFriend = useMutation({
    mutationFn: (input: { requestId: number; response: "accept" | "decline" }) => api.respondFriendRequest({ token, ...input }),
    onSuccess: () => { setParticipantMenuId(null); queryClient.invalidateQueries({ queryKey: ["room", roomId] }); queryClient.invalidateQueries({ queryKey: ["friends", token] }); },
  });
  const changeRole = useMutation({
    mutationFn: (input: { targetUserId: number; direction: "promote" | "demote"; targetTier?: "visitor" | "member" | "mod1" | "mod2" | "mod3" | "blackshirt" }) => api.changeRole({ token, roomId, ...input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const updateRoomTitle = useMutation({
    mutationFn: () => api.updateRoomName({ token, roomId, name: roomTitleDraft }),
    onSuccess: (result) => {
      if (result.ok) setEditingRoomTitle(false);
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updateRoomChatBackground = useMutation({
    mutationFn: (background: string) => api.updateRoomChatBackground({ token, roomId, background }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const updateRoomChatBackgroundImage = useMutation({
    mutationFn: async (source: File | null | (typeof CHAT_WALLPAPERS)[number]) => {
      if (source && !(source instanceof File)) return api.updateRoomChatBackgroundPreset({ token, roomId, preset: source.id });
      const file = source;
      if (!file) return api.updateRoomChatBackgroundImage({ token, roomId, image: null });
      if (!isSupportedImageMime(file.type) || file.size > 7_500_000) return { ok: false, error: t("invalidBackgroundPhoto") };
      const image = await fileToBase64(file);
      if (!isSupportedImageMime(image.mimeType)) return { ok: false, error: t("invalidBackgroundPhoto") };
      return api.updateRoomChatBackgroundImage({ token, roomId, image: { dataBase64: image.dataBase64, mimeType: image.mimeType }, fit: "contain" });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  const updateRoomChatBackgroundFade = useMutation({
    mutationFn: (fade: number) => api.updateRoomChatBackgroundFade({ token, roomId, fade }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["room", roomId] }),
  });
  useEffect(() => {
    const savedFade = snapshot.data?.room?.chatBackgroundFade;
    if (savedFade !== undefined) setBackgroundFadeDraft(savedFade);
  }, [snapshot.data?.room?.chatBackgroundFade]);
  const updateRoomProfileImage = useMutation({
    mutationFn: async (file: File | null) => {
      if (!file) return api.updateRoomProfileImage({ token, roomId, image: null });
      if (!isSupportedImageMime(file.type) || file.size > 7_500_000) return { ok: false, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP dưới 7,5 MB." };
      const image = await fileToBase64(file);
      if (!isSupportedImageMime(image.mimeType)) return { ok: false, error: "Hãy chọn ảnh JPEG, PNG hoặc WebP." };
      return api.updateRoomProfileImage({ token, roomId, image: { dataBase64: image.dataBase64, mimeType: image.mimeType } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updateRoomPassword = useMutation({
    mutationFn: (password: string) => api.setRoomPassword({ token, roomId, password }),
    onSuccess: (result) => {
      if (result.ok) { setRoomPasswordOpen(false); setRoomPasswordDraft(""); }
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
      queryClient.invalidateQueries({ queryKey: ["home", token] });
    },
  });
  const updateRoomDisplayName = useMutation({
    mutationFn: () => api.updateRoomDisplayName({ token, roomId, targetUserId: editingRoomUserId ?? undefined, displayName: roomDisplayNameDraft }),
    onSuccess: (result) => {
      if (result.ok) { setEditingRoomUserId(null); setParticipantMenuId(null); }
      queryClient.invalidateQueries({ queryKey: ["room", roomId] });
    },
  });
  const leave = useMutation({ mutationFn: () => api.leaveRoom({ token, roomId }), onSuccess: (result) => { if (result.ok) onBack(); } });
  const closePeer = (id: number) => {
    peers.current.get(id)?.close();
    peers.current.delete(id);
    pendingCandidates.current.delete(id);
    setRemoteStreams((current) => { const next = new Map(current); next.delete(id); return next; });
  };
  const signal = async (toUserId: number, kind: "offer" | "answer" | "ice", payload: unknown) => {
    await api.sendSignal({ token, roomId, toUserId, kind, payload: JSON.stringify(payload) });
  };
  const flushCandidates = async (userId: number, peer: RTCPeerConnection) => {
    const queued = pendingCandidates.current.get(userId) ?? [];
    pendingCandidates.current.delete(userId);
    for (const candidate of queued) await peer.addIceCandidate(candidate);
  };
  const getPeer = (userId: number) => {
    const existing = peers.current.get(userId); if (existing) return existing;
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });
    localStream.current?.getTracks().forEach((track) => { const stream = localStream.current; if (stream) peer.addTrack(track, stream); });
    peer.onicecandidate = (event) => { if (event.candidate) void signal(userId, "ice", event.candidate.toJSON()); };
    peer.ontrack = (event) => {
      const stream = event.streams[0] ?? new MediaStream([event.track]);
      setRemoteStreams((current) => new Map(current).set(userId, stream));
    };
    // `disconnected` is often a brief network handoff on mobile. Closing at
    // that point destroys a connection that the browser can recover itself.
    peer.onconnectionstatechange = () => { if (peer.connectionState === "failed" || peer.connectionState === "closed") closePeer(userId); };
    peers.current.set(userId, peer); return peer;
  };
  const makeOffer = async (userId: number) => {
    const peer = getPeer(userId); if (peer.signalingState !== "stable") return;
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await signal(userId, "offer", peer.localDescription ?? offer);
  };
  const stopVoice = async () => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    localStream.current?.getAudioTracks().forEach((track) => { track.stop(); localStream.current?.removeTrack(track); });
    if (localStream.current && localStream.current.getTracks().length === 0) localStream.current = null;
    setVoiceOn(false); setMyMicMuted(false); setBackgroundSoundOn(false); setBackgroundSoundError("");
    backgroundSoundStartedVoice.current = false;
    await api.setVoicePresence({ token, roomId, active: false });
    // Leaving the mic should not also make the user deaf. Remove outgoing
    // tracks, renegotiate as receive-only, and keep remote playback alive.
    for (const [id, peer] of peers.current) {
      peer.getSenders().forEach((sender) => { if (sender.track?.kind === "audio") peer.removeTrack(sender); });
      if (peer.signalingState === "stable") void makeOffer(id);
    }
  };
  const stopCamera = () => {
    localStream.current?.getVideoTracks().forEach((track) => { track.stop(); localStream.current?.removeTrack(track); });
    if (localStream.current && localStream.current.getTracks().length === 0) localStream.current = null;
    setCameraStream(null);
    setCameraOn(false);
    for (const [id, peer] of peers.current) {
      peer.getSenders().forEach((sender) => { if (sender.track?.kind === "video") peer.removeTrack(sender); });
      if (peer.signalingState === "stable") void makeOffer(id);
    }
  };
  const startCamera = async () => {
    setCameraError("");
    if (cameraStarting || cameraOn || (snapshot.data?.room?.level ?? 1) < 2) return;
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) { setCameraError(t("cameraUnavailable")); return; }
    setCameraStarting(true);
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      const videoTrack = stream.getVideoTracks()[0];
      if (!videoTrack) throw new DOMException("No video track", "NotFoundError");
      const combined = localStream.current ?? new MediaStream();
      combined.addTrack(videoTrack);
      localStream.current = combined;
      setCameraStream(new MediaStream([videoTrack]));
      for (const [id, peer] of peers.current) {
        peer.addTrack(videoTrack, combined);
        if (peer.signalingState === "stable") void makeOffer(id);
      }
      setCameraOn(true);
    } catch (error) {
      stream?.getTracks().forEach((track) => track.stop());
      setCameraError(error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "SecurityError") ? t("cameraBlocked") : t("cameraUnavailable"));
    } finally {
      setCameraStarting(false);
    }
  };
  const startVoice = async (withBackgroundSound = false) => {
    setVoiceError("");
    if (voiceStarting || Boolean(localStream.current?.getAudioTracks().length)) return;
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setVoiceError(t("micUnavailable"));
      return;
    }
    setVoiceStarting(true);
    let stream: MediaStream | null = null;
    try {
      // Request the device directly from the button gesture. Waiting for a
      // network action first loses the transient permission gesture in iOS
      // and several embedded Android webviews.
      stream = await navigator.mediaDevices.getUserMedia({
        audio: withBackgroundSound
          ? { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
          : { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        video: false,
      });
      const track = stream.getAudioTracks()[0];
      if (!track) throw new DOMException("No audio track", "NotFoundError");
      const audioStream = stream;
      track.enabled = true;
      const combined = localStream.current ?? new MediaStream();
      combined.addTrack(track);
      localStream.current = combined;

      // Only advertise this user after the local track exists. Otherwise a
      // fast remote peer can create a trackless connection and never receive
      // this microphone.
      const result = await presence.mutateAsync(true);
      if (!result.ok) {
        audioStream.getTracks().forEach((item) => { item.stop(); combined.removeTrack(item); });
        if (combined.getTracks().length === 0) localStream.current = null;
        setVoiceError(result.error ?? t("couldNotJoinMic"));
        return;
      }
      // A listener may already have receive-only peer connections. Attach the
      // newly granted mic to them and renegotiate so everyone hears it.
      for (const [id, peer] of peers.current) {
        audioStream.getAudioTracks().forEach((audioTrack) => peer.addTrack(audioTrack, combined));
        if (peer.signalingState === "stable") void makeOffer(id);
      }
      setVoiceOn(true);
      setBackgroundSoundOn(withBackgroundSound);
      backgroundSoundStartedVoice.current = withBackgroundSound;
    } catch (error) {
      stream?.getTracks().forEach((track) => { track.stop(); localStream.current?.removeTrack(track); });
      if (localStream.current && localStream.current.getTracks().length === 0) localStream.current = null;
      backgroundSoundStartedVoice.current = false;
      setVoiceError(microphoneErrorMessage(error, locale));
      await api.setVoicePresence({ token, roomId, active: false });
    } finally {
      setVoiceStarting(false);
    }
  };

  const toggleRecording = async () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setVoiceError(locale === "vi" ? "Trình duyệt này không hỗ trợ ghi âm." : "This browser does not support recording.");
      return;
    }
    if (!localStream.current?.getAudioTracks().length) await startVoice();
    const track = localStream.current?.getAudioTracks()[0];
    if (!track) return;
    const recorder = new MediaRecorder(new MediaStream([track]));
    recordingChunks.current = [];
    recorder.ondataavailable = (event) => { if (event.data.size > 0) recordingChunks.current.push(event.data); };
    recorder.onstop = () => {
      const blob = new Blob(recordingChunks.current, { type: recorder.mimeType || "audio/webm" });
      recordingChunks.current = [];
      setRecordingOn(false);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `room-${roomId}-recording.webm`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
    recorderRef.current = recorder;
    recorder.start();
    setRecordingOn(true);
  };

  const toggleBackgroundSound = async () => {
    const enable = !backgroundSoundOn;
    setBackgroundSoundError("");
    if (!voiceOn) {
      await startVoice(true);
      return;
    }
    // If this audio session was started from the background-sound control,
    // stopping background sound should end that session instead of leaving an
    // unexpected live microphone behind.
    if (!enable && backgroundSoundStartedVoice.current) {
      await stopVoice();
      return;
    }
    const microphoneTrack = localStream.current?.getAudioTracks()[0];
    if (!microphoneTrack) {
      setBackgroundSoundError(t("backgroundSoundError"));
      return;
    }
    setBackgroundSoundStarting(true);
    try {
      await microphoneTrack.applyConstraints(enable
        ? { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
        : { echoCancellation: true, noiseSuppression: true, autoGainControl: true });
      setBackgroundSoundOn(enable);
    } catch {
      setBackgroundSoundError(t("backgroundSoundError"));
    } finally {
      setBackgroundSoundStarting(false);
    }
  };

  useEffect(() => {
    const list = messageList.current;
    const nextCount = snapshot.data?.messages.length ?? 0;
    if (!list) return;
    const wasInitialLoad = previousMessageCount.current === 0;
    const wasNearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 72;
    if (wasInitialLoad || wasNearBottom) list.scrollTop = list.scrollHeight;
    previousMessageCount.current = nextCount;
  }, [snapshot.data?.messages.length]);
  useEffect(() => {
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!roomPictureMenuOpen) return;
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!roomPictureRef.current?.contains(event.target as Node)) setRoomPictureMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRoomPictureMenuOpen(false);
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [roomPictureMenuOpen]);
  useEffect(() => {
    if (!micSettingsOpen && snapshot.data?.room) setDefaultMinutes(String(Math.round(snapshot.data.room.defaultMicSeconds / 60)));
  }, [micSettingsOpen, snapshot.data?.room]);
  useEffect(() => {
    if (!snapshot.data?.ok || !snapshot.data.me) return;
    const currentSinger = snapshot.data.queue?.find((entry) => entry.isCurrent);
    const currentMe = snapshot.data.me;
    const mayHotMic = currentMe.role === "admin" || currentMe.role === "superadmin" || currentMe.isOwner || currentMe.roomTier === "blackshirt" || currentMe.moderatorLevel >= 1;
    if (snapshot.data.room?.micMode === "free") {
      if (cameraOn) stopCamera();
    } else if (currentSinger?.userId !== currentMe.id) {
      if (voiceOn && !mayHotMic) { setVoiceError(t("turnEnded")); void stopVoice(); }
      if (cameraOn) stopCamera();
    }
  }, [voiceOn, cameraOn, snapshot.data?.queue, snapshot.data?.me, snapshot.data?.room?.micMode]);
  useEffect(() => () => { localStream.current?.getTracks().forEach((track) => track.stop()); peers.current.forEach((peer) => peer.close()); void api.setVoicePresence({ token, roomId, active: false }); }, [roomId, token]);
  useEffect(() => {
    if (snapshot.data && (!snapshot.data.ok || !snapshot.data.me)) {
      localStream.current?.getTracks().forEach((track) => track.stop());
      localStream.current = null;
      peers.current.forEach((peer) => peer.close());
      peers.current.clear();
      pendingCandidates.current.clear();
      setRemoteStreams(new Map());
      setVoiceOn(false);
      setCameraOn(false);
      setCameraStream(null);
      return;
    }
    if (!snapshot.data?.ok || !snapshot.data.me) return;
    if (snapshot.data.me.muted && voiceOn) { setVoiceError(t("moderatorMuted")); void stopVoice(); return; }
    // Speakers connect to every online room member; listeners connect to active
    // speakers. This lets people hear the room without granting mic access.
    const desiredIds = new Set(snapshot.data.participants
      .filter((person) => person.id !== snapshot.data?.me?.id && person.online && (voiceOn || cameraOn || person.voiceActive || snapshot.data?.queue?.some((entry) => entry.isCurrent && entry.userId === person.id)))
      .map((person) => person.id));
    peers.current.forEach((_peer, id) => { if (!desiredIds.has(id)) closePeer(id); });
    if (voiceOn || cameraOn) {
      snapshot.data.participants.forEach((person) => {
        const shouldInitiate = !person.voiceActive || (snapshot.data?.me ? snapshot.data.me.id < person.id : false);
        if (person.id !== snapshot.data?.me?.id && person.online && shouldInitiate && !peers.current.has(person.id)) void makeOffer(person.id);
      });
    }
  }, [voiceOn, cameraOn, snapshot.data?.participants, snapshot.data?.me, snapshot.data?.queue]);
  useEffect(() => {
    let stopped = false;
    let polling = false;
    const poll = async () => {
      if (polling) return;
      polling = true;
      try {
        const result = await api.pollSignals({ token, roomId });
        if (!result.ok || stopped) return;
        for (const item of result.signals) {
          try {
            const peer = getPeer(item.fromUserId);
            const payload = JSON.parse(item.payload) as RTCSessionDescriptionInit | RTCIceCandidateInit;
            if (item.kind === "offer") {
              await peer.setRemoteDescription(payload as RTCSessionDescriptionInit);
              // ICE can reach the database before its offer because browser ICE
              // callbacks run concurrently. Keep those candidates until the
              // remote description exists instead of dropping the audio path.
              await flushCandidates(item.fromUserId, peer);
              const answer = await peer.createAnswer();
              await peer.setLocalDescription(answer);
              await signal(item.fromUserId, "answer", peer.localDescription ?? answer);
            } else if (item.kind === "answer") {
              await peer.setRemoteDescription(payload as RTCSessionDescriptionInit);
              await flushCandidates(item.fromUserId, peer);
            } else if (peer.remoteDescription) {
              await peer.addIceCandidate(payload as RTCIceCandidateInit);
            } else {
              const queued = pendingCandidates.current.get(item.fromUserId) ?? [];
              queued.push(payload as RTCIceCandidateInit);
              pendingCandidates.current.set(item.fromUserId, queued);
            }
          } catch {
            // Signals from a connection that has already been replaced are
            // harmless; the presence loop will negotiate a fresh peer.
          }
        }
      } finally {
        polling = false;
      }
    };
    void poll(); const timer = window.setInterval(() => void poll(), 900);
    return () => { stopped = true; window.clearInterval(timer); };
  }, [voiceOn, roomId, token]);

  const markPlaybackBlocked = useCallback(() => setPlaybackBlocked(true), []);
  const markPlaybackStarted = useCallback(() => setPlaybackBlocked(false), []);
  const resumeRemoteAudio = async () => {
    const audioElements = Array.from(remoteAudioRoot.current?.querySelectorAll("audio") ?? []);
    const attempts = await Promise.all(audioElements.map(async (audio) => {
      try {
        await audio.play();
        return true;
      } catch {
        return false;
      }
    }));
    setPlaybackBlocked(attempts.some((played) => !played));
  };
  const insertEmoji = (emoji: string) => {
    const input = messageInput.current;
    const start = input?.selectionStart ?? body.length;
    const end = input?.selectionEnd ?? start;
    const nextBody = `${body.slice(0, start)}${emoji}${body.slice(end)}`;
    if (nextBody.length > 1200) return;
    setBody(nextBody);
    window.requestAnimationFrame(() => {
      const nextPosition = start + emoji.length;
      messageInput.current?.focus();
      messageInput.current?.setSelectionRange(nextPosition, nextPosition);
    });
  };

  if (snapshot.isPending) return <main className="center-state"><div className="pulse-dot"/><p>{t("enteringRoom")}</p></main>;
  if (snapshot.error || !snapshot.data?.ok || !snapshot.data.room || !snapshot.data.me) return <main className="center-state"><Notice tone="error">{snapshot.data?.error ?? t("couldNotOpenRoom")}</Notice><button className="primary-button" onClick={onBack}>{t("backToRooms")}</button></main>;
  const { room, me, participants, messages, heart } = snapshot.data;
  const selectedWallpaper = room.chatBackgroundPreset ? CHAT_WALLPAPERS.find((wallpaper) => wallpaper.id === room.chatBackgroundPreset) : undefined;
  const chatBackgroundImageUrl = selectedWallpaper?.src ?? room.chatBackgroundImageUrl;
  const rankedParticipants = [...participants].sort((a, b) => PEOPLE_TIER_ORDER.indexOf(a.roomTier) - PEOPLE_TIER_ORDER.indexOf(b.roomTier));
  const visibleParticipants = rankedParticipants.filter((person) => person.name.toLocaleLowerCase().includes(participantSearch.trim().toLocaleLowerCase()));
  const queue = snapshot.data.queue ?? [];
  const hasAdminPowers = me.role === "admin" || me.role === "superadmin" || me.isOwner || me.roomTier === "blackshirt";
  const effectiveModeratorLevel = hasAdminPowers ? 3 : me.moderatorLevel;
  const canModerate = effectiveModeratorLevel >= 1;
  const canChangeMicMode = effectiveModeratorLevel >= 1;
  const canManageQueue = effectiveModeratorLevel >= 2;
  const canManageRoomSettings = effectiveModeratorLevel >= 3;
  const canSendPhoto = effectiveModeratorLevel >= 3;
  const canChangeTiers = hasAdminPowers || me.roomTier === "mod3";
  const manageable = (person: Participant) => person.id !== me.id && !person.isOwner && person.role !== "admin" && person.role !== "superadmin" && (hasAdminPowers || person.moderatorLevel === 0);
  const canMutePerson = (person: Participant) => {
    const myRank = PEOPLE_TIER_ORDER.indexOf(me.roomTier);
    const theirRank = PEOPLE_TIER_ORDER.indexOf(person.roomTier);
    return person.id !== me.id && myRank >= 0 && theirRank > myRank && myRank <= PEOPLE_TIER_ORDER.indexOf("mod1");
  };
  const canKickPerson = (person: Participant) => person.id !== me.id && (((me.role === "admin" || me.role === "superadmin") && PEOPLE_TIER_ORDER.indexOf(person.roomTier) > PEOPLE_TIER_ORDER.indexOf(me.roomTier)) || manageable(person));
  const tierIndex = (tier: RoomTier) => ROOM_TIER_ORDER.indexOf(tier);
  const promotableTiers = (person: Participant): RoomTier[] => {
    if (!canChangeTiers || person.id === me.id || person.roomTier === "superadmin" || person.roomTier === "owner" || person.roomTier === "blackshirt") return [];
    const current = tierIndex(person.roomTier);
    if (me.role === "superadmin") {
      const standardChoices = current >= 0 ? ROOM_TIER_ORDER.slice(current + 1, tierIndex("mod3") + 1) : [];
      return [...standardChoices, "blackshirt"];
    }
    if (person.roomTier === "admin") return [];
    const highest = me.roomTier === "mod3" && !hasAdminPowers ? tierIndex("mod1") : tierIndex("mod3");
    return ROOM_TIER_ORDER.slice(current + 1, highest + 1).filter((tier): tier is "member" | "mod1" | "mod2" | "mod3" => tier === "member" || tier === "mod1" || tier === "mod2" || tier === "mod3");
  };
  const canDemoteTier = (person: Participant) => {
    if (!canChangeTiers || person.id === me.id || person.roomTier === "admin" || person.roomTier === "superadmin" || person.roomTier === "owner" || person.roomTier === "visitor") return false;
    if (person.roomTier === "blackshirt") return me.role === "superadmin";
    if (hasAdminPowers) return true;
    return tierIndex(person.roomTier) > tierIndex("visitor") && tierIndex(person.roomTier) < tierIndex("mod3");
  };
  const adjacentTier = (tier: RoomTier, direction: "promote" | "demote") => ROOM_TIER_ORDER[tierIndex(tier) + (direction === "promote" ? 1 : -1)];
  const tierLabel = (tier: RoomTier) => tier === "visitor" ? t("visitorRole") : tier === "member" ? t("memberRole") : tier === "mod1" ? t("modOne") : tier === "mod2" ? t("modTwo") : tier === "mod3" ? t("modThree") : tier === "blackshirt" ? t("blackShirt") : tier === "owner" ? t("owner") : tier === "superadmin" ? t("superAdmin") : locale === "vi" ? "Quản trị viên" : "Admin";
  const shirtRole = (person: Participant) => person.roomTier === "mod1" ? "moderator-1" : person.roomTier === "mod2" ? "moderator-2" : person.roomTier === "mod3" ? "moderator-3" : person.roomTier;
  const voiceNames = participants.filter((p) => p.voiceActive).map((p) => p.name);
  const currentSinger = queue.find((entry) => entry.isCurrent);
  const currentSingerParticipant = currentSinger ? participants.find((person) => person.id === currentSinger.userId) : undefined;
  const singerCoverPhotoUrl = currentSingerParticipant?.singerCoverPhotoUrl ?? null;
  const myQueueEntry = queue.find((entry) => entry.userId === me.id);
  const queuedUserIds = new Set(queue.map((entry) => entry.userId));
  const isMyTurn = currentSinger?.userId === me.id;
  const singerVideoStream = isMyTurn ? cameraStream : currentSinger ? remoteStreams.get(currentSinger.userId) ?? null : null;
  const singerHasVideo = Boolean(singerVideoStream?.getVideoTracks().some((track) => track.readyState === "live"));
  const singerHasVisual = singerHasVideo || Boolean(singerCoverPhotoUrl);
  const secondsSinceSnapshot = Math.max(0, Math.floor((clockNow - snapshot.dataUpdatedAt) / 1000));
  const secondsLeft = currentSinger?.remainingSeconds ? Math.max(0, currentSinger.remainingSeconds - secondsSinceSnapshot) : 0;
  const countdown = `${Math.floor(secondsLeft / 60)}:${twoDigits(secondsLeft % 60)}`;
  const heartCooldownSeconds = heart?.availableAt ? Math.max(0, Math.ceil((Date.parse(heart.availableAt) - clockNow) / 1000)) : 0;
  const confirmationMessage = pendingConfirmation ? (() => {
    if (pendingConfirmation.kind === "leave") return locale === "vi" ? "Bạn có chắc muốn rời phòng này không? Bạn sẽ mất vị trí trong hàng chờ mic." : "Are you sure you want to exit this room? You’ll lose your mic queue position.";
    if (pendingConfirmation.kind === "kick") return locale === "vi" ? `Bạn có chắc muốn mời ${pendingConfirmation.person.name} ra khỏi phòng không?` : `Are you sure you want to remove ${pendingConfirmation.person.name} from the room?`;
    if (pendingConfirmation.kind === "ban") return t("banConfirm").replace("{name}", pendingConfirmation.person.name);
    if (pendingConfirmation.kind === "role") return locale === "vi"
      ? `${pendingConfirmation.direction === "promote" ? t("promoteTo") : t("demoteTo")} ${tierLabel(pendingConfirmation.nextTier)} cho ${pendingConfirmation.person.name}?`
      : `${pendingConfirmation.direction === "promote" ? t("promoteTo") : t("demoteTo")} ${tierLabel(pendingConfirmation.nextTier)}: ${pendingConfirmation.person.name}?`;
    if (pendingConfirmation.kind === "queue-remove") return t("removeQueueConfirm").replace("{name}", pendingConfirmation.name);
    return t("clearQueueConfirm");
  })() : "";
  const confirmationLabel = pendingConfirmation
    ? pendingConfirmation.kind === "leave" ? t("leaveRoom")
      : pendingConfirmation.kind === "kick" ? t("removeFromRoom")
        : pendingConfirmation.kind === "ban" ? t("banFromRoom")
        : pendingConfirmation.kind === "role" ? (pendingConfirmation.direction === "promote" ? t("promote") : t("demote"))
          : pendingConfirmation.kind === "queue-remove" ? t("removeFromQueue") : t("clearQueue")
    : "";
  const heartControl = currentSinger && heart ? <div className="stage-heart">
    <button type="button" onClick={() => giveHeart.mutate()} disabled={giveHeart.isPending || heartCooldownSeconds > 0 || isMyTurn} aria-label={isMyTurn ? t("yourHeartCount") : locale === "vi" ? `${t("giveHeart")} cho ${currentSinger.name}` : `${t("giveHeart")} to ${currentSinger.name}`}>
      <Icon name="heart" size={20}/><strong>{heart.count}</strong>
    </button>
    <span>{isMyTurn ? t("yourHeartCount") : t("giveHeart")}</span>
  </div> : null;
  return <main className={`room-shell ${room.level === 1 ? "level-one-room" : ""} ${desktopSidebarCollapsed ? "desktop-sidebar-collapsed" : ""}`}>
    <header className="room-header">
      <button className="icon-button room-back-button" onClick={() => setPendingConfirmation({ kind: "leave" })} disabled={leave.isPending} aria-label={t("backToRooms")}><Icon name="back"/></button>
      <div className={`room-picture ${room.profileImageUrl ? "has-image" : "empty"}`}>
        {room.profileImageUrl ? <img className="room-header-image" src={room.profileImageUrl} alt={t("roomPicture")}/> : <span className="room-picture-placeholder" aria-hidden="true"><Icon name="image" size={20}/></span>}
      </div>
      <div ref={roomPictureRef} className={`room-heading ${editingRoomTitle ? "editing" : ""} ${roomPictureMenuOpen ? "settings-open" : ""}`}>
        <p className="eyebrow">{t("liveRoom")} · {t("roomLevel")} {room.level}</p>
        {!editingRoomTitle ? <div className="room-title-line">
          <h1>{room.name}</h1>
          {canManageRoomSettings && <button type="button" className="room-title-edit" onClick={() => { setRoomTitleDraft(room.name); setDefaultMinutes(String(Math.round(room.defaultMicSeconds / 60))); setRoomPictureMenuOpen((open) => !open); }} aria-label={t("roomSettings")} aria-expanded={roomPictureMenuOpen} aria-haspopup="dialog"><Icon name="gear" size={16}/></button>}
        </div> : <form className="room-title-editor" onSubmit={(event) => { event.preventDefault(); updateRoomTitle.mutate(); }}>
          <label className="sr-only" htmlFor="room-title">{t("newRoomName")}</label>
          <input id="room-title" value={roomTitleDraft} onChange={(event) => setRoomTitleDraft(event.target.value)} minLength={2} maxLength={42} required autoFocus/>
          <button className="small-button" disabled={updateRoomTitle.isPending}>{updateRoomTitle.isPending ? t("saving") : t("save")}</button>
          <button type="button" className="cancel-button" onClick={() => setEditingRoomTitle(false)}>{t("cancel")}</button>
        </form>}
        <p className="room-desktop-meta">ID:{room.id} &nbsp; Online:{participants.length}</p>
        {updateRoomTitle.data?.error && <Notice tone="error">{updateRoomTitle.data.error}</Notice>}
        {updateRoomProfileImage.data?.error && <Notice tone="error">{updateRoomProfileImage.data.error}</Notice>}
        {me.role !== "admin" && me.role !== "superadmin" && <button type="button" className="room-report-header" onClick={() => setReportTarget({ type: "room", id: room.id, name: room.name })}>{t("reportRoom")}</button>}
        {me.isOwner && <button type="button" className="room-password-toggle" onClick={() => setRoomPasswordOpen((open) => !open)} aria-expanded={roomPasswordOpen}><Icon name="shield" size={13}/>{room.isPrivate ? t("privateRoom") : t("setRoomPassword")}</button>}
        {me.isOwner && roomPasswordOpen && <form className="room-password-form" onSubmit={(event) => { event.preventDefault(); updateRoomPassword.mutate(roomPasswordDraft); }}><label htmlFor="room-password-setting">{t("roomPassword")}</label><small>{t("roomPasswordHint")}</small><input id="room-password-setting" type="password" minLength={4} maxLength={72} value={roomPasswordDraft} onChange={(event) => setRoomPasswordDraft(event.target.value)} required/><div><button className="small-button" disabled={updateRoomPassword.isPending}>{t("setRoomPassword")}</button>{room.isPrivate && <button type="button" className="cancel-button" onClick={() => updateRoomPassword.mutate("")} disabled={updateRoomPassword.isPending}>{t("removeRoomPassword")}</button>}</div>{updateRoomPassword.data?.error && <Notice tone="error">{updateRoomPassword.data.error}</Notice>}</form>}
        {canManageRoomSettings && roomPictureMenuOpen && <section className="room-settings-panel" role="dialog" aria-label={t("roomSettings")}>
          <header><strong>{t("roomSettings")}</strong><button type="button" aria-label={t("cancel")} onClick={() => setRoomPictureMenuOpen(false)}>×</button></header>
          <form onSubmit={(event) => { event.preventDefault(); updateRoomTitle.mutate(); }}><label htmlFor="settings-room-title">{t("renameRoom")}</label><div className="room-settings-row"><input id="settings-room-title" value={roomTitleDraft} onChange={(event) => setRoomTitleDraft(event.target.value)} minLength={2} maxLength={42} required/><button className="small-button" disabled={updateRoomTitle.isPending}>{t("save")}</button></div></form>
          <form onSubmit={(event) => { event.preventDefault(); const minutes = Number(defaultMinutes); if (Number.isInteger(minutes) && minutes >= 1 && minutes <= 60) setDefaultTime.mutate(minutes); }}><label htmlFor="settings-default-mic-minutes">{t("defaultTurnLength")}</label><div className="room-settings-row"><input id="settings-default-mic-minutes" type="number" min="1" max="60" inputMode="numeric" value={defaultMinutes} onChange={(event) => setDefaultMinutes(event.target.value)}/><span>{t("minutes")}</span><button className="small-button" disabled={setDefaultTime.isPending}>{t("save")}</button></div></form>
          <div className="room-settings-photo"><span>{t("roomPicture")}</span><label className="small-button"><Icon name="image" size={15}/>{t("changeRoomPicture")}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={updateRoomProfileImage.isPending} onChange={(event) => { const input = event.currentTarget; const file = input.files?.[0]; if (file) updateRoomProfileImage.mutate(file); input.value = ""; }}/></label>{room.profileImageUrl && <button type="button" className="cancel-button" onClick={() => updateRoomProfileImage.mutate(null)} disabled={updateRoomProfileImage.isPending}>{t("removeRoomPicture")}</button>}</div>
          {snapshot.data.bans && <details className="room-settings-bans"><summary><span><Icon name="shield" size={15}/>{t("roomBanList")}</span><strong>{snapshot.data.bans.length}</strong></summary><div>{snapshot.data.bans.length === 0 ? <p>{t("noBannedUsers")}</p> : snapshot.data.bans.map((ban) => <article key={ban.userId}><div><strong>{ban.name}</strong>{ban.bannedByName && <small>{t("bannedBy")} {ban.bannedByName}</small>}</div><button type="button" disabled={manageBan.isPending} onClick={() => manageBan.mutate({ targetUserId: ban.userId, action: "unban" })}>{t("unban")}</button></article>)}</div></details>}
          {(updateRoomTitle.data?.error || setDefaultTime.data?.error || updateRoomProfileImage.data?.error || manageBan.data?.error) && <Notice tone="error">{updateRoomTitle.data?.error || setDefaultTime.data?.error || updateRoomProfileImage.data?.error || manageBan.data?.error}</Notice>}
        </section>}
      </div>
      <div className="header-actions">
        
        <button type="button" className={`icon-button room-header-support ${supportOpen ? "active" : ""}`} aria-label={t("contactSupport")} aria-pressed={supportOpen} onClick={onToggleSupport}>?</button>
        <div className="desktop-room-actions" aria-label={locale === "vi" ? "Điều khiển phòng" : "Room controls"}>
          <button type="button" onClick={() => setDesktopSidebarCollapsed((collapsed) => !collapsed)} aria-label={locale === "vi" ? "Hiện hoặc ẩn danh sách người" : "Show or hide people list"} aria-pressed={desktopSidebarCollapsed}><Icon name="menu"/></button>
          <button type="button" className={roomFavorite ? "active" : ""} onClick={() => setRoomFavorite((favorite) => !favorite)} aria-label={locale === "vi" ? "Đánh dấu phòng yêu thích" : "Favorite room"} aria-pressed={roomFavorite}><Icon name="star"/></button>
          <button type="button" onClick={() => setPendingConfirmation({ kind: "leave" })} disabled={leave.isPending} aria-label={t("leaveRoom")}><Icon name="door"/></button>
        </div>
        <button className="icon-button standard-room-exit" onClick={() => setPendingConfirmation({ kind: "leave" })} disabled={leave.isPending} aria-label={t("leaveRoom")}><Icon name="door"/></button>
      </div>
    </header>
    <div className={`queue-stage-layout ${room.micMode === "queue" ? "queue-layout-active" : "free-layout-active"}`}>
    {(singerHasVisual || (room.level === 1 && room.micMode === "queue")) && <section className={`voice-stage ${voiceOn ? "on" : ""} ${singerHasVisual ? "camera-active" : "queue-singer-stage"} ${singerVisualPortrait ? "portrait-visual" : ""}`}>
      {room.level === 1 && room.micMode === "queue" && !singerHasVisual && <div className="desktop-queue-singer" aria-label={currentSinger ? `${t("singerTurn")}: ${currentSinger.name}` : t("noWaiting")}>
        <div className="desktop-singer-heading"><strong>{currentSinger?.name ?? t("noWaiting")}</strong><small>{currentSinger ? `${t("userId")} #${currentSinger.userId}` : t("joinQueueTakeMic")}</small></div>
        <span className="desktop-singer-silhouette" aria-hidden="true"><i/><b/></span>
      </div>}
      {singerVideoStream && singerHasVideo && <div className="singer-video"><StreamVideo stream={singerVideoStream} label={`${t("singerCamera")}: ${currentSinger?.name ?? me.name}`} mirrored={isMyTurn} onOrientationChange={setSingerVisualPortrait}/></div>}
      {!singerHasVideo && singerCoverPhotoUrl && currentSinger && <div className="singer-cover-photo"><img src={singerCoverPhotoUrl} alt={`${t("singerCoverPhoto")}: ${currentSinger.name}`} onLoad={(event) => setSingerVisualPortrait(event.currentTarget.naturalHeight > event.currentTarget.naturalWidth)}/></div>}
      {singerHasVisual && currentSinger ? <div className="camera-stage-overlay" aria-label={`${t("singerTurn")}: ${currentSinger.name}`}>
        <p className="camera-turn-label"><strong>{t("singerTurn")}</strong><span>{currentSinger.name}</span></p>
        {currentSinger.endsAt && <time className="stage-countdown" aria-label={locale === "vi" ? `Còn ${countdown}` : `${countdown} remaining`}><Icon name="clock" size={16}/>{countdown}</time>}
        <div className="stage-wave" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div>
        {heartControl}
      </div> : <>
        <div className="voice-status">
          <div className="stage-wave" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/></div>
          <p>{voiceNames.length ? `${voiceNames.join(", ")} ${voiceNames.length === 1 ? t("isOnMic") : t("areOnMic")}` : currentSinger ? currentSinger.endsAt ? (locale === "vi" ? `Lượt của ${currentSinger.name} · ${countdown}` : `${currentSinger.name}'s ${t("turn")} · ${countdown}`) : `${currentSinger.name} ${t("isUpNext")}` : room.micMode === "free" ? t("freeMicPrompt") : t("joinQueueTakeMic")}</p>
        </div>
        {heartControl}
      </>}
      {currentSinger && !isMyTurn && <form className="credit-gift" onSubmit={(event) => { event.preventDefault(); const amount = Number(giftAmount); if (Number.isInteger(amount) && amount > 0) giftCredits.mutate(amount); }}>
        <label htmlFor="gift-credit-amount">{t("giftSinger")} · {me.creditBalance} {t("credits")}</label>
        <div><input id="gift-credit-amount" type="number" min="1" max="1000" inputMode="numeric" value={giftAmount} onChange={(event) => setGiftAmount(event.target.value)}/><button type="submit" disabled={giftCredits.isPending || me.creditBalance < Number(giftAmount)}>{t("gift")}</button></div>
        {(giftCredits.data?.error || giftNotice) && <small>{giftCredits.data?.error || giftNotice}</small>}
      </form>}
      {(isMyTurn || room.micMode === "free") && <div className="singer-stage-controls">
        {isMyTurn && (room.level >= 2 ? <button type="button" className={`camera-toggle ${cameraOn ? "active" : ""}`} onClick={() => cameraOn ? stopCamera() : void startCamera()} disabled={cameraStarting}><Icon name="camera" size={17}/>{cameraStarting ? t("starting") : cameraOn ? t("stopCamera") : t("startCamera")}</button> : <p className="camera-level-note">{t("levelTwoCamera")}</p>)}
        <button type="button" className={`camera-toggle background-sound-toggle ${backgroundSoundOn ? "active" : ""}`} onClick={() => void toggleBackgroundSound()} disabled={backgroundSoundStarting || voiceStarting || me.muted} aria-pressed={backgroundSoundOn} title={t("backgroundSoundHint")}><Icon name="music" size={17}/>{backgroundSoundStarting ? t("backgroundSoundStarting") : backgroundSoundOn ? t("stopBackgroundSound") : t("shareBackgroundSound")}</button>
      </div>}
      {room.micMode === "queue" && canModerate && !isMyTurn && <button type="button" className={`turn-mic-button hot-mic-button ${voiceOn ? "active" : ""}`} onClick={() => voiceOn ? void stopVoice() : void startVoice()} disabled={voiceStarting || presence.isPending || me.muted} aria-label={voiceOn ? t("leaveHotMic") : t("hotMic")} aria-busy={voiceStarting}><Icon name={me.muted ? "mute" : "mic"} size={18}/><span>{me.muted ? t("muted") : voiceStarting ? t("starting") : voiceOn ? t("leaveHotMic") : t("hotMic")}</span></button>}
      {voiceOn && <button className={`self-mute ${myMicMuted ? "active" : ""}`} onClick={() => { const next = !myMicMuted; setMyMicMuted(next); localStream.current?.getAudioTracks().forEach((track) => { track.enabled = !next; }); }}><Icon name={myMicMuted ? "mute" : "mic"} size={16}/>{myMicMuted ? t("unmuteMyMic") : t("muteMyMic")}</button>}
      {playbackBlocked && <button className="self-mute active" onClick={() => void resumeRemoteAudio()} aria-label={t("startHearing")}><Icon name="mic" size={16}/>{t("tapHear")}</button>}
      {voiceError && <Notice tone="error">{voiceError}</Notice>}
      {cameraError && <Notice tone="error">{cameraError}</Notice>}
      {backgroundSoundError && <Notice tone="error">{backgroundSoundError}</Notice>}
      {giveHeart.data?.error && <Notice tone="error">{giveHeart.data.error}</Notice>}
    </section>}
    <div className="remote-audio" ref={remoteAudioRoot}>{Array.from(remoteStreams.entries()).map(([id, stream]) => <RemoteAudio key={id} stream={stream} name={participants.find((p) => p.id === id)?.name ?? t("participant")} onPlaybackBlocked={markPlaybackBlocked} onPlaybackStarted={markPlaybackStarted}/>)}</div>
    <section ref={micQueuePanelRef} className="mic-queue-panel" aria-labelledby="mic-queue-heading">
      <div className="queue-heading">
        <div className="queue-title"><span><Icon name="queue" size={18}/></span><div><h2 id="mic-queue-heading">{t("micMode")}</h2>{canChangeMicMode ? <label className="mic-mode-select"><span className="sr-only">{t("changeMicMode")}</span><select value={room.micMode} onChange={(event) => setMicMode.mutate(event.target.value === "free" ? "free" : "queue")} disabled={setMicMode.isPending} aria-label={t("changeMicMode")}><option value="free">{t("freeMode")}</option><option value="queue">{t("queueMode")}</option></select></label> : <p>{room.micMode === "free" ? t("freeMode") : t("queueMode")}</p>}</div></div>
        {room.micMode === "queue" && <div className="level-one-queue-controls" aria-label={locale === "vi" ? "Điều khiển xếp hàng" : "Queue controls"}>
          <button type="button" onClick={() => { if (!myQueueEntry) joinQueue.mutate(); }} disabled={Boolean(myQueueEntry) || joinQueue.isPending || me.muted}><Icon name="queue" size={15}/><span>{myQueueEntry ? t("waiting") : locale === "vi" ? "Xếp hàng" : "Join queue"}</span></button>
          {canModerate && <button type="button" className="danger" disabled={manageQueue.isPending || queue.length === 0} onClick={() => setPendingConfirmation({ kind: "queue-clear" })}><Icon name="mute" size={15}/><span>{locale === "vi" ? "Cấm xếp hàng" : "Clear queue"}</span></button>}
          {canModerate && <button type="button" className={voiceOn && !isMyTurn ? "active" : ""} onClick={() => voiceOn ? void stopVoice() : void startVoice()} disabled={voiceStarting || presence.isPending || me.muted || isMyTurn} aria-pressed={voiceOn && !isMyTurn}><Icon name="mic" size={15}/><span>{locale === "vi" ? "Giữ micro" : "Hold mic"}</span></button>}
          <button type="button" onClick={() => setDesktopSidebarCollapsed((collapsed) => !collapsed)} aria-pressed={desktopSidebarCollapsed}><Icon name="collapse" size={15}/><span>{desktopSidebarCollapsed ? (locale === "vi" ? "Mở rộng" : "Expand") : (locale === "vi" ? "Thu lại" : "Collapse")}</span></button>
        </div>}
      </div>
      <div className="queue-roster">
      {room.micMode === "queue" && <>
      {currentSinger ? <div className="current-turn">
        <div className="turn-avatar">{currentSinger.name.slice(0, 1).toUpperCase()}</div>
        <div className="turn-copy">
          <span>{currentSinger.endsAt ? t("nowOnMic") : t("upNext")}</span>
          <div className="queue-person-line">
            <strong title={`${t("userId")} #${currentSinger.userId}`}>{currentSinger.name}{isMyTurn ? ` (${t("you")})` : ""}</strong>
            <div className="queue-entry-actions">
              {canModerate && currentSinger.endsAt && <><button type="button" onClick={() => addMicTime.mutate(1)} disabled={addMicTime.isPending} aria-label={`${t("addTime")} 1 ${t("min")} ${currentSinger.name}`}>+1 {t("min")}</button><button type="button" onClick={() => addMicTime.mutate(5)} disabled={addMicTime.isPending} aria-label={`${t("addTime")} 5 ${t("min")} ${currentSinger.name}`}>+5 {t("min")}</button></>}
              {isMyTurn ? <button type="button" className="danger" onClick={() => leaveQueue.mutate()} disabled={leaveQueue.isPending}>{t("endMyTurn")}</button> : canManageQueue && <button type="button" className="danger" disabled={manageQueue.isPending} onClick={() => setPendingConfirmation({ kind: "queue-remove", userId: currentSinger.userId, name: currentSinger.name })} aria-label={`${t("removeFromQueue")} ${currentSinger.name}`}>{t("removeFromQueue")}</button>}
            </div>
          </div>
        </div>
        <div className="turn-side">
          {currentSinger.endsAt && <time aria-label={locale === "vi" ? `Còn ${countdown}` : `${countdown} remaining`}><Icon name="clock" size={15}/>{countdown}</time>}
          {!currentSinger.endsAt && !isMyTurn && <span className="start-cue">{t("startYourMic")}</span>}
          {isMyTurn && <button className={`turn-mic-button ${voiceOn ? "active" : ""}`} onClick={() => voiceOn ? void stopVoice() : void startVoice()} disabled={voiceStarting || presence.isPending || me.muted} aria-label={voiceOn ? t("leaveLiveAudio") : voiceStarting ? t("startingMicrophone") : t("joinLiveAudio")} aria-busy={voiceStarting}><Icon name={me.muted ? "mute" : "mic"} size={18}/><span>{me.muted ? t("muted") : voiceStarting ? t("starting") : voiceOn ? t("leaveMic") : t("joinMic")}</span></button>}
        </div>
      </div> : <p className="queue-empty">{t("noWaiting")}</p>}
      {queue.length > 1 && <ol className="queue-list">{queue.filter((entry) => !entry.isCurrent).map((entry, index) => <li key={entry.id}>
        <span>{entry.position - 1}</span>
        <div className="queue-person-line">
          <strong title={`${t("userId")} #${entry.userId}`}>{entry.name}{entry.userId === me.id ? ` (${t("you")})` : ""}</strong>
          <small>{t("waiting")}</small>
          {(canModerate || entry.userId === me.id) && <div className="queue-entry-actions">
            {canModerate && index > 0 && <button type="button" disabled={manageQueue.isPending} onClick={() => manageQueue.mutate({ action: "moveUp", targetUserId: entry.userId })} aria-label={`${t("moveUp")} ${entry.name}`}>{t("moveUp")}</button>}
            {canManageQueue && <button type="button" disabled={manageQueue.isPending} onClick={() => manageQueue.mutate({ action: "singNow", targetUserId: entry.userId })} aria-label={`${t("makeSinger")} ${entry.name}`}>{t("makeSinger")}</button>}
            {entry.userId === me.id ? <button type="button" className="danger" onClick={() => leaveQueue.mutate()} disabled={leaveQueue.isPending}>{t("leaveQueue")}</button> : canManageQueue && <button type="button" className="danger" disabled={manageQueue.isPending} onClick={() => setPendingConfirmation({ kind: "queue-remove", userId: entry.userId, name: entry.name })} aria-label={`${t("removeFromQueue")} ${entry.name}`}>{t("removeFromQueue")}</button>}
          </div>}
        </div>
      </li>)}</ol>}
      {!myQueueEntry && <div className="queue-self-row"><strong>{me.name} ({t("you")})</strong><button className="queue-join" onClick={() => joinQueue.mutate()} disabled={joinQueue.isPending || me.muted}><Icon name="mic" size={17}/>{joinQueue.isPending ? t("joining") : t("joinMicQueue")}</button></div>}
      {myQueueEntry && !isMyTurn && <p className="queue-position-note">{locale === "vi" ? `Bạn đang ở vị trí #${myQueueEntry.position - 1} ${t("inLine")}` : `You’re #${myQueueEntry.position - 1} ${t("inLine")}`}</p>}
      {isMyTurn && !voiceOn && <p className="queue-position-note">{t("yourTurnTap")}</p>}
      </>}
      {setMicMode.data?.error && <Notice tone="error">{setMicMode.data.error}</Notice>}
      {joinQueue.data?.error && <Notice tone="error">{joinQueue.data.error}</Notice>}
      {leaveQueue.data?.error && <Notice tone="error">{leaveQueue.data.error}</Notice>}
      {setDefaultTime.data?.error && <Notice tone="error">{setDefaultTime.data.error}</Notice>}
      {addMicTime.data?.error && <Notice tone="error">{addMicTime.data.error}</Notice>}
      {manageQueue.data?.error && <Notice tone="error">{manageQueue.data.error}</Notice>}
      </div>
    </section>
    </div>
    <details ref={participantsPanelRef} className="participants-panel" open>
      <summary><span><Icon name="users" size={18}/>{t("peopleRoles")}</span><strong>{participants.length}</strong></summary>
      <label className="participant-search"><span className="sr-only">{locale === "vi" ? "Tìm người trong phòng" : "Search people in room"}</span><input type="search" value={participantSearch} onChange={(event) => setParticipantSearch(event.currentTarget.value)} placeholder={locale === "vi" ? "Nhập tên người cần tìm…" : "Search people…"}/></label>
      <div className="participants-list">{visibleParticipants.map((person) => {
        const promotionChoices = promotableTiers(person);
        const demoteTier = adjacentTier(person.roomTier, "demote");
        const showPromote = promotionChoices.length > 0;
        const showDemote = canDemoteTier(person) && Boolean(demoteTier);
        const showMute = canMutePerson(person);
        const showKick = canKickPerson(person);
        const showReport = person.id !== me.id && me.role !== "admin" && me.role !== "superadmin";
        const showQueueAdd = room.micMode === "queue" && canManageQueue && !person.muted && !queuedUserIds.has(person.id);
        const canRenamePerson = person.id === me.id || canManageRoomSettings;
        const showBan = person.id !== me.id && canManageRoomSettings;
        return <div className={`participant ${shirtRole(person)}`} key={person.id} title={`${t("userId")} #${person.id}`}>
          <span className={`role-shirt ${shirtRole(person)}`} aria-label={tierLabel(person.roomTier)}><Icon name="shirt" size={22}/></span>
          <div className="person-info"><strong>{person.name}{person.id === me.id ? ` (${t("you")})` : ""}{person.id === me.id && <button type="button" className="person-name-edit" onClick={() => { setRoomDisplayNameDraft(me.name); setEditingRoomUserId(me.id); }} aria-label={t("editRoomName")}><Icon name="edit" size={13}/></button>}</strong>{(person.voiceActive || person.muted) && <span>{person.voiceActive ? t("onMic") : t("mutedByModerator")}</span>}</div>
          <div className="participant-menu-wrap">
            <button type="button" className="participant-menu-toggle" aria-label={`${t("personSettings")}: ${person.name}`} aria-expanded={participantMenuId === person.id} aria-haspopup="menu" onClick={() => setParticipantMenuId((openId) => openId === person.id ? null : person.id)}><Icon name="gear" size={17}/></button>
            {participantMenuId === person.id && <div className="participant-menu" role="menu">
              {canRenamePerson && <button type="button" role="menuitem" onClick={() => { setRoomDisplayNameDraft(person.name); setEditingRoomUserId(person.id); setParticipantMenuId(null); }}><Icon name="edit" size={15}/>{t("changeRoomPersonName")}</button>}
              {person.id !== me.id && person.friendshipStatus === "none" && <button type="button" role="menuitem" disabled={sendFriend.isPending} onClick={() => sendFriend.mutate(person.id)}><Icon name="users" size={15}/>{t("addFriend")}</button>}
              {person.id !== me.id && person.friendshipStatus === "outgoing" && <button type="button" role="menuitem" disabled><Icon name="users" size={15}/>{t("requestSent")}</button>}
              {person.id !== me.id && person.friendshipStatus === "friends" && <button type="button" role="menuitem" disabled><Icon name="users" size={15}/>{t("friends")}</button>}
              {person.id !== me.id && person.friendshipStatus === "incoming" && person.friendRequestId && <div className="participant-friend-request"><span>{t("friendRequests")}</span><div><button type="button" disabled={respondRoomFriend.isPending} onClick={() => respondRoomFriend.mutate({ requestId: person.friendRequestId ?? 0, response: "accept" })}>{t("accept")}</button><button type="button" disabled={respondRoomFriend.isPending} onClick={() => respondRoomFriend.mutate({ requestId: person.friendRequestId ?? 0, response: "decline" })}>{t("decline")}</button></div></div>}
              {showQueueAdd && <button type="button" role="menuitem" disabled={manageQueue.isPending} onClick={() => { setParticipantMenuId(null); manageQueue.mutate({ action: "add", targetUserId: person.id }); }}><Icon name="queue" size={15}/>{t("addToQueue")}</button>}
              {showMute && <button type="button" role="menuitem" disabled={moderate.isPending} onClick={() => moderate.mutate({ targetUserId: person.id, action: person.muted ? "unmute" : "mute" })}><Icon name="mute" size={15}/>{person.muted ? t("unmute") : t("mute")}</button>}
              {showKick && <button type="button" role="menuitem" disabled={moderate.isPending} onClick={() => { setParticipantMenuId(null); setPendingConfirmation({ kind: "kick", person }); }}><Icon name="door" size={15}/>{t("removeFromRoom")}</button>}
              {showBan && <button type="button" role="menuitem" className="danger" disabled={manageBan.isPending} onClick={() => { setParticipantMenuId(null); setPendingConfirmation({ kind: "ban", person }); }}><Icon name="shield" size={15}/>{t("banFromRoom")}</button>}
            </div>}
          </div>
          {person.id === editingRoomUserId && <form className="participant-name-editor" onSubmit={(event) => { event.preventDefault(); updateRoomDisplayName.mutate(); }}><label htmlFor={`room-display-name-${person.id}`}>{t("changeRoomPersonName")}</label><div className="name-row"><input id={`room-display-name-${person.id}`} value={roomDisplayNameDraft} onChange={(event) => setRoomDisplayNameDraft(event.target.value)} minLength={2} maxLength={32} autoFocus required/><button className="small-button" disabled={updateRoomDisplayName.isPending}>{updateRoomDisplayName.isPending ? t("saving") : t("save")}</button></div><button type="button" className="cancel-button" onClick={() => setEditingRoomUserId(null)}>{t("cancel")}</button>{updateRoomDisplayName.data?.error && <Notice tone="error">{updateRoomDisplayName.data.error}</Notice>}</form>}
          {(showPromote || showDemote || showReport) && <div className="participant-controls">
            {showReport && <button type="button" className="participant-report" onClick={() => setReportTarget({ type: "user", id: person.id, name: person.name })}>{t("report")}</button>}
            {(showDemote || showPromote) && <div className="tier-stepper" aria-label={`${t("roomTier")}: ${tierLabel(person.roomTier)}`}>
              {showDemote && demoteTier && <button type="button" disabled={changeRole.isPending} onClick={() => setPendingConfirmation({ kind: "role", person, direction: "demote", nextTier: demoteTier })} aria-label={`${t("demoteTo")} ${tierLabel(demoteTier)}: ${person.name}`}>{t("demote")}</button>}
              <span>{tierLabel(person.roomTier)}</span>
              {showPromote && <label className="tier-promote-select"><span className="sr-only">{t("promoteTo")} — {person.name}</span><select value="" disabled={changeRole.isPending} aria-label={`${t("promoteTo")}: ${person.name}`} onChange={(event) => { const nextTier = event.target.value as RoomTier; if (promotionChoices.includes(nextTier)) setPendingConfirmation({ kind: "role", person, direction: "promote", nextTier }); event.target.value = ""; }}><option value="">{t("promoteTo")}…</option>{promotionChoices.map((tier) => <option key={tier} value={tier}>{tierLabel(tier)}</option>)}</select></label>}
            </div>}
          </div>}
        </div>;
      })}</div>
      {(changeRole.data?.error || manageBan.data?.error || sendFriend.data?.error || respondRoomFriend.data?.error) && <Notice tone="error">{changeRole.data?.error || manageBan.data?.error || sendFriend.data?.error || respondRoomFriend.data?.error}</Notice>}
    </details>
    <section className="conversation" aria-label={t("conversation")}>
      <div className="conversation-heading">
        <h2>{t("conversation")}</h2>
        {canManageRoomSettings && <details className="chat-background-settings">
          <summary><Icon name="edit" size={14}/>{t("chatBackground")}</summary>
          <div className="chat-background-controls">
            <label><span>{t("chooseChatBackground")}</span><input type="color" value={room.chatBackground === "transparent" ? "#ffffff" : room.chatBackground} onChange={(event) => updateRoomChatBackground.mutate(event.currentTarget.value)} disabled={updateRoomChatBackground.isPending || updateRoomChatBackgroundImage.isPending} aria-label={t("chooseChatBackground")}/></label>
            <button type="button" aria-pressed={!chatBackgroundImageUrl && room.chatBackground === "#ffffff"} onClick={() => updateRoomChatBackground.mutate("#ffffff")} disabled={updateRoomChatBackground.isPending || updateRoomChatBackgroundImage.isPending}>{t("whiteBackground")}</button>
            <button type="button" aria-pressed={!chatBackgroundImageUrl && room.chatBackground === "transparent"} onClick={() => updateRoomChatBackground.mutate("transparent")} disabled={updateRoomChatBackground.isPending || updateRoomChatBackgroundImage.isPending}>{t("transparentBackground")}</button>
            <fieldset className="wallpaper-presets" disabled={updateRoomChatBackground.isPending || updateRoomChatBackgroundImage.isPending}>
              <legend>{updateRoomChatBackgroundImage.isPending ? t("applyingWallpaper") : t("standardWallpapers")}</legend>
              <div>{CHAT_WALLPAPERS.map((wallpaper) => <button key={wallpaper.id} type="button" onClick={() => updateRoomChatBackgroundImage.mutate(wallpaper)} aria-pressed={room.chatBackgroundPreset === wallpaper.id} aria-label={t(wallpaper.nameKey)} title={t(wallpaper.nameKey)}><img src={wallpaper.src} alt=""/><span>{t(wallpaper.nameKey)}</span></button>)}</div>
            </fieldset>
            <label className={`background-photo-upload ${updateRoomChatBackgroundImage.isPending ? "pending" : ""}`} aria-label={chatBackgroundImageUrl ? t("changeBackgroundPhoto") : t("chooseBackgroundPhoto")}>
              <Icon name="image" size={16}/><span>{chatBackgroundImageUrl ? t("changeBackgroundPhoto") : t("chooseBackgroundPhoto")}</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" disabled={updateRoomChatBackgroundImage.isPending || updateRoomChatBackground.isPending} onChange={(event) => { const input = event.currentTarget; const file = input.files?.[0]; if (file) updateRoomChatBackgroundImage.mutate(file); input.value = ""; }}/>
            </label>
            {chatBackgroundImageUrl && <label className="background-fade-control"><span>{t("backgroundFade")} <output htmlFor="background-fade-slider" aria-live="polite">{backgroundFadeDraft}%</output></span><input id="background-fade-slider" type="range" min="0" max="100" step="5" value={backgroundFadeDraft} aria-label={t("backgroundFade")} aria-valuetext={`${backgroundFadeDraft}%`} disabled={updateRoomChatBackgroundFade.isPending} onChange={(event) => setBackgroundFadeDraft(Number(event.currentTarget.value))} onPointerUp={(event) => updateRoomChatBackgroundFade.mutate(Number(event.currentTarget.value))} onKeyUp={(event) => updateRoomChatBackgroundFade.mutate(Number(event.currentTarget.value))}/></label>}
            {chatBackgroundImageUrl && <button type="button" onClick={() => updateRoomChatBackgroundImage.mutate(null)} disabled={updateRoomChatBackgroundImage.isPending}>{t("removeBackgroundPhoto")}</button>}
          </div>
        </details>}
      </div>
      {(updateRoomChatBackground.data?.error || updateRoomChatBackgroundImage.data?.error || updateRoomChatBackgroundFade.data?.error) && <Notice tone="error">{updateRoomChatBackground.data?.error || updateRoomChatBackgroundImage.data?.error || updateRoomChatBackgroundFade.data?.error}</Notice>}
      <div className={`messages ${chatBackgroundImageUrl ? "photo-background" : ""}`} ref={messageList} style={chatBackgroundStyle(room.chatBackground, chatBackgroundImageUrl, room.chatBackgroundImageFit, backgroundFadeDraft)}>{messages.length === 0 && <div className="first-message"><p>{t("noMessages")}</p><strong>{t("firstHello")}</strong></div>}{messages.map((message) => message.kind === "event" ? <div className="event-message" key={message.id}>{vietnameseRoomEvent(message.body)}</div> : <article className={`message ${message.userId === me.id ? "mine" : ""}`} key={message.id}><div className="message-meta"><strong>{message.name ?? t("formerMember")}</strong><time>{new Date(message.createdAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", { hour: "numeric", minute: "2-digit" })}</time></div>{message.imageUrl && <button type="button" className="chat-photo-thumbnail" aria-label={t("openChatPhoto")} onClick={() => setExpandedPhoto({ src: message.imageUrl ?? "", alt: `${t("chatPhoto")} ${message.name ?? t("formerMember")}` })}><img className="chat-photo" src={message.imageUrl} alt={`${t("chatPhoto")} ${message.name ?? t("formerMember")}`} loading="lazy" decoding="async"/></button>} {message.body && <p>{message.body}</p>}</article>)}</div>
      <div className="room-announcement" role="status"><Icon name="mic" size={15}/><span>{room.micMode === "free" ? t("freeMode") : `${t("queueMode")} · ${Math.round(room.defaultMicSeconds / 60)} ${t("minuteTurns")}`} &nbsp;·&nbsp; {participants.length} {locale === "vi" ? "người đang trực tuyến" : "online"}</span></div>
      {emojiOpen && !me.muted && me.roomTier !== "visitor" && <div className="emoji-picker" role="group" aria-label={t("emojiPicker")}>
        {CHAT_EMOJIS.map((emoji) => <button type="button" key={emoji} onClick={() => insertEmoji(emoji)} aria-label={`${t("emojiPicker")}: ${emoji}`}>{emoji}</button>)}
      </div>}
      <form className="composer" onSubmit={(e) => { e.preventDefault(); if (body.trim()) send.mutate(body.trim()); }}>
        {canSendPhoto && <label className={`photo-upload ${sendPhoto.isPending ? "pending" : ""}`} title={t("photoUploadHint")} aria-label={sendPhoto.isPending ? t("photoSending") : t("sendPhoto")}><Icon name="image"/><input type="file" accept="image/jpeg,image/png,image/webp" disabled={me.muted || sendPhoto.isPending} onChange={(event) => { const input = event.currentTarget; const file = input.files?.[0]; if (file) sendPhoto.mutate(file); input.value = ""; }}/></label>}
        {me.roomTier !== "visitor" && <button type="button" className="emoji-toggle" aria-label={emojiOpen ? t("closeEmojiPicker") : t("openEmojiPicker")} aria-expanded={emojiOpen} onClick={() => setEmojiOpen((open) => !open)} disabled={me.muted}><Icon name="smile"/></button>}
        <label className="sr-only" htmlFor="message">{t("message")}</label><textarea ref={messageInput} id="message" value={body} onChange={(e) => setBody(e.target.value)} onPaste={(event) => { if (!canSendPhoto || me.muted || sendPhoto.isPending) return; const imageItem = Array.from(event.clipboardData.items).find((item) => item.kind === "file" && item.type.startsWith("image/")); const file = imageItem?.getAsFile(); if (file) { event.preventDefault(); sendPhoto.mutate(file); } }} placeholder={me.muted ? t("youMuted") : t("addConversation")} maxLength={1200} disabled={me.muted} rows={1}/>
        <button aria-label={t("sendMessage")} disabled={!body.trim() || send.isPending || me.muted}><Icon name="send"/></button>
      </form>
      {(photoError || sendPhoto.data?.error) && <Notice tone="error">{photoError || sendPhoto.data?.error}</Notice>}
      {send.data?.error && <Notice tone="error">{send.data.error}</Notice>}
      {moderate.data?.error && <Notice tone="error">{moderate.data.error}</Notice>}
    </section>
    <nav className="room-status-bar" aria-label={locale === "vi" ? "Điều khiển âm thanh phòng" : "Room audio controls"}>
      <div className="connection-status" title={locale === "vi" ? "Đã kết nối" : "Connected"}><Icon name="wifi" size={20}/><span>{locale === "vi" ? "Đã kết nối" : "Connected"}</span></div>
      <button type="button" className={`desktop-talk-button ${voiceOn ? "active" : ""}`} onClick={() => {
        const maySpeakNow = room.micMode === "free" || isMyTurn || canModerate;
        if (maySpeakNow) voiceOn ? void stopVoice() : void startVoice();
        else if (!myQueueEntry) joinQueue.mutate();
      }} disabled={voiceStarting || presence.isPending || me.muted || joinQueue.isPending} aria-pressed={voiceOn}><Icon name={me.muted ? "mute" : "mic"} size={18}/><span>{me.muted ? t("muted") : voiceOn ? t("leaveMic") : room.micMode === "queue" && !isMyTurn && !canModerate ? (myQueueEntry ? t("waiting") : t("joinMicQueue")) : (locale === "vi" ? "Bấm để nói" : "Tap to talk")}</span></button>
      <div className="room-status-actions">
        <button type="button" className={backgroundSoundOn ? "active" : ""} onClick={() => void toggleBackgroundSound()} disabled={backgroundSoundStarting || voiceStarting || me.muted || (room.micMode === "queue" && !isMyTurn && !canModerate)} aria-pressed={backgroundSoundOn}><Icon name="music" size={17}/><span>{locale === "vi" ? "Nhạc nền" : "Background music"}</span></button>
        <button type="button" className={recordingOn ? "active recording" : ""} onClick={() => void toggleRecording()} disabled={me.muted || (room.micMode === "queue" && !isMyTurn && !canModerate)} aria-pressed={recordingOn}><Icon name="record" size={17}/><span>{recordingOn ? (locale === "vi" ? "Dừng ghi" : "Stop") : (locale === "vi" ? "Ghi âm" : "Record")}</span></button>
        <button type="button" onClick={() => setDesktopSidebarCollapsed((collapsed) => !collapsed)} aria-pressed={desktopSidebarCollapsed}><Icon name="collapse" size={17}/><span>{desktopSidebarCollapsed ? (locale === "vi" ? "Mở rộng" : "Expand") : (locale === "vi" ? "Rút gọn" : "Collapse")}</span></button>
      </div>
    </nav>
    {expandedPhoto && <ChatPhotoDialog src={expandedPhoto.src} alt={expandedPhoto.alt} onClose={() => setExpandedPhoto(null)}/>} 
    {reportTarget && <ReportDialog key={`${reportTarget.type}-${reportTarget.id}`} token={token} target={reportTarget} onClose={() => setReportTarget(null)}/>} 
    {pendingConfirmation && <ConfirmationDialog
      message={confirmationMessage}
      confirmLabel={confirmationLabel}
      onCancel={() => setPendingConfirmation(null)}
      onConfirm={() => {
        const confirmation = pendingConfirmation;
        setPendingConfirmation(null);
        if (confirmation.kind === "leave") leave.mutate();
        else if (confirmation.kind === "kick") moderate.mutate({ targetUserId: confirmation.person.id, action: "kick" });
        else if (confirmation.kind === "ban") manageBan.mutate({ targetUserId: confirmation.person.id, action: "ban" });
        else if (confirmation.kind === "role") changeRole.mutate({ targetUserId: confirmation.person.id, direction: confirmation.direction, targetTier: confirmation.direction === "promote" && confirmation.nextTier !== "owner" && confirmation.nextTier !== "admin" && confirmation.nextTier !== "superadmin" ? confirmation.nextTier : undefined });
        else if (confirmation.kind === "queue-remove") manageQueue.mutate({ action: "remove", targetUserId: confirmation.userId });
        else manageQueue.mutate({ action: "clear" });
      }}
    />}
  </main>;
}

export function App() {
  const [token, setToken] = useState(readSessionToken);
  const [roomId, setRoomId] = useState<number | null>(null);
  const locale = readLocale();
  const [supportOpen, setSupportOpen] = useState(false);
  const activeSupportChat = useQuery({ queryKey: ["support-chat", token], queryFn: () => api.getMySupportChat({ token }), enabled: Boolean(token), refetchInterval: token ? 5000 : false });
  useEffect(() => { document.documentElement.lang = "vi"; }, []);
  const signOut = () => { clearSessionToken(); setToken(""); setRoomId(null); setSupportOpen(false); };
  const localeValue: LocaleContextValue = { locale, t: (key) => copy.vi[key] };
  const hasActiveSupportChat = Boolean(activeSupportChat.data?.ticket);
  const showSupportFab = Boolean(token) && roomId === null && !supportOpen;
  return <LocaleContext.Provider value={localeValue}><div className={`app ${roomId ? "room-open" : ""}`}><SafeAreaTopScrim backgroundColor="var(--bg)"/>{!token ? <Welcome onReady={setToken}/> : roomId ? <Room token={token} roomId={roomId} onBack={() => setRoomId(null)} supportOpen={supportOpen} onToggleSupport={() => setSupportOpen((open) => !open)}/> : <Home token={token} onOpenRoom={setRoomId} onSignOut={signOut} supportOpen={supportOpen} onSetSupportOpen={setSupportOpen}/>} {showSupportFab && <button type="button" className={`support-fab ${hasActiveSupportChat ? "active-conversation" : ""}`} aria-label={copy[locale].contactSupport} onClick={() => setSupportOpen(true)}>?</button>} {token && roomId && supportOpen && <SupportChatPanel token={token} onClose={() => setSupportOpen(false)}/>}</div></LocaleContext.Provider>;
}
