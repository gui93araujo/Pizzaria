import prismaClient from "../../prisma";

interface ListOrdersServiceProps {
  draft?: string;
}

class ListOrderService {
  async execute({ draft }: ListOrdersServiceProps) {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: draft === "true" ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        status: true,
        draft: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                banner: true,
              },
            },
          },
        },
      },
    });
    return orders;
  }
}

export { ListOrderService };
