import React from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Product } from "./Products";
import { banner1, banner2, banner3, banner4 } from "@/app/constants";

const ProductModal = ({
  children,
  item,
  index
}: {
  children: React.ReactNode;
  item: Product;
  index:number
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const images = [banner1, banner2, banner3, banner4];

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {item.productName}
              </ModalHeader>
              <ModalBody>
                <Image
                  width={480}
                  src={images[index % 3]}
                  alt="item"
                  className=""
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductModal;
