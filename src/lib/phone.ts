/**
 * Sri Lankan & International Phone Number Normalizer
 * Handles:
 *  - Local Sri Lankan format: 07XXXXXXXX (e.g. 0771234567) -> 94771234567
 *  - International format with +: +947XXXXXXXX -> 94771234567
 *  - International format without +: 947XXXXXXXX -> 94771234567
 *  - Formatted with spaces, dashes, parentheses: 077 123 4567, +94 (77) 123-4567
 *  - Other valid international formats: +1..., +44..., etc.
 */

export interface PhoneNormalizationResult {
  valid: boolean;
  formatted: string;
  digitsOnly: string;
  isSriLankan: boolean;
  error?: string;
}

export function normalizePhoneNumber(raw: string): PhoneNormalizationResult {
  if (!raw || typeof raw !== "string") {
    return {
      valid: false,
      formatted: "",
      digitsOnly: "",
      isSriLankan: false,
      error: "Phone number is required.",
    };
  }

  const trimmed = raw.trim();
  // Strip common punctuation and whitespace, preserving leading + if present
  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length < 7 || digits.length > 15) {
    return {
      valid: false,
      formatted: trimmed,
      digitsOnly: digits,
      isSriLankan: false,
      error: "Please enter a valid phone number with 9-12 digits.",
    };
  }

  // Check if Sri Lankan number
  // Case 1: Starts with 0 (e.g. 07XXXXXXXX or landline 0XXXXXXXX)
  if (trimmed.startsWith("0") && digits.length === 10) {
    const slDigits = "94" + digits.slice(1);
    return {
      valid: true,
      formatted: `+94 ${digits.slice(1, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`,
      digitsOnly: slDigits,
      isSriLankan: true,
    };
  }

  // Case 2: Starts with 94 and is 11 digits (e.g. 947XXXXXXXX or +947XXXXXXXX)
  if (digits.startsWith("94") && digits.length === 11) {
    const mobilePart = digits.slice(2);
    return {
      valid: true,
      formatted: `+94 ${mobilePart.slice(0, 2)} ${mobilePart.slice(2, 5)} ${mobilePart.slice(5)}`,
      digitsOnly: digits,
      isSriLankan: true,
    };
  }

  // Case 3: 9 digits without leading 0 (e.g. 771234567)
  if (digits.length === 9 && digits.startsWith("7")) {
    const slDigits = "94" + digits;
    return {
      valid: true,
      formatted: `+94 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`,
      digitsOnly: slDigits,
      isSriLankan: true,
    };
  }

  // Non-Sri Lankan international numbers
  if (digits.length >= 7 && digits.length <= 15) {
    return {
      valid: true,
      formatted: hasLeadingPlus ? `+${digits}` : digits,
      digitsOnly: digits,
      isSriLankan: false,
    };
  }

  return {
    valid: false,
    formatted: trimmed,
    digitsOnly: digits,
    isSriLankan: false,
    error: "Invalid phone number format.",
  };
}

/**
 * Produces digits-only value ready for wa.me URL query (e.g. https://wa.me/<digits>)
 */
export function toWaMeDigits(raw: string): string {
  const result = normalizePhoneNumber(raw);
  return result.digitsOnly;
}
