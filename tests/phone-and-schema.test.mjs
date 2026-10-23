import test from "node:test";
import assert from "node:assert/strict";
import { normalizePhoneNumber, toWaMeDigits } from "../src/lib/phone.ts";
import { consultationLeadSchema } from "../src/forms/schemas.ts";

test("Sri Lankan Phone Normalizer - 07XXXXXXXX format", () => {
  const result = normalizePhoneNumber("0771234567");
  assert.equal(result.valid, true);
  assert.equal(result.digitsOnly, "94771234567");
  assert.equal(result.formatted, "+94 77 123 4567");
  assert.equal(result.isSriLankan, true);
});

test("Sri Lankan Phone Normalizer - formatted with spaces and dashes", () => {
  const res1 = normalizePhoneNumber("071 234 5678");
  assert.equal(res1.valid, true);
  assert.equal(res1.digitsOnly, "94712345678");

  const res2 = normalizePhoneNumber("076-345-6789");
  assert.equal(res2.valid, true);
  assert.equal(res2.digitsOnly, "94763456789");
});

test("Sri Lankan Phone Normalizer - +94 international format", () => {
  const res1 = normalizePhoneNumber("+94771234567");
  assert.equal(res1.valid, true);
  assert.equal(res1.digitsOnly, "94771234567");
  assert.equal(res1.formatted, "+94 77 123 4567");

  const res2 = normalizePhoneNumber("+94 (77) 123-4567");
  assert.equal(res2.valid, true);
  assert.equal(res2.digitsOnly, "94771234567");
});

test("Sri Lankan Phone Normalizer - 94 prefix without plus", () => {
  const result = normalizePhoneNumber("94771234567");
  assert.equal(result.valid, true);
  assert.equal(result.digitsOnly, "94771234567");
  assert.equal(result.formatted, "+94 77 123 4567");
});

test("Sri Lankan Phone Normalizer - 9 digits without leading 0", () => {
  const result = normalizePhoneNumber("771234567");
  assert.equal(result.valid, true);
  assert.equal(result.digitsOnly, "94771234567");
  assert.equal(result.formatted, "+94 77 123 4567");
});

test("toWaMeDigits returns digits-only suitable for wa.me URL query", () => {
  assert.equal(toWaMeDigits("077 123 4567"), "94771234567");
  assert.equal(toWaMeDigits("+94 (71) 234-5678"), "94712345678");
  assert.equal(toWaMeDigits("94761234567"), "94761234567");
});

test("International numbers outside Sri Lanka", () => {
  const result = normalizePhoneNumber("+1 (555) 234-5678");
  assert.equal(result.valid, true);
  assert.equal(result.digitsOnly, "15552345678");
  assert.equal(result.isSriLankan, false);
});

test("Invalid phone numbers rejected", () => {
  assert.equal(normalizePhoneNumber("").valid, false);
  assert.equal(normalizePhoneNumber("123").valid, false);
  assert.equal(normalizePhoneNumber("abcd").valid, false);
  assert.equal(normalizePhoneNumber("07712345678901234567").valid, false);
});

test("Zod Schema - validates consultation lead with various Sri Lankan formats", () => {
  const payload1 = {
    name: "Ruwan Silva",
    whatsappNumber: "077 123 4567",
    businessName: "Colombo Stores",
    whatYouNeed: "We want a new website and better Facebook marketing.",
  };
  const res1 = consultationLeadSchema.safeParse(payload1);
  assert.equal(res1.success, true);

  const payload2 = {
    ...payload1,
    whatsappNumber: "+94712345678",
    utm_source: "facebook",
    utm_medium: "cpc",
    utm_campaign: "brand_growth",
    referrer: "https://www.google.com",
  };
  const res2 = consultationLeadSchema.safeParse(payload2);
  assert.equal(res2.success, true);
  if (res2.success) {
    assert.equal(res2.data.utm_source, "facebook");
    assert.equal(res2.data.referrer, "https://www.google.com");
  }
});

test("Zod Schema - rejects invalid phone and bot honeypot", () => {
  const invalidPhone = {
    name: "Ruwan Silva",
    whatsappNumber: "invalid-number",
    businessName: "Colombo Stores",
    whatYouNeed: "We want a new website and better Facebook marketing.",
  };
  const res1 = consultationLeadSchema.safeParse(invalidPhone);
  assert.equal(res1.success, false);

  const botHoneypot = {
    name: "Spam Bot",
    whatsappNumber: "0771234567",
    businessName: "Spam LLC",
    whatYouNeed: "Buy cheap backlinks now from our server.",
    honeypot: "i am a bot",
  };
  const res2 = consultationLeadSchema.safeParse(botHoneypot);
  assert.equal(res2.success, false);
});
