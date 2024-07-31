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
import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import RenderMultiplePhaseField from "../CommonField/phaseField";

import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";

export default function ActivityForm() {
  const methods = useFormContextResume();
  const { fields, append, remove } = useFieldArray({
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
                {fields.map((field, index) => (
                  <SubActivityField
                    key={field.id}
                    methods={methods}
                    activityIndex={index}
                    remove={remove}
                  />
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      append({
                        place: "",
                        phase: [
                          {
                            time: "",
                            position: "",
                            detail: "",
                          },
                        ],
                      });
                    }}
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

function SubActivityField({
  activityIndex,
  methods,
  remove,
}: {
  activityIndex: number;
  methods: UseFormReturn<ResumeFormType>;
  remove: UseFieldArrayRemove;
}) {
  return (
    <div className="flex justify-between flex-col">
      <FormField
        control={methods.control}
        name={`activity.${activityIndex}.place`}
        render={({ field }) => (
          <FormItem className="w-full my-1">
            <FormLabel>Place</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your group in past"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <RenderMultiplePhaseField
        name={`activity.${activityIndex}.phase`}
        methods={methods}
      />
      <Button
        variant="link"
        onClick={() => remove(activityIndex)}
        size="icon"
        className="dynamic-delete-button self-end"
      >
        <CircleMinus />
      </Button>
    </div>
  );
}
