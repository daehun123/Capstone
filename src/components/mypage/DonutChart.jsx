import { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend } from "recharts";
import { getChart } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DonutChart = () => {
  const nav = useNavigate();
  const [scoreGroup, setScoreGroup] = useState([]);

  useEffect(() => {
    const getScore = async () => {
      try {
        const res = await getChart();
        if (res.status === 200) {
          const rawData = res.data.data.slice(0, 5);
          const total = rawData.reduce((acc, item) => acc + item.score, 0);

          const colors = [
            "#211C84",
            "#4D55CC",
            "#7A73D1",
            "#B5A8D5",
            "#BEBACF",
          ];

          const formattedData = rawData.map((item, index) => ({
            name: item.keyword,
            value: Math.round((item.score / total) * 360),
            fill: colors[index % colors.length],
          }));

          setScoreGroup(formattedData);
        }
      } catch (error) {
        console.error(error);
        toast.error("접근 불가! 로그인하세요");
        nav("/", { replace: true });
      }
    };
    getScore();
  }, []);

  if (scoreGroup.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 h-60">
        알고리즘 수집이 더 필요합니다.
      </div>
    );
  }

  const data = scoreGroup;

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
          domain={[0, 360]}
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
