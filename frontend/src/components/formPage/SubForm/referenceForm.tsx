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
import { useFieldArray } from "react-hook-form";
import { useFormContextResume } from "../Schema/formSchema";
import RemoveSubFieldButton from "@/components/custom/button/RemoveSubFieldButton/RemoveSubFieldButton";

export default function ReferenceForm() {
  const methods = useFormContextResume();
  const {
    fields: references,
    append: appendReference,
    remove: removeReference,
  } = useFieldArray({
    name: "reference",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="references" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>References</CardTitle>
              <CardDescription className="form-description">
                : school, advisor, ...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <div>
                {/* <FormLabel>Put your education like below</FormLabel> */}
                {references.map((field, index) => (
                  <SubReferenceField
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={methods.control}
                    remove={removeReference}
                  />
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();

                      appendReference({
                        name: "",
                        position: "",
                        phone: "",
                        email: "",
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

function SubReferenceField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex justify-between flex-col">
      <FormField
        control={control}
        key={`${id}-name`}
        name={`reference.${index}.name`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Name"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-position`}
        name={`reference.${index}.position`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Position
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Reference position"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-phone`}
        name={`reference.${index}.phone`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Phone
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Reference phone"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-email`}
        name={`reference.${index}.email`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>
              Email
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Reference email"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <RemoveSubFieldButton onClick={() => remove(index)} />
    </div>
  );
}
