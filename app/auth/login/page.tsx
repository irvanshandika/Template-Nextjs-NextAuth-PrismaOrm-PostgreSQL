"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/src/components/auth/AuthForm";
import { loginSchema, LoginFormValues } from "@/src/lib/validations";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          type="login"
          schema={loginSchema}
          onSubmit={handleSubmit}
          formFields={[
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Password", type: "password" },
          ]}
          title="Login"
          description="Masukkan email dan password untuk login ke akun Anda"
          submitText="Login"
          footerText="Belum punya akun?"
          footerLinkText="Daftar"
          footerLinkHref="/auth/register"
        />
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}