"use client";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
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
  initialResumeValue,
  ResumeFormType,
  useFormCreateForm,
} from "../Schema/formSchema";
import ChooseLanguageFormButton from "@/components/custom/button/ChooseLanguageFormButton/ChooseLanguageFormButton";

const url = BASE_URL;
const FORM_DATA_KEY = "app_form_local_data";
export const usePersistForm = ({
  value,
  localStorageKey,
}: {
  value: any;
  localStorageKey: any;
}) => {
  React.useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value, localStorageKey]);

  return;
};
export default function CvForm() {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const getSavedData = () => {
    let data;
    if (typeof window !== "undefined") {
      data = window.localStorage.getItem(FORM_DATA_KEY);
    }
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
      return data;
    }

    return initialResumeValue;
  };
  const methods = useFormCreateForm(getSavedData());
  usePersistForm({
    value: methods.getValues(),
    localStorageKey: FORM_DATA_KEY,
  });
  const [formLanguage, setFormLanguage] = React.useState("vi");
  async function handleSubmit(values: ResumeFormType) {
    try {
      console.log("submit values", values);
      console.log(JSON.stringify(values));
      // post to your API
      const response = await fetch(`${url}/submit-form?language=${formLanguage}`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      // Handle response if necessary
      const data = await response.json();

      const uid = data.uid;
      console.log("Return data:", data);
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
  }

  return (
    <div className="flex-col items-center justify-between px-10 pt-2 overflow-hidden max-h-full overflow-y-auto h-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="">
          <div className="form-container">
            <PersonalForm />
            <CertificateForm />
            <EducationForm />
            <ExperienceForm />
            <ActivityForm />
          </div>
          <CardFooter className="pt-10 gap-2">
            <Button type="submit" className="w-full">
              Create CV now
            </Button>
            <Button
              type={"reset"}
              variant="outline"
              className={"place-self-center"}
              onClick={() => methods.reset(initialResumeValue)}
            >
              Reset
            </Button>
            <ChooseLanguageFormButton 
              value={formLanguage}
              onChange={setFormLanguage}
            />

          </CardFooter>
        </form>
      </FormProvider>
    </div>
  );
}
