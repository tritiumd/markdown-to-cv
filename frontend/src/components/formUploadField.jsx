"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Your name on CV must be at least 5 characters.",
    })
    .max(160, {
      message: "Your name must not be longer than 30 characters.",
    }),
});

export default function FormUploadField() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="flex min-h-screen">
      <div className="bg-primary p-8 flex flex-col justify-center flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Accordion type="single" className="text-white" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <FormLabel className="text-white">Username</FormLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Input
                            placeholder="Put your name here!"
                            className="text-black rounded-sm"
                            {...field}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </FormControl>
                  <FormDescription>
                    Must be full name, not less than 5 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="bg-[url('/placeholder.svg')] bg-cover bg-center bg-no-repeat flex-1" />
    </div>
  );
}
