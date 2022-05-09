import { createMachine, assign } from "xstate";
import uniqid from "uniqid";
import clone from "just-clone";
async function myFetch(url) {
  const response = await fetch(url);
  const json = await response.json();
  return response.ok ? json : Promise.reject(json);
}

const contextProd = {
  players: [],
  currentPlayer: null,
  quiz: null,
  formPlayerName: "",
  formQuizName: "",
  activeQuestion: null,
  pool: 0,
};
const contextDev = {
  players: [
    { player: "Jonas", score: 0 },
    { player: "Dannie", score: 0 },
  ],
  currentPlayer: null,
  quiz: null,
  formPlayerName: "",
  formQuizName: "beginner-js",
  activeQuestion: null,
  pool: 0,
};
const initialDev = "search";
const initialProd = "players";
const MODE = "prod";
export const jeopardyMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCswHsAOBDAThAngHQCWEANmIQO5ZkDWAxAAoCiAIgPoDCA8gKoA5ACpseAdQGJQGNLGIAXYmgB2UkAA9EAJgCMAVkIBmACzGAnGYAchgAw3LOnYYDsAGhD5thrUcuXnes5aZoYAbDahZs4AvtHuqJi4BCTklDQKzOzc-MKiEmoycooqapoIelqGhDpaWoHGNg1mOmZa7p4IlT6GfgFBIeGRMXEgCdh4RKQUzAAyAIIAmiwASgDK3AASPKsskkgghQpKqvtllqGhhHpRoXoRrc7noe3axt29xo6NkY5asfHocbJKZgBiwACuACMALYKAqyI4lU6IfyXa7OW73LSPC4vBD6Hw2KxmYwYypOMw2PT-UaApKTVIMADGAAssMoYPCisdSiiLlcbndItinnjDM1CGYLqYTDZnC1ajSxvTCBCYRkuYiTqAzvz0ZjhTjnh5EDpGtVvEFzHo3qEAmYlXSJoRWeyYAxNcVtRoURiBRihQ9RSaECZjIQ7DZanKet4ItSRsrnay0LIwABFcHEABeDB2c2WXA2np5yPxdSqVhsLRJg0MeK0b18-k+ZuMPxqjsSztgYFwrIYEBUlGIygAbmg6JQk8le-2WQhRxOmVgvQBtGwAXRLSJ1ppt4csNnFziCNUeDjFWhs1UselCOlCjYsdksXaBRDnOAHYBwODQOCEBgZCrgAZgB0KEDOn59t+C5LmgK7rluO7emU+imIQR4nmeIqXiGtQGM4hiGE4YRaOElhdLEIzKGgEBwGo0EpBQ1C0HQqG8ggZgGFKjahFRGKPM0egNhRvhPoEdh2lY2LviqIJsXC+yHF6XENOG141D8xGWpYYmXD0knONJziycMALdsCqSqvImCcWW8o6JKF6mM0JiGHookEeJRl1CZERmYJ8nOopkJkKOdCjlADl7ggQQNjxRiBHo2nYo4lgOomTrWRQsU+ggxj6SG+hVJ85iRK+oTGNchghbOUKwvI+VlFEziEM4RWUlYpjBHUeKUi5NReU+x7Xrc9VEK6HJgC1iBtVhPEKn4R6kmYYq2FhPTEVKtgPnak0uiyqa9pmOZzfiVLdMeIQVLJThtARZqSo0FhkjaAkWbSVkwfOF1OAJ-ryna17VnoxUdLoN6UuYNx1O2-iHQAjlm2YAGJoOCygQP9Jk+DxmUVHUD7NA2fgddW-jYiZdqWMYyOoxp-2RGYkrGOKFSOLYtQNi0HV7To8p3J5p5-NlP0XY2eI6G+NFAA */
  createMachine(
    {
      context: MODE === "dev" ? contextDev : contextProd,
      strict: true,
      id: "jeopardy",
      initial: MODE === "dev" ? initialDev : initialProd,
      states: {
        players: {
          initial: "idle",

          states: {
            idle: {
              on: {
                change: {
                  actions: "updatePlayer",
                  always: "idle",
                },
                submit: {
                  actions: "addPlayer",
                  always: "idle",
                },
              },
            },
          },
          on: {
            PLAYERS_CHOSEN: {
              actions: "setPlayers",
              target: "chooseQuiz",
            },
          },
        },

        chooseQuiz: {
          initial: "idle",
          states: {
            idle: {
              on: {
                change: {
                  actions: "updateFormQuizName",
                  always: "idle",
                },
              },
            },
          },
          on: {
            SEARCH: {
              target: "search",
            },
          },
        },
        search: {
          invoke: {
            src: (ctx, evt) => myFetch(`quizzes/${ctx.formQuizName}.json`),
            onDone: [
              {
                actions: "setQuiz",
                target: "game",
              },
            ],
            onError: [
              {
                target: "quiz404",
              },
            ],
          },
        },
        game: {
          entry: ["setFirstPlayer"], //entry kan som regel (med fordel) laves om til actions
          initial: "idle",

          states: {
            idle: {
              on: {
                click: {
                  actions: "showAnswer",
                  target: "answerShown",
                },
              },
            },
            answerShown: {
              on: {
                click: {
                  target: "questionShown",
                },
              },
            },
            decider: {
              always: [
                {
                  target: "idle",
                  cond: "hasUnasweredQuestions",
                },
                {
                  target: "end",
                },
              ],
            },
            questionShown: {
              on: {
                awardPoints: {
                  target: "decider",
                  actions: "awardPoints",
                },
              },
            },
            end: {},
          },
        },
        quiz404: {
          on: {
            NEXT: "chooseQuiz",
          },
        },
      },
    },
    {
      guards: {
        hasUnasweredQuestions: ({ quiz }, evt) => {
          const all = [
            ...quiz.categories[0].questions,
            ...quiz.categories[1].questions,
            ...quiz.categories[2].questions,
            ...quiz.categories[3].questions,
            ...quiz.categories[4].questions,
          ];
          return all.filter((i) => !i.completed).length > 0;
        },
      },
      actions: {
        awardPoints: assign({
          players: (ctx, evt) => {
            return ctx.players.map((player) => {
              if (player.player === evt.player) {
                return {
                  ...player,
                  score: player.score + ctx.pool,
                };
              }
              return player;
            });
          },
          quiz: (ctx, evt) => {
            const copy = clone(ctx.quiz);
            copy.categories.forEach((category) => {
              let item = category.questions.find(
                (q) => q.id === ctx.activeQuestion
              );
              if (item) {
                item.completed = true;
              }
            });
            return copy;
          },
          activeQuestion: () => null,
          pool: () => 0,
          currentPlayer: (ctx, evt) =>
            ctx.players.findIndex((p) => p.player === evt.player),
        }),
        updateFormQuizName: assign({
          formQuizName: (ctx, evt) => {
            return evt.target.value;
          },
        }),
        showAnswer: assign({
          activeQuestion: (ctx, evt) => evt.q,
          pool: (ctx, evt) => evt.pool,
        }),
        setFirstPlayer: assign({
          currentPlayer: (ctx, evt) =>
            Math.floor(Math.random() * ctx.players.length),
        }),
        addPlayer: assign({
          players: (ctx, evt) => {
            return [...ctx.players, ctx.formPlayerName];
          },
          formPlayerName: (ctx, evt) => "",
        }),
        updatePlayer: assign({
          formPlayerName: (ctx, evt) => {
            return evt.target.value;
          },
        }),
        setPlayers: assign({
          players: (ctx, evt) => {
            return evt.players.map((player) => ({ player, score: 0 }));
          },
        }),
        setQuiz: assign({
          quiz: (ctx, evt) => {
            evt.data.categories.forEach((category) => {
              category.questions = category.questions.map((q, i) => {
                return {
                  ...q,
                  completed: false,
                  points: (i + 1) * 100,
                  id: uniqid(),
                };
              });
            });
            return evt.data;
          },
          currentPlayer: (ctx) =>
            Math.floor(Math.random() * ctx.players.length),
        }),
      },
      activities: {},
      services: {},
    }
  );
