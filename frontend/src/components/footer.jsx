/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iGCZb9XsVpn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted py-6 md:py-8 lg:py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
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
                <Link href="https://github.com/kidclone3" target="_blank">
                  <Github size={20} />
                </Link>
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
                <Link href="https://github.com/blaplafla13th" target="_blank">
                  <Github size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
