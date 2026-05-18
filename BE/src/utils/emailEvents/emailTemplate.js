/**
 * Generates a branded DriveEase OTP email HTML
 * @param {string} code - The 4-digit OTP code
 * @param {string} email - Recipient email (for display)
 */
export function otpEmailTemplate(code, email = "") {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email — DriveEase</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', Arial, sans-serif; background: #F5F3FF; }
  </style>
</head>
<body style="background:#F5F3FF; padding: 40px 16px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; margin:0 auto;">

    <!-- Header / Brand -->
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0"
          style="background: linear-gradient(135deg, #7C3AED 0%, #4F46E5 60%, #06B6D4 100%);
                 border-radius: 20px 20px 0 0; padding: 36px 40px 28px;">
          <tr>
            <td style="text-align:left;">
              <!-- Logo row -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:rgba(255,255,255,0.2); border-radius:12px;
                              width:44px; height:44px; text-align:center; vertical-align:middle;">
                    <span style="font-size:22px;">🚗</span>
                  </td>
                  <td style="padding-left:12px; vertical-align:middle;">
                    <span style="font-family:'Plus Jakarta Sans',Arial,sans-serif;
                                 font-size:22px; font-weight:800; color:#fff;
                                 letter-spacing:-0.5px;">DriveEase</span>
                  </td>
                </tr>
              </table>
              <p style="color:rgba(255,255,255,0.75); font-size:13px; margin-top:6px; margin-left:2px;">
                Premium Car Rental
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:28px;">
              <h1 style="font-family:'Plus Jakarta Sans',Arial,sans-serif;
                          font-size:26px; font-weight:800; color:#fff;
                          line-height:1.25; letter-spacing:-0.5px;">
                Verify Your Email 📩
              </h1>
              <p style="color:rgba(255,255,255,0.8); font-size:14px; margin-top:8px; line-height:1.6;">
                Thanks for signing up! Use the code below to confirm your email address and start renting.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:#fff; padding: 36px 40px; border-radius:0 0 0 0;">

        <!-- OTP Code box -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align:center; padding-bottom:8px;">
              <p style="font-size:13px; color:#6B7280; margin-bottom:16px;">
                Your one-time verification code is:
              </p>
              <!-- Code -->
              <div style="display:inline-block; background:linear-gradient(135deg,#7C3AED,#06B6D4);
                          border-radius:16px; padding:3px;">
                <div style="background:#fff; border-radius:13px; padding:20px 48px;">
                  <span style="font-family:'Plus Jakarta Sans',Arial,sans-serif;
                               font-size:42px; font-weight:800; letter-spacing:12px;
                               background:linear-gradient(135deg,#7C3AED,#06B6D4);
                               -webkit-background-clip:text; -webkit-text-fill-color:transparent;
                               color:#7C3AED;">
                    ${code}
                  </span>
                </div>
              </div>
              <p style="font-size:12px; color:#9CA3AF; margin-top:14px;">
                This code expires in <strong style="color:#7C3AED;">5 minutes</strong>
              </p>
            </td>
          </tr>
        </table>

        <!-- Divider -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
          <tr>
            <td style="border-top:1px solid #F3F4F6;"></td>
          </tr>
        </table>

        <!-- Info row -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#F9FAFB; border-radius:12px; padding:16px 20px;">
              <p style="font-size:13px; color:#6B7280; line-height:1.6;">
                📧 This code was requested for <strong style="color:#374151;">${email}</strong>.<br/>
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>

        <!-- Steps hint -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
          <tr>
            <td>
              <p style="font-size:13px; color:#6B7280; font-weight:600; margin-bottom:12px;">How to verify:</p>
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0">
                ${["Go back to the DriveEase app", "Enter the 4-digit code above", "Start exploring our fleet!"]
                  .map((step, i) => `
                  <tr>
                    <td style="padding-bottom:8px; vertical-align:top;">
                      <span style="display:inline-block; background:linear-gradient(135deg,#7C3AED,#4F46E5);
                                   color:#fff; font-size:11px; font-weight:700; width:20px; height:20px;
                                   border-radius:50%; text-align:center; line-height:20px; margin-right:10px;">
                        ${i + 1}
                      </span>
                      <span style="font-size:13px; color:#374151;">${step}</span>
                    </td>
                  </tr>`).join("")}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:linear-gradient(135deg,#1E1B4B,#0F172A); border-radius:0 0 20px 20px;
                  padding:24px 40px; text-align:center;">
        <p style="font-family:'Plus Jakarta Sans',Arial,sans-serif; font-size:16px;
                   font-weight:800; color:#fff; margin-bottom:4px;">DriveEase</p>
        <p style="font-size:12px; color:rgba(255,255,255,0.45); margin-bottom:12px;">
          Premium Car Rental Platform
        </p>
        <p style="font-size:11px; color:rgba(255,255,255,0.3);">
          © ${new Date().getFullYear()} DriveEase. All rights reserved.<br/>
          You received this because you signed up at DriveEase.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
  `.trim();
}
