const SectionHeader = ({ onCreateClick }: { onCreateClick: () => void }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        ML Exam Management
      </h2>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-800"></h2>
        <button
          onClick={onCreateClick}
          className="flex items-center rounded-lg bg-emerald-500 px-4 py-2 font-medium text-white hover:bg-emerald-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create New Exam
        </button>
      </div>
    </div>
  );
};
export default SectionHeader;
