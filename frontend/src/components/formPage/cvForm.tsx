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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const url = process.env.NEXT_PUBLIC_MY_URL;
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
    z
      .object({
        value: z.string(),
      })
      .optional()
  ),
  education: z.array(
    z
      .object({
        value: z.string(),
      })
      .optional()
  ),
  experiences: z.array(
    z
      .object({
        value: z.string(),
      })
      .optional()
  ),
  activities: z.array(
    z
      .object({
        value: z.string(),
      })
      .optional()
  ),

  references: z
    .array(
      z
        .object({
          value: z.string(),
        })
        .optional()
    )
    .optional(),
});

export default function CvForm() {
  const { toast } = useToast();
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
      certificates: [{ value: "" }],
      education: [{ value: "" }],
      experiences: [{ value: "" }],
      activities: [{ value: "" }],
      references: [{ value: "" }],
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // post to your API
    fetch(`${url}/form/submit-form`, {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Submission data:", data);

        toast({
          title: "Success",
          description: "Your CV has been submitted",
        });
      })
      .catch((error) => {
        console.error("Submission error:", error);
        // Optionally, show an error toast
        toast({
          title: "Error",
          description: "There was an issue!",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
    console.log("json", JSON.stringify(values));
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

  const {
    fields: certificates,
    append: appendCertificates,
    remove: removeCertificates,
  } = useFieldArray({
    name: "certificates",
    control: form.control,
  });

  const {
    fields: educations,
    append: appendEducations,
    remove: removeEducations,
  } = useFieldArray({
    name: "education",
    control: form.control,
  });
  const {
    fields: activities,
    append: appendActivities,
    remove: removeActivities,
  } = useFieldArray({
    name: "activities",
    control: form.control,
  });

  return (
    <div className="flex-col items-center justify-between px-10 pt-2 overflow-hidden max-h-full">
      <Card className="overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="">
            <div className="form-container">
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
                                  <div
                                    key={field.id}
                                    className="w-full flex gap-x-3 p-1"
                                  >
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
                                            <Input
                                              {...field}
                                              className="pr-2"
                                            />
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
                                    onClick={() =>
                                      appendInfos({ icon: "", value: "" })
                                    }
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
                    </CardContent>
                  </AccordionItem>
                </Accordion>
              </Card>
              <Card>
                <Accordion type="single" className="w-full p-2" collapsible>
                  <AccordionItem value="certificates" className="border-0">
                    <CardHeader>
                      <AccordionTrigger className="accordion-trigger">
                        <CardTitle>Certificates</CardTitle>
                        <CardDescription className="form-description">
                          : school, major, time...
                        </CardDescription>
                      </AccordionTrigger>
                    </CardHeader>
                    <CardContent>
                      <AccordionContent className="p-2">
                        <div>
                          <FormLabel>
                            Put your certificates like below
                          </FormLabel>
                          {certificates.map((field, index) => (
                            <div
                              key={field.id}
                              className="flex justify-between"
                            >
                              <FormField
                                control={form.control}
                                key={field.id}
                                name={`certificates.${index}.value`}
                                render={({ field }) => (
                                  <FormItem className="w-full m-1">
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        placeholder={
                                          index === 0
                                            ? "year: 2024\nname: APTIS B2\nextra: British Council"
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
                                onClick={() => removeCertificates(index)}
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
                              className="w-full"
                              onClick={() =>
                                appendCertificates({
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
                            <div
                              key={field.id}
                              className="flex justify-between"
                            >
                              <FormField
                                control={form.control}
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
              <Card>
                <Accordion type="single" className="w-full p-2" collapsible>
                  <AccordionItem value="certificates" className="border-0">
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
                            <div
                              key={field.id}
                              className="flex justify-between"
                            >
                              <FormField
                                control={form.control}
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
            </div>
            <CardFooter className="pt-10">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
