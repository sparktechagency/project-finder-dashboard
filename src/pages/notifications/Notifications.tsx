import { IoIosNotifications } from "react-icons/io";

const notifications = [
  {
    id: 1,
    message: "Unlock beauty at your doorstep today!",
    time: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "Pamper yourself, book a session now!",
    time: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "Your beauty fix, just a tap away!",
    time: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "Pamper yourself, book a session now!",
    time: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "Your beauty fix, just a tap away!",
    time: "Fri, 12:30pm",
  },
];

export default function Notifications() {
  return (
    <div className=" mt-10 px-4">
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="flex items-center space-x-4 p-4 text-[#81888C]"
          >
            <div className="text-yellow-500 h-8 w-8 flex items-center justify-center border border-yellow-500 rounded-full">
              <IoIosNotifications size={24} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[16px]">
                {notification.message}
              </p>
              <p className=" text-sm">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
