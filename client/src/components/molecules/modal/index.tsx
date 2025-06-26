"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ModalProps } from "@/types";
import { X } from "lucide-react";

const Modal = ({
  children,
  title,
  description,
  footer,
  trigger,
  triggerClassName,
  notClose,
  open,
  setIsOpen,
  className,
  onClose
}: ModalProps) => {

  const handleClose = (isOpen: boolean) => {
    onClose&&onClose();
    setIsOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleClose} >
      <DialogTrigger asChild>
        <div className={triggerClassName} onClick={() => setIsOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className={cn(className, "[&>button]:hidden")}>
        <DialogHeader>
          <div className="relative">
            {title && <DialogTitle>{title}</DialogTitle>}{" "}
            {!notClose && (
              <div className="absolute top-0.5 right-0 cursor-pointer hover:bg-gray-200 rounded-md -mt-1 px-1 py-1 bg-gray-100 text-center">
                <X className="w-4 h-4 text-black" onClick={() => handleClose(false)} />
              </div>
            )}
          </div>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && (
          <DialogFooter>
            <span onClick={() => handleClose(false)}>{footer}</span>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
