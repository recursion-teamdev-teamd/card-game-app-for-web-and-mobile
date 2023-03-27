import { useCustomMediaQuery } from "@/hooks/useCustomMediaQuery";
import { FC, ReactNode } from "react";
import { HeaderLayout } from "./HeaderLayout";
import { ModalLayout } from "./ModalLayout";

type Props = {
  children: ReactNode;
};
export const HeaderOrModalLayout: FC<Props> = (props) => {
  const { children } = props;
  const { isMoreThanSm } = useCustomMediaQuery();
  return (
    <div>
      {isMoreThanSm ? (
        <HeaderLayout>{children}</HeaderLayout>
      ) : (
        <ModalLayout>{children}</ModalLayout>
      )}
    </div>
  );
};
