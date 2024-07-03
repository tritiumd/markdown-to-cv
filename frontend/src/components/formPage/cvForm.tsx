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
import * as React from "react";
import { Plus, CircleMinus } from "lucide-react";

import { ChooseIconButton } from "@/components/custom/button/chooseIconButton";
import "./form.css";

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
    mode: "onBlur",
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
    <div className="flex min-h-fit flex-col items-center justify-between p-10 overflow:auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-screen-lg w-full flex flex-col gap-4"
        >
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="details">
              <AccordionTrigger className="accordion-trigger">
                <p>Personal information</p>
                <FormDescription className="form-description">
                  : school, major, time...
                </FormDescription>
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
                          <div key={index} className="w-full flex gap-x-3 p-1">
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
                              onClick={() => removeInfos(index)}
                              size="icon"
                              className="dynamic-delete-button"
                            >
                              <CircleMinus />
                            </Button>
                          </div>
                        ))}
                        <div className="p-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-full"
                            onClick={() => appendInfos({ icon: "", value: "" })}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="certificates">
              <AccordionTrigger className="accordion-trigger">
                <p>Certificates</p>
                <FormDescription className="form-description">
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
                            <Textarea
                              {...field}
                              placeholder="Put your certificates here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full"
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="education">
              <AccordionTrigger className="accordion-trigger">
                <p>Education</p>
                <FormDescription className="form-description">
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
                            <Textarea
                              {...field}
                              placeholder="Put your education here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="certificates" className="border-0">
              <AccordionTrigger className="accordion-trigger">
                <p>Activities</p>
                <FormDescription className="form-description">
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
                            <Textarea
                              {...field}
                              placeholder="Put your activities here"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
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
                </div>
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
