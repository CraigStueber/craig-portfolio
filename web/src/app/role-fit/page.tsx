import Header from "@/components/layout/Header";
import RoleFitForm from "@/components/role-fit/RoleFitForm";
import Footer from "@/components/layout/Footer";

export default function RoleFitPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "var(--header-height)" }}>
        <RoleFitForm />
      </main>
      <Footer />
    </>
  );
}
