const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="rounded-lg bg-red-100 p-4 text-center text-red-800">
      {message}
    </div>
  );
};
export default ErrorMessage;
