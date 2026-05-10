"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botField: z.string().max(0, "Bot detected").optional(),
});

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    botField: formData.get("botField"),
  };

  const validatedFields = contactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.data.botField) {
    return {
      success: false,
      message: "Bot detected",
    };
  }

  console.log("Transmission received from:", validatedFields.data.email);

  return {
    success: true,
    message: "Initiated secure transmission. Ayush will receive your vision shortly.",
  };
}
