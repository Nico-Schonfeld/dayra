export const toggleCopy = async (text: string) => {
  try {
    if (typeof window === "undefined") {
      throw new Error("No se puede acceder al portapapeles en el servidor");
    }

    await window.navigator.clipboard.writeText(text);

    return {
      error: false,
      success: true,
      message: "Texto copiado exitosamente",
    };
  } catch (error) {
    return {
      error: true,
      success: false,
      message:
        error instanceof Error ? error.message : "No se pudo copiar el texto",
    };
  }
};
