import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";

interface ToastProps {
  show: boolean;
  message: string;
  additionalStyles : string
}

const Toast: React.FC<ToastProps> = ({ show, message, additionalStyles }) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Disappear after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className={`fixed top-4 right-4 m-4 p-3 min-w-[300px] shadow-lg  rounded-lg  animate-slideIn flex gap-3 items-center justify-center ${additionalStyles}`}>
          <div>{message.includes('deleted') ? <CgDanger />  : <FaCheckCircle color='white' /> }</div>
          <div>{message}</div>
        </div>
      )}
    </>
  );
};

export default Toast;

