import { convert_html, convert_tex } from "bebras"
import { readFileStrippingBom } from "bebras/out/fsutil"
import path from "path"

export async function getTaskHtml(taskFilePath: string) {
  const t_text = await readFileStrippingBom(taskFilePath)
  const [htmContent, _] = convert_html.renderMarkdown(
    t_text,
    taskFilePath,
    path.dirname(taskFilePath),
    true,
    "fra"
  )
  return htmContent
}


export async function getTaskTex(taskFilePath: string) {
  const textMd = await readFileStrippingBom(taskFilePath)
  const langCode = "fra"
  const [tokens, metadata] = convert_html.parseMarkdown(
    textMd,
    taskFilePath,
    path.dirname(taskFilePath),
    {
      langCode,
      // we use ⍀ to avoid escaping \ to \\, and we later convert it back to \
      customQuotes: ["⍀enquote⦃", "⦄", "⍀enquote⦃", "⦄"],
    }
  )
  const linealizedTokens = tokens.flatMap((t) => {
    if (t.type === "inline") {
      return t.children ?? []
    } else {
      return [t]
    }
  })

  const texDataStandalone = convert_tex.renderTex(
    linealizedTokens,
    langCode,
    metadata,
    taskFilePath,
    true
  )

  return texDataStandalone
}
