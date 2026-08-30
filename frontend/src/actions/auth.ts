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

  const data = {
    name: name,
    email: email,
    password: password,
  };

  let isSuccessful = false;

  try {
    await apiClient("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    isSuccessful = true;
  } catch (error) {
    if (error instanceof Error) {
      return { sucess: false, error: error.message };
    }
    return { sucess: false, error: "Erro desconhecido ao cadastrar." };
  }

  if (isSuccessful) {
    redirect("/login");
  }

  return { sucess: true, error: "" };
}
