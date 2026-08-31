"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      router.replace(state.redirectTo);
    }
  }, [state, router]);

  return (
    <Card className="bg-app-card border border-app-card w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-center text-3xl sm:text-4xl font-bold">
          Pizzaria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
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
              name="password"
              placeholder="Digite sua senha"
              required
              minLength={6}
              className="text-white bg-app-card border-app-border"
            />
          </div>
          {state?.error && (
            <p className="text-red-500 text-sm text-center font-semibold bg-red-500/10 p-2 rounded">
              {state.error}
            </p>
          )}
          <Button
            type="submit"
            className="w-full bg-brand-primary text-white hover:bg-brand-primary"
          >
            {isPending ? "Acessando conta..." : "Acessar"}
          </Button>
          <p className="text-center text-sm text-gray-100">
            Ainda não possui uma conta?{" "}
            <Link href="/register" className="text-brand-primary font-semibold">
              Crie uma conta
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
