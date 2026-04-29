import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <p style={{ padding: "2rem", color: "var(--color-text-secondary)" }}>
          Sections coming soon.
        </p>
      </main>
    </>
  );
}
