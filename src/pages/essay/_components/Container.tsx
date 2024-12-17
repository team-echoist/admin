import React, { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";

type ContainerProps = { label: string; id: string } & React.PropsWithChildren;

export default function Container({ label, id, children }: ContainerProps) {
  const { hash } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hash === "#report" && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" }); // Ref로 스크롤 이동
    }
  }, [hash]);
  return (
    <article ref={ref} id={id}>
      <h4>{label}</h4>
      {children}
    </article>
  );
}
