"use client";

import { useState } from "react";
import { JOBS_DATA } from "@/data/jobs";
import { JobItem } from "@/types/job";
import JobCard from "./JobCard";
import QuickApplyModal from "../common/QuickApplyModal";

export default function JobGridSection() {
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobItem | null>(null);

  return (
    <section id="danh-sach-viec-lam" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Lưới 2 Cột danh sách việc làm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {JOBS_DATA.map((job) => (
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
