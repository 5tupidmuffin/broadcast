import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Header from "@/components/common/Header";
import ThreadList from "./ThreadsList";
import CreateThreadForm from "./CreateThreadForm";
import s from "./ImageboardPage.module.scss";
import * as APICalls from "@/APICalls";

const ImageboardPageComponent: FC = () => {
  const [imageboardData, setImageboardData] = useState<Record<string, any>>({});
  const [threads, setThreads] = useState([]);
  const router = useRouter();

  const fetchThreads = async () => {
    const [data, error] = await APICalls.getThreadsForImageboard(
      router.query?.imageboardInitials as string
    );
    if (data) {
      setImageboardData(data);
      setThreads(data?.threads);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [router.query]);

  return (
    <main>
      <Header />
      <div className={s.imageboardDetails}>
        <h2 className={s.imageboardTitle}>
          /{imageboardData?.initials}/ - {imageboardData?.name}
        </h2>
        <div className={s.bannerImageContainer}>
          <Image src={imageboardData?.banner_image} alt="board banner" fill />
        </div>
        <p className={s.imageboardDesc}>{imageboardData?.description}</p>
      </div>
      <ThreadList threads={threads} />
      <CreateThreadForm />
    </main>
  );
};

export default ImageboardPageComponent;
