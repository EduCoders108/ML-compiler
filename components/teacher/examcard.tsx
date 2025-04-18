import { MLExam } from "@/context/ExamContext";

const ExamCard = ({
  exam,
  onDetailsClick,
}: {
  exam: MLExam;
  onDetailsClick: () => void;
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md">
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-medium text-gray-900">{exam.subject}</h3>
        <p className="text-sm text-gray-500">{exam.semester}</p>
      </div>
      <div className="p-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Date:</p>
            <p className="text-gray-800">{exam.date}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Students:
            </p>
            <p className="text-gray-800">{exam.totalStudents}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">
              Status:
            </p>
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(
                exam.status
              )}`}
            >
              {exam.status}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onDetailsClick}
            className="rounded bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            Details
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExamCard;
