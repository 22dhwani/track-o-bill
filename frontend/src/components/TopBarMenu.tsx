import { useNavigate } from "react-router-dom";
import User from "../../images/User.svg";
import Settings from "../../images/Setting.svg";
import Logout from "../../images/Logout.svg";

import { useState } from "react";

import styles from "../styles/TopBarMenu.module.css";
import Button from "./Button";
import Heading from "./Heading";
import Modal from "./Modal";
import LogoutModal from "./LogoutModal";
import ResetPasswordLayout from "./ResetPasswordLayout";

function TopBarMenu(props: { onClose: () => void }) {
  const [openLogout, setopenLogout] = useState(false);
  const [openReset, setopenReset] = useState(false);

  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("token") ?? "").data?.id;
  const buttonClassName =
    "bg-white  w-full  border-none border-b-[0.5px] border-b-slate-500 rounded-md text-left";
  const menuClassName = `fixed bg-white text-textColor drop-shadow-lg  shadow-black lg:top-[10.134316353887399vh] md:top-[10.134316353887399vh] xs:top-[7.634316353887399vh] delay-100 origin-top ease-in md:right-[1vw] xl:right-[1vw] lg:right-[2vw] xs:right-[5vw]  xl:w-[14.346354166666666vw] md:w-[30.346354166666666vw] lg:w-[19.346354166666666vw] xs:z-50 xs:w-[50vw]  rounded-md ${styles.menu}`;
  return (
    <div className={menuClassName}>
      {openLogout && (
        <Modal className="!py-2">
          <LogoutModal
            onClose={() => {
              setopenLogout(false);
              props.onClose();
            }}
          />
        </Modal>
      )}
      {openReset && (
        <ResetPasswordLayout
          onClose={() => {
            setopenReset(false);
            props.onClose();
          }}
        />
      )}
      <Button
        variant="outlined"
        size="big"
        buttonClassName={buttonClassName}
        centerclassname=" items-start"
        onClick={() => {
          props.onClose();
          navigate(`/home/admin-user-managment/${id}`, {
            state: { breadcrumb: "Hello" },
          });
        }}
        children={
          <div className="flex gap-3">
            <img src={User} />
            <Heading variant="subHeader" text="My Profile" />
          </div>
        }
      />

      <Button
        variant="outlined"
        size="big"
        buttonClassName={buttonClassName}
        centerclassname=" items-start"
        children={
          <div className="flex gap-3">
            <img src={Settings} />
            <Heading variant="subHeader" text="Reset Password" />
          </div>
        }
        onClick={() => setopenReset(true)}
      />

      <Button
        onClick={() => {
          setopenLogout(true);
        }}
        variant="outlined"
        size="big"
        buttonClassName={buttonClassName}
        centerclassname=" items-start"
        children={
          <div className="flex gap-3">
            <img src={Logout} />
            <Heading variant="subHeader" text="Logout" />
          </div>
        }
      />
    </div>
  );
}

export default TopBarMenu;
