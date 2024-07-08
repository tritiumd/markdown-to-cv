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

export default function ActivityForm() {
  const methods = useFormContext();
  const {
    fields: activities,
    append: appendActivities,
    remove: removeActivities,
  } = useFieldArray({
    name: "activities",
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
                <FormLabel>Put your activities like below</FormLabel>
                {activities.map((field, index) => (
                  <div key={field.id} className="flex justify-between">
                    <FormField
                      control={methods.control}
                      key={field.id}
                      name={`activities.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full m-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder={
                                index === 0
                                  ? "place: Hanoi\nphase: \n\t- time: 2020\n\tposition: Vice president of HAMIC\n\tdetail:\n\t\t- Teach secondary school student play shooting game"
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
                      onClick={() => removeActivities(index)}
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
