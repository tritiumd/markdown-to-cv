import Footer from "@/components/footer";
import MainNav from "@/components/main-nav";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import UploadField from "@/components/upload";
import { Flex } from "antd";
import { FilePen, PhoneIncoming, Shapes, Upload } from "lucide-react";

export default function MainPage() {
  return (
    <div className="items-center justify-between p-2">
      <section className="grid grid-cols-2 gap-6 max-w-6xl mx-auto px-4 py-24">
        <CardComponent
          Icon={Shapes}
          title="Form"
          description="Easily create and customize forms for your users."
        />
        <CardComponent
          Icon={FilePen}
          title="Editor"
          description="Powerful text editor with rich formatting options."
        />
        <CardComponent
          Icon={Upload}
          title="Upload"
          description="Seamlessly upload files and manage your media."
        />
        <CardComponent
          Icon={PhoneIncoming}
          title="Incoming..."
          description="Manage and track incoming requests and messages."
        />
      </section>
    </div>
  );
}

function CardComponent({ Icon, title, description }) {
  return (
    <Card className="bg-background rounded-lg shadow-lg overflow-hidden">
      <CardContent className="p-6 flex flex-col items-start gap-4">
        <Icon className="w-10 h-10 text-primary" />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
