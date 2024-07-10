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

export default function PhaseField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex flex-col gap-1">
      <FormField
        control={control}
        key={`${id}-time`}
        name={`experiences.${index}.phase.time`}
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
        control={control}
        key={`${id}-position`}
        name={`experiences.${index}.phase.position`}
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
        control={control}
        key={`${id}-detail`}
        name={`experiences.${index}.phase.detail`}
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
