import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/Context/AuthContext";
import axios from "axios";
import ListParagraph from "../../../components/Paragraph/ListParagraph";

const PointDetailPage = () => {
  const { auth } = useContext(AuthContext);
  const { memberNo } = useParams(); 
  const location = useLocation();
  const item = location.state;
  const navi = useNavigate();
  const [histories, setHistories] = useState([]);
  const [totalPoint, setTotalPoint] = useState(0);

  useEffect(() => {
    if (auth.tokens.accessToken) {
      axios.get(`http://localhost/admin/point/detail?memberNo=${memberNo}`, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        }
      }).then((response) => {
        setHistories([...response.data.history]);
        setTotalPoint(response.data.totalPoint);
      }).catch((error) => {
        console.error(error);
        alert(error.response.data["error-message"]);
      })
    }
  }, [auth.tokens.accessToken, ])

  return (
    <>
      <p className="text-2xl font-bold">포인트 획득 기록</p>
      <div className="flex gap-2 justify-between border-t mt-2">
        <div className="memberInfo mt-2">
          <p>닉네임 : {item.memberName}</p>
          <p>이메일 : {item.email}</p>
          <p>전화번호 : {!item.memberPh ? "정보 없음" : item.memberPh}</p>
          <p>가입일 : {item.memberEnrollDate}</p>
          <p>수정일 : {item.memberUpdateDate}</p>
        </div>
        <div className="point-history mt-2 min-w-[600px] max-w-[1000px] mr-4">
          <div className="flex justify-around text-lg font-bold border-b border-gray-300 py-2">
            <ListParagraph>번호</ListParagraph>
            <ListParagraph>날짜</ListParagraph>
            <ListParagraph>포인트</ListParagraph>
          </div>
          {histories.map((history) => (
            <div className="flex justify-around text-lg border-b border-gray-300 py-2" key={history.pointNo}>
              <ListParagraph>{history.pointNo}</ListParagraph>
              <ListParagraph>{history.createdDate}</ListParagraph>
              <ListParagraph>{history.changePoint}</ListParagraph>
            </div>
          ))}
          <div className="flex justify-around text-lg font-bold border-b border-gray-300 py-2">
            <ListParagraph>합계 : </ListParagraph>
            <ListParagraph></ListParagraph>
            <ListParagraph>{totalPoint.toLocaleString()}p</ListParagraph>
          </div>
        </div>
      </div>
    </>
  );
}

export default PointDetailPage;