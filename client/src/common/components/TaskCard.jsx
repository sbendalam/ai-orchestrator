import { Button } from "@/Components/ui/button";
import React, { useEffect, useRef, useState } from "react";

function TaskCard({ task, name }) {
  const [timerOn, setTimerOn] = useState(false);
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [totalTime, setTotalTime] = useState("00:00:00");
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTimerOn(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setTimerOn(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setTimerOn(false);
  };
  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);

    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    if (start) {
      startTimer();
    } else {
      setTotalTime(formatTime(time));
      stopTimer();
    }
  }, [start]);
  return (
    <div className="w-full border p-4 rounded-xl flex items-center gap-2 justify-between">
      <div>{task?.TaskName + " For " + name}</div>
      <div className="flex gap-2 items-center">
        <Button
          className={start ? "bg-red-500 hover:bg-red-500" : ""}
          onClick={() => setStart((p) => !p)}
        >
          {start ? "Stop " + formatTime(time) : "Start"}
        </Button>
        {!start && totalTime}
      </div>
    </div>
  );
}

export default TaskCard;
