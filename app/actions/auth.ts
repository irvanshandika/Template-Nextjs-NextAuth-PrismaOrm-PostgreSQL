"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterFormData } from "@/src/lib/auth";

const prisma = new PrismaClient();

export async function registerUser(data: RegisterFormData) {
  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar" };
    }

    // Hash password
    const hashedPassword = await hash(data.password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Terjadi kesalahan saat mendaftar" };
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Semua field harus diisi" };
  }

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: "Email sudah terdaftar" };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Buat user baru
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    revalidatePath("/auth/login");
    redirect("/auth/login?registered=true");
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Terjadi kesalahan saat mendaftar" };
  }
}