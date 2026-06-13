import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkRateLimit } from "../rate-limit.server";

const orderSchema = z.object({
  orderRef: z.string().min(1).max(20),
  customerName: z.string().min(3).max(100),
  customerPhone: z.string().regex(/^(059|056)\d{7}$/),
  deliveryType: z.enum(["delivery", "pickup"]),
  address: z.string().max(500),
  items: z.array(z.any()),
  subtotal: z.number(),
  deliveryFee: z.number(),
  total: z.number(),
  notes: z.string().max(1000).nullable(),
});

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator(orderSchema)
  .handler(async ({ data }) => {
    const rateCheck = checkRateLimit("global_order_limit", 10, 60_000);

    if (!rateCheck.allowed) {
      return {
        success: false as const,
        error: "طلبات كثيرة جداً. الرجاء الانتظار دقيقة قبل المحاولة مرة أخرى.",
        retryAfter: Math.ceil((rateCheck.resetAt - Date.now()) / 1000),
      };
    }

    return {
      success: true as const,
      message: "تم استلام الطلب بنجاح.",
    };
  });
