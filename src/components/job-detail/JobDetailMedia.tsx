"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Play } from "lucide-react";

const DEFAULT_IMAGES = [
  "/images/jobs/all_img_1.jpg",
  "/images/jobs/all_img_2.jpg",
  "/images/jobs/all_img_3.jpg",
  "/images/jobs/all_img_4.jpg",
];

const DEFAULT_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";
const DEFAULT_POSTER = "/images/jobs/all_img_1.jpg";

interface JobDetailMediaProps {
  images?: string[];
  videoUrl?: string;
  videoPoster?: string;
}

export default function JobDetailMedia({
  images,
  videoUrl,
  videoPoster,
}: JobDetailMediaProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const displayImages =
    images && images.length > 0
      ? images
      : DEFAULT_IMAGES;

  const hasVideo = Boolean(videoUrl && videoUrl.trim() !== "");
  const currentVideo = videoUrl || DEFAULT_VIDEO;
  const currentPoster = videoPoster || (displayImages.length > 0 ? displayImages[0] : DEFAULT_POSTER);

  return (
    <div className="space-y-4">
      {/* THẺ VIDEO (NẾU BÀI ĐĂNG CÓ VIDEO) */}
      {hasVideo && (
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-sm group">
          <video
            controls
            playsInline
            preload="metadata"
            poster={currentPoster}
            className="w-full h-full object-cover"
            key={currentVideo}
          >
            <source src={currentVideo} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      )}

      {/* DANH SÁCH ẢNH THỰC TẾ TIỆM */}

      {displayImages.map((src, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedPhoto(src)}
          className="group cursor-pointer relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-gray-100"
        >
          <Image
            src={src}
            alt={`Hình ảnh việc làm thực tế ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            unoptimized={src.startsWith("http") || src.startsWith("data:")}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}

      {/* MODAL XEM ẢNH LỚN */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedPhoto}
                alt="Hình ảnh phóng to"
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                unoptimized={selectedPhoto.startsWith("http") || selectedPhoto.startsWith("data:")}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
