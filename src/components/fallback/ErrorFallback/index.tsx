type ErrorFallbackProps = { message?: string };

export default function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="p-6 bg-white rounded-lg text-center text-xl">
          에러가 발생했습니다
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
}
