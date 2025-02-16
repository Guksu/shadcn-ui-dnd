import { BOARD_STORAGE_KEY } from "@/constants";
import { Board } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BoardStore = {
  boards: Board[];
  addBoard: (board: Board) => void;
  updateBoard: (board: Board) => void;
  deleteBoard: (id: string) => void;
};

const boardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      addBoard: (board: Board) =>
        set((state) => ({ boards: [...state.boards, board] })),
      updateBoard: (updateBoard: Board) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === updateBoard.id ? updateBoard : board
          ),
        })),
      deleteBoard: (id: string) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),
    }),
    { name: BOARD_STORAGE_KEY }
  )
);

export default boardStore;
