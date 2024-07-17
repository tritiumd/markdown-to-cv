import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";
import { use } from "react";

export default function PhaseField({
  name,
  phaseIndex,
}: {
  name:
    | `experience.${number}.phase.${number}`
    | `activity.${number}.phase.${number}`;
  phaseIndex: number;
}) {
  const methods = useFormContextResume();
  return (
    <div className="flex flex-col gap-1">
      <FormField
        control={methods.control}
        name={`${name}.time`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Time</FormLabel>
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
          <FormItem className="w-full m-1">
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
          <FormItem className="w-full m-1">
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
  );
}

export const RenderMultiplePhaseField = ({
  name,
  methods,
}: {
  name: `experience.${number}.phase` | `activity.${number}.phase`;
  methods: UseFormReturn<ResumeFormType>;
}) => {
  const { fields } = useFieldArray({
    name: name,
    control: methods.control,
  });
  return (
    <div>
      {fields.map((field, index) => (
        <PhaseField
          key={field.id}
          name={`${name}.${index}`}
          phaseIndex={index}
        />
      ))}
    </div>
  );
};
