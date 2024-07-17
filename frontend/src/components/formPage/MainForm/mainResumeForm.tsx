"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import * as React from "react";
import "./form.css";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import PersonalForm from "../SubForm/personalForm";
import CertificateForm from "../SubForm/certificateForm";
import EducationForm from "../SubForm/educationForm";
import ActivityForm from "../SubForm/activityForm";
import ExperienceForm from "../SubForm/experienceForm";
import { BASE_URL } from "@/constants/variables";
import { useDispatch } from "react-redux";
import { setApiUrl } from "@/store/slice";
import {
  formResumeSchema,
  ResumeFormType,
  useFormCreateForm,
} from "../Schema/formSchema";
const url = BASE_URL;

export default function CvForm() {
  const { toast } = useToast();
  const methods = useFormCreateForm();
  const dispatch = useDispatch();
  const handleSubmit = async (values: ResumeFormType) => {
    try {
      // post to your API
      const response = await fetch(`${url}/submit-form`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      // Handle response if necessary
      const data = await response.json();

      console.log("Submission data:", data);
      const uid = data.uid;
      dispatch(setApiUrl(uid));
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
