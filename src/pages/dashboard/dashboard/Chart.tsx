import Loading from "@/components/layout/shared/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetChartQuery } from "@/redux/apiSlice/dashboard/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Jan", count: "345" },
//   // { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
//   // { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
//   // { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
//   // { name: "May", uv: 1890, pv: 4800, amt: 2181 },
//   // { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
//   // { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
//   // { name: "Aug", uv: 3490, pv: 4300, amt: 2100 },
//   // { name: "Sep", uv: 3490, pv: 4300, amt: 2100 },
//   // { name: "Oct", uv: 3490, pv: 4300, amt: 2100 },
//   // { name: "Nov", uv: 3490, pv: 4300, amt: 2100 },
//   // { name: "Dec", uv: 3490, pv: 4300, amt: 2100 },
// ];

export default function Chart() {
  const { data, isLoading } = useGetChartQuery(undefined);

  const chartData = data?.data?.map(
    (item: { month: string; count: string }) => ({
      name: item?.month,
      count: item?.count,
    })
  );
  //   const [selectedYear, setSelectedYear] = useState("Year");

  //   const handleYearChange = (value: string) => {
  //     setSelectedYear(value);
  //   };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="my-4 bg-[#F6F6F6] shadow-md rounded-lg px-3 pt-1 text-textGray">
      <div className="flex items-center justify-between my-4">
        <h1 className="text-[#1A1E25]">Total Agency statistics</h1>
        <div className="flex justify-center items-center gap-7">
          <div className="text-[#1A1E25] flex justify-center items-center gap-2">
            <p className="h-3 w-3 bg-[#81888C] rounded-full"></p>
            <h1>Agency</h1>
          </div>
          <div className="text-[#F79535] flex justify-center items-center gap-2">
            <p className="h-3 w-3 bg-[#F79535] rounded-full"></p>
            <h1>Projects list</h1>
          </div>
          <div>
            <Select defaultValue="2025">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["2023", "2024", "2025", "2026", "2027"].map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          width={10}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(_, index: number) => index.toString()} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar
            dataKey="count"
            fill="#81888C"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="count"
            fill="#F79535"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
