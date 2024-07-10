"use client";
import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import * as React from "react";
import "./form.css";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import PersonalForm from "./subForm/personalForm";
import CertificateForm from "./subForm/certificateForm";
import EducationForm from "./subForm/educationForm";
import ActivityForm from "./subForm/activityForm";
import ExperienceForm from "./subForm/experienceForm";

const url = process.env.NEXT_PUBLIC_MY_URL;
const formSchema = z.object({
  name: z.string().max(100),
  position: z.string().max(100),
  info: z.array(
    z.object({
      icon: z.string(),
      data: z.string(),
    })
  ),
  summary: z.string().max(1000),
  skills: z.string().max(1000),
  certificates: z.array(
    z
      .object({
        year: z.string(),
        name: z.string(),
        extra: z.string().optional(),
      })
      .optional()
  ),
  education: z.array(
    z
      .object({
        place: z.string().describe("Your Institution"),
        major: z.string().describe("Your Major"),
        time: z.string().describe("Your Time"),
        extra: z.string().optional(),
      })
      .optional()
  ),
  experiences: z.array(
    z
      .object({
        place: z.string().describe("Your company in past"),
        phase: z.array(
          z
            .object({
              time: z.string().describe("Your Time"),
              position: z.string().describe("Your Position"),
              detail: z.string().describe("Your Detail").optional(),
            })
            .optional()
        ),
      })
      .optional()
  ),
  activities: z.array(
    z
      .object({
        place: z.string().describe("Your group in past"),
        phase: z.array(
          z
            .object({
              time: z.string().describe("Your Time"),
              position: z.string().describe("Your Position"),
              detail: z.string().describe("Your Detail"),
            })
            .optional()
        ),
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
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      position: "",
      summary: "",
      skills: "",
      info: [
        { icon: "fa-phone", data: "Your phone number" },
        { icon: "fab .fa-github", data: "Your github" },
        { icon: "fa-envelope", data: "Your email" },
      ],
      certificates: [{ year: "", name: "" }],
      education: [
        {
          place: "",
          major: "",
          time: "",
        },
      ],
      experiences: [
        {
          place: "",
          phase: [
            {
              time: "",
              position: "",
              detail: "",
            },
          ],
        },
      ],
      activities: [
        {
          place: "",
          phase: [
            {
              time: "",
              position: "",
              detail: "",
            },
          ],
        },
      ],
      references: [{ value: "" }],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // post to your API
      const response = await fetch(`${url}/form/submit-form`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      // Handle response if necessary
      const data = await response.json();

      console.log("Submission data:", data);
      console.log("Form data:", values);

      toast({
        title: "Success",
        description: "Your CV has been submitted",
      });
    } catch (error) {
      console.error("Submission error:", error);
      // Optionally, show an error toast
      toast({
        title: "Error",
        description: "There was an issue!",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex-col items-center justify-between px-10 pt-2 overflow-hidden max-h-full">
      <Card className="overflow-y-auto">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="">
            <div className="form-container">
              <PersonalForm />
              <CertificateForm />
              <EducationForm />
              <ActivityForm />
              <ExperienceForm />
            </div>
            <CardFooter className="pt-10">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </CardFooter>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
}
