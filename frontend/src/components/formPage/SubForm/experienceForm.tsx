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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleMinus, Plus } from "lucide-react";
import {
  useFieldArray,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { ResumeFormType, useFormContextResume } from "../Schema/formSchema";
import { RenderMultiplePhaseField } from "../CommonField/phaseField";

export default function ExperienceForm() {
  const methods = useFormContextResume();
  const { fields, append, remove } = useFieldArray({
    name: "experience",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="experiences" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>Experiences</CardTitle>
              <CardDescription className="form-description">
                : school, volunteer, ...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <div>
                {fields.map((experience, experienceIndex) => (
                  <SubExperienceField
                    key={experience.id}
                    experienceIndex={experienceIndex}
                    methods={methods}
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

function SubExperienceField({
  experienceIndex,
  methods,
  remove,
}: {
  experienceIndex: number;
  methods: UseFormReturn<ResumeFormType>;
  remove: UseFieldArrayRemove;
}) {
  return (
    <div className="flex justify-between flex-col">
      <FormField
        control={methods.control}
        name={`experience.${experienceIndex}.place`}
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
      <RenderMultiplePhaseField
        name={`experience.${experienceIndex}.phase`}
        methods={methods}
      />
      <Button
        variant="link"
        onClick={(e) => remove(experienceIndex)}
        size="icon"
        className="dynamic-delete-button self-end"
      >
        <CircleMinus />
      </Button>
    </div>
  );
}
