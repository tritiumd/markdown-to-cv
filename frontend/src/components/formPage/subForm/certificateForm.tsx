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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleMinus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function CertificateForm() {
  const methods = useFormContext();
  const {
    fields: certificates,
    append: appendCertificates,
    remove: removeCertificates,
  } = useFieldArray({
    name: "certificates",
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
                <FormLabel>Put your certificates like below</FormLabel>
                {certificates.map((field, index) => (
                  <div key={field.id} className="flex justify-between">
                    <FormField
                      control={methods.control}
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
  );
}
