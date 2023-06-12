/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useState } from "react";
import { Header } from "./components/header";
import Modal from "./components/modal";

export default function HomePage() {
  const [searchModal, setSearchModal] = useState(false);
  return (
    <>
      <Header setSearchModal={setSearchModal} />
      <Modal searchModal={searchModal} />
    </>
  );
}
