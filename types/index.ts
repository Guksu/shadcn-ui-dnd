export interface Board {
  id: string;
  title: string;
  todo: Todo[];
}

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}
