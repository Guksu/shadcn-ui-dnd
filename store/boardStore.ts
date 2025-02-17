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
    }),
    { name: BOARD_STORAGE_KEY }
  )
);

export default boardStore;
