import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from "recharts";

const DonutChart = () => {
  const data = [
    { name: "가죽", value: 350, fill: "#211C84" },
    { name: "A-2", value: 280, fill: "#4D55CC" },
    { name: "쿄듀로이", value: 200, fill: "#7A73D1" },
    { name: "조거", value: 120, fill: "#B5A8D5" },
    { name: "청바지", value: 70, fill: "#BEBACF" },
  ];
  return (
    <div className="flex flex-col">
      <div className="text-sm text-gray-600 text-center mt-2">
        가장 관심 있는 항목은{" "}
        <span className="font-semibold text-[#211C84]">{data[0].name}</span>
        입니다.
      </div>
      <RadialBarChart
        width={400}
        height={500}
        cx="50%"
        cy="40%"
        innerRadius="20%"
        outerRadius="80%"
        startAngle={90}
        endAngle={-270}
        data={data}
        className="pr-4"
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 400]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar minAngle={15} background clockWise dataKey="value" />
        <Legend
          iconSize={20}
          layout="horizontal"
          verticalAlign="bottom"
          align="left"
        />
      </RadialBarChart>
    </div>
  );
};

export default DonutChart;
