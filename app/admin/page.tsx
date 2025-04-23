import BusinessConfigForm from "@/components/business-config-form";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/");

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Administración de la Tienda
          </h1>
          <BusinessConfigForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
