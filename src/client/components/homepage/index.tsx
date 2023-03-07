import React, { FC } from "react";
import Header from "@/components/common/Header";
import ImageboardList from "./ImageboardList";

const HomepageComponent: FC = () => {
  return (
    <main>
      <Header />
      <ImageboardList />
    </main>
  );
};

export default HomepageComponent;
