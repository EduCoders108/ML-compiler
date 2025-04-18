import { MLExam } from "@/context/ExamContext";
import ExamCard from "./examcard";

const ExamGrid = ({
  exams,
  searchQuery,
  onDetailsClick,
}: {
  exams: MLExam[];
  searchQuery: string;
  onDetailsClick: (exam: MLExam) => void;
}) => {
  const filteredExams = exams.filter((exam) =>
    (exam.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredExams.map((exam) => (
        <ExamCard
          key={exam.id}
          exam={exam}
          onDetailsClick={() => onDetailsClick(exam)}
        />
      ))}
    </div>
  );
};

export default ExamGrid;
