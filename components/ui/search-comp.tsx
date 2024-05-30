"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format, set } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";
import { Loader2, SearchIcon } from "lucide-react";
import { Separator } from "./separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAdult,
  addAdult,
  removeChild,
  addChild,
  removeInfant,
  addInfant,
  clearCount,
} from "@/app/features/booking/bookingSlice";
import {
  setSearchQuery,
} from "@/app/features/search/searchSlice";

export default function SearchComp({
  placeholders,
  className,
}: {
  placeholders: string[];
  className?: React.HTMLAttributes<HTMLDivElement>;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const { adultCount, childrenCount, infantCount, guests } = useSelector(
    (store: any) => store.booking
  );
  const { searchQuery } = useSelector(
    (store: any) => store.search
  );
  const dispatch = useDispatch();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const search = useMutation({
    mutationFn: async () => {
      const startDate = date?.from;
      const endDate = date?.to;
      console.log(startDate, endDate);
      const resp = await axios.post("/api/search", {
        searchQuery,
        adultCount,
        childrenCount,
        infantCount,
        guests,
        startDate,
        endDate,
      });

      console.log(resp.data);
      return resp.data;
    },
  });

  useEffect(() => {
    let interval: any;
    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentPlaceholder((prev: any) => (prev + 1) % placeholders.length);
      }, 1500);
    };
    startAnimation();
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !animating) {
      vanishAndSubmit();
    }
  };

  const vanishAndSubmit = () => {
    setAnimating(true);
    draw();

    const value = inputRef.current?.value || "";
    if (value && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    if (date && guests) {
      search.mutate(undefined, {
        onSuccess: (data) => {
          console.log("new search query created", { data });
          search.mutate();
          toast.success("Search query successfully created");
        },
        onError: (error) => {
          console.log("search query error", { error });
          toast.error("Error creating search query. Please try again.");
        },
      });
    } else if (!date) toast.error("Please select a date.");
    else if (guests === 0) toast.error("Please select number of guests.");
    dispatch(clearCount());
  };

  return (
    <form
      className={cn(
        "hidden md:w-[700px] relative md:flex flex-row justify-between items-center mx-auto bg-white dark:bg-zinc-800 h-12 md:h-14 rounded-full overflow-hidden transition duration-200",
        value && "bg-gray-50"
      )}
      onSubmit={handleSubmit}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none  text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <div className="flex flex-col pt-1 h-full hover:bg-accent rounded-full">
        <Label htmlFor="destination" className="ml-9">
          Where
        </Label>
        <input
          onChange={(e) => {
            if (!animating) {
              setValue(e.target.value);
              dispatch(setSearchQuery(e.target.value));
            }
          }}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          value={value}
          type="text"
          required
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent"
          )}
        />
      </div>
      <div className="border border-l-1 h-11 mx-1 border-neutral-300 " />
      <div className="flex flex-col rounded-full p-2 h-16 hover:bg-accent">
        <Label htmlFor="date" className="ml-2">
          When
        </Label>
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"link"}
                className={cn(
                  "w-fit text-foreground hover:no-underline justify-start text-left font-normal p-1",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < addDays(new Date(), -1)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="border border-l-1 h-11 mx-1 border-neutral-300 " />
      <div className="flex justify-between items-center rounded-full p-1 w-80 hover:bg-accent">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col gap-2 items-start rounded-full h-11 md:h-14 hover:bg-transparent"
            >
              <Label htmlFor="guests" className="relative bottom-1">
                Guests
              </Label>
              {guests >= 2 ? (
                <p className="text-sm text-foreground font-normal">
                  {guests} Guest(s)
                </p>
              ) : (
                <p className="text-sm text-muted-foreground font-normal">
                  Add Guests
                </p>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[360px]">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="adults" className="flex flex-col gap-2">
                    Adults
                    <p className="text-muted-foreground font-extralight">
                      Ages 13 or above
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (adultCount >= 2) dispatch(removeAdult());
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{adultCount}</p>
                    <Button
                      onClick={() => dispatch(addAdult())}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="children" className="flex flex-col gap-2">
                    Children
                    <p className="text-muted-foreground font-extralight">
                      Ages 2 - 12
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (childrenCount >= 1) dispatch(removeChild());
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{childrenCount}</p>
                    <Button
                      onClick={() => dispatch(addChild())}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Separator className="my-5" />
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="infants" className="flex flex-col gap-2">
                    Infants
                    <p className="text-muted-foreground font-extralight">
                      Under 2
                    </p>
                  </Label>
                  <div className="flex flex-row items-center w-[150px] justify-between">
                    <Button
                      onClick={() => {
                        if (infantCount >= 1) dispatch(removeInfant());
                      }}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <p>{infantCount}</p>
                    <Button
                      onClick={() => dispatch(addInfant())}
                      variant={"outline"}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button
          type="submit"
          variant="default"
          className="rounded-full w-12 h-12"
        >
          {search.isPending ? (
            <Loader2 className="animate-spin w-10 h-10" />
          ) : (
            <SearchIcon />
          )}
        </Button>
      </div>

      <div className="absolute  top-4 inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && (
            <motion.p
              initial={{
                y: 5,
                opacity: 0,
              }}
              key={`current-placeholder-${currentPlaceholder}`}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: -15,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(33.33%-2rem)] truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
