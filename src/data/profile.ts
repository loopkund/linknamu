export type ProfileData = {
  nameKo: string;
  nameEn: string;
  title: string;
  tagline?: string;
  /** public/ 아래 이미지 경로 (예: "/profile.jpg"). 비워두면 이니셜이 표시됩니다. */
  avatarUrl?: string;
};

export type LinkItem = {
  id: string;
  label: string;
  title: string;
  url: string;
};

export const profile: ProfileData = {
  nameKo: "고준서",
  nameEn: "Koh Zun Seo",
  title: "World Greatest Architect",
  tagline: "(Aspiring ^>^//)",
  avatarUrl: "/profile.jpg",
};

// TODO: 더미값입니다. 실제 내용으로 교체하세요.
// id는 클릭 수 집계 키이므로 한 번 정하면 바꾸지 않는 것이 좋습니다.
export const links: LinkItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    title: "@koh_zun.seo.hello",
    url: "https://www.instagram.com/koh_zun.seo.hello/",
  },
  { id: "website", label: "Personal Website", title: "(Coming soon)", url: "https://example.com/" },
  { id: "youtube", label: "YouTube Channel", title: "(Coming soon)", url: "https://youtube.com/" },
];
