import prismaClient from "../../prisma/index";

interface ListProductsByCategoryServiceProps {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ListProductsByCategoryServiceProps) {
    try {
      const categoryExists = await prismaClient.category.findFirst({
        where: {
          id: category_id,
        },
      });

      if (!categoryExists) {
        throw new Error("Categoria não encontrada!");
      }

      const products = await prismaClient.product.findMany({
        where: {
          category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              name: true,
              id: true,
            },
          },
        },
        orderBy: {
          name: "desc",
        },
      });

      return products;
    } catch (error) {
      if (error instanceof Error && error.message === "Categoria não encontrada!") {
        throw error;
      }

      throw new Error("Falha ao buscar produtos: " + error);
    }
  }
}

export { ListProductsByCategoryService };
