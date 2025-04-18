import { useNavigate } from "react-router-dom";

const MenuItem = ({ children, onClick, isActive }) => {
  const navi = useNavigate();

  return (
    <>
      <li
        className={`cursor-pointer hover:text-lime-500 ${isActive ? "text-lime-400" : "text-gray-700"}`}
        onClick={onClick}
      >
        {children}
      </li>
    </>
  );
}

export default MenuItem;