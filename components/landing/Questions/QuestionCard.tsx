import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questionsItem } from "@/lib/questions-items";

interface QuestionCardProps {
  title: string;
  body: string;
  value: string;
}

export const QuestionCard = () => {
  return (
    <Accordion defaultValue={["jenis-event"]} className="w-full md:w-3/4 mt-8">
      {questionsItem.map(({ title, body, value }: QuestionCardProps) => {
        return (
          <AccordionItem value={value} key={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{body}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
