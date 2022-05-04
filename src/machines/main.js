import { createMachine, assign } from "xstate";
async function myFetch(url) {
  console.log("fetching from", url);
  const response = await fetch(url);
  const json = await response.json();
  return response.ok ? json : Promise.reject(json);
}
export const jeopardyMachine = createMachine(
  {
    id: "jeopardy",
    initial: "idle",
    context: {
      players: [],
      currentPlayer: null,
      quiz: null,
    },
    states: {
      idle: {
        on: { PLAYERS_CHOSEN: "chooseQuiz" },
      },
      chooseQuiz: {
        entry: ["setPlayers"], //assign({ count: (ctx) => ctx.count + 1 })
        on: { SEARCH: "search" },
      },
      search: {
        invoke: {
          src: (ctx, evt) => myFetch(`quizzes/${evt.filename}.json`),
          onDone: "quizFound",
          onError: "quiz404",
        },
      },
      quizFound: {
        entry: "setQuiz",
      },
      quiz404: {},
    },
  },
  {
    guards: {},
    actions: {
      setPlayers: assign({
        players: (ctx, evt) => {
          console.log(evt);
          return evt.players.map((player) => ({ player, score: 0 }));
        },
      }),
      setQuiz: assign({
        quiz: (ctx, evt) => {
          return evt.data;
        },
        currentPlayer: (ctx) => Math.floor(Math.random() * ctx.players.length),
      }),
    },
    activities: {},
    services: {},
  }
);
