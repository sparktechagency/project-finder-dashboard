import user from "../../../../public/card/user.svg";
import earn from "../../../../public/card/earning.svg";
import { useGetStaticsQuery } from "@/redux/apiSlice/dashboard/dashboard";
import Loading from "@/components/layout/shared/Loading";

const Card = () => {
  const { data, isLoading } = useGetStaticsQuery(undefined);
  const staticsData = data?.data;

  const statics = [
    {
      icon: <img src={user} alt="total" />,
      title: "Total Agency",
      date: "13 NOV, 2024",
      count: staticsData?.result || 0,
    },
    {
      icon: <img src={user} alt="total" />,
      title: "Total Projects",
      date: "13 NOV, 2024",
      count: staticsData?.apartment || 0,
    },
    {
      icon: <img src={earn} alt="total" />,
      title: "Total Income for Subscriptions",
      date: "13 NOV, 2024",
      count: staticsData?.totalPrice || 0,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-3 gap-5 ">
      {statics.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl w-full gap-4 bg-[#F6F6F6] py-5 px-5"
        >
          <div className="flex items-center gap-3 ">
            <div className="bg-[#FEF2E6E0] w-[70px] h-[70px] rounded-full flex items-center justify-center ">
              {item?.icon}
            </div>
            <div className="">
              <div className="font-medium text-[18px] text-[#81888C]">
                {item?.title}
              </div>
              <p className="text-[#1A1E25] text-4xl font-semibold">
                {item?.count}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
