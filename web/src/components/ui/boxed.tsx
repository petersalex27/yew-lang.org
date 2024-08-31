import { ReactNode } from "react";

const Boxed = ({ children, colorbg, colorfg, aspect, offs }: { children?: ReactNode, width?: string, colorbg?: string, colorfg?: string, aspect?: string, offs?: string }) => {
  if (colorbg === undefined) colorbg = "rgb(64,24,50)";
  if (colorfg === undefined) colorfg = "rgb(111,34,54)";
  if (aspect === undefined) aspect = "16/5";
  if (offs === undefined) offs = "8px";

  return (
    <div className="flex w-full justify-center">
      <div className={`relative w-[80%] h-fit bg-center`}>
        <div className={`absolute aspect-[${aspect}] right-0 top-[${offs}] bottom-0 left-0 rounded-lg bg-[${colorbg}]`} />
        <div className={`absolute aspect-[${aspect}] top-0 left-0 right-0 rounded-lg bg-[${colorfg}]`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Boxed;