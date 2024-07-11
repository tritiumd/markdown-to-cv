import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { CircleMinus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import PhaseField from "../commonField/phaseField";

export default function ActivityForm() {
  const methods = useFormContext();
  const {
    fields: activities,
    append: appendActivities,
    remove: removeActivities,
  } = useFieldArray({
    name: "activity",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="activities" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>Activities</CardTitle>
              <CardDescription className="form-description">
                : school, volunteer, ...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <div>
                {activities.map((field, index) => (
                  <SubActivityField
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={methods.control}
                    remove={removeActivities}
                  />
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      appendActivities({
                        value: "",
                      })
                    }
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </CardContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

function SubActivityField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex justify-between flex-col">
      <FormField
        control={control}
        key={id}
        name={`activity.${index}.place`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Place</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your group in past"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <PhaseField
        key={`${id}-phase`}
        id={id}
        index={index}
        control={control}
        remove={remove}
      />
      <Button
        variant="link"
        onClick={() => remove(index)}
        size="icon"
        className="dynamic-delete-button self-end"
      >
        <CircleMinus />
      </Button>
    </div>
  );
}
