import Modal from "./Modal";

interface ApartmentData {
  user: {
    name: string;
  };
  package: {
    paymentType: string;
    duration: string;
  };
  remaining: string;

  price: string;
  commission: string;
}

interface dataDetailProps {
  isOpen: boolean;
  data: ApartmentData;
  onClose: () => void;
}

const SubscriberModal = ({ isOpen, onClose, data }: dataDetailProps) => {
  if (!data) {
    return null;
  }
  const { price, user, package: pkg } = data;
  const { name } = user;
  const { paymentType, duration } = pkg;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#fefefe] p-6 rounded-xl w-[600px]">
        <div className="flex justify-between items-center -mt-2">
          <h2 className="text-xl font-semibold text-[#1A1E25]">
            Subscriber Details
          </h2>
        </div>
        <div className="grid grid-cols-2 py-2 mt-4">
          <span className="font-semibold capitalize">User Name :</span>
          <span>{name}</span>
        </div>
        <div className="grid grid-cols-2 py-2 mt-">
          <span className="font-semibold capitalize">Plan Type :</span>
          <span>{paymentType}</span>
        </div>
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">duration : </span>
          <span>{duration}</span>
        </div>
        {/* <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize">Commission :</span>
          <span>{remaining}%</span>
        </div> */}
        <div className="grid grid-cols-2 py-2">
          <span className="font-semibold capitalize"> Price : </span>
          <span>{price}</span>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriberModal;
