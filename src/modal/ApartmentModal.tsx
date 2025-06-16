import { imageUrl } from "@/redux/api/baseApi";
import Modal from "./Modal";

interface ApartmentData {
  _id: string;
  apartmentName: string;
  apartmentImage: string;
  location: string;
  price: number;
}

interface dataDetailProps {
  isOpen: boolean;
  data: ApartmentData;
  onClose: () => void;
}

const dataModal = ({ isOpen, onClose, data }: dataDetailProps) => {
  if (!data) {
    return null;
  }

  const { apartmentName, price, location, apartmentImage } = data;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
        <div className="flex justify-between items-center -mt-2">
          <h2 className="text-xl font-semibold text-[#1A1E25]">
            Projects Details
          </h2>
        </div>
        <div className="grid grid-cols-2 py-2 mt-4">
          <span className="font-semibold capitalize">Project Name :</span>
          <span>{apartmentName}</span>
        </div>
        <div className="grid grid-cols-2 py-2 mt-">
          <span className="font-semibold capitalize">Project Image :</span>
          <img
            className="w-20 h-12"
            src={
              apartmentImage[0]?.startsWith("http")
                ? apartmentImage[0]
                : `${imageUrl}${apartmentImage[0]}`
            }
          />
        </div>
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">Location : </span>
          <span>{location}</span>
        </div>
        {/* <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">Commission :</span>
          <span>{commission}%</span>
        </div> */}
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize"> Price : </span>
          <span>{price}</span>
        </div>
      </div>
    </Modal>
  );
};

export default dataModal;
