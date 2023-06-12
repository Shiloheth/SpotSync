/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useState } from "react";
import { Header } from "./components/header";
import Content from "./components/content";
import Modal from "./components/modal";

export default function HomePage() {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <div className="min-h-screen grow relative bg-[#000000] flex flex-col">
      <Header setSearchModal={setSearchModal} />
      <Content />
      <Modal searchModal={searchModal} />
      <div className="text-white">Project</div>
    </div>
  );
}
