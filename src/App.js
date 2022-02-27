import { useState } from "react"
import { initialWorkouts, generateWorkout } from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    console.log("addNewWorkout:", newWorkout)
    setWorkouts((workouts) => {
      return [...workouts, newWorkout]
    })
  }

  const getDoneWorkouts = () => {
    const workoutList = [...workouts]
    const doneWorkouts = workoutList.filter(workoutD => workoutD.done === true)
    setWorkouts(doneWorkouts)
  }

  const deleteWorkout = (workout) => {
    console.log("deleteWorkout:", workout)
    const workoutList = [...workouts]
    for (let i = 0; i < workoutList.length; i++) {
      if (workoutList[i] === workout) {
        workoutList.splice(i, 1)
      }
    }
    setWorkouts(workoutList)
  }

  const completeWorkout = (workout) => {
    console.log("completeWorkout:", workout)
    const workoutList = [...workouts]
    const completedWorkout = workoutList.find(
      (workoutC) => workoutC === workout
    )
    completedWorkout.done = !completedWorkout.done
    setWorkouts(workoutList)
  }

  const changeWorkout = (workout) => {
    const workoutList = [...workouts]
    const newWorkout = generateWorkout()
    console.log(workout)
    console.log(newWorkout)
    for(let i=0; i<workoutList.length; i++) {
      if (workoutList[i] === workout) {
        workoutList.splice(i, 1, newWorkout)
      }
    }
    setWorkouts(workoutList)
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <button onClick={getDoneWorkouts}>Show Done Only</button>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <p>
              {workout.sets}x sets of{" "}
              <strong>
                {workout.reps}x{workout.exercise}
              </strong>{" "}
              with {workout.rest} seconds rest
            </p>
            {!workout.done && (
              <button onClick={(e) => completeWorkout(workout)}>Done</button>
            )}
            {workout.done && <p>✅</p>}
            <button onClick={(e) => deleteWorkout(workout)}>Delete</button>
            <button onClick={(e) => changeWorkout(workout)}>Change Workout</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
