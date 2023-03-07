import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./ThreadsList.module.scss";

interface Props {
  threads: any[];
}

const ThreadList: FC<Props> = ({ threads }) => {
  const router = useRouter();

  return (
    <div className={s.threadList}>
      {threads.map((thread) => {
        return (
          <Link
            href={`${router.query?.imageboardInitials}/${thread?.id}`}
            key={thread?.id}
          >
            <div className={s.threadCard}>
              <div className={s.metaDetails}>
                <p>
                  <span className={s.threadId}>{thread?.id}</span> -{" "}
                  {thread?.author}
                </p>
                <p className={s.createdAt}>
                  {new Date(thread?.created_at).toLocaleString()}
                </p>
              </div>
              <div className={s.threadImageContainer}>
                <img src={thread?.image} alt={thread?.title} />
              </div>
              <div className={s.rightText}>
                <p className={s.threadTitle}>{thread?.title}</p>
                {thread?.body && <p className={s.threadBody}>{thread?.body}</p>}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ThreadList;
