import React from "react";

const DataFieldWR = ({ Updating, title, name, type, value, onChange }) => {
  return (
    <>
      {Updating ? (
        <div className=" m-3">
          <label htmlFor={name}>
            {title}
            <input
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              className="outline-none py-1 px-2 w-[100%] border-2 borser-sky-800 "
            />
          </label>
        </div>
      ) : (
        <p>
          <strong>{title}:</strong> {value}
        </p>
      )}
    </>
  );
};

export default DataFieldWR;
