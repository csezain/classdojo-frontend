import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  description: string;
  subDescription: string;
};

const Header = ({ title, description, subDescription }: Props) => {
  return (
    <section className="flex justify-center items-center flex-col text-center py-5 md:py-10">
      <h1 className="text-3xl md:text-6xl font-extrabold max-w-3xl mx-auto text-foreground/80">
        {title}
      </h1>
      <Para text={description} className="mt-5" />
      <Para text={subDescription} className="border-b-4" />
    </section>
  );
};

const Para = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p
      className={twMerge(
        "text-lg md:text-2xl font-bold text-foreground/70 max-w-xl",
        className
      )}
    >
      {text}
    </p>
  );
};

export default Header;
