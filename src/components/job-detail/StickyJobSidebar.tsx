import Image from "next/image";
import { JobItem } from "@/types/job";

interface StickyJobSidebarProps {
  job: JobItem;
}

export default function StickyJobSidebar({ job }: StickyJobSidebarProps) {
  return (
    <div className="w-full">
      <Image
        src="/logo.png"
        alt="Tiệm Lẩu Bò Trăm Rưỡi"
        width={409}
        height={400}
        priority
        className="w-full h-auto rounded-2xl object-contain shadow-sm"
      />
    </div>
  );
}

