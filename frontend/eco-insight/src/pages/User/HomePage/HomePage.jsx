import React from 'react';
import Carousel from './HomepageComponents/Carousel';
import DashboardCard from './HomepageComponents/DashboardCard';
import PopularPosts from './HomepageComponents/PopularPosts';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* 상단 이미지 캐러셀 */}
        <Carousel />

        {/* 대시보드 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="실시간 사이트 접속자 현황"
            description="여기는 차트/그래프가 들어갈 자리입니다."
          >
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              Chart Placeholder
            </div>
          </DashboardCard>

          <DashboardCard
            title="오늘의 커뮤니티 작성글 현황"
            description="여기는 차트/그래프가 들어갈 자리입니다."
          >
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              Pie Chart Placeholder
            </div>
          </DashboardCard>

          <DashboardCard
            title="오늘자 인증 게시글 현황"
            description="여기는 차트/그래프가 들어갈 자리입니다."
          >
            <div className="h-40 bg-gray-200 rounded-lg flex items-center justify-center">
              Bar Chart Placeholder
            </div>
          </DashboardCard>
        </div>

        {/* 실시간 인기글 섹션 */}
        <PopularPosts />
      </div>
    </div>
  );
}