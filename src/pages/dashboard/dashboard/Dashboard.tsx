import Card from "./Card";
import Chart from "./Chart";
import SellerChart from "./SellerChart";
// import SellerChart from "./SellerChart";

export default function Dashboard() {
  return (
    <div className="">
      <div className="">
        <Card />
      </div>
      <div className="col-span-8">
        <Chart />
      </div>
      <div className="mt-2">
        <SellerChart />
      </div>
    </div>
  );
}
