// import Link from "next/link";
// import styles from "./page.module.css";

// export default function HomePage() {
//   return (
//     <div className={styles.container}>
//       <h1>ようこそ！</h1>
//       <p>このアプリでは、LINEメッセージAPIを使ってデータを送信できます。</p>

//       <nav>
//         <ul>
//           <li>
//             <Link className={styles.navLink} href="/create">
//               データ入力フォームへ
//             </Link>
//           </li>
//           <li>
//             <Link className={styles.navLink} href="/about">
//               このアプリについて
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

"use client";
import React from "react";
import axios from "axios";

export default function HomePage() {
  const onClickMethod = async () => {
    console.log("ボタンが押されました！");

    // LINEで、ボタンが押されたことを通知する
    await axios.post("/api/linebot", {
      message: "ボタンが押されました！",
    });
  };

  return (
    <div>
      <h1>LINE通知ボタン</h1>
      <button onClick={onClickMethod}>通知する</button>
    </div>
  );
}
