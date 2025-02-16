"use client";
import CountUp from "react-countup";

const stats = [
  {
    num: 9,
    text: "Years of Development Experience",
  },
  {
    num: 25,
    text: "Enterprise Projects Delivered",
  },
  {
    num: 15,
    text: "Technologies mastered",
  },
  {
    num: 7000,
    text: "Code Commits",
  },
];

const Stats = () => {
  return (
    <section className="pt-4 pb-12 ps-0 pe-0 xl:pt-0 xl:pb-0">
      <div className="container mx-auto ps-0 pe-0">
        <div className=" flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start border-secondary-default border border-spacing-2 border-double rounded p-5"
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  suffix="+"
                  className="text-4xl xl:text-6xl font-extrabbold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-white/80`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
