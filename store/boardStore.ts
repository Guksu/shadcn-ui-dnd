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
    todoId: string,
    targetBoardId: string,
    targetTodoId?: string
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
        todoId: string,
        targetBoardId: string,
        targetTodoId?: string
      ) =>
        set((state) => {
          let movedTodo: Todo | null = null;
          // 이동할 Todo를 찾아서 기존 보드에서 제거
          const updatedBoards = state.boards.map((board) => {
            if (board.todo.some((t) => t.id === todoId)) {
              movedTodo = board.todo.find((t) => t.id === todoId) || null;
              return {
                ...board,
                todo: board.todo.filter((t) => t.id !== todoId),
              };
            }
            return board;
          });

          // movedTodo가 없으면 기존 상태 유지
          if (!movedTodo) {
            return { boards: state.boards };
          }

          // 같은 보드 내에서 이동
          if (
            state.boards.some(
              (b) =>
                b.id === targetBoardId &&
                b.todo.some((t) => t.id === targetTodoId)
            )
          ) {
            return {
              boards: updatedBoards.map((board) => {
                if (board.id !== targetBoardId) return board;
                const updatedTodos = [...board.todo];
                const targetIndex = targetTodoId
                  ? updatedTodos.findIndex((t) => t.id === targetTodoId)
                  : -1;

                if (targetIndex !== -1) {
                  updatedTodos.splice(targetIndex, 0, movedTodo as Todo);
                } else {
                  updatedTodos.push(movedTodo as Todo);
                }
                return { ...board, todo: updatedTodos };
              }),
            };
          }

          // 다른 보드로 이동
          return {
            boards: updatedBoards.map((board) =>
              board.id === targetBoardId
                ? {
                    ...board,
                    todo: [...board.todo, movedTodo as Todo],
                  }
                : board
            ),
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
