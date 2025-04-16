import logo from "../../../assets/EcoInsigthLogo2.png";

const AdminLogin = () => {


  return (
    <div className="flex h-screen items-center">
      <div className="m-auto w-[50vw] flex flex-col justify-center">
        <div id="title" className="flex flex-row justify-center items-end">
          <img src={logo} alt="EcoInsightLogo" className="h-32 w-auto" />
          <p className="text-4xl pb-3">Admin Login</p>
        </div>
        <div className="m-auto  flex flex-col items-center w-[500px] border p-3 text-lg rounded-2xl mt-3">
          <label className="self-start mx-22 mt-3">아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            className="border w-[300px] mb-2 py-2 px-2 rounded-xl"
          />
          <label className="self-start mx-22">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="border w-[300px] mb-3 py-2 px-2 rounded-xl"
          />
          <button className="my-3 mx-22 py-2 px-3 bg-main self-end rounded-xl">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
