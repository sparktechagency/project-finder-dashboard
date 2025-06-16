import { useState } from "react";

import Premium from "./Premium";
import { GoPlus } from "react-icons/go";
import DublicateSubscribeEditModal from "@/modal/DublicateSubscribeEditModal";

export default function Subscriptions() {
  const [add, setAdd] = useState<boolean | null>(null);
  return (
    <>
      <div className=" flex justify-between items-center text-black cursor-pointer">
        <h1 className="text-2xl font-semibold ">Subscription Plans</h1>
        <div
          className=" p-3 bg-[#fdead8] flex items-center gap-2 rounded-lg cursor-pointer"
          onClick={() => setAdd(true)}
        >
          <p>
            <GoPlus />
          </p>
          <button className="cursor-pointer">Add Subscription</button>
        </div>
      </div>

      <div className="mt-10 mb-26">
        <Premium />
      </div>

      {/* modal show */}
      {/* {add && <SubscribeEditModal isOpen={add} onClose={() => setAdd(null)} />} */}
      {add && (
        <DublicateSubscribeEditModal
          isOpen={add}
          onClose={() => setAdd(null)}
        />
      )}
    </>
  );
}
