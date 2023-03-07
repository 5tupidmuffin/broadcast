import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import s from "./ImageboardList.module.scss";
import * as APICalls from "@/APICalls";

const ImageboardList: FC = () => {
  const [imageboardList, setImageboardList] = useState([]);
  const [isError, setIsError] = useState(false);

  const fetchImageboardList = async (): Promise<void> => {
    const [data, error] = await APICalls.getImageboardList();
    if (data) {
      setImageboardList(data);
      return;
    }
    setIsError(true);
  };

  useEffect(() => {
    fetchImageboardList();
  }, []);

  return (
    <div className={s.imageboardList}>
      <h2 className={s.heading}>IMAGEBOARDS</h2>
      <ol className={s.imageboardListContainer}>
        {imageboardList.map((board: any) => {
          return (
            <Link href={`/${board.initials}`} key={board.initials}>
              <li>
                <p className={s.boardLink}>
                  /{board.initials}/ - {board.name} - {board.description}
                </p>
              </li>
            </Link>
          );
        })}
      </ol>
    </div>
  );
};

export default ImageboardList;
