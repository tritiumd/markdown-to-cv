/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iGCZb9XsVpn
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">Bùi Duy</h4>
            <p className="text-sm text-muted-foreground">Software Engineer, Web Developer </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">Phạm Bá Thắng</h4>
            <p className="text-sm text-muted-foreground">Freelancer, Core Engine Developer</p>
          </div>
        </div>
      </div>
    </footer>
  )
}