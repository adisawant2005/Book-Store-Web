import { isAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { ImCancelCircle } from "react-icons/im";

export default function StickyMessage({
  message,
  duration,
  isActive,
  setIsActive,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setIsActive(false);
      }, duration);
    }
  }, [isActive]);

  const handleCancle = () => {
    setShow(false);
  };

  return (
    <div className="static">
      <div
        className={`${
          show ? "translate-x-0" : "translate-x-[120%]"
        } inline-block duration-700 fixed z-20 top-20 right-4 w-[25%] p-2
        bg-slate-200 fixed flex mt-50 me-2 border-2 rounded-lg border-stone-600`}
      >
        <p className="text-slate-900  basis-11/12">{message}</p>
        <div className="basis-1/12 my-auto flex flex-row-reverse">
          <ImCancelCircle className="text-slate-500" onClick={handleCancle} />
        </div>
      </div>
    </div>
  );
}
