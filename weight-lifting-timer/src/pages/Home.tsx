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

const Home: React.FC = () => {
  const [isOnPlay, setIsOnPlay] = useState(false);
  const [isOnRest, setIsOnRest] = useState(true);
  const [effortTime, setEffortTime] = useState(0);
  const [recoveryTime, setRecoveryTime] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [exercises, setExercises] = useState(0);

  const [repTimer, setRepTimer] = useState(0);
  const [setsTimer, setSetsTimer] = useState(0);
  const [exerciceTimer, setExerciceTimer] = useState(0);
  const [recoveryTimer , setRecoveryTimer] = useState(0);


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
    ) return;
    if (
      typeof effortTimeMin.current.value !== "number" ||
      typeof effortTimeSec.current.value !== "number" ||
      typeof recoveryTimeMin.current.value !== "number" ||
      typeof recoveryTimeSec.current.value !== "number" ||
      typeof repsInput.current.value !== "number" ||
      typeof setsInput.current.value !== "number" ||
      typeof exercisesInput.current.value !== "number" 
    ) return;
    const effortTimeCalc =
      (effortTimeMin.current.value * 60 + effortTimeSec.current.value) *1000;
    const restTimeCalc = (recoveryTimeMin.current.value * 60 + recoveryTimeMin.current.value)*1000
    setEffortTime(effortTimeCalc)
    setRecoveryTime(restTimeCalc)
    setReps(repsInput.current.value)
    setSets(setsInput.current.value)
    setExercises(exercisesInput.current.value)
    setIsOnPlay(true);
    timeLoop()
  };

  const timeLoop = () => {
    setInterval(() => {
      if (!isOnRest){
      setRepTimer(repTimer + 10 < exerciceTimer/reps ? repTimer +10 : 0)
      setSetsTimer(setsTimer + 10 < exerciceTimer ? setsTimer +10 : 0)

      if (setsTimer + 10 < exerciceTimer){
        setIsOnRest(true)
      }
      if(isOnRest) {
        recoveryTimer +10 < recoveryTime ?
        setRecoveryTimer(  recoveryTimer +10)
        : () => {
          setRecoveryTimer(  recoveryTimer +10)
          setIsOnRest(false)
        } 
      
      }

    }, 10);
  }

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
                        value="1"
                        maxlength={2}
                        ref={effortTimeMin}
                        type="number"
                      ></IonInput>
                    </div>
                    m
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="30"
                        maxlength={2}
                        type="number"
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
                        value="1"
                        maxlength={2}
                        ref={recoveryTimeMin}
                        type="number"
                      ></IonInput>
                    </div>
                    m
                    <div className="ion-input-content">
                      <IonInput
                        className="small-input"
                        value="30"
                        maxlength={2}
                        type="number"
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
                          type="number"
                        ></IonInput>
                      </div>
                      repsInput
                    </div>
                  </div>
                  <div className="timer-card half">
                    <div className="input-container">
                      <div className="ion-input-content">
                        <IonInput
                          className="small-input"
                          value="4"
                          maxlength={2}
                          type="number"
                          ref={setsInput}
                        ></IonInput>
                      </div>
                      setsInput
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
