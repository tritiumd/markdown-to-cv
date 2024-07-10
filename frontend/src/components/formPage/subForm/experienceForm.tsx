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

export default function ExperienceForm() {
  const methods = useFormContext();
  const {
    fields: experiences,
    append: appendExperiences,
    remove: removeExperiences,
  } = useFieldArray({
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
                {experiences.map((field, index) => (
                  <SubExperienceField
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={methods.control}
                    remove={removeExperiences}
                  />
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      appendExperiences({
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

function SubExperienceField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex justify-between flex-col">
      <FormField
        control={control}
        key={id}
        name={`experiences.${index}.place`}
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
