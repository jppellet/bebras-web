#!/usr/bin/env ts-node --env-file=app/tools/env

import OpenAI from "openai"


const context = {
    fra: {
        system: "Tu es un assistant de recherche pour le traitement de tâches pour un concours d'informatique.",
        user: "Voici une tâche d'un concours d'informatique. Ecris une phrase très courte qui décrit cette tâche et qui puisse servir de description dans une liste, dans un task browser par exemple."
    },
    deu: {
        system: "Du bist ein Suchassistent für die Verarbeitung von Aufgaben für einen Informatikwettbewerb.",
        user: "Hier ist eine Aufgabe eines Informatikwettbewerbs. Schreibe einen sehr kurzen Satz, der diese Aufgabe beschreibt und als Beschreibung in einer Liste, z.B. in einem Task-Browser, verwendet werden kann."
    },
    ita: {
        system: "Sei un assistente di ricerca per l'elaborazione di compiti per una competizione di informatica.",
        user: "Ecco un compito di una competizione di informatica. Scrivi una frase molto breve che descrive questo compito e che può essere utilizzata come descrizione in un elenco, ad esempio in un browser di compiti."
    }
}

const lang = "fra"
const taskText = "Une abeille met 10 minutes pour voler d’une case vers le haut, le bas, la gauche ou la droite. Après être partie de la ruche hive, elle vole pendant 30 minutes au maximum avant de revenir en arrière. Entoure les fleurs qui peuvent être atteintes en 30 minutes au maximum depuis la ruche.";

const apiKey = process.env.OPENAI_API_KEY;

console.log(apiKey);

(async function () {

    const openai = new OpenAI({ apiKey })

    // ref: https://platform.openai.com/docs/quickstart
    // check activity: https://platform.openai.com/usage/activity

    const contextText = context[lang]

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: contextText.system },
            {
                role: "user",
                content: contextText.user + "\n\n" + taskText
            },
        ],
    })

    console.log(completion.choices[0].message)

})()

