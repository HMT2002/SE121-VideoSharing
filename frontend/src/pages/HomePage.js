import React, { useEffect, useState, useCallback } from "react";

import { GETAllThreadAction } from "../APIs/thread-apis";
import { LoginAction } from "../APIs/auth-apis";

import SectionList from "../components/sections/SectionList";

const HomePage = () => {
  const tags = [
    "Popular",
    "Đời sống",
    "Kỹ thuật",
    "Mỹ thuật",
    "Ẩm thực",
    "Du lịch",
  ];

  const [threads, setThreads] = useState([]); // all threads in loaded in homepage

  const fetchThreadsHandler = useCallback(async () => {
    try {
      const response = await GETAllThreadAction();

      if (response.status === "success") {
        setThreads(response.data.threads);
      }

      const getcookietoken = await LoginAction({
        account: "enteredAccount",
        password: "enteredPassword",
      });
      if (getcookietoken.status === "success sign in") {
        console.log("retrieve cookie");
        console.log(document.cookie);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // load all threads for the first time access homepage
  // should change to load a set (10-15) of newest threads for #Popular secion
  useEffect(() => {
    fetchThreadsHandler();
  }, [fetchThreadsHandler]);

  return <SectionList labels={tags} threads={threads} />;
};

export default HomePage;
