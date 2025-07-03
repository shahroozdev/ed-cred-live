import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";

const CardTemplate = ({
  children,
  title,
  desc,
  footer,
  className,
}: {
  children: React.ReactNode;
  title?: {comp:React.ReactNode, className?:string};
  desc?: {comp:React.ReactNode, className?:string};
  footer?: {comp:React.ReactNode, className?:string};   
  className?:string;
}) => {
  return (
    <Card className={className}>    
      <CardHeader>
       {title && <CardTitle {...title}>{title.comp}</CardTitle>}
       {desc && <CardDescription {...desc}>{desc.comp}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter {...footer}>{footer.comp}</CardFooter>}
    </Card>
  );
};

export default CardTemplate;
