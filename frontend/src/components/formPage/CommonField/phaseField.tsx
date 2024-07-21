import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

import { CSS } from "@dnd-kit/utilities";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";
import { Card } from "@/components/ui/card";
import { CircleMinus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PhaseField({
  name,
  id,
  phaseIndex,
  remove,
}: {
  name:
    | `experience.${number}.phase.${number}`
    | `activity.${number}.phase.${number}`;
  id: string;
  phaseIndex: number;
  remove: any;
}) {
  const uniqueId = id;
  const methods = useFormContextResume();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: uniqueId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isCursorGrabbing = attributes["aria-pressed"];
  return (
    <div className={"py-2"} style={style} ref={setNodeRef}>
      <Card className={"p-4 flex flex-row"}>
        <div className="flex flex-col mr-auto w-full">
          <FormField
            control={methods.control}
            name={`${name}.time`}
            render={({ field }) => (
              <FormItem className="w-full m-1 flex flex-col py-2">
                <FormLabel className={"flex justify-between"}>
                  <p className={"self-center"}>Time</p>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder={"Your Time"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name={`${name}.position`}
            render={({ field }) => (
              <FormItem className="w-full m-1 flex flex-col py-2">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={"Your Position"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name={`${name}.detail`}
            render={({ field }) => (
              <FormItem className="w-full m-1 flex flex-col py-2">
                <FormLabel>Detail</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={"List your detail like:\n- First\n- Second"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col w-10 justify-between">
          <Button
            variant="link"
            size={"icon"}
            {...attributes}
            {...listeners}
            className={`px-3 mb-auto ${isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"}`}
            aria-describedby={`DndContext-${uniqueId}`}
          >
            <svg viewBox="0 0 20 20" width="24">
              <path
                d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
          <Button
            variant="link"
            onClick={(e) => remove(phaseIndex)}
            size={"icon"}
            className="dynamic-delete-button"
          >
            <CircleMinus />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export const RenderMultiplePhaseField = ({
  name,
  methods,
}: {
  name: `experience.${number}.phase` | `activity.${number}.phase`;
  methods: UseFormReturn<ResumeFormType>;
}) => {
  const { fields, remove, append, move } = useFieldArray({
    name: name,
    control: methods.control,
  });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd({ active, over }: { active: any; over: any }) {
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  }
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, index) => (
            <PhaseField
              key={field.id}
              id={field.id}
              name={`${name}.${index}`}
              phaseIndex={index}
              remove={remove}
            />
          ))}
        </SortableContext>
      </DndContext>
      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          append({
            time: "",
            position: "",
            detail: "",
          });
        }}
      >
        <Plus size={16} />
      </Button>
    </div>
  );
};
