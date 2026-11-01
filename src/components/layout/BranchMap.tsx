"use client";

import { useEffect, useState, ComponentType } from "react";
import { MapPin } from "lucide-react";

export default function BranchMap() {
  const [MapComponent, setMapComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    let isMounted = true;
    import("./BranchMapClient")
      .then((mod) => {
        if (isMounted) {
          setMapComponent(() => mod.default);
        }
      })
      .catch((err) => {
        console.error("Failed to load map:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!MapComponent) {
    return (
      <div className="w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl bg-brand-900/40 border border-brand-800/80 flex flex-col items-center justify-center gap-3 text-gray-400 animate-pulse">
        <MapPin className="w-8 h-8 text-amber-400 animate-bounce" />
        <span className="text-sm font-semibold text-gray-300">
          Đang tải bản đồ hệ thống 13 chi nhánh TP.HCM...
        </span>
      </div>
    );
  }

  return <MapComponent />;
}
