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
import TextArea from "antd/es/input/TextArea";

const FormSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Your name on CV must be at least 5 characters.",
    })
    .max(160, {
      message: "Your name must not be longer than 30 characters.",
    }),
  position: z.string().max(100),
  summary: z.string().max(160),
  skills: z.string().max(320),
});

export default function FormUploadField() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  function onSubmit(data) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-100 p-4">
          <code className="">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="flex min-h-screen">
      <div className="bg-inherit p-8 flex flex-col justify-center flex-1">
        <Accordion
          type="single"
          className=""
          collapsible
          defaultValue={["item-1", "item-2", "item-3", "item-4"]}
        >
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
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <FormLabel className="">Username</FormLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Input
                            placeholder="Put your name here!"
                            className="rounded-sm"
                            {...field}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <FormLabel className="">Applying Position</FormLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Input
                            placeholder="Put your position here!"
                            className="rounded-sm"
                            {...field}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <FormLabel className="">Summary</FormLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TextArea
                            placeholder="Write something about yourself!"
                            className=" rounded-sm"
                            {...field}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <FormLabel className="">Skills</FormLabel>
                        </AccordionTrigger>
                        <AccordionContent>
                          <TextArea
                            placeholder="List your skills here!"
                            className=" rounded-sm"
                            {...field}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </Accordion>
      </div>
    </div>
  );
}
