"use server";

import { apiClient } from "@/lib/api";
import { redirect } from "next/navigation";

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

    let isSuccessful = false;

    await apiClient("/users", {
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
