import { getPayload, normalizeUrl, isValidPhone, isValidEmail } from "../lib/validation/validate";
import { buildWifiPayload, historyLabel } from "../lib/qr/payloads";
import { DEFAULT_SETTINGS } from "../lib/constants";
import { STRINGS } from "../lib/i18n/strings";

const t = STRINGS.en;

let failures = 0;

function check(name: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  ✓ ${name}`);
  } else {
    failures += 1;
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function baseContent() {
  return structuredClone(DEFAULT_SETTINGS.content);
}

console.log("URL payloads");
{
  const c = baseContent();
  c.url = "example.com/path?q=1";
  const r = getPayload("url", c, t);
  check("bare domain gets https://", r.status === "ok" && r.payload === "https://example.com/path?q=1", JSON.stringify(r));

  c.url = "not a url with spaces";
  const bad = getPayload("url", c, t);
  check("invalid URL returns error with field", bad.status === "error" && bad.field === "url", JSON.stringify(bad));

  const emptyContent = baseContent();
  emptyContent.url = "";
  const empty = getPayload("url", emptyContent, t);
  check("empty URL is 'empty' status", empty.status === "empty");
}

console.log("normalizeUrl");
{
  check("http:// kept", normalizeUrl("http://example.com") === "http://example.com/");
  check("localhost allowed", normalizeUrl("localhost:3000") === "https://localhost:3000/");
  check("host without dot rejected", normalizeUrl("https://nope") === null);
}

console.log("Wi-Fi payloads");
{
  const c = baseContent();
  c.ssid = "Café;2";
  c.password = "pa:ss,word";
  c.security = "WPA";
  c.hidden = true;
  const payload = buildWifiPayload(c);
  check("WPA hidden escapes specials", payload === "WIFI:T:WPA;S:Café\\;2;P:pa\\:ss\\,word;H:true;;", payload);

  c.security = "nopass";
  const open = buildWifiPayload(c);
  check("open network omits password", open === "WIFI:T:nopass;S:Café\\;2;H:true;;", open);
}

console.log("Email / Phone / SMS");
{
  const c = baseContent();
  c.email = "a@b.com";
  c.subject = "Hello there";
  c.message = "Line one\nLine two";
  const r = getPayload("email", c, t);
  check("mailto with encoded params", r.status === "ok" && r.payload.includes("mailto:a@b.com?subject=Hello%20there&body=Line%20one%0ALine%20two"), JSON.stringify(r));

  c.email = "not-an-email";
  const badEmail = getPayload("email", c, t);
  check("invalid email error", badEmail.status === "error" && badEmail.field === "email");

  c.phone = "+1 (555) 123-4567";
  check("phone valid", getPayload("phone", c, t).status === "ok");
  c.phone = "call me";
  check("phone with letters invalid", getPayload("phone", c, t).status === "error");

  const sms = baseContent();
  sms.smsPhone = "+15551234567";
  sms.smsMessage = "See you at 8";
  const smsPayload = getPayload("sms", sms, t);
  check("SMSTO payload", smsPayload.status === "ok" && smsPayload.payload === "SMSTO:+15551234567:See you at 8", JSON.stringify(smsPayload));
}

console.log("Location");
{
  const c = baseContent();
  c.latitude = "40.7128";
  c.longitude = "-74.0060";
  c.locationName = "Statue of Liberty";
  const r = getPayload("location", c, t);
  check("geo URI with q param", r.status === "ok" && r.payload === "geo:40.7128,-74.0060?q=Statue%20of%20Liberty", JSON.stringify(r));

  c.latitude = "91";
  const out = getPayload("location", c, t);
  check("latitude out of range rejected", out.status === "error");

  c.latitude = "";
  c.longitude = "10";
  const partial = getPayload("location", c, t);
  check("partial coordinates rejected", partial.status === "error");
}

console.log("Contact / vCard");
{
  const c = baseContent();
  c.firstName = "Ada";
  c.lastName = "Lovelace;Countess";
  c.contactPhone = "+44 20 7946 0958";
  c.contactEmail = "ada@example.com";
  c.company = "Analytical Engines";
  const r = getPayload("contact", c, t);
  const vcard = r.status === "ok" ? r.payload : "";
  check(
    "vCard escapes and structure",
    vcard.startsWith("BEGIN:VCARD\nVERSION:3.0") &&
      vcard.includes("N:Lovelace\\;Countess;Ada;;;") &&
      vcard.endsWith("END:VCARD"),
    vcard || JSON.stringify(r),
  );

  const emptyContact = getPayload("contact", baseContent(), t);
  check("empty contact is 'empty'", emptyContact.status === "empty");
}

console.log("History labels");
{
  const c = baseContent();
  c.url = "https://example.com/some/page/";
  check("URL label strips scheme", historyLabel("url", c, t) === "example.com/some/page");
  c.ssid = "Home Wi-Fi";
  check("Wi-Fi label", historyLabel("wifi", c, t) === "Home Wi-Fi");
  c.text = "a".repeat(60);
  check("text label truncated", historyLabel("text", c, t) === `${"a".repeat(40)}…`);
}

console.log("isValidPhone / isValidEmail");
{
  check("phone 3 digits ok", isValidPhone("555"));
  check("phone 2 digits rejected", !isValidPhone("12"));
  check("email ok", isValidEmail("a@b.co"));
  check("email rejected", !isValidEmail("a@b"));
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
