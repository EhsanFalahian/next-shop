const RadioInput = ({ id, label, name, value, onChange, checked }: any) => {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 cursor-pointer rounded-[5px] checked:text-primary-900"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
