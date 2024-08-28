import { CategoryName } from "bebras/out/patterns"
import { AgeCategory } from "bebras/out/util"
import getConfig from "next/config"

export function getBasePath() {
    const basePath = getConfig()?.publicRuntimeConfig?.basePath ?? ""
    return String(basePath)
}

export type UILang = "fr" | "en"

export type Translations = { [L in UILang]: string }

export const CategoryCaptions: Record<string, Translations> = {

    // age
    "age": { en: "Age (years)", fr: "Âges (ans)" },
    "6-8": { en: "6-8", fr: "6-8" },
    "8-10": { en: "8-10", fr: "8-10" },
    "10-12": { en: "10-12", fr: "10-12" },
    "12-14": { en: "12-14", fr: "12-14" },
    "14-16": { en: "14-16", fr: "14-16" },
    "16-19": { en: "16-19", fr: "16-19" },


    // main
    "algorithms and programming": { en: "Algorithms and Programming", fr: "Algorithmes et programmation" },
    // subs
    "graph theory": { en: "Graph Theory", fr: "Théorie des graphes" },
    "recursion": { en: "Recursion", fr: "Récursivité" },
    "brute force": { en: "Brute Force", fr: "Force brute" },
    "sorting and searching": { en: "Sorting and Searching", fr: "Tri et recherche" },
    "optimization": { en: "Optimization", fr: "Optimisation" },
    "binary and logic": { en: "Binary and Logic", fr: "Binaire et logique" },
    "sequential execution": { en: "Sequential Execution", fr: "Exécution séquentielle" },
    "variables": { en: "Variables", fr: "Variables" },
    "control structures": { en: "Control Structures", fr: "Structures de contrôle" },

    // main
    "data structures and representations": { en: "Data Structures and Representations", fr: "Structures et représentations de données" },
    // subs
    "data encoding": { en: "Data Encoding", fr: "Encodage de l’information" },
    "security": { en: "Protection and Security", fr: "Protection et sécurité" },
    "storage and collection": { en: "Storage and Collection", fr: "Stockage et collecte" },
    "visualization": { en: "Data Visualization", fr: "Visualisation de l’information" },

    // main
    "computer processes and hardware": { en: "Computer Processes and Hardware", fr: "Processus et matériel informatiques" },

    // main
    "communication and networking": { en: "Communication and Networking", fr: "Communication et réseau" },

    // main
    "interactions, systems and society": { en: "Interactions, Systems and Society", fr: "Interactions, système et société" },

    // generic sub
    "other": { en: "Other", fr: "Autre" },

} satisfies { [C in (CategoryName | "age" | AgeCategory)]: Translations }



export const SortTasksOptions: { key: string, caption: Translations }[] = [
    {
        key: "title",
        caption: { en: "A -> Z", fr: "A -> Z" },
    },
    {
        key: "taskId",
        caption: { en: "By Year", fr: "Par année" },
    },
    {
        key: "diff",
        caption: { en: "By Difficulty ↓", fr: "Par difficulté ↓" },
    },
    {
        key: "diffdown",
        caption: { en: "By Difficulty ↑", fr: "Par difficulté ↑" },
    },
];


