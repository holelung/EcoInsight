import { useNavigate } from "react-router-dom";

const MenuItem = ({ children, onClick }) => {
  const navi = useNavigate();

  return (
    <>
      <li
        className="cursor-pointer hover:text-green-600"
        onClick={onClick}
      >
        {children}
      </li>
    </>
  );
}

export default MenuItem;