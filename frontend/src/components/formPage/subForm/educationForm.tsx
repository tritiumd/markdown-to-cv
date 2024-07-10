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
                {/* <FormLabel>Put your education like below</FormLabel> */}
                {educations.map((field, index) => (
                  <SubEducationField
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={methods.control}
                    remove={removeEducations}
                  />
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

function SubEducationField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex justify-between flex-col">
      <FormField
        control={control}
        key={`${id}-place`}
        name={`education.${index}.place`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Your Institution</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your Institution"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-major`}
        name={`education.${index}.major`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Your Major
              {/* {console.log(field)} */}
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your Major"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-time`}
        name={`education.${index}.time`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Your time
              {/* {console.log(field)} */}
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Your time"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-extra`}
        name={`education.${index}.extra`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Extra information
              {/* {console.log(field)} */}
            </FormLabel>
            <FormControl>
              <Textarea {...field} placeholder={"Like: \n- First\n- Second"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant="secondary"
        onClick={() => remove(index)}
        size="icon"
        className="dynamic-delete-button self-end"
      >
        <CircleMinus />
      </Button>
    </div>
  );
}
