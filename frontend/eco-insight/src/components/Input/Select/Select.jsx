

const Select = ({selectValue, onChange, children, labelName}) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor={selectValue} className="text-sm text-gray-600">
          {labelName}
        </label>
        <select
          id={selectValue}
          className="border px-2 py-2 rounded"
          value={selectValue}
          onChange={onChange}
        >
          {children}
        </select>
      </div>
    </>
  );
}

export default Select;