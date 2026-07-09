import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import RatingBadge from "./ui/RatingBadge";



export const CardHover = ({restaurants,className}) => {

  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div
      className={cn(
        "grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 py-5",
        className
      )}
    >
      {restaurants.map((item, idx) => (
        <Link
          key={item?.link}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          to={`/food-details/${item.pincode}`}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary-50 block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <img src={`https://delivery-point.onrender.com/images/${item.coverImages[0]}`} alt="Restro Image" className="mx-auto w-full h-[150px] rounded-xl object-cover" />
            <div className="mt-2 flex items-center justify-between gap-2">
              <CardTitle>{item.name}</CardTitle>
              <RatingBadge rating={item.rating} />
            </div>
            <div className="flex items-center gap-1">
              <MdLocationOn className="text-gray-400 shrink-0" />
              <CardDescription>{item.address}</CardDescription>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-white border border-gray-100 shadow-sm group-hover:shadow-md relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}) => {
  return (
    <h4 className={cn("text-gray-900 font-bold tracking-wide line-clamp-1", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        "mt-1 text-gray-500 tracking-wide leading-relaxed text-sm line-clamp-1",
        className
      )}
    >
      {children}
    </p>
  );
};
