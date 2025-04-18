// Main Dashboard Component
"use client";
import React, { useState, useEffect } from "react";
import DashboardHeader from "@/components/teacher/dashboardheader";
import SectionHeader from "@/components/teacher/sectionheader";
import LoadingSpinner from "@/components/teacher/loadingspinner";
import ErrorMessage from "@/components/teacher/errormessage";
import EmptyState from "@/components/teacher/emptystate";
import ExamGrid from "@/components/teacher/examgrid";
import CreateExamModal from "@/components/teacher/createexamodal";
import ExamDetailsModal from "@/components/teacher/examdetailsmodal";

// Types
import { MLExam } from "@/context/ExamContext";
const MLExamDashboard: React.FC = () => {
  const [exams, setExams] = useState<MLExam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<MLExam | null>(null);
  const [isCreateExamModalOpen, setIsCreateExamModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch exams from the API
  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/exams/get");

      if (!response.ok) {
        throw new Error(`Failed to fetch exams: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched exams:", data);
      setExams(data);
    } catch (err: any) {
      console.error("Error fetching exams:", err);
      setError(`Failed to load exams: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch exams on component mount
  useEffect(() => {
    fetchExams();
  }, []);

  const handleExamCreated = () => {
    fetchExams();
    setIsCreateExamModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateExamModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateExamModalOpen(false);
  };

  const handleOpenDetailsModal = (exam: MLExam) => {
    setSelectedExam(exam);
  };

  const handleCloseDetailsModal = () => {
    setSelectedExam(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCreateClick={handleOpenCreateModal}
        />

        <SectionHeader onCreateClick={handleOpenCreateModal} />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : exams.length === 0 ? (
          <EmptyState />
        ) : (
          <ExamGrid
            exams={exams.map((exam) => ({
              ...exam,
              duration: exam.duration.toString(),
            }))}
            searchQuery={searchQuery}
            onDetailsClick={handleOpenDetailsModal}
          />
        )}
      </div>

      {/* Modals */}
      <CreateExamModal
        isOpen={isCreateExamModalOpen}
        onClose={handleCloseCreateModal}
        onExamCreated={handleExamCreated}
      />

      <ExamDetailsModal exam={selectedExam} onClose={handleCloseDetailsModal} />
    </div>
  );
};

export default MLExamDashboard;
