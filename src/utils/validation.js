const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email.trim()) {
    return "โปรดใส่อีเมลของคุณ";
  }

  if (!emailRegex.test(email)) {
    return "รูปแบบอีเมลไม่ถูกต้อง";
  }

  return "";
}

export function validateRequired(value, message) {
  if (!value.trim()) {
    return message;
  }
  return "";
}
