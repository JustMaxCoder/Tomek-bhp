import { useQuery } from "@tanstack/react-query";
import type { Settings } from "../../../shared/schema";

export function PromoBanner() {
  const { data: settings = [] } = useQuery<Settings[]>({
    queryKey: ["/api/settings"],
  });

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key)?.value || "";
  };

  const showBanner = getSetting("bannerShow") === "true";
  const marqueeText = getSetting("bannerText") || "Logowanie odzieży na miejscu • Twoje logo • Krótki czas realizacji";
  
  if (!showBanner) return null;

  return (
    <div className="bg-primary text-black border-b border-primary-foreground/10 overflow-hidden">
      <div className="relative py-2">
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee-infinite">
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
          </div>
          <div className="flex animate-marquee-infinite" aria-hidden="true">
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
            <span className="mx-8">{marqueeText}</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee-infinite {
          animation: marquee-infinite 30s linear infinite;
        }
      `}</style>
    </div>
  );
}