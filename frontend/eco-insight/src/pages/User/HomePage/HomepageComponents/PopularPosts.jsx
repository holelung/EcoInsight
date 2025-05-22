import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function PopularPosts() {
  const [data, setData] = useState({});   // boardGroup → categories
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get("http://localhost/boards/mainview-count")
         .then(res => setData(res.data))
         .catch(console.error);
  }, []);
  return (
    <>
      {Object.entries(data).map(([group, categories]) => (
        <section key={group} className="mb-8">
          <h3 className="text-xl font-bold mb-3">
            {group === "A" ? "🅰️ 인증 게시판" : "🅲 커뮤니티 게시판"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categories).map(([catName, posts]) => (
              <div key={catName} className="bg-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-1">{catName}</h4>
                <p className="text-sm text-gray-600 mb-2">오늘의 최다 조회수</p>

                <ul className="space-y-1">
                  {posts.map((post, idx) => (
                    <li key={post.boardNo} className="flex justify-between">
                      <Link
                        to={
                          group === "A"
                            ? `/auth-board/${post.categoryId}/${post.boardNo}`
                            : `/post/${post.categoryId}/${post.boardNo}`
                        }
                        className="text-gray-800 hover:text-blue-600 truncate"
                      >
                        {idx + 1}위: {post.boardTitle}
                      </Link>
                      <span className="text-xs text-gray-500">{post.viewCnt}회</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
