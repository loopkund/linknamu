import Image from "next/image";
import type { ProfileData } from "@/data/profile";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Profile({ nameKo, nameEn, title, tagline, avatarUrl }: ProfileData) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 원형 프로필: 이전(128/144px)보다 약 1.6배 (황금비) */}
      <div className="animate-rise relative size-52 overflow-hidden rounded-full bg-neutral-100 sm:size-58">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={nameKo}
            fill
            sizes="232px"
            className="object-cover"
            priority
            // SVG는 Next 이미지 최적화 대상이 아니므로 그대로 사용
            unoptimized={avatarUrl.endsWith(".svg")}
          />
        ) : (
          <span className="flex size-full items-center justify-center text-5xl font-semibold text-muted">
            {initials(nameEn)}
          </span>
        )}
      </div>

      {/* 한글 이름: 작고 흐리게, 한 줄 유지 (pl은 자간 때문에 생기는 오른쪽 여백을 맞춰 가운데 정렬) */}
      <p
        className="animate-rise mt-7 whitespace-nowrap pl-[0.4em] text-xs tracking-[0.4em] text-subtle"
        style={{ animationDelay: "60ms" }}
      >
        {nameKo}
      </p>

      {/* 영문 이름 */}
      <h1
        className="animate-rise mt-1.5 whitespace-nowrap text-3xl font-bold uppercase tracking-tight sm:text-4xl"
        style={{ animationDelay: "120ms" }}
      >
        {nameEn}
      </h1>

      {/* 한 줄 소개 */}
      <p
        className="animate-rise mt-4 text-base font-medium sm:text-lg"
        style={{ animationDelay: "180ms" }}
      >
        {title}
      </p>
      {tagline && (
        <p className="animate-rise mt-1 text-sm text-muted" style={{ animationDelay: "220ms" }}>
          {tagline}
        </p>
      )}
    </header>
  );
}
