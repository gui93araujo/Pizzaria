"use server";

import { apiClient } from "@/lib/api";
import { User, AuthResponse } from "@/lib/types";

export async function registerAction(
  prevState: {
    sucess: boolean;
    error: string;
  } | null,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    await apiClient<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return { sucess: true, error: "", redirectTo: "/login" };
  } catch (error) {
    if (error instanceof Error) {
      return { sucess: false, error: error.message };
    }
    return { sucess: false, error: "Erro desconhecido ao cadastrar." };
  }
}

export async function loginAction(
  prevState: {
    success: boolean;
    error: string;
    redirectTo?: string;
  } | null,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const data = {
      email: email,
      password: password,
    };

    const response = await apiClient<AuthResponse>("session", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return { success: true, error: "", redirectTo: "/dashboard" };
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || "Erro ao fazer o login",
      };
    }
    return { success: false, error: "Erro ao fazer login" };
  }
}
