import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPWAButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      // iOS Safari
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed || !deferred) return null;

  const handleClick = async () => {
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferred(null);
    } catch {
      setDeferred(null);
    }
  };

  return (
    <div className="my-4 flex justify-center">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] transition-all hover:scale-[1.02] active:scale-95"
        style={{
          background: "linear-gradient(135deg, #E85D2F, #A84E22)",
          color: "#FFFFFF",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          boxShadow: "0 6px 14px -8px rgba(232,93,47,0.55)",
        }}
      >
        📱 Instalar app en tu celular
      </button>
    </div>
  );
}
