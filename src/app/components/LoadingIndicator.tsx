const LoadingIndicator: React.FC<{ hasNextPage: boolean; status: string }> = ({
  hasNextPage,
  status,
}) => {
  return (
    <>
      <div
        className={
          "size-2 rounded-full bg-main my-20" +
          (hasNextPage || status === "pending" ? " animate-ping" : "")
        }
      />
      <div
        className={
          "size-2 rounded-full bg-main my-20" +
          (hasNextPage || status === "pending" ? " animate-ping" : "")
        }
      />
      <div
        className={
          "size-2 rounded-full bg-main my-20" +
          (hasNextPage || status === "pending" ? " animate-ping" : "")
        }
      />
    </>
  );
};

export default LoadingIndicator;
