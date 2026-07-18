import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: RegisterPage });

const schema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().min(1, "Last name is required").max(50),
    email: z.string().trim().email("Enter a valid email"),
    phone: z
      .string()
      .trim()
      .regex(/^\+20(10|11|12|15)\d{8}$/, "Use +20 followed by a valid 10-digit mobile number"),
    city: z.string().trim().min(1, "City is required").max(100),
    street: z.string().trim().min(1, "Street is required").max(200),
    building: z.string().trim().min(1, "Building is required").max(100),
    password: z.string().min(6, "At least 6 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });

function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+20",
    city: "",
    street: "",
    building: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate({ to: "/" });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  const field = (key: keyof typeof form, label: string, type = "text") => (
    <div>
      <Label htmlFor={key}>{label}</Label>
      <Input
        id={key}
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-1.5"
      />
      {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <Layout>
      <div className="container-page py-16 max-w-lg">
        <div className="rounded-2xl border bg-card p-8 shadow-card">
          <h1 className="font-display text-3xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Start with a curated experience built around you.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {field("firstName", "First name")}
              {field("lastName", "Last name")}
            </div>
            {field("email", "Email", "email")}
            {field("phone", "Phone number (e.g. +201012345678)", "tel")}
            {field("city", "City")}
            {field("street", "Street")}
            {field("building", "Building")}
            {field("password", "Password", "password")}
            {field("confirm", "Confirm password", "password")}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-center text-muted-foreground">
            Have an account?{" "}
            <Link to="/login" className="text-foreground font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
