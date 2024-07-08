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

export default function EducationForm() {
  const methods = useFormContext();
  const {
    fields: educations,
    append: appendEducations,
    remove: removeEducations,
  } = useFieldArray({
    name: "education",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="education" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>Education</CardTitle>
              <CardDescription className="form-description">
                : school, major, time...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <div>
                <FormLabel>Put your education like below</FormLabel>
                {educations.map((field, index) => (
                  <div key={field.id} className="flex justify-between">
                    <FormField
                      control={methods.control}
                      key={field.id}
                      name={`education.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full m-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              placeholder={
                                index === 0
                                  ? "place: Hanoi\nmajor: IT\ntime: 2020\nextra: Distinction grade"
                                  : ""
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="link"
                      onClick={() => removeEducations(index)}
                      size="icon"
                      className="dynamic-delete-button self-center"
                    >
                      <CircleMinus />
                    </Button>
                  </div>
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      appendEducations({
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
