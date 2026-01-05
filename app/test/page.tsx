import TcebForm from "@/components/TcebForm";

export default function ApiTestPage() {
  const localUrl = process.env.NEXT_LOCAL_BUDIBASE_FORM_URL;

  return (
    <main className="min-h-screen bg-white p-4">
      <TcebForm fallbackUrl={localUrl} />
    </main>
  );
}
