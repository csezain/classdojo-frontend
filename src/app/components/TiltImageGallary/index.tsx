import React from "react";
import RatingStars from "@/components/RatingStars";
import HomeCommunity from "@/app/images/ImageStripImages/home_community_24.jpg";
import Image from "next/image";
import "./image-strip.css";
import { twMerge } from "tailwind-merge";

type Props = {};

const TiltImageGallary = (props: Props) => {
  return (
    <section className="mt-10 w-full flex items-center flex-col">
      <div className="flex flex-col items-center w-full">
        <RatingStars rating={5} />
        <p className="font-bold text-sm mt-2 text-foreground/80">
          2 Million Reviews
        </p>
      </div>
      <ImagesStrip className="mt-16" />
      <ImagesStrip className="mt-10" />
    </section>
  );
};

const ImagesStrip = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        "flex gap-8 justify-center mt-5 w-max image-strip",
        className
      )}
    >
      {Array.from({ length: 5 }).map((_, ind) => (
        <ImageBox key={ind} />
      ))}
    </div>
  );
};

const ImageBox = () => {
  return (
    <div className="max-w-36 relative aspect-[11/8] overflow-hidden rounded-3xl">
      <Image
        src={HomeCommunity}
        className="w-full h-full object-cover"
        alt={""}
      />
    </div>
  );
};

export default TiltImageGallary;
