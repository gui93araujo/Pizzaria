import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ message: "Categoria precisa ser um texto" }).min(2, {
      message: "O nome da categoria deve ter no mínimo 2 caracteres",
    }),
  }),
});
