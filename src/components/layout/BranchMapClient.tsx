"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ALL_BRANCHES } from "@/data/branches";
import {
  ExternalLink,
  Plus,
  Minus,
} from "lucide-react";

export default function BranchMapClient() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Initialize Leaflet map with Google Maps default view on TP.HCM
    const map = L.map(mapContainerRef.current, {
      center: [10.82, 106.69],
      zoom: 12,
      zoomControl: false, // Custom Google Maps zoom buttons
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Google Maps Roadmap tile layer (in Vietnamese)
    const googleRoadmap = L.tileLayer(
      "https://mt{s}.google.com/vt/lyrs=m&hl=vi&x={x}&y={y}&z={z}",
      {
        subdomains: ["0", "1", "2", "3"],
        attribution: '&copy; Google Maps',
        maxZoom: 20,
      }
    ).addTo(map);

    tileLayerRef.current = googleRoadmap;

    const markersGroup: L.Marker[] = [];

    // Add authentic Google Maps red teardrop markers for all 13 branches
    ALL_BRANCHES.forEach((b) => {
      if (!b.lat || !b.lng) return;

      const labelText = String(b.cnNumber);

      // Authentic Google Maps Red Pin SVG
      const googlePinHtml = `
        <div class="google-pin-container group relative cursor-pointer" style="width: 32px; height: 42px; transform: translate(-16px, -42px);">
          <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.35)); transition: transform 0.2s ease;">
            <!-- Red Teardrop Body -->
            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 26.5 16 42 16 42C16 42 32 26.5 32 16C32 7.16344 24.8366 0 16 0Z" fill="#EA4335"/>
            <!-- Inner Red Border Ring -->
            <circle cx="16" cy="15" r="10.5" fill="#C5221F"/>
            <!-- White Center Circle -->
            <circle cx="16" cy="15" r="9" fill="#FFFFFF"/>
          </svg>
          
          <!-- Badge Text inside the white circle: CN number -->
          <div style="position: absolute; top: 7px; left: 0; width: 32px; text-align: center; font-size: 10px; font-weight: 900; color: #B31412; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; pointer-events: none;">
            ${labelText}
          </div>

          <!-- Tooltip label on hover -->
          <div style="position: absolute; bottom: 44px; left: 50%; transform: translateX(-50%); background: #202124; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 4px 9px; border-radius: 6px; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3); pointer-events: none; opacity: 0; transition: opacity 0.15s ease;" class="group-hover:!opacity-100">
            CN ${b.cnNumber} - ${b.district}: ${b.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: "google-maps-custom-marker",
        html: googlePinHtml,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -42],
      });

      // Google Maps InfoWindow Card
      const popupHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; min-width: 250px; max-width: 300px; padding: 4px; color: #202124;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 3px;">
            <span style="background: #EA4335; color: #ffffff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 4px;">
              CN ${b.cnNumber}
            </span>
            <div style="font-size: 14px; font-weight: 800; color: #1a73e8; line-height: 1.3;">
              Lẩu Bò Trăm Rưỡi - ${b.name}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 12px; color: #e37400; margin-bottom: 6px; font-weight: 600;">
            <span>★ 4.9</span>
            <span style="color: #70757a; font-weight: 400;">(1.200+ đánh giá) • Quán lẩu</span>
          </div>
          <div style="font-size: 12px; color: #3c4043; margin-bottom: 10px; line-height: 1.4;">
            📍 <b>${b.district}:</b> ${b.address}
          </div>
          <div style="display: flex; gap: 8px; align-items: center; border-top: 1px solid #dadce0; padding-top: 8px;">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                "Lẩu Bò Trăm Rưỡi " + b.address
              )}" 
              target="_blank" 
              rel="noopener noreferrer" 
              style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: #1a73e8; color: #ffffff; border-radius: 18px; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"
            >
              <span>Chỉ đường</span>
            </a>
            ${
              b.phone
                ? `<a 
                    href="tel:${b.phone}" 
                    style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; background: #e8f0fe; color: #1a73e8; border-radius: 18px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid #d2e3fc;"
                  >
                    <span>Gọi ${b.phone}</span>
                  </a>`
                : ""
            }
          </div>
        </div>
      `;

      const marker = L.marker([b.lat, b.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupHtml, {
          closeButton: true,
          className: "google-maps-infowindow",
        });

      markersRef.current[b.id] = marker;
      markersGroup.push(marker);
    });

    // Auto-fit all 13 branches cleanly
    if (markersGroup.length > 0) {
      const bounds = L.featureGroup(markersGroup).getBounds();
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleZoom = (delta: number) => {
    const map = mapInstanceRef.current;
    if (map) {
      map.setZoom(map.getZoom() + delta);
    }
  };

  return (
    <div className="w-full">
      {/* Khung bản đồ Google Maps tương tác */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden border-2 border-brand-800/80 shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Google Maps Style Floating Badge on top-left */}
        <div className="absolute top-3 left-3 z-10 hidden sm:flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl shadow-lg border border-gray-200">
          <div className="w-3 h-3 rounded-full bg-[#EA4335] animate-pulse" />
          <span className="text-xs font-bold text-gray-800">
            Lẩu Bò Trăm Rưỡi trên Google Maps
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 text-red-700 font-bold border border-red-200">
            13 chi nhánh
          </span>
        </div>

        {/* Google Maps Custom Zoom Buttons on bottom-right */}
        <div className="absolute bottom-6 right-3 z-10 flex flex-col bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <button
            onClick={() => handleZoom(1)}
            aria-label="Phóng to"
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 border-b border-gray-200 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-1)}
            aria-label="Thu nhỏ"
            className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Google Maps Bottom Bar with Direct Google Maps Link */}
        <div className="absolute bottom-2 left-2 z-10 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-300 shadow flex items-center gap-2 text-xs">
          <span className="font-bold text-gray-800">Google</span>
          <span className="text-gray-400">|</span>
          <a
            href="https://www.google.com/maps/search/L%E1%BA%A9u+B%C3%B2+Tr%C4%83m+R%C6%B0%E1%BB%A1i"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1a73e8] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Mở trong Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
