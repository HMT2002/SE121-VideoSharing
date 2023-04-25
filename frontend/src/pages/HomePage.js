import React, { useEffect, useState, useCallback } from "react";

import { GETAllThreadAction } from "../APIs/thread-apis";

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

      // const storedToken = localStorage.getItem("token");
      // const response2 = await fetch("/api/v1/threads/strap/like", {
      //   method: "GET",
      //   headers: {
      //     // 'Content-Type': 'application/json',
      //     Authorization: storedToken,
      //   },
      // });
      // const data2 = await response2.json();

      // const response3 = await fetch("/api/v1/threads/strap/like", {
      //   method: "GET",
      //   headers: {
      //     // 'Content-Type': 'application/json',
      //     Authorization: storedToken,
      //   },
      // });
      // const data3 = await response3.json();

      // console.log(data2);
      // console.log(data3);
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
