"use client";

import { useState, useEffect } from "react";
import { JOBS_DATA } from "@/data/jobs";
import { JobItem } from "@/types/job";
import JobCard from "./JobCard";
import QuickApplyModal from "../common/QuickApplyModal";

// Thứ tự hiển thị chuẩn 100% theo các menu con trong Header
const ORDERED_SLUGS = [
  "hoc-viec-bep",
  "phu-bep-hoc-nghe",
  "hoc-viec-to-truong",
  "phuc-vu-part-time",
  "phuc-vu-full-time",
  "phu-bep-full-time",
  "thu-ngan",
  "pha-che-full-time",
  "quan-ly-vung",
  "quan-ly-tiem",
  "pho-quan-ly-tiem",
  "bep-truong",
  "to-truong",
];

export default function JobGridSection() {
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobItem | null>(null);
  const [jobsList, setJobsList] = useState<JobItem[]>(JOBS_DATA);

  // Cập nhật dữ liệu việc làm tức thì khi Admin chỉnh sửa
  useEffect(() => {
    fetch("/api/admin/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.jobs && data.jobs.length > 0) {
          setJobsList(data.jobs);
        }
      })
      .catch(() => {});
  }, []);

  // Hiển thị đầy đủ tất cả các thẻ có tên như menu con
  const displayJobs = [...jobsList]
    .filter((j) => j.isActive)
    .sort((a, b) => {
      const indexA = ORDERED_SLUGS.indexOf(a.slug);
      const indexB = ORDERED_SLUGS.indexOf(b.slug);
      return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

  return (
    <section id="danh-sach-viec-lam" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Lưới 2 Cột danh sách việc làm đầy đủ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {displayJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApplyClick={(j) => setSelectedJobForModal(j)}
          />
        ))}
      </div>

      {selectedJobForModal && (
        <QuickApplyModal
          isOpen={!!selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          defaultPositionSlug={selectedJobForModal.slug}
        />
      )}
    </section>
  );
}
