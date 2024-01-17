import { create } from 'zustand'
import {getTodosGroupedByColumns} from "@/lib/getColumn";
import { databases, ID, storage } from '@/appwrite';


interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string;
    setNewTaskInput: (input: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (task: TypedColumn) => void;

    searchString: string;
    setSearchString: (searchString: string) => void;

    addTask: (todo: string, columnId: TypedColumn,) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  newTaskInput: "",
  newTaskType: "todo",
  setNewTaskType: (task) => set({ newTaskType: task }),
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),
  getBoard: async() => {
    const board = await getTodosGroupedByColumns();
    set({board})
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async(todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    )
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns)
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    )
  },
  addTask: async (todo: string, columnId: TypedColumn,) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
      }
    );

    set({newTaskInput: ""});
    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
      };

      const column = newColumns.get(columnId)

      if(!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  }
}))