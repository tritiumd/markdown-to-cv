import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

export const schemaInfo = z.object({
  icon: z.string(),
  data: z.string(),
  type: z.string().optional(),
});

export const schemaCertificate = z.object({
  year: z.string(),
  name: z.string(),
  extra: z.string().optional(),
});

export const schemaEducation = z.object({
  place: z.string().describe("Your Institution"),
  major: z.string().describe("Your Major"),
  time: z.string().describe("Your Time"),
  extra: z.string().optional(),
});

export const schemaPhase = z.object({
  time: z.string().describe("Your Time"),
  position: z.string().describe("Your Position"),
  detail: z.string().describe("Your Detail"),
});

export const schemaExperience = z.object({
  place: z.string().describe("Your company in past"),
  phase: z.array(schemaPhase.optional()),
});

export const schemaActivity = z.object({
  place: z.string().describe("Your group in past"),
  phase: z.array(schemaPhase.optional()),
});

export const schemaReference = z.object({
  value: z.string(),
});
export const formResumeSchema = z.object({
  name: z.string().max(100),
  position: z.string().max(100),
  info: z.array(schemaInfo),
  summary: z.string().max(1000),
  skill: z.string().max(1000),
  certificate: z.array(schemaCertificate.optional()),
  education: z.array(schemaEducation.optional()),
  experience: z.array(schemaExperience.optional()),
  activity: z.array(schemaActivity.optional()),
  reference: z.array(schemaReference).optional(),
});

export type ResumeFormType = z.infer<typeof formResumeSchema>;

export const useFormCreateForm = () =>
  useForm<ResumeFormType>({
    resolver: zodResolver(formResumeSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      position: "",
      summary: "",
      skill: "",
      info: [
        { icon: "fa-phone", data: "" },
        { icon: "fab .fa-github", data: "" },
        { icon: "fa-envelope", data: "" },
      ],
      certificate: [],
      education: [],
      experience: [],
      activity: [],
      reference: [],
    },
  });

export const useFormContextResume = () => useFormContext<ResumeFormType>();
export const useFormContextExperience = () =>
  useFormContext<z.infer<typeof schemaExperience>>();

export const useFormContextPhase = () =>
  useFormContext<z.infer<typeof schemaPhase>>();
