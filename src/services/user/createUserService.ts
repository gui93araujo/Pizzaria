import prismaClient from "../../prisma/index";
interface ICreateUserService {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: ICreateUserService) {
    const findUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (findUser) {
      throw new Error("Usuário já existente!");
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return user.name;
  }
}

export { CreateUserService };
