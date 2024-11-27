type ErrorFallbackProps = { message?: string };

export default function ErrorFallback({ message }: ErrorFallbackProps) {
  return <div>에러발생{message}</div>;
}
