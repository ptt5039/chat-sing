# Data Plan

## Context provenance
- `Create me a website using react that allows regular users to instant chat and talk/sing to each other. Moderator can also create rooms, moderator can kick users out of the room or mute users in the room. Admin can promote or demote users to be moderator and by versa. Admin do whatever moderators can do. Database will be using postgresql` (verbatim request; defines the React chat, live voice, room, and role-management workflow)
- `Adding karaoke song selection using youtube for whoever on mic` (verbatim follow-up; adds room-wide YouTube karaoke selection controlled by the current microphone participant)
- `Search and play youtube music on site and other will also hear my music too` (verbatim follow-up; adds in-room YouTube search and room-wide synchronized playback)
- `only people on the mic queue can search and play music/songs` (clarification; search and shared playback controls are available to both the current singer and waiting queue members)
- `losing the queue spot on lobby/logout is the desired behavior` (latest correction; either room-to-lobby control leaves the room and removes that user from the mic queue before navigation)

## Tested sources
Core content is user-created rooms, messages, memberships, role changes, and karaoke selections persisted through typed server actions. At runtime, an authenticated current singer can search YouTube through the managed `ctx.tool.web_search` channel; only exact returned YouTube video URLs with valid video identifiers are offered. A selection stores that exact returned URL (or an exact URL pasted by the singer), validates its identifier, and derives the official privacy-enhanced YouTube embed endpoint for synchronized room playback.

The standard chat wallpaper picker uses artifact-owned copies of images found through image search. Source pages and exact image locators:
- Kawaii cats: https://www.vecteezy.com/vector-art/2280887-cute-chubby-white-cat-kitten-cartoon-doodle-seamless-pattern — https://static.vecteezy.com/system/resources/thumbnails/002/266/274/small/cute-chubby-cat-kitten-with-cloud-cartoon-doodle-seamless-pattern-free-vector.jpg
- Dreamy kitten: https://wallpapers.com/pastel-cat-aesthetic — https://wallpapers.com/images/hd/dreamy-sky-kitten-rainbow-2ti3xonxn7dvgypk.jpg
- Pastel clouds: https://wallpaperaccess.com/i-need-a-wallpaper — https://wallpaperaccess.com/full/11004735.jpg
- Pastel daisies: https://www.pinterest.com/pin/23714335527254640 — https://i.pinimg.com/originals/99/e5/55/99e555f1805c7f6410c485edcad6ae85.png

## Image slots
- **Standard wallpaper previews**: four bundled chat background choices (kawaii cats, dreamy kitten, pastel clouds, pastel daisies). Each selected image is copied into the room's blob storage through the same validated action used for a moderator-uploaded background.
- User-uploaded room pictures, singer covers, message photos, report attachments, and custom chat backgrounds continue to use validated runtime blob storage.

## Long-term data behavior
- **Refresh policy**: room summaries, participants, messages, the active karaoke selection, and WebRTC signaling are refreshed with short foreground polling while the artifact is open; no cron or background refresh.
- **Growth**: rooms, users, memberships, and messages grow through explicit user actions; each room has at most one current karaoke selection, which is replaced or cleared explicitly; stale WebRTC signaling records are pruned opportunistically.
- **Ordering**: rooms by most recent activity, messages and moderation events chronologically, participants by live presence then name.
- **Time semantics**: creation/update instants are stored as UTC timestamps and displayed in the viewer’s local time. Presence is derived from recent heartbeat timestamps.

## Rejected approaches
- **Tried**: external hosted chat, image, and content feeds.
  **Why rejected**: none are needed; they would add dependencies unrelated to the user’s requested communication workflow.
- **Tried**: a purely decorative prototype or simulated chat data.
  **Why rejected**: the request calls for functional multi-user chat and moderation, so the shipped state starts empty and only displays real user-created data.
- **Tried**: direct external PostgreSQL connectivity.
  **Why rejected**: this artifact runtime provides its own managed relational database and typed action boundary, with no user-supplied external database connection. The schema and actions will remain relational and portable, while the shipped artifact uses the runtime database rather than inventing credentials or an unreachable PostgreSQL service.
