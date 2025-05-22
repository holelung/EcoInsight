import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { AuthContext } from "../../../components/Context/AuthContext";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    inset: "auto",
    margin: "auto",
    padding: "24px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "600px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "auto",
    outline: "none",
  },
};

const AuthBoardDetailModal = ({ isOpen, onRequestClose, boardNo, listState, setListState, categoryId }) => {
  const { auth } = useContext(AuthContext);
  const [board, setBoard] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    setBoard({});
    axios
      .get(`${API_URL}auth-boards/detail`, {
        params: {
          boardNo: boardNo,
          categoryId: categoryId,
        },
      })
      .then((response) => {
        console.log(response);
        setBoard(response.data);
      });
  }, [listState, ]);

  const handleCertify = () => {
    console.log("인증처리하기");
    
    axios.patch(`${API_URL}admin/authboard/cert`,
      {
        boardNo: boardNo,
        memberNo: board.memberNo,
        categoryId: board.categoryId,
      }, {
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        }
      }
    ).then(response => {
      if (response.status === 200) {
        alert(response.data);
        setListState(!listState);
        onRequestClose();
      }
    }).catch(error => {
      console.error(error);
    })
  }


  if (!boardNo) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles}
    >
      {board === "" || board === null ? (
        <>
          <p>로딩중..</p>
          <p>이거나 게시글이 비활성화 된 상태입니다.</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">인증 게시판 상제 정보</h2>

          <div className="space-y-2">
            <p>
              <strong>글쓴이:</strong> {board.memberName}
            </p>
            <p>
              <strong>게시글 번호:</strong> {board.boardNo}
            </p>
            <div>
              <strong>글 내용:</strong>
              <br />
              <p
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: board.boardContent }}>
              </p>
            </div>
            <p>
              <strong>현재 상태:</strong>{" "}
              {board.isCertified === "Y" ? "처리완료" : "미처리"}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => handleCertify()}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              상태 변경
            </button>
            <button
              onClick={onRequestClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              닫기
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default AuthBoardDetailModal;
