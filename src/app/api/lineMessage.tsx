// import { NextRequest, NextResponse } from "next/server";
import { NextResponse } from "next/server";

// .envからアクセストークンを取得
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// export async function POST(req: NextRequest) {
export async function POST(data: { name: string; email: string }) {
  console.log(CHANNEL_ACCESS_TOKEN);

  try {
    // リクエストから受け取ったデータを分割代入を使って取得
    // const { name, email } = await req.json();
    const { name, email } = data;

    const message = {
      to: "U2e06e9c1777f795eacdf55813d0fa6fe",
      messages: [
        {
          type: "text",
          text: `新しいフォームの送信があります。\n名前: ${name}\nメールアドレス: ${email}`,
        },
      ],
    };

    // エンドポイントにPOSTリクエストを送信
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(message),
    });

    const responseData = await response.json();
    console.log("Response from LINE API:", responseData);

    if (!response.ok) {
      throw new Error(
        `LINE API error: ${responseData.message || responseData}`
      );
    }

    return NextResponse.json(
      { message: "メッセージを送信しました" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in lineMessage:", error.message); // エラーメッセージを記録
      return NextResponse.json(
        { message: "サーバーエラー", error: error.message }, // 詳細を含める
        { status: 500 }
      );
    } else {
      console.error("Unknown error in lineMessage:", error);
      return NextResponse.json(
        { message: "サーバーエラー", error: "Unknown error" }, // 不明なエラーを処理
        { status: 500 }
      );
    }
  }
}
