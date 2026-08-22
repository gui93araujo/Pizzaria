import prismaClient from "../../prisma/index";

interface ListProductsServiceProps {
  disabled?: string;
}

class ListProductsService {
  async execute({ disabled }: ListProductsServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disabled: disabled === "true" ? true : false,
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
      throw new Error("Falha ao buscar produtos: " + error);
    }
  }
}

export { ListProductsService };
