import Button from "./Button";
import Heading from "./Heading";
import HorizontalBar from "./HorizontalBar";
import Alarm from "../../images/Alarm.svg";

function LogoutModal(props: { onClose: () => void }) {
  return (
    <div>
      <div className="flex items-top">
        <Button
          variant="outlined"
          buttonClassName="border-transparent hover:rounded-full hover:bg-gray-50  !px-3 h-max mb-2 ml-auto"
          onClick={() => props.onClose()}
        >
          <Heading
            text="X"
            headingclassname="items-end  text-white text-2xl font-roboto-semibold"
            variant="headingTitle"
          />
        </Button>
      </div>
      <HorizontalBar className="h-[0.5px]  bg-zinc-200 border-0" />
      <div className="my-4 flex gap-3">
        <img src={Alarm} className="w-7 h-7" />
        <Heading
          variant="subHeader"
          text="Do you really wish to logout ?"
          headingclassname="font-sans font-medium"
        />
      </div>
      <div className="flex  my-5  gap-3 items-center ">
        <Button
          color="error"
          variant="ghost"
          size="small"
          buttonClassName="ml-auto px-6 py-2   border font-semibold rounded-sm  font-family-roboto "
          onClick={async () => {
            props.onClose();
          }}
        >
          No, Cancel
        </Button>
        <Button
          loading={false}
          variant="filled"
          size="small"
          color="primary"
          buttonClassName="px-6 py-2 font-semibold rounded-sm  font-family-roboto  "
        >
          Yes, Logout
        </Button>
      </div>
    </div>
  );
}

export default LogoutModal;
