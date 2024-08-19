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
import { Plus } from "lucide-react";
import {
  useFieldArray,
  UseFieldArrayRemove,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import RenderMultiplePhaseField from "../CommonField/phaseField";

import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";
import RemoveSubFieldButton from "@/components/custom/button/RemoveSubFieldButton/RemoveSubFieldButton";

export default function ProjectForm() {
  const methods = useFormContextResume();
  const { fields, append, remove } = useFieldArray({
    name: "project",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="projects" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>Projects</CardTitle>
              <CardDescription className="form-description">
                : school, self-learn, ...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <div>
                {fields.map((field, index) => (
                  <SubProjectField
                    key={field.id}
                    methods={methods}
                    projectIndex={index}
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

function SubProjectField({
  projectIndex,
  methods,
  remove,
}: {
  projectIndex: number;
  methods: UseFormReturn<ResumeFormType>;
  remove: UseFieldArrayRemove;
}) {
  return (
    <div className="flex justify-between flex-col">
      <FormField
        control={methods.control}
        name={`project.${projectIndex}.place`}
        render={({ field }) => (
          <FormItem className="w-full my-1">
            <FormLabel>Place</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your project title"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <RenderMultiplePhaseField
        name={`project.${projectIndex}.phase`}
        methods={methods}
      />
      <RemoveSubFieldButton onClick={() => remove(projectIndex)} />
    </div>
  );
}
