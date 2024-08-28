"use client"

import { NonEmptyDifficulty } from "bebras/out/util"

interface TaskLevelProps {
  age: string
  difficulty: NonEmptyDifficulty
}

export default function TaskLevel({ age, difficulty }: TaskLevelProps) {
  let color: string
  if (difficulty === "easy") {
    color = "bg-green-100"
  } else if (difficulty === "medium") {
    color = "bg-yellow-100"
  } else if (difficulty === "hard") {
    color = "bg-red-100"
  } else {
    color = "bg-gray-100"
  }

  return (
    <span
      className={`
       inline-block
        whitespace-nowrap
        font-light text-cod-gray-800
        text-sm
        border-cyan-600
        rounded-lg  
        m-1
        p-1
        text-center 
        align-baseline
        leading-none
        ${color}`}
    >
      <h4>
        {age}: {difficulty}
      </h4>
    </span>
  )
}
