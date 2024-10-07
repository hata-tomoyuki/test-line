import { NextApiRequest, NextApiResponse } from "next";
import * as line from "@line/bot-sdk";

const config = {
  channelAccessToken:
    "u8cnZRi+faSX3MZE1kSZwVu6hHE2U8V9gQQE578W4AZM7q4IdcMAivmtGYqyrkJgYEhDuwtW6OuEqDhqtruleOH+4rAm5jN9kvaj2iiihyHvH7gB1/5DzuYEAfdhrTUyYBKSg82lAbMr8jyilji4OQdB04t89/1O/w1cDnyilFU=",
  channelSecret: "3f6b207e3d0a3d239aeab2c38f1183ee",
};

const client = new line.Client(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const message = req.body.message;

    await client.pushMessage("U2e06e9c1777f795eacdf55813d0fa6fe", {
      type: "text",
      text: message,
    });

    res
      .status(200)
      .json({ message: `${message}というメッセージが送信されました。` });
  } catch (e) {
    res.status(500).json({ message: `error! ${e} ` });
  }
}
