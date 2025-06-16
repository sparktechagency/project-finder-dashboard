import AddFloor from "./ProjectDetails/GetFloor";
import AddPhase from "./ProjectDetails/AddPhase";

export default function ProjectDetails() {
  return (
    <>
      <div className="border border-gray-300 px-4 py-2 mx-auto w-[750px] rounded-md grid grid-cols-1 md:grid-cols-3 gap-2">
        <span>Projects Name</span>
        <span>Payment Plan</span>
        <span>Quality Specification</span>
        <span>Location</span>
        <span>Commission</span>
        <span>Price</span>
        <span>Completion Year</span>
        <span>Add Floor</span>
        <span>Add Phase</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <div className="col-span-3">
          <AddFloor />
        </div>
        <div className="col-span-2">
          <AddPhase />
        </div>
      </div>
    </>
  );
}
