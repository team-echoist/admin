type ContainerProps = { label: string } & React.PropsWithChildren;

export default function Container({ label, children }: ContainerProps) {
  return (
    <article>
      <h4>{label}</h4>
      {children}
    </article>
  );
}
