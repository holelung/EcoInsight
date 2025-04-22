import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Title } from "../../styles/Styles";
import { faqList } from "./faqList";

const categories = [
  { label: "전체", value: "all" },
  { label: "제도", value: "policy" },
  { label: "절약", value: "practice" },
  { label: "시각", value: "visual" },
  { label: "포인트", value: "point" },
  { label: "이용", value: "usage" },
];

const FrequencyAskPage = () => {
  const navi = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredList = faqList.filter((faq) => {
    const matchCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const keyword = searchTerm.toLowerCase();
    const matchSearch =
      faq.question.toLowerCase().includes(keyword) ||
      faq.answer.toLowerCase().includes(keyword);
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-[1000px] mx-auto p-10">
      <Title>자주하는 질문</Title>
      <br />
      <br />
      <input
        type="text"
        placeholder="검색"
        className="pl-10 pr-4 py-2 w-[500px] border border-black rounded bg-[url('/assets/돋보기.png')] bg-no-repeat bg-[length:20px_20px] bg-left bg-[10px_center]"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchTerm(searchInput.trim());
          }
        }}
      />
      <button
        onClick={() => setSearchTerm(searchInput.trim())}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        검색
      </button>
      <br />
      <br />
      <div className="flex justify-around flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 text-lg rounded 
              ${
                selectedCategory === cat.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <hr className="mb-6" />

      <div className="flex flex-col gap-3">
        {filteredList.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full p-4 text-left text-lg bg-gray-100 rounded hover:bg-gray-200"
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

      <button
        onClick={() => navi("/privateAskPage")}
        className="mt-10 float-right w-[250px] h-[50px] text-[20px] bg-gray-100 rounded hover:bg-gray-200"
      >
        찾는 질문이 없어요!
      </button>
    </div>
  );
};

export default FrequencyAskPage;
