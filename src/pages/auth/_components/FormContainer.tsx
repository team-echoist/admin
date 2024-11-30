import { FormHTMLAttributes, PropsWithChildren, useEffect } from "react";
import { PRELOADED_IMAGES, preloadImage } from "../../../lib/preloadImage";

import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import logoPNG from "../../../assets/black_logo.png";
import logoWEBP from "../../../assets/black_logo.webp";

type FormContainerProps = PropsWithChildren<{
  move?: { label: string; to: string };
}> &
  FormHTMLAttributes<HTMLFormElement>;

const FormContainer = ({ children, onSubmit, move }: FormContainerProps) => {
  useEffect(() => {
    preloadImage([logoWEBP, logoPNG]);

    return () => {
      PRELOADED_IMAGES.length = 0;
    };
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "p-[30px] bg-white rounded-[8px]",
        "flex flex-col gap-[20px] items-center"
      )}
    >
      <div className="rounded-[20px] overflow-hidden">
        <picture>
          <source srcSet={logoWEBP} type="image/webp" />
          <img src={logoPNG} alt="링크드아웃 로고" width={150} height={150} />
        </picture>
      </div>
      {children}
      <Button type="submit" className="w-full">
        제출
      </Button>
      {move && (
        <a href={move.to} className="underline">
          {move.label}
        </a>
      )}
    </form>
  );
};

export default FormContainer;
