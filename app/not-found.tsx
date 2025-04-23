"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="text-gray-600">La página que estás buscando no existe.</p>
      <Button onClick={() => router.back()}>Volver al inicio</Button>
    </div>
  );
};

export default NotFoundPage;
