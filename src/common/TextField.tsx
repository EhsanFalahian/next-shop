import { JSX, ReactComponentElement } from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  value: string;
  onchange: () => {};
};

const TextField = ({ label, id, name, value, onchange }: any) => {
  return (
    <div>
      <label className="block mb-4" htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete={"false"}
        className="textField__input"
        name={name}
        value={value}
        id={id}
        onChange={onchange}
      />
    </div>
  );
};

export default TextField;
