import { useEffect, useRef, useState } from "react"
import "./Home.css"
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import repHit from "../assets/mixkit-forceful-impact-item-3174-[AudioTrimmer.com].wav"
import setEnd from "../assets/mixkit-achievement-bell-600.wav"
import restTimeEnd from  "../assets/mixkit-notification-bike-bell-594.wav"
import exerciceEnd from '../assets/mixkit-game-flute-bonus-2313.wav'

let repHitAudio = new Audio(repHit)
let setEndAudio = new Audio(setEnd)
let restTimeEndAudio = new Audio(restTimeEnd)
let exerciceEndAudio = new Audio(exerciceEnd)
let repTimerBuffer = 10
let setTimerBuffer = 10
let recoveryTimerBuffer = 10
let repsTimerBuffer = 0
let setsTimerBuffer = 0
let howMuchSteps = 0
let exercises = 0
let sets = 0
let reps = 0
let effortTime = 0
let recoveryTime = 0
let restFlag = false
let isOnplayBuffer = false

const Home: React.FC = () => {
  const [isOnPlay, setIsOnPlay] = useState(false)
  const [isOnRest, setIsOnRest] = useState(false)
const [isEnded , setIsEnded] = useState(false)

  const [repTimer, setRepTimer] = useState(0)
  const [setsTimer, setSetsTimer] = useState(0)
  const [exerciceTimer, setExerciceTimer] = useState(0)
  const [recoveryTimer, setRecoveryTimer] = useState(0)

  const effortTimeMin = useRef<HTMLIonInputElement | null>(null)
  const effortTimeSec = useRef<HTMLIonInputElement | null>(null)
  const recoveryTimeMin = useRef<HTMLIonInputElement | null>(null)
  const recoveryTimeSec = useRef<HTMLIonInputElement | null>(null)
  const repsInput = useRef<HTMLIonInputElement | null>(null)
  const setsInput = useRef<HTMLIonInputElement | null>(null)
  const exercisesInput = useRef<HTMLIonInputElement | null>(null)
  const fillableRepTimer = useRef<HTMLDivElement | null>(null)
  const fillableSetsTimer = useRef<HTMLDivElement | null>(null)
  const fillableRecoveryTimer = useRef<HTMLDivElement | null>(null)

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
      1000
    recoveryTime =
      (parseInt(recoveryTimeMin.current.value) * 60 +
        parseInt(recoveryTimeSec.current.value)) *
      1000
    reps = parseInt(repsInput.current.value)
    sets = parseInt(setsInput.current.value)
    exercises = parseInt(exercisesInput.current.value)
    setIsEnded(false)
    setIsOnPlay(true);
    isOnplayBuffer= true
    repTimerBuffer = 10
setTimerBuffer = 10
 recoveryTimerBuffer = 10
  howMuchSteps = 0

    timeLoop();
  };

  const timeLoop = () => {

    const intervalId = setInterval(() => {
      if (!isOnplayBuffer) clearInterval(intervalId)
      if (howMuchSteps < sets ) {
        if (!restFlag) {
          repTimerBuffer =
            repTimerBuffer < effortTime / reps ? repTimerBuffer + 10 : 10

          setTimerBuffer =
            setTimerBuffer < effortTime ? setTimerBuffer + 10 : 10

          setRepTimer(() => repTimerBuffer / 1000)
          setSetsTimer(() => setTimerBuffer / 1000)
          repTimerBuffer === 10 && setTimerBuffer !== 10
            ? repHitAudio.play()
            : null;
          if (setTimerBuffer === 10 && howMuchSteps < sets -1) {
            setIsOnRest(true)
             setEndAudio.play()
            restFlag = true
          }else if (setTimerBuffer === 10 && howMuchSteps === sets -1){
            howMuchSteps++
          }
        } else {
          if (recoveryTimerBuffer < recoveryTime) {
            recoveryTimerBuffer = recoveryTimerBuffer + 10
            setRecoveryTimer(recoveryTimerBuffer / 1000)
          } else {
            restTimeEndAudio.play()
            recoveryTimerBuffer = 10
            setRecoveryTimer(recoveryTimerBuffer)
            setIsOnRest(false)
            restFlag = false
            howMuchSteps++
          }
        }
      } else {
        console.log("finish")
        exerciceEndAudio.play()
        setIsEnded(true)
        setIsOnPlay(false)
        clearInterval(intervalId)
      }
    }, 10);

    // Clear the interval when necessary
    //clearInterval(intervalId);
  };

  const pause = () => {};

  const stop = () => {
    isOnplayBuffer = false
    setIsOnPlay(false);
  };

  useEffect(() => {
    if (fillableRepTimer.current === null) return;
    repTimer >= 0
      ? (fillableRepTimer.current.style.width = `${
          (repTimer * 100000) / (effortTime / reps)
        }%`)
      : (fillableRepTimer.current.style.width = `0%`)
  }, [repTimer]);
  useEffect(() => {
    if (fillableSetsTimer.current === null) return;
    setsTimer >= 0
      ? (fillableSetsTimer.current.style.width = `${
          (setsTimer * 100000) / effortTime
        }%`)
      : (fillableSetsTimer.current.style.width = `0%`)
  }, [setsTimer]);
  useEffect(() => {
    if (fillableRecoveryTimer.current === null) return
    recoveryTimer >= 0
      ? (fillableRecoveryTimer.current.style.width = `${
          (recoveryTimer * 100000) / recoveryTime
        }%`)
      : (fillableRecoveryTimer.current.style.width = `0%`)
  }, [recoveryTimer])

  return (
    <IonPage>
      <IonContent fullscreen>
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
                        value="5"
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
                        value="3"
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
                          value="5"
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
              </div>{ !isEnded ?
              !isOnRest  ? (
                <div>
                  <div className="fillable-timer">
                    <div className="timer-fill" ref={fillableRepTimer}></div>
                    <div className="timer-text">tempo{repTimer}</div>
                  </div>
                  <div className="fillable-timer">
                    <div className="timer-fill" ref={fillableSetsTimer}></div>
                    <div className="timer-text">serie{setsTimer}</div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="fillable-timer">
                    <div
                      className="timer-fill"
                      ref={fillableRecoveryTimer}
                    ></div>
                    <div className="timer-text">rest{recoveryTimer}</div>
                  </div>
                </div>
              ): null}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Home
