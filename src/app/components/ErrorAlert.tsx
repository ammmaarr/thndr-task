const ErrorAlert: React.FC<{ message: string | undefined }> = ({ message }) => {
  return (
    <div className="rounded-lg p-4 flex flex-col justify-center items-center gap-8 border border-red-500 bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="text-red-500 text-lg">{message}</h2>
    </div>
  );
};

export default ErrorAlert;
