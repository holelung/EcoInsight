import { useContext, useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const SummaryBoard = ({ type }) => {
  const { auth } = useContext(AuthContext);
  const [summaryCards, setSummaryCards] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const icons = ["👥", "🚮", "💻"]
  useEffect(() => {
    if (auth.tokens.accessToken) { 
      axios.get(`http://localhost/admin/summary-card`, {
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
        {summaryCards.map((summaryCard, i) => (
          <SummaryCard
            key={i}
            icon={icons[i]}
            title={summaryCard.title}
            value={summaryCard.value}
            change={summaryCard.change +"%"}
            positive={summaryCard.status}
          />
        ))}
      </div>
    </>
  );
}

export default SummaryBoard;