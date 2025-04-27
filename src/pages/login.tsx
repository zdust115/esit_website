// pages/login.tsx
import { GetServerSideProps } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = { csrfToken: string };

export default function Login({ csrfToken }: Props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const callbackUrl = (router.query.from as string) || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      user,
      password,
      callbackUrl,
    });
    if (res?.error) {
      setError("Credenziali non valide");
    } else {
      router.push(res?.url!);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-white p-6 rounded-2xl shadow"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div>
          <label className="block text-sm font-medium">Utente</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded border p-2"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 rounded-2xl bg-blue-600 text-white font-semibold"
        >
          Entra
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => ({
  props: { csrfToken: await getCsrfToken(ctx) || "" },
});
