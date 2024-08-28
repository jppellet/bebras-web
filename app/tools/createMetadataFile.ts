import fs from "fs-extra"
import path from "path"
import { getTasksDirNames, parseTaskMetadata } from "./utils"


// Path to tasks dataset
export const tasksDatasetPath: string = path.join(
  __dirname,
  "../../tasks_dataset/"
)

export const dataFilePath: string = path.join(__dirname, "data.ts");


(async function () {

  const metadataStrs: string[] = []

  const taskDirs = getTasksDirNames(tasksDatasetPath)
  for (const dir of taskDirs) {
    const taskMetadata = await parseTaskMetadata(dir)
    const jsonStr = JSON.stringify(taskMetadata, null, 2)
    metadataStrs.push(`${jsonStr}`)
  }

  const contenuFichier = `\
// Ce fichier a été généré automatiquement

import { TaskMetadata } from "bebras/out/util"

export const data: TaskMetadata[] = [${metadataStrs.join(", ")}];
`

  await fs.writeFile(dataFilePath, contenuFichier, (err) => {
    if (err) {
      console.error("Une erreur est survenue :", err)
    } else {
      console.log("Le fichier data.ts a été généré avec succès.")
    }
  })

})()
