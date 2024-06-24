/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iGCZb9XsVpn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center gap-4">
          <Avatar key="BD">
            <AvatarImage src="https://github.com/kidclone3.png" />
            <AvatarFallback>BD</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">Bùi Duy</h4>
            <p className="text-sm text-muted-foreground">
              Software Engineer, Web Developer{" "}
            </p>
            <div className="flex gap-4">
              <Mail
                size={20}
                onClick={() => window.open("mailto:kid21200@gmail.com")}
              />
              <Linkedin
                size={20}
                onClick={() =>
                  window.open("https://www.linkedin.com/in/delus3")
                }
              />
              <Github
                size={20}
                onClick={() => window.open("https://github.com/kidclone3")}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar key="PBT">
            <AvatarImage src="https://github.com/blaplafla13th.png" />
            <AvatarFallback>PBT</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">Phạm Bá Thắng</h4>
            <p className="text-sm text-muted-foreground">
              Freelancer, Core Engine Developer
            </p>
            <div className="flex gap-4">
              <Mail size={20} />
              <Linkedin size={20} />
              <Github
                size={20}
                onClick={() => window.open("https://github.com/blaplafla13th")}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
