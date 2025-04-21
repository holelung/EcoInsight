const handleUpload = async () => {
  if (!title || !content) {
    alert("제목과 내용을 모두 입력해주세요!");
    return;
  }

  const formData = new FormData();
  formData.append("categoryType", type);
  formData.append("title", title);
  formData.append("content", content);

  // ✅ 여러 개의 파일을 "files" key로 추가
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    await axios.post("/api/board/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("게시물 업로드 완료!");
    navigate(`/board/${type}`);
  } catch (error) {
    console.error("업로드 실패", error);
    alert("업로드 실패 😢");
  }
};
