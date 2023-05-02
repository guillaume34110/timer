import { useRef, useState } from "react";
import "./Home.css";
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

let repTimerBuffer = 0;
let setTimerBuffer = 0;
let recoveryTimerBuffer = 0;
let repsTimerBuffer = 0;
let setsTimerBuffer = 0;
let howMuchSteps = 0;
let exercises = 0;
let sets = 0;
let reps = 0;
let effortTime = 0;
let recoveryTime = 0;
let restFlag = false

const Home: React.FC = () => {
  const [isOnPlay, setIsOnPlay] = useState(false);
  const [isOnRest, setIsOnRest] = useState(false);

  const [repTimer, setRepTimer] = useState(0);
  const [setsTimer, setSetsTimer] = useState(0);
  const [exerciceTimer, setExerciceTimer] = useState(0);
  const [recoveryTimer, setRecoveryTimer] = useState(0);

  const effortTimeMin = useRef<HTMLIonInputElement | null>(null);
  const effortTimeSec = useRef<HTMLIonInputElement | null>(null);
  const recoveryTimeMin = useRef<HTMLIonInputElement | null>(null);
  const recoveryTimeSec = useRef<HTMLIonInputElement | null>(null);
  const repsInput = useRef<HTMLIonInputElement | null>(null);
  const setsInput = useRef<HTMLIonInputElement | null>(null);
  const exercisesInput = useRef<HTMLIonInputElement | null>(null);

  const play = () => {
    if (
      effortTimeMin.current === null ||
      effortTimeSec.current === null ||
      recoveryTimeMin.current === null ||
      recoveryTimeSec.current === null ||
      repsInput.current === null ||
      setsInput.current === null ||
      exercisesInput.current === null
    )
      return;
    if (
      typeof effortTimeMin.current.value !== "string" ||
      typeof effortTimeSec.current.value !== "string" ||
      typeof recoveryTimeMin.current.value !== "string" ||
      typeof recoveryTimeSec.current.value !== "string" ||
      typeof repsInput.current.value !== "string" ||
      typeof setsInput.current.value !== "string" ||
      typeof exercisesInput.current.value !== "string"
    )
      return;

    effortTime =
      (parseInt(effortTimeMin.current.value) * 60 +
        parseInt(effortTimeSec.current.value)) *
      1000;
    recoveryTime =
      (parseInt(recoveryTimeMin.current.value) * 60 +
        parseInt(recoveryTimeSec.current.value)) *
      1000;
    reps = parseInt(repsInput.current.value);
    sets = parseInt(setsInput.current.value);
    exercises = parseInt(exercisesInput.current.value);
    setIsOnPlay(true);
    timeLoop();
  };

  const timeLoop = () => {
    const intervalId = setInterval(() => {
      if (howMuchSteps < sets) {
        if (!restFlag) {
          repTimerBuffer =
            repTimerBuffer + 100 < effortTime / reps ? repTimerBuffer + 100 : 0;
          setTimerBuffer =
            setTimerBuffer + 100 < effortTime ? setTimerBuffer + 100 : 0;
          setRepTimer(() => repTimerBuffer / 1000);
          setSetsTimer(() => setTimerBuffer / 1000);

          if (setTimerBuffer === 0) {
           setIsOnRest(true);
           restFlag=true
          }
        } else{
          if (recoveryTimerBuffer + 100 < recoveryTime) {
            recoveryTimerBuffer = recoveryTimerBuffer + 100;
            setRecoveryTimer(recoveryTimerBuffer / 1000);
          } else {
            recoveryTimerBuffer = 0;
            setRecoveryTimer(recoveryTimerBuffer);
            setIsOnRest(false);
            restFlag= false
            howMuchSteps++
          }
        }
      } else {
        console.log("finish");
      }
    }, 100);

    // Clear the interval when necessary
    //clearInterval(intervalId);
  };

  const pause = () => {};

  const stop = () => {
    setIsOnPlay(false);
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="main">
          {!isOnPlay ? (
            <div>
              <div>
                PresetsInput
                <div className="timer-card">
                  effort time
                  <div className="input-container">
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="0"
                        maxlength={2}
                        ref={effortTimeMin}
                      ></IonInput>
                    </div>
                    m
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="1"
                        maxlength={2}
                        ref={effortTimeSec}
                      ></IonInput>
                    </div>
                    s
                  </div>
                </div>
                <div className="timer-card">
                  recovery time
                  <div className="input-container">
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="0"
                        maxlength={2}
                        ref={recoveryTimeMin}
                      ></IonInput>
                    </div>
                    m
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="1"
                        maxlength={2}
                        ref={recoveryTimeSec}
                      ></IonInput>
                    </div>
                    s
                  </div>
                </div>
                <div className="inline-cards">
                  <div className="timer-card half">
                    <div className="input-container">
                      <div className="ion-input-content">
                        <IonInput
                          className="small-input"
                          value="10"
                          maxlength={2}
                          ref={repsInput}
                        ></IonInput>
                      </div>
                      reps
                    </div>
                  </div>
                  <div className="timer-card half">
                    <div className="input-container">
                      <div className="ion-input-content">
                        <IonInput
                          className="small-input"
                          value="4"
                          maxlength={2}
                          ref={setsInput}
                        ></IonInput>
                      </div>
                      sets
                    </div>
                  </div>
                </div>
                <div className="timer-card">
                  <div className="input-container">
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="5"
                        maxlength={2}
                        ref={exercisesInput}
                      ></IonInput>
                    </div>
                    exercises
                  </div>
                </div>
              </div>
              <div className="play-btn btn" onClick={play}>
                play
              </div>
            </div>
          ) : (
            <div>
              <div className="pause-btn btn" onClick={pause}>
                pause
              </div>
              <div className="stop-btn btn" onClick={stop}>
                stop
              </div>
              {!isOnRest ? (
                <div>
                  <div>tempo{repTimer}</div>
                  <div>serie{setsTimer}</div>
                </div>
              ) : (
                <div>
                  <div>rest{recoveryTimer}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
