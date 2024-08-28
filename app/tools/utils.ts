import { check, reportDiagnostics } from "bebras/out/check"
import { parseTaskMd } from "bebras/out/convert_html"
import { readFileStrippingBom } from "bebras/out/fsutil"
import { TaskMetadata, isArray } from "bebras/out/util"
import * as fs from "fs"
import * as path from "path"

/**
 * Returns the names of all directories containing tasks
 * @warning The metadata must be in the correct format
 * (only two occurrences of "---")
 * @param datasetPath
 * @returns
 */
export function getTasksDirNames(datasetPath: string): string[] {
  return fs
    .readdirSync(datasetPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
    .filter((name) => name.startsWith("20"))
}

/**
 * Parses the task's metadata matching prisma schema
 * @param taskDirName
 * @param taskLanguage
 * @returns
 */
export async function parseTaskMetadata(
  taskDirName: string,
  taskLanguage = "fra"
): Promise<TaskMetadata> {

  // Get task info in task directory name
  const taskId = taskDirName.split("_")[0] + "-" + taskLanguage
  const taskDirPath = path.join("tasks_dataset", taskDirName)
  const taskFile = path.join(taskDirPath, taskId + ".task.md")

  // Load task
  const mdText = await readFileStrippingBom(taskFile)

  // Run the checker
  const diags = (await check(mdText, taskFile, true, "latest"))
    .filter(diag => diag.type === "error")

  // Parse the task to get the metadata
  const [_tokens, metadata, _langCode] = await parseTaskMd(mdText, taskFile)

  if (diags.length > 0) {
    console.log(`Errors in ${taskFile}:`)
    reportDiagnostics(diags, mdText, taskFile, console.log)
  }

  function clearTODOFor<F extends keyof TaskMetadata, T extends TaskMetadata[F]>(field: F, fallback: T) {
    const val = metadata[field]
    if (val == "TODO" || isArray(val) && val[0] == "TODO") {
      metadata[field] = fallback
    }
  }

  clearTODOFor("summary", undefined)
  clearTODOFor("preview", undefined)
  clearTODOFor("keywords", [])

  return metadata
}

/**
 * Recursive function which finds all files of a given extension in a dir
 */
export function findFilesByExtension(
  dirPath: string,
  extension: string,
  files: string[] = [],
  res: string[] = [],
  regex: RegExp | undefined = undefined
) {
  files = files.length === 0 ? fs.readdirSync(dirPath) : files
  regex = regex || new RegExp(`\\${extension}$`)

  for (let i = 0; i < files.length; i++) {
    const file = path.join(dirPath, files[i])
    if (fs.statSync(file).isDirectory() && !path.extname(file)) {
      try {
        res = findFilesByExtension(
          file,
          extension,
          fs.readdirSync(file),
          res,
          regex
        )
      } catch (error) {
        continue
      }
    } else {
      if (regex.test(file)) {
        res.push(file)
      }
    }
  }
  return res
}

export function findDuplicates<T>(arr: T[], id: (t: T) => string): T[][] {
  const indexed = new Map<string, T[]>()

  for (const item of arr) {
    const key = id(item)
    if (!indexed.has(key)) {
      indexed.set(key, [])
    }
    indexed.get(key)!.push(item)
  }

  const duplicates: T[][] = []
  for (const items of indexed.values()) {
    if (items.length > 1) {
      duplicates.push(items)
    }
  }

  return duplicates
}
