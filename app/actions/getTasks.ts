import { SortTasksOptions } from "@/app/components/Utils"
import { data } from "@/app/tools/data"
import { DifficultyLevels, TaskMetadata } from "bebras/out/util"
import sortBy from "sort-by"

export interface ISearchParams {
  age: string
  year: string
  category: string
  subcategory: string
  sort: string
  search: string
}

/**
 * Get tasks from data file based on given filters
 */
export default function getTasks({
  age,
  year,
  category,
  subcategory,
  sort = SortTasksOptions[0].key,
  search,
}: ISearchParams): TaskMetadata[] {
  // All tasks
  let tasks: TaskMetadata[] = data

  // Filter tasks by age
  if (age) {
    tasks = tasks.filter((task) => {
      return TaskMetadata.difficultyForAge(age, task) !== undefined
    })
  }

  // Filter tasks by age
  if (year) {
    const yearInt = parseInt(year)
    tasks = tasks.filter((task) => {
      return (TaskMetadata.parseId(task.id)?.year ?? 0) === yearInt
    })
  }

  // Filter tasks by category and subcategory
  if (category) {
    tasks = tasks.filter((task) => {
      const matching = task.categories.find(
        (cat) => cat.name === category
      )

      if (!matching) {
        return false
      }

      if (subcategory) {
        const subCat = matching.subs.find((sub) => sub.name === subcategory)
        return !!subCat
      }

      return true
    })
  }

  // Filter tasks using the search bar
  if (search) {
    const searchText = search.toLowerCase().trim()
    tasks = tasks.filter((task) => {
      const taskString = `${task.title} ${task.keywords.join(" ")}`
      return taskString.toLowerCase().includes(searchText)
    })
  }

  // Sort tasks
  if (sort == SortTasksOptions[2].key) {
    // Sort tasks by age level
    tasks.sort((a, b) => {
      const catA = TaskMetadata.difficultyForAge(age, a)
      const catB = TaskMetadata.difficultyForAge(age, b)

      if (catA && catB) {
        const levelA = DifficultyLevels[catA]
        const levelB = DifficultyLevels[catB]
        return levelA > levelB ? 1 : -1
      } else {
        return 1
      }
    })
  } else if (sort == SortTasksOptions[3].key) {
    // Sort tasks by age level
    tasks.sort((a, b) => {
      const catA = TaskMetadata.difficultyForAge(age, a)
      const catB = TaskMetadata.difficultyForAge(age, b)

      if (catA && catB) {
        const levelA = DifficultyLevels[catA]
        const levelB = DifficultyLevels[catB]
        return levelA < levelB ? 1 : -1
      } else {
        return 1
      }
    })
  } else {
    tasks.sort(sortBy(sort))
  }

  return tasks
}
