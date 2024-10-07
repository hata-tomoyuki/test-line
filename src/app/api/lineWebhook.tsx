import { NextRequest, NextResponse } from "next/server";
import { POST as sendLineMessage } from "./lineMessage";

export async function POST(req: NextRequest) {
  try {
    // リクエストボディからJSON形式のデータを取得
    const data = await req.json();

    // 受け取ったデータを表示
    console.log("Received data:", data);

    // LINE Messaging APIにメッセージを送信し、そのレスポンスを取得する
    // const lineResponse = await sendLineMessage(req);
    const lineResponse = await sendLineMessage(data);

    // LINE APIからのレスポンスを確認してレスポンスを返す
    return lineResponse;
    // エラー処理
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in lineWebhook:", error.message);
      return NextResponse.json(
        { error: "Something went wrong", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error in lineWebhook:", error);
      return NextResponse.json(
        { error: "Something went wrong", details: "Unknown error" },
        { status: 500 }
      );
    }
  }
}
