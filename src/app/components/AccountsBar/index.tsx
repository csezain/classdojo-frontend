import { accountsBarData } from "@/app/data";
import { ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const AccountsBar = (props: Props) => {
  return (
    <section className="flex justify-center gap-3">
      {accountsBarData.map(({ title, icon }, ind) => (
        <div
          key={ind}
          className="py-5 px-10 border-2 rounded-lg flex flex-col items-center"
        >
          <Image src={icon} alt="" />
          <span className="mt-2 font-bold text-foreground/80">{title}</span>
          <ChevronRightCircle className="text-primary/70 mt-2" />
        </div>
      ))}
    </section>
  );
};

export default AccountsBar;
