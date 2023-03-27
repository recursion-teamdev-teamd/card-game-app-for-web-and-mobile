import { Card } from "@/models/card/card";
import Image from "next/image";
import { FC } from "react";
import {
  BsFillSuitClubFill,
  BsFillSuitDiamondFill,
  BsFillSuitHeartFill,
  BsFillSuitSpadeFill,
} from "react-icons/bs";
import { GiClown } from "react-icons/gi";

type Props = {
  card: Card;
};

export const CardComponent: FC<Props> = (props) => {
  const { card } = props;
  const hiddenImgUrl: string = "/cards/BACK.png";
  return (
    <div className="bg-[#ffffff] rounded-sm text-center p-2">
      {card.isOpen ? (
        <div>
          {" "}
          <Image
            src={card.imgUrl}
            alt="picture"
            width={300}
            height={300}
          />{" "}
        </div>
      ) : (
        <Image src={hiddenImgUrl} alt="picture" width={500} height={500} />
      )}
    </div>
  );
};
