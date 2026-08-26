import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <Card className="bg-app-card border border-app-card w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
          Pizzaria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              required
              minLength={3}
              className="text-white bg-app-card border-app-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Digite seu email"
              required
              className="text-white bg-app-card border-app-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Senha
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Digite sua senha"
              required
              minLength={6}
              className="text-white bg-app-card border-app-border"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-primary text-white hover:bg-brand-primary"
          >
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
