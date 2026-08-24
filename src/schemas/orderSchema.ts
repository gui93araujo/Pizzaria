import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um inteiro" })
      .positive({ message: "O número da mesa deve ser positivo" }),
    name: z.string().optional(),
  }),
});

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: "Order deve ser uma string" })
      .min(1, "A order_id deve ser obrigatória"),
    product_id: z
      .string({ message: "Produto deve ser uma string" })
      .min(1, "o id do produto deve ser obrigatório"),
    amount: z
      .number()
      .int("Quantidade deve ser um número inteiro")
      .positive("Quantidade deve ser um número positivo"),
  }),
});
