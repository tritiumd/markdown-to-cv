import { ChooseIconButton } from "@/components/custom/button/chooseIconButton";
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
import { useFieldArray } from "react-hook-form";
import { useFormContextResume } from "../Schema/formSchema";

export default function PersonalForm() {
  const methods = useFormContextResume();
  const {
    fields: infos,
    append: appendInfos,
    remove: removeInfos,
  } = useFieldArray({
    name: "info",
    control: methods.control,
  });
  return (
    <Card>
      <Accordion type="single" className="w-full p-2" collapsible>
        <AccordionItem value="details" className="border-0">
          <CardHeader>
            <AccordionTrigger className="accordion-trigger">
              <CardTitle>Personal information</CardTitle>
              <CardDescription className="form-description">
                : school, major, time...
              </CardDescription>
            </AccordionTrigger>
          </CardHeader>
          <CardContent>
            <AccordionContent className="p-2">
              <FormField
                control={methods.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          type="text"
                          className="border-spacing-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Accordion
                type="single"
                className="w-full"
                collapsible
                defaultValue="info"
              >
                <AccordionItem value="info" className="border-0">
                  <AccordionTrigger className="accordion-trigger">
                    <FormLabel className="flex-grow-0 mr-auto">
                      Contact
                    </FormLabel>
                    <FormDescription className="form-description">
                      : phone, email, Github...
                    </FormDescription>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="relative">
                      {infos.map((field, index) => (
                        <InfoDetailField
                          id={field.id}
                          key={field.id}
                          index={index}
                          control={methods.control}
                          remove={removeInfos}
                        />
                      ))}
                      <div className="p-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => appendInfos({ icon: "", data: "" })}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <FormField
                control={methods.control}
                name="position"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Applying Position"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={methods.control}
                name="summary"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Put your summary here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={methods.control}
                name="skill"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Put your skills here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </AccordionContent>
          </CardContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

function InfoDetailField({ id, index, control, remove }: any) {
  return (
    <div className="w-full flex gap-x-3 p-1">
      <FormField
        control={control}
        key={`${id}-icon`}
        name={`info.${index}.icon`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ChooseIconButton {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-data`}
        name={`info.${index}.data`}
        render={({ field }) => (
          <FormItem className="grow">
            <FormControl>
              <Input {...field} className="pr-2" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant="link"
        onClick={() => remove(index)}
        size="icon"
        className="dynamic-delete-button"
      >
        <CircleMinus />
      </Button>
    </div>
  );
}
