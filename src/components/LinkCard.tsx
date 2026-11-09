"use client";

import type { LinkItem } from "@/data/profile";

type Props = LinkItem & { delay?: number };

/** 페이지 이동을 막지 않도록 백그라운드로 클릭을 기록합니다. 실패해도 링크는 정상 동작합니다. */
function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  try {
    if (navigator.sendBeacon?.("/api/click", new Blob([body], { type: "application/json" }))) {
      return;
    }
  } catch {
    // sendBeacon을 쓸 수 없으면 아래 fetch로 대신합니다.
  }
  fetch("/api/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export default function LinkCard({ id, label, title, url, delay = 0 }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackClick(id)}
      onAuxClick={(e) => {
        // 마우스 휠 클릭(새 탭 열기)도 집계
        if (e.button === 1) trackClick(id);
      }}
      className="animate-rise group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-5 py-4 transition duration-200 hover:border-transparent hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:scale-[0.99]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="flex min-w-0 flex-col items-start">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="mt-0.5 truncate text-base font-semibold">{title}</span>
      </span>

      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-5 shrink-0 text-subtle transition duration-200 group-hover:translate-x-0.5 group-hover:text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </a>
  );
}
