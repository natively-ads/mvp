import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface IContextHeaderProps {
  message: string;
  linkTo: string;
}

function ContextHeader(props: IContextHeaderProps) {
  return (
    <div className="flex justify-center border-b border-gray-300 py-1">
      <span className="text-center">
        {props.message}{" "}
        <Link
          className={buttonVariants({ variant: "outline" })}
          href={props.linkTo}
        >
          Switch
        </Link>
      </span>
    </div>
  );
}

export default ContextHeader;
