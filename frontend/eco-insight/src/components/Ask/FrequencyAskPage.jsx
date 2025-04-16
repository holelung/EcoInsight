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
    <div className="FA-container">
      <Title>자주하는 질문</Title>
      <br />
      <br />
      <input type="text" id="search" placeholder="검색" />
      <br />
      <br />
      <div id="division-container">
        <button className="division">분류1</button>
        <button className="division">분류2</button>
        <button className="division">분류3</button>
        <button className="division">분류4</button>
        <button className="division">분류5</button>
      </div>
      <br />
      <hr />
      <br />
      <div id="question-container">
        {faqList.map((faq, index) => (
          <div key={index}>
            <button className="question" onClick={() => toggleAnswer(index)}>
              {faq.question}
            </button>
            {openIndex === index && <div className="answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
      <br />
      <button id="private-ask" onClick={() => navi("/privateAskPage")}>
        찾는 질문이 없어요!
      </button>
    </div>
  );
};

export default FrequencyAskPage;
