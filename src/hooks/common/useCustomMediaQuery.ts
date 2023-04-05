import { useMediaQuery } from "react-responsive";

export const useCustomMediaQuery = () => {
  const isMoreThanSm = useMediaQuery({
    minWidth: "640px",
  });
  const isMoreThanMd = useMediaQuery({
    minWidth: "768px",
  });
  const isMoreThanLg = useMediaQuery({
    minWidth: "1024px",
  });
  const isMoreThanXl = useMediaQuery({
    minWidth: "1280px",
  });

  return { isMoreThanSm, isMoreThanMd, isMoreThanLg, isMoreThanXl };
};
