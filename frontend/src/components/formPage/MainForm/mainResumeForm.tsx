"use client";
import { downloadAPI, submitAPI } from "@/app/Api";
import ChooseLanguageFormButton from "@/components/custom/button/ChooseLanguageFormButton/ChooseLanguageFormButton";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUID, submitUID } from "@/store/slice";
import { Download } from "lucide-react";
import * as React from "react";
import { FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  initialResumeValue,
  ResumeFormType,
  useFormCreateForm,
} from "../Schema/formSchema";
import ActivityForm from "../SubForm/activityForm";
import CertificateForm from "../SubForm/certificateForm";
import EducationForm from "../SubForm/educationForm";
import ExperienceForm from "../SubForm/experienceForm";
import PersonalForm from "../SubForm/personalForm";
import ProjectForm from "../SubForm/projectForm";
import ReferenceForm from "../SubForm/referenceForm";
import "./form.css";

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
  const [formLanguage, setFormLanguage] = React.useState("en");
  const currentUID = useSelector(getCurrentUID);
  async function handleSubmit(values: ResumeFormType) {
    try {
      const uid = await submitAPI(values, formLanguage);
      dispatch(submitUID(uid));

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
        action: (
          <ToastAction altText="Try again" onClick={() => handleSubmit(values)}>
            Try again
          </ToastAction>
        ),
      });
    }
  }
  async function handleDownload(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      await downloadAPI(currentUID, formLanguage);
    } catch (error) {
      console.error("Download error:", error);
      // Optionally, show an error toast
      toast({
        title: "Error",
        description: "There was an issue!",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => handleDownload(event)}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  }

  function handleReset() {
    methods.reset(initialResumeValue);
    dispatch(submitUID(""));
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
            <ProjectForm />
            <ActivityForm />
            <ReferenceForm />
          </div>
          <CardFooter className="pt-10 gap-2">
            <Button type="submit" className="w-full">
              Create CV now
            </Button>
            <Button
              type={"reset"}
              variant="outline"
              className={"place-self-center"}
              onClick={handleReset}
            >
              Reset
            </Button>
            <ChooseLanguageFormButton
              value={formLanguage}
              onChange={setFormLanguage}
            />
            <Button
              onClick={handleDownload}
              variant="outline"
              disabled={!currentUID}
              className="place-self-center gap-2"
            >
              <Download />
              Download
            </Button>
          </CardFooter>
        </form>
      </FormProvider>
    </div>
  );
}
