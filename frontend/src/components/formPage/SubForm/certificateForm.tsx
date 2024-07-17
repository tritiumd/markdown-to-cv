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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CircleMinus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useFormContextResume } from "../Schema/formSchema";

export default function CertificateForm() {
  const methods = useFormContextResume();
  const {
    fields: certificates,
    append: appendCertificates,
    remove: removeCertificates,
  } = useFieldArray({
    name: "certificate",
    control: methods.control,
  });
  return (
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
                {/* <FormLabel>Put your certificates like below</FormLabel> */}
                {certificates.map((field, index) => (
                  <SubCertificateField
                    key={field.id}
                    id={field.id}
                    index={index}
                    control={methods.control}
                    remove={removeCertificates}
                  />
                ))}
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() =>
                      appendCertificates({
                        name: "",
                        year: "",
                        extra: "",
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
  );
}
function SubCertificateField({ id, index, control, remove }: any) {
  return (
    <div key={id} className="flex flex-col gap-1">
      <FormField
        control={control}
        key={`${id}-name`}
        name={`certificate.${index}.name`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Certificate name"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        key={`${id}-year`}
        name={`certificate.${index}.year`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Year</FormLabel>
            <FormControl>
              <Input {...field} placeholder={"Certificate year"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        key={`${id}-extra`}
        name={`certificate.${index}.extra`}
        render={({ field }) => (
          <FormItem className="w-full m-1">
            <FormLabel>Extra information</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={
                  "Extra information (if needed), like:\n- First\n- Second"
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant="secondary"
        onClick={() => remove(index)}
        size="icon"
        className="dynamic-delete-button self-end"
      >
        <CircleMinus />
      </Button>
      <Separator />
    </div>
  );
}
