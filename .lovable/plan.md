# Complete the LYNXDEVOPS media and contact update

## What will change
- Recover the supplied logo, banner, three setup photos, and creator video from the chat attachments and add them to the site’s managed media.
- Replace the temporary header/footer mark with the supplied logo, derive the favicon from it, and use the logo in suitable page metadata where a public absolute image URL is available.
- Use the wide banner as a branded full-width section background while preserving readable contrast and the existing dark LYNXDEVOPS style.
- Replace the creator-video placeholder with the supplied video, native controls, accessible labeling, and a poster derived from the supplied media.
- Replace the workstation placeholder with a polished responsive three-photo gaming setup gallery.
- Replace every visible placeholder contact email with a `mailto:` link to `LYNXDEVOPS1@GMAIL.COM`.
- Add clear Discord username and server-invite links on the diagnostic form, success state, community section, and relevant footer contact area.
- Keep diagnostic submissions stored as they are today. Do not claim notifications are active unless all required credentials are configured.

## Notification status and behavior
- Inspect configured secrets for a Resend API key, verified sender address, and Discord webhook.
- If all are present, connect submission notifications and verify them.
- If any are missing, do not add misleading notification claims; keep the direct email and Discord links as reliable fallback contact methods and report the exact missing secret names.

## Verification
- Check every content page has complete route-specific metadata.
- Verify the homepage and diagnostic flow at desktop and mobile sizes, including image/video loading, readable banner content, all contact links, form success state, and no console or build errors.
- Show the finished preview without publishing.

## Technical details
- Media stays in managed project assets and is imported through its generated pointer metadata.
- Existing routes, design tokens, form validation, database storage, and admin workflow remain intact.
