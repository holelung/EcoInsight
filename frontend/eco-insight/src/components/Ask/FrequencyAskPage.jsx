import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../styles/Styles";
import "./Ask.css";

const faqList = [
  { question: "Q1. 자주하는 질문1", answer: "A1. DB에서 가져와야 해요" },
  { question: "Q2. 자주하는 질문2", answer: "A2. DB에서 가져와야 해요" },
  { question: "Q3. 자주하는 질문3", answer: "A3. DB에서 가져와야 해요" },
  { question: "Q4. 자주하는 질문4", answer: "A4. DB에서 가져와야 해요" },
  { question: "Q5. 자주하는 질문5", answer: "A5. DB에서 가져와야 해요" },
  { question: "Q6. 자주하는 질문6", answer: "A6. DB에서 가져와야 해요" },
];

const FrequencyAskPage = () => {
  const navi = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-10FA-container">
      <Title>자주하는 질문</Title>
      <br />
      <br />
      <input
        type="text"
        placeholder="검색"
        className="mt-6 mb-6 pl-10 pr-4 py-2 w-[500px] text-base border border-black rounded bg-[url('/assets/돋보기.png')] bg-no-repeat bg-[length:20px_20px] bg-left bg-[10px_center]"
      />
      <br />
      <br />
      <div className="flex justify-around mb-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-[100px] text-[30px] bg-gray-100 rounded hover:cursor-pointer"
          >
            분류{num}
          </button>
        ))}
      </div>
      <br />
      <hr />
      <br />
      <div className="mb-6">
        {faqList.map((faq, index) => (
          <div key={index}>
            <button
              className="w-full mb-1 p-4 text-lg text-left bg-gray-100 rounded hover:bg-gray-200 my-5"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 border-l-4 border-blue-400 rounded-b text-base animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <br />
      <button
        className="mt-10 float-right w-[250px] h-[50px] text-[20px] bg-gray-100 rounded hover:bg-gray-200"
        onClick={() => navi("/privateAskPage")}
      >
        찾는 질문이 없어요!
      </button>
    </div>
  );
};

export default FrequencyAskPage;
