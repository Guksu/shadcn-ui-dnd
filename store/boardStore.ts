import { BOARD_STORAGE_KEY } from "@/constants";
import { Board, Todo } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardStore = {
  boards: Board[];
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (id: string) => void;
  addTodo: (boardId: string, todo: Todo) => void;
  updateTodo: (boardId: string, todoId: string, todo: Todo) => void;
  deleteTodo: (boardId: string, todoId: string) => void;
  moveTodo: (
    targetTodoId: string,
    targetBoardId: string,
    todoId: string,
    boardId: string
  ) => void;
  moveBoard: (dragBoardId: string, targetBoardId: string) => void;
};

const boardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],

      addBoard: (board: Board) =>
        set((state) => ({ boards: [...state.boards, board] })),

      updateBoard: (board: Board) =>
        set((state) => ({
          boards: state.boards.map((b) => (b.id === board.id ? board : b)),
        })),

      deleteBoard: (id: string) =>
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
        })),

      addTodo: (boardId: string, todo: Todo) =>
        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id === boardId) {
              return {
                ...b,
                todo: [...b.todo, todo],
              };
            } else {
              return b;
            }
          }),
        })),

      updateTodo: (boardId: string, todoId: string, todo: Todo) =>
        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id === boardId) {
              return {
                ...b,
                todo: b.todo.map((t) => (t.id === todoId ? todo : t)),
              };
            } else {
              return b;
            }
          }),
        })),

      deleteTodo: (boardId: string, todoId: string) =>
        set((state) => ({
          boards: state.boards.map((b) => {
            if (b.id === boardId) {
              return {
                ...b,
                todo: b.todo.filter((t) => t.id !== todoId),
              };
            } else {
              return b;
            }
          }),
        })),

      moveTodo: (
        targetTodoId: string,
        targetBoardId: string,
        todoId: string,
        boardId: string
      ) =>
        set((state) => {
          // 같은 보드 내에서 이동
          if (boardId === targetBoardId) {
            return {
              boards: state.boards.map((b) => {
                if (b.id === boardId) {
                  const updatedTodos = [...b.todo];
                  const moveIdx = updatedTodos.findIndex(
                    (t) => t.id === todoId
                  );
                  const targetIndex = updatedTodos.findIndex(
                    (t) => t.id === targetTodoId
                  );
                  const moveItem = updatedTodos.splice(moveIdx, 1);

                  updatedTodos.splice(targetIndex, 0, moveItem[0]);
                  return { ...b, todo: updatedTodos };
                } else {
                  return b;
                }
              }),
            };
          }

          // 다른 보드로 이동
          const moveBoardIdx = state.boards.findIndex((b) => b.id === boardId);
          const moveIdx = state.boards[moveBoardIdx].todo.findIndex(
            (t) => t.id === todoId
          );
          const moveItem = state.boards[moveBoardIdx].todo.splice(moveIdx, 1);

          return {
            boards: state.boards.map((b) => {
              if (b.id === targetBoardId) {
                const updatedTodos = [...b.todo];
                const targetIndex = updatedTodos.findIndex(
                  (t) => t.id === targetTodoId
                );

                updatedTodos.splice(targetIndex, 0, moveItem[0]);

                return {
                  ...b,
                  todo: updatedTodos,
                };
              } else {
                return b;
              }
            }),
          };
        }),

      moveBoard: (dragBoardId: string, targetBoardId: string) =>
        set((state) => {
          const fromIndex = state.boards.findIndex((b) => b.id === dragBoardId);
          const toIndex = state.boards.findIndex((b) => b.id === targetBoardId);

          if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
            return { boards: state.boards };
          }

          const updatedBoards = [...state.boards];
          const [movedBoard] = updatedBoards.splice(fromIndex, 1);
          updatedBoards.splice(toIndex, 0, movedBoard);

          return { boards: updatedBoards };
        }),
    }),

    { name: BOARD_STORAGE_KEY }
  )
);

export default boardStore;
