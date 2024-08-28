import fs from "fs-extra"
import path from "path"
import { findDuplicates, findFilesByExtension } from "./utils"

// Path to tasks dataset
export const tasksDatasetPath: string = path.join(
  __dirname,
  "../../tasks_dataset/"
)

// Path to the public directory
export const publicDirPath: string = path.join(__dirname, "../../public/tasks")

export function copyAllGraphics(datasetPath: string, destPath: string) {
  const graphics: string[] = findFilesByExtension(datasetPath, ".svg")
  let ignored: number = 0
  let copied: number = 0

  const dupeSeries = findDuplicates(graphics, path.basename)
  if (dupeSeries.length > 0) {
    console.warn("Il existe plusieurs images ayant le même nom")
    for (const dupes of dupeSeries) {
      console.warn(`For base name ${path.basename(dupes[0])}:`)
      for (const dup of dupes) {
        console.warn(`  ${dup.substring(datasetPath.length)}`)
      }
    }
  }

  graphics.forEach((filePath) => {
    const fileName: string = path.basename(filePath)
    const dirName: string = path.basename(path.dirname(filePath))
    const dest: string = path.join(destPath, dirName, fileName)

    try {
      fs.copyFileSync(filePath, dest)
      copied++
    } catch (error) {
      ignored++
    }
  })

  console.log(
    `${copied} fichiers (${ignored} ignorés) ont été copiés vers ${destPath} .\n`
  )
}

console.log("\nDébut de la copie des images dans /public/...")
copyAllGraphics(tasksDatasetPath, publicDirPath)
