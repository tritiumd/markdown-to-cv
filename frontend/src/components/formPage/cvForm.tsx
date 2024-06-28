"use client";
import * as z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Phone, Twitter } from "lucide-react";

const formSchema = z.object({
  username: z.string().max(100),
  position: z.string().max(100),
  info: z.array(
    z.object({
      icon: z.string(),
      value: z.string(),
    })
  ),
  summary: z.string().max(1000),
  skills: z.string().max(1000),
});

export default function CvForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      position: "",
      summary: "",
      skills: "",
      info: [
        { icon: "fa-regular fa-phone", value: "0123456789" },
        { icon: "fa-brands fa-github", value: "https://github.com/kidclone3" },
      ],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  // This can come from your database or API.
  const { fields, append } = useFieldArray({
    name: "info",
    control: form.control,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Personal information</h2>
              </AccordionTrigger>
              <AccordionContent className="p-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="info"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Accordion
                            type="single"
                            className="w-full"
                            collapsible
                          >
                            <AccordionItem value="info">
                              <AccordionTrigger className="flex justify-between items-center">
                                <FormLabel> Fill info </FormLabel>
                              </AccordionTrigger>
                              <AccordionContent className="p-2">
                                <div>
                                  {fields.map((field, index) => (
                                    <>
                                      <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`info.${index}`}
                                        render={({ field }) => (
                                          <FormItem>
                                            {console.log(field)}

                                            <FormControl>
                                              <div>
                                                <Select
                                                  defaultValue={
                                                    field.value.icon
                                                  }
                                                  onChange={(value) => {
                                                    field.onChange({
                                                      target: {
                                                        value: value,
                                                        name: field.name,
                                                      },
                                                    });
                                                  }}
                                                >
                                                  <SelectTrigger></SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem
                                                      value="fa-regular fa-phone"
                                                      className="flex items-center"
                                                    >
                                                      <Phone />
                                                    </SelectItem>
                                                    <SelectItem
                                                      value="fa-brands fa-github"
                                                      className="flex items-center"
                                                    >
                                                      <Github />
                                                    </SelectItem>
                                                    <SelectItem
                                                      value="fa-brands fa-twitter"
                                                      className="flex items-center"
                                                    >
                                                      <Twitter />
                                                    </SelectItem>
                                                    <SelectItem
                                                      value="fa-brands fa-linkedin"
                                                      className="flex items-center"
                                                    >
                                                      <Linkedin />
                                                    </SelectItem>
                                                  </SelectContent>
                                                </Select>
                                                <Input {...field} />
                                              </div>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`info.${index}.value`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel
                                              className={cn(
                                                index !== 0 && "sr-only"
                                              )}
                                            >
                                              URLs
                                            </FormLabel>
                                            <FormDescription
                                              className={cn(
                                                index !== 0 && "sr-only"
                                              )}
                                            >
                                              Add links to your website, blog,
                                              or social media profiles.
                                            </FormDescription>
                                            <FormControl>
                                              <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => append({ value: "" })}
                                  >
                                    Add URL
                                  </Button>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
                  name="skills"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Skill</FormLabel>
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
            </AccordionItem>
          </Accordion>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
