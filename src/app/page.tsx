import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { links, profile } from "@/data/profile";

/**
 * 메인 페이지 (wireframe.png 기준)
 *  1. 원형 프로필 사진
 *  2. 이름 (한글 / 영문) + 한 줄 소개
 *  3. 링크 카드 목록 (세로 배치)
 * 표시 내용은 src/data/profile.ts 에서 수정합니다.
 */
export default function Home() {
  return (
    <main className="min-h-dvh px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-md">
        {/* 상단: 원형 프로필 + 이름 + 한 줄 소개 */}
        <Profile {...profile} />

        {/* 하단: 링크 카드 (세로 배치) */}
        <nav aria-label="링크 목록" className="mt-12">
          <ul className="flex flex-col gap-3">
            {links.map((link, i) => (
              <li key={link.id}>
                <LinkCard {...link} delay={260 + i * 60} />
              </li>
            ))}
          </ul>
        </nav>

        <footer className="mt-16 text-center text-xs font-medium text-subtle">
          Linknamu
        </footer>
      </div>
    </main>
  );
}
