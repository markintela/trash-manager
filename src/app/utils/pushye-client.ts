// src/utils/pushye-client.ts
declare global {
  interface Window {
    Pushye?: any;
  }
}

export const initPushye = () => {
  if (typeof window !== "undefined" && window.Pushye) {
    try {
      window.Pushye.subscribe()
        .then(() => console.log("✅ Notificações ativadas com sucesso!"))
        .catch((err: any) =>
          console.error("❌ Falha ao ativar notificações:", err)
        );
    } catch (error) {
      console.error("Erro ao inicializar o Pushye:", error);
    }
  } else {
    console.warn("⚠️ Pushye ainda não carregado.");
  }
};
