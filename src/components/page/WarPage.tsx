import { useCustomMediaQuery } from "@/hooks/useCustomMediaQuery";
import React from "react";
import { HeaderLayout } from "../ui/layout/HeaderLayout";
import { HeaderOrModalLayout } from "../ui/layout/HeaderOrModalLayout";
import { ModalLayout } from "../ui/layout/ModalLayout";

export const WarPage = () => {
  const { isMoreThanSm } = useCustomMediaQuery();
  return (
    <div>
      <HeaderOrModalLayout>WAR</HeaderOrModalLayout>
    </div>
  );
};
