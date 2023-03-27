import { FC, ReactNode } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";

type Props = {
  children: ReactNode;
};
export const ModalLayout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div>
      <div className="fixed top-3 right-3">
        <GiHamburgerMenu size={23} />
      </div>
      {children}
      {/* <div className="fixed left-0 top-0 w-full h-screen bg-[#CCCCCC] bg-opacity-60">
        <div className="relative left-0 top-0 w-1/2 h-full bg-primary ">
          <div className="absolute top-2 right-2 p-2 cursor-pointer shadow-md shadow-gray-400 rounded-full">
            <GrClose size={23}/>
          </div>
          <div></div>
        </div>
      </div> */}
    </div>
  );
};
