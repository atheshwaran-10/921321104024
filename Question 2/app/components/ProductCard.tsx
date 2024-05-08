import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Product } from "./Products";
import Image from "next/image";
import React from "react";
import { Trash } from "lucide-react";
import {banner1,banner2,banner3,banner4} from "@/app/constants"

const ImageCard = ({ index, item }: { index: number; item: Product }) => {
  
  const images=[banner1,banner2,banner3,banner4];

  return (
    <div>
    <Card shadow="sm" key={index} isPressable>
        <CardBody className="w-full overflow-hidden ">
          <Image
            width={120}
            height={120}
            alt={item.productName}
            className="h-[140px] p-2 rounded-lg"
            src={images[index%3]}
          />
        </CardBody>
      

      <CardFooter className="justify-between text-small">
        <p>{item.productName}</p>

      </CardFooter>
    </Card>
    </div>
    
  );
};

export default ImageCard;
