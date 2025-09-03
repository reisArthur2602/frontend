import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { ReactNode } from "react";
import { Badge } from "./ui/badge";



interface PreviewMenuDialogProps {
  menu: Menu;
  children: ReactNode;
}
export const PreviewMenuDialog = ({
  menu,
  children,
}: PreviewMenuDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Visualizar Menu</DialogTitle>
        </DialogHeader>
        {menu && (
          <div className="space-y-4">
            {menu.keywords && (
                    <div className="flex items-center gap-2">
                      {menu.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}

            <div className="bg-primary/5 border-primary rounded border-l-4 p-4">
              <div className="text-sm whitespace-pre-wrap">{menu.message}</div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
