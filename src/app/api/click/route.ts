import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

type ClickDoc = {
  _id: string; // 링크 id
  count: number;
  lastClickedAt: Date;
};

const validIds = new Set(links.map((link) => link.id));

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

/** 링크 클릭 1회 기록. body: { linkId: string } */
export async function POST(req: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await req.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 임의의 id로 DB가 채워지는 것을 막습니다.
  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "DB가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const clicks = await clicksCollection();
    await clicks.updateOne(
      { _id: linkId },
      { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
      { upsert: true },
    );
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[click] 기록 실패", err);
    return NextResponse.json({ error: "기록에 실패했습니다." }, { status: 500 });
  }
}

/** 링크별 클릭 수 조회. 응답: { [linkId]: count } */
export async function GET() {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "DB가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const clicks = await clicksCollection();
    const docs = await clicks.find({ _id: { $in: [...validIds] } }).toArray();
    const counts = Object.fromEntries(links.map((link) => [link.id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;
    return NextResponse.json(counts);
  } catch (err) {
    console.error("[click] 조회 실패", err);
    return NextResponse.json({ error: "조회에 실패했습니다." }, { status: 500 });
  }
}
