import { z } from "zod";

export const createProductsSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "O nome do produto é obrigatório " }),
    price: z
      .string()
      .min(1, { message: "O valor do produto é obrigatório" })
      .regex(/^\d+$/),
    description: z
      .string()
      .min(1, { message: "A descrição do produto é obrigatória" }),
    category_id: z.string({ message: "A categoria do produto é obrigatória" }),
  }),
});
