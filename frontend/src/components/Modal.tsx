import React from "react";
import { createPortal } from "react-dom";
import classes from "../styles/Modal.module.css";

export const Backdrop = (props: { backdropClassName?: string }) => {
  return (
    <div
      className={`${classes.backdrop} w-full ${props.backdropClassName} `}
    ></div>
  );
};

const ModalOverlay = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="fixed flex  justify-center items-center inset-0 overflow-y-auto z-[199] pb-10 ">
      <div
        className={`${classes.modal}  bg-[#2a2a2a]  text-white dark:text-dimGray  rounded-sm py-6  px-3  ${props.className}`}
      >
        <div
          className={`${classes.content} ${props.className} md:w-96 xs:w-80`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays") as HTMLElement;

const Modal = (props: {
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
}) => {
  return (
    <div className="w-[28rem] absolute" data-testid="modal">
      {createPortal(
        <Backdrop backdropClassName={props.backdropClassName} />,
        portalElement
      )}
      {createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </div>
  );
};

export default Modal;
