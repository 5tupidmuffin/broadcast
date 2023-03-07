import React, { FC } from "react";
import Link from "next/link";

import s from "./Header.module.scss";

const Header: FC = () => {
  return (
    <div className={s.header}>
      <Link href="/">
        <h1 className={s.title}>BROADCAST</h1>
      </Link>
    </div>
  );
};

export default Header;
