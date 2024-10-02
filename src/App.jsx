import { useEffect, useState } from "react";

function App() {
  const [sessionTimer, setsessionTimer] = useState(0);
  const [breakTimer, setbreakTimer] = useState(0);
  const [breaktime, setbreak] = useState(0);
  const [time, setTime] = useState(0);
  const [run, setRun] = useState("start");
  const [isonbreak, setisonbreak] = useState(0);


  const speed = 1000;

  const changeNumtoTime = (all_sec) => {
    let min = Math.floor(all_sec / 60);
    let sec = all_sec % 60;

    // sec.toString().padStart(2,"0") we need two index string  if no enough index string add "0" in font of it
    // if (sec < 10){
    //   sec = '0' + sec
    // }
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setTime(sessionTimer * 60);
  }, [sessionTimer]);

  useEffect(() => {
    setbreak(breakTimer * 60);
  }, [breakTimer]);

  useEffect(() => {
    let cleartime;
    if (run === "pause" && isonbreak) {
      console.log("run break");
      cleartime = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          
          setTime(sessionTimer * 60);
          setisonbreak(0);
          return 0;
        });
      }, speed);
    } else if (run === "pause" && isonbreak === 0) {
      console.log('run session')
      cleartime = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          }

          setTime(breaktime);
          if (breakTimer !== 0) setisonbreak(1);
          return 0;
        });
      }, speed);
    }
    return () => clearInterval(cleartime);
  }, [run, isonbreak]);

  const addtimeinTimer = () => {
    setsessionTimer((prev) => prev + 1);
  };
  const subtracttimeinTimer = () => {
    setsessionTimer((prev) => prev - 1);
  };

  const addtimeinBreak = () => {
    setbreakTimer((prev) => prev + 1);
  };
  const subtracttimeinBreak = () => {
    setbreakTimer((prev) => prev - 1);
  };

  return (
    <>
      <main className="setting-box w-full">
        <h1 className="text-black">Pomodoro Timer</h1>
        <div className="bg-redwood w-full setting-box gap-5">
          {/* session time */}
          <h2>{isonbreak ? 'Breaking' : 'Session'}</h2>
          <h2>{changeNumtoTime(time)}</h2>
          <div className="w-[200px] flex justify-between">
            <button
              className="btn"
              onClick={() => {
                setRun((prev) => (prev === "start" ? "pause" : "start"));
              }}
            >
              {run}
            </button>
            <button
              onClick={() => {
                setTime(sessionTimer * 60);
                setRun((prev) => (prev === "start" ? "pause" : "start"));
                setisonbreak(0);
              }}
              className="btn"
            >
              reset
            </button>
          </div>
          {/* session timer */}
          <div className="w-4/5 flex justify-between ">
            <div className="felx flex-col">
              {" "}
              <p className="text-center">Session timer</p>
              <h2 className="text-center">{sessionTimer}</h2>
              <div className="flex justify-between">
                <button
                  onClick={subtracttimeinTimer}
                  disabled={sessionTimer <= 0 || run === "pause"}
                  className="rounded-btn"
                >
                  -
                </button>
                <button
                  onClick={addtimeinTimer}
                  disabled={run === "pause"}
                  className="rounded-btn"
                >
                  +
                </button>
              </div>
            </div>
            {/* break timer */}
            <div className="flex flex-col">
              {" "}
              <p className="text-center">Break timer</p>
              <h2 className="text-center">{breakTimer}</h2>
              <div className="flex justify-between">
                <button
                  onClick={subtracttimeinBreak}
                  disabled={breakTimer <= 0 || run === "pause"}
                  className="rounded-btn"
                >
                  -
                </button>
                <button
                  onClick={addtimeinBreak}
                  disabled={run === "pause"}
                  className="rounded-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
