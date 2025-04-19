

export const Button = () => {
  return (
    <></>
  );
}

export const PageButton = ({children, onClick, className, key}) => {
  return (
    <button
      key={key}
      onClick={onClick}
      className={`px-3 py-1 rounded bg-gray-200 hover:bg-lime-400 active:scale-105 ${className}`}
    >
      {children}
    </button>
  )
}