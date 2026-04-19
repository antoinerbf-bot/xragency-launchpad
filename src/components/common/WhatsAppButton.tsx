import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/33000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.7_0.18_155)] text-white shadow-elegant transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
