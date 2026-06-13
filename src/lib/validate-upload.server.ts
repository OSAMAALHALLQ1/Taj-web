const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface UploadValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFileUpload(
  file: File | { type: string; size: number; name: string }
): UploadValidationResult {
  if (!file) {
    return { valid: false, error: "لم يتم اختيار ملف للرفع." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `حجم الملف يجب ألا يتجاوز 5 ميجابايت. الحجم الحالي: ${(file.size / (1024 * 1024)).toFixed(1)} ميجابايت.`,
    };
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `نوع الملف غير مسموح: ${file.type}. الأنواع المسموحة: JPG, PNG, WebP, GIF, AVIF.`,
    };
  }

  const blockedExtensions = [".exe", ".bat", ".cmd", ".sh", ".php", ".asp", ".aspx", ".jsp", ".war", ".jar"];
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (blockedExtensions.includes(ext)) {
    return { valid: false, error: `امتداد الملف ${ext} غير مسموح.` };
  }

  return { valid: true };
}
