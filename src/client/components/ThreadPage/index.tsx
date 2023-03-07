import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import s from "./ThreadPage.module.scss";
import * as APICalls from "@/APICalls";
import Header from "@/components/common/Header";
import AddNewReplyForm from "./AddNewReplyForm";

const ThreadPageComponent: FC = () => {
  const [threadDetails, setThreadDetails] = useState<Record<string, any>>({});
  const [replies, setReplies] = useState([]);
  const router = useRouter();

  const fetchThreadDetails = async (
    imageboadInitials: string,
    threadId: number
  ): Promise<void> => {
    const [data, error] = await APICalls.getThreadDetails(
      imageboadInitials,
      threadId
    );
    if (data) {
      setThreadDetails(data);
      setReplies(data?.replies);
    }
  };

  useEffect(() => {
    const imageboardInitials = router.query?.imageboardInitials;
    const threadId = router.query?.threadId;
    if (imageboardInitials && threadId) {
      fetchThreadDetails(imageboardInitials as string, Number(threadId));
    }
  }, [router.query]);

  return (
    <main>
      <Header />
      <div className={s.parentThread}>
        <div className={s.metaDetails}>
          <p>
            <span className={s.threadId}>{threadDetails?.id}</span> -{" "}
            {threadDetails?.author}
          </p>
          <p className={s.createdAt}>
            {new Date(threadDetails?.created_at).toLocaleString()}
          </p>
        </div>
        <div className={s.threadImageContainer}>
          <img src={threadDetails?.image} alt={threadDetails?.title} />
        </div>
        <div className={s.rightText}>
          <p className={s.threadTitle}>{threadDetails?.title}</p>
          {threadDetails?.body && (
            <p className={s.threadBody}>{threadDetails?.body}</p>
          )}
        </div>
      </div>
      <div className={s.repliesList}>
        {replies.map((reply: any) => {
          return (
            <div className={s.replyCard} key={reply?.id}>
              <div className={s.metaDetails}>
                <p>
                  <span className={s.threadId}>{reply?.id}</span> -{" "}
                  {reply?.author}
                </p>
                <p className={s.createdAt}>
                  {new Date(reply?.created_at).toLocaleString()}
                </p>
              </div>
              {reply?.image && (
                <div className={s.threadImageContainer}>
                  <img src={reply?.image} alt={reply?.title} />
                </div>
              )}
              <div className={s.rightText}>
                <p className={s.threadBody}>{reply?.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      <AddNewReplyForm />
    </main>
  );
};

export default ThreadPageComponent;
