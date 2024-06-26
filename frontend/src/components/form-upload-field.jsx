/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XLV23PvVbki
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function FormUploadField() {
  return (
    <div className="flex min-h-screen">
      <div className="bg-primary p-8 flex flex-col justify-center flex-1">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Get in Touch
        </h2>
        <form className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="block mb-1 text-primary-foreground"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-md border border-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block mb-1 text-primary-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <Label
              htmlFor="message"
              className="block mb-1 text-primary-foreground"
            >
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Enter your message"
              className="w-full px-4 py-2 rounded-md border border-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="bg-[url('/placeholder.svg')] bg-cover bg-center bg-no-repeat flex-1" />
    </div>
  );
}
