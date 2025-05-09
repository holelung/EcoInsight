import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


const categories = [
  {
    name: '질문 게시판',
    posts: [
      { id: 1, title: '1등 글' },
      { id: 2, title: '2등 글' },
      { id: 3, title: '3등 글' },
      { id: 4, title: '4등 글' },
      { id: 5, title: '5등 글' },
    ],
  },
  {
    name: '인증 게시판',
    posts: [
      { id: 10, title: '1등 글' },
      { id: 11, title: '2등 글' },
      { id: 12, title: '3등 글' },
      { id: 13, title: '4등 글' },
      { id: 14, title: '5등 글' },
    ],
  },
  {
    name: '자유 게시판',
    posts: [
      { id: 20, title: '1등 글' },
      { id: 21, title: '2등 글' },
      { id: 22, title: '3등 글' },
      { id: 23, title: '4등 글' },
      { id: 24, title: '5등 글' },
    ],
  },
];

export default function PopularPosts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div key={cat.name} className="bg-gray-200 rounded-lg p-4">
          <h4 className="font-semibold mb-1">{cat.name}</h4>
          <p className="text-sm text-gray-600 mb-2">오늘의 최다 조회수</p>
          <ul className="space-y-1">
            {cat.posts.map((post, idx) => (
              <li key={post.id}>
                <Link to={`/post/${post.no}`} className="text-gray-800 hover:text-blue-600">
                  {idx + 1}위: {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
