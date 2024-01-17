"use client";

import { TrashIcon } from "@heroicons/react/20/solid";
import {DraggableProvidedDraggableProps,DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import { useBoardStore } from "@/store/BoardStore";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function Card({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {


  const { deleteTask } = useBoardStore();

  return (
    <div
      className="bg-white space-y-2 drop-shadow"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-3">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id) } className="text-black-500 hover:text-red-600">
          <TrashIcon className="ml-5 h-4 w-6" />
        </button>
   
      </div>
    </div>
  );
}
