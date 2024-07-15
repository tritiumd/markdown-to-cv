import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={cn(
        "min-w-full bg-muted text-muted-foreground py-12",
        className
      )}
    >
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
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
};
