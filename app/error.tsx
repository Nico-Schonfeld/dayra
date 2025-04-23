"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl font-bold">500 - Error del servidor</h1>
      <p className="text-gray-600">
        Lo sentimos, ha ocurrido un error en el servidor. Por favor, inténtelo
        de nuevo más tarde.
      </p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Recargar la página
      </Button>
    </div>
  );
}
