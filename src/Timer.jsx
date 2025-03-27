import { useState, useRef } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const alarmRef = useRef(null);
  const intervalRef = useRef(null);

  const handleInputChange = (e) => setMinutes(e.target.value);

  const startTimer = () => {
    const totalSeconds = parseInt(minutes, 10) * 60; // Convert minutes to seconds
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      setTimeLeft("Please enter a valid number greater than zero");
      return;
    }

    setTimeLeft(totalSeconds);
    clearExistingInterval(); // Clear any existing interval before starting a new one
    intervalRef.current = setInterval(() => updateTimer(), 1000);
  };

  const updateTimer = () => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearExistingInterval();
        alarmRef.current.play();
        return "Time's Up!";
      }
      return prevTime - 1; // Decrease by 1 second
    });
  };

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    clearExistingInterval();
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
    setTimeLeft(null);
    setMinutes("");
  };

  return (
    <div>
      <input
        type="text"
        value={minutes}
        onChange={handleInputChange}
        placeholder="Enter minutes..."
      />
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
      <h1>
        {timeLeft !== null
          ? typeof timeLeft === "string"
            ? timeLeft
            : `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
          : "Enter a time to begin"}
      </h1>
      <audio ref={alarmRef} src="/alarm_clock.mp3" />
    </div>
  );
};

export default Timer;
