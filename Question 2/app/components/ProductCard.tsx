import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Product } from "./Products";
import Image from "next/image";
import React from "react";
import { Star, Trash } from "lucide-react";
import { banner1, banner2, banner3, banner4 } from "@/app/constants";
import ProductModal from "./ProductModal";

const ImageCard = ({ index, item }: { index: number; item: Product }) => {
  const images = [banner1, banner2, banner3, banner4];

  return (
    <div>
      <Card shadow="sm" key={index} isPressable>
        <CardBody className="w-full overflow-hidden ">
          <Image
            width={180}
            height={190}
            alt={item.productName}
            className=" p-2 rounded-xl"
            src={images[index % 3]}
          />
        </CardBody>

        <CardFooter className="justify-between text-small text-black text-xl flex flex-col gap-y-3">
          <div className="flex flex-row justify-between gap-x-5">
            <p className="text-xl">{item.productName}</p>
            <p className="text-sm text-gray-700">{item.company}</p>
          </div>
          <div className="flex flex-row justify-between gap-x-5">
            <p className="text-xl">${item.price}</p>
            <p className="text-sm text-gray-700">
              <span className="flex flex-row gap-x-1">
                {item.rating}
                <Star size={15} color="gold" fill="gold" />
              </span>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ImageCard;
