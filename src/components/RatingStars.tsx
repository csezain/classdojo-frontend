import { Star } from "lucide-react";
import React from "react";

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-2 mx-auto">
      {Array.from({ length: rating }).map((_, ind) => (
        <Star key={ind} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );
};

export default RatingStars;
