import { z } from "zod";

export const uploadFileSchema = z.object({
  pdf: z
    .instanceof(File)
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be under 20 MB",
    }),

  method: z.enum(["document"], {
    required_error: "You need to pay to upload your document",
  }),
});

export type uploadForm = z.infer<typeof uploadFileSchema>;
