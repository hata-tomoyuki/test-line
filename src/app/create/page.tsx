"use client";
import { useState } from "react";

export default function CreatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    // デフォルト動作防止
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    // フォーム内の全ての入力値を収集
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    // フォームのデータを送信する
    const response = await fetch("/api/lineWebhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("レスポンス確認", response);

    if (response.ok) {
      alert("LINEにメッセージを送信しました!");
    } else {
      alert("メッセージの送信に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        メールアドレス:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">送信</button>
    </form>
  );
}
