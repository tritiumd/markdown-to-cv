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
import { CircleX, Github, Linkedin, Phone, Plus, Twitter } from "lucide-react";

import * as React from "react";

import { ChooseIconButton } from "@/components/custom/button/chooseIconButton";

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
  certificates: z.array(
    z.object({
      name: z.string().max(100),
      date: z.string().max(100),
      extra: z.string().max(200).optional(),
    })
  ),
  education: z.array(
    z.object({
      time: z.string().max(50),
      place: z.string().max(100),
      major: z.string().max(100),
      extra: z.string().max(200).optional(),
    })
  ),
  experiences: z.array(
    z.object({
      place: z.string().max(100),
      phase: z.object({
        time: z.string().max(50),
        position: z.string().max(100),
        detail: z.string().max(200),
      }),
    })
  ),
  activities: z.array(
    z.object({
      place: z.string().max(100),
      phase: z.object({
        time: z.string().max(50),
        position: z.string().max(100),
        detail: z.string().max(200),
      }),
    })
  ),
  references: z
    .array(
      z.object({
        name: z.string().max(100),
        position: z.string().max(100),
        contact: z.string().max(100),
      })
    )
    .optional(),
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
        { icon: "fa-phone", value: "0123456789" },
        { icon: "fa-github", value: "https://github.com/kidclone3" },
      ],
      certificates: [{ name: "", date: "", extra: "" }],
      education: [{ time: "", place: "", major: "", extra: "" }],
      experiences: [
        { place: "", phase: { time: "", position: "", detail: "" } },
      ],
      activities: [
        { place: "", phase: { time: "", position: "", detail: "" } },
      ],
      references: [{ name: "", position: "", contact: "" }],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  // This can come from your database or API.
  const {
    fields: infos,
    append: appendInfos,
    remove: removeInfos,
  } = useFieldArray({
    name: "info",
    control: form.control,
  });

  const { fields: certificates, append: appendCertificates } = useFieldArray({
    name: "certificates",
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
                            className="border-spacing-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Accordion type="single" className="w-full" collapsible>
                  <AccordionItem value="info">
                    <AccordionTrigger className="flex items-center">
                      <FormLabel className="flex-grow-0">Contact</FormLabel>
                      <FormDescription className="text-xs text-gray-400 flex-1">
                        : phone, email, Github...
                      </FormDescription>
                    </AccordionTrigger>
                    <AccordionContent className="p-2">
                      <div>
                        {infos.map((field, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <FormField
                              control={form.control}
                              key={field.icon}
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
                              control={form.control}
                              key={field.value}
                              name={`info.${index}.value`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex">
                                      <Input {...field} className="pr-2" />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => removeInfos(index)}
                                        size="icon"
                                        className="min-w-1.5"
                                      >
                                        <CircleX
                                          className="h-4 w-4"
                                          color="red"
                                        />
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => appendInfos({ icon: "", value: "" })}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
                {/* <FormField
                  control={form.control}
                  name="certificates"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Accordion
                            type="single"
                            className="w-full"
                            collapsible
                          >
                            <AccordionItem value="certificates">
                              <AccordionTrigger className="flex justify-between items-center">
                                <FormLabel> Certificates </FormLabel>
                                <FormDescription className="text-xs text-gray-400">
                                  : name, date, extra...
                                </FormDescription>
                              </AccordionTrigger>
                              <AccordionContent className="p-2">
                                <div>
                                  {certificates.map((field, index) => (
                                    <FormField
                                      control={form.control}
                                      key={field.id}
                                      name={`certificates.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() =>
                                      appendCertificates({
                                        name: "",
                                        date: "",
                                        extra: "",
                                      })
                                    }
                                  >
                                    <Plus size={16} />
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
                  name="education"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Accordion
                            type="single"
                            className="w-full"
                            collapsible
                          >
                            <AccordionItem value="education">
                              <AccordionTrigger className="flex justify-between items-center">
                                <FormLabel className=""> Education </FormLabel>
                                <FormDescription className="text-xs text-gray-400">
                                  : school, major, time...
                                </FormDescription>
                              </AccordionTrigger>
                              <AccordionContent className="p-2">
                                <div>
                                  {certificates.map((field, index) => (
                                    <FormField
                                      control={form.control}
                                      key={field.id}
                                      name={`certificates.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() =>
                                      appendCertificates({
                                        name: "",
                                        date: "",
                                        extra: "",
                                      })
                                    }
                                  >
                                    <Plus size={16} />
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
                  name="certificates"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Accordion
                            type="single"
                            className="w-full"
                            collapsible
                          >
                            <AccordionItem
                              value="certificates"
                              className="border-0"
                            >
                              <AccordionTrigger className="flex flex-start items-center">
                                <FormLabel> Activities </FormLabel>
                                <FormDescription className="text-xs text-gray-400 self-end">
                                  : school, volunteer, ...
                                </FormDescription>
                              </AccordionTrigger>
                              <AccordionContent className="p-2">
                                <div>
                                  {certificates.map((field, index) => (
                                    <FormField
                                      control={form.control}
                                      key={field.id}
                                      name={`certificates.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormControl>
                                            <Input {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  ))}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() =>
                                      appendCertificates({
                                        name: "",
                                        date: "",
                                        extra: "",
                                      })
                                    }
                                  >
                                    <Plus size={16} />
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
                /> */}
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
