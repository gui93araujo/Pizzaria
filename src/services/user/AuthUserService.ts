import { compare } from "bcryptjs";
import prismaClient from "../../prisma/index";
import { sign } from "jsonwebtoken";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new Error("Usuário ou senha incorreto!");
    }

    // Verificando se a senha está correta
    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error("Usuário ou senha incorreto!");
    }

    // GERAR TOKEN JWT
    const token = sign(
      {
        name: userExists.name,
        email: userExists.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: userExists.id,
        expiresIn: "30d",
      },
    );

    return {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
      token: token,
    };
  }
}

export { AuthUserService };
