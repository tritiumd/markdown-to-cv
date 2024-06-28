"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  username: z.string().max(100),
  position: z.string().max(100),
  summary: z.string().max(1000),
  skills: z.string().max(1000),
});
//   .refine(
//     (data) => {
//       return data.password === data.passwordConfirm;
//     },
//     {
//       message: "Passwords do not match",
//       path: ["passwordConfirm"],
//     }
//   )
//   .refine(
//     (data) => {
//       if (data.accountType === "company") {
//         return !!data.companyName;
//       }
//       return true;
//     },
//     {
//       message: "Company name is required",
//       path: ["companyName"],
//     }
//   );

export default function CvForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      position: "",
      summary: "",
      skills: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

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
                            placeholder="Put your name here"
                            type="text"
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
                  name="position"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Put your position here"
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
                        <FormLabel>Skill</FormLabel>
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
