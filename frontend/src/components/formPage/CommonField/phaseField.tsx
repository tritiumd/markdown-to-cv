import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GripVertical, TrashIcon } from "lucide-react";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import * as React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import "./phaseField.module.css";
const RenderMultiplePhaseField = ({
  name,
  methods,
}: {
  name:
    | `experience.${number}.phase`
    | `activity.${number}.phase`
    | `project.${number}.phase`;
  methods: UseFormReturn<ResumeFormType>;
}) => {
  const { fields, remove, append, move } = useFieldArray({
    name: name,
    control: methods.control,
  });
  return (
    <React.Fragment>
      <Sortable
        value={fields}
        onMove={({ activeIndex, overIndex }) => {
          move(activeIndex, overIndex);
        }}
      >
        <div>
          {fields.map((field, index) => (
            <SortableItem key={field.id} value={field.id} asChild>
              <Card className="p-4 my-2">
                <CardHeader>
                  <CardTitle>Phase {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row">
                  <div className="flex flex-col mr-auto w-full">
                    <FormField
                      control={methods.control}
                      name={`${name}.${index}.time`}
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
                      name={`${name}.${index}.position`}
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
                      name={`${name}.${index}.detail`}
                      render={({ field }) => (
                        <FormItem className="w-full m-1 flex flex-col py-2">
                          <FormLabel>Detail</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder={
                                "List your detail like:\n- First\n- Second"
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col w-8 justify-between pl-2">
                    <SortableDragHandle
                      type="button"
                      variant="link"
                      className="size-8 shrink-0"
                      size={"icon"}
                    >
                      <GripVertical
                        className="size-4"
                        aria-hidden="true"
                        color="black"
                      />
                    </SortableDragHandle>
                    <Button
                      variant="link"
                      onClick={() => remove(index)}
                      size={"icon"}
                      className="delete-button size-8 shrink-0"
                    >
                      <TrashIcon
                        className="size-4 text-destructive"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </SortableItem>
          ))}
        </div>
      </Sortable>
      <Button
        variant="ghost"
        size="sm"
        className="w-full gap-2 text-secondary self-center"
        onClick={(e) => {
          e.preventDefault();
          append({
            time: "",
            position: "",
            detail: "",
          });
        }}
      >
        <Plus size={16} /> <p> Add more phase </p>
      </Button>
    </React.Fragment>
  );
};

export default RenderMultiplePhaseField;
