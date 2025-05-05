import { useContext } from "react";
import SummaryCard from "./SummaryCard";
import { AuthContext } from "../Context/AuthContext";

const SummaryBoard = ({ type }) => {
  const { auth } = useContext(AuthContext);
  const [summaryCards, setSummaryCards] = useState();

  const icons = ["👥", "🚮", "💻"]
  useEffect(() => {
    if (auth.tokens.accessToken) { 
      axios.get(`http://localhost/admin/summaryCard`, {
        params: {
          type: type
        },
        headers: {
          Authorization: `Bearer ${auth.tokens.accessToken}`,
        }
      }).then(response => {
        console.log(response);
        setSummaryCards(response.data);
      }).catch(error => {
        console.error(error);
      })
    }
  },[])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map(summaryCard, i => {
          <SummaryCard
            icon={icons[i]}
            title={summaryCard.title}
            value={summaryCard.value}
            change={summaryCard.change}
            positive={summaryCard.status}
          />
        })}
        <SummaryCard
          icon="👥"
          title="전체 글 수"
          value="5,423"
          change="+16%"
          positive
        />
        <SummaryCard
          icon="🚮"
          title="이번달 조회수"
          value="1,893"
          change="-1%"
          positive={false}
        />
        <SummaryCard
          icon="💻"
          title="이번달 공지사항"
          value="189"
          change="+3%"
          positive
        />
      </div>
    </>
  );
}

export default SummaryBoard;