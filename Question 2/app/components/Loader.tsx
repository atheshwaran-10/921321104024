import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function Loader({ ind }: { ind: number }) {
  const cards = [];

  for (let i = 0; i < ind; i++) {
    cards.push(
      <Card className="w-[250px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg " disableAnimation={true}>
          <div className="h-32 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-1 flex flex-row gap-x-5">
          <Skeleton
            className="w-3/5 h-3 rounded-lg "
            disableAnimation={true}
          ></Skeleton>
          <Skeleton
            className="w-2/5 h-2 rounded-lg"
            disableAnimation={true}
          ></Skeleton>
        </div>
      </Card>
    );
  }

  return cards;
}
