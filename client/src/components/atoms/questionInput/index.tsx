import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/types";
import RatingInput from "../rattingInput";

// Dynamically renders the correct input type based on the question type
const QuestionInput = ({ question, color, onChange }: { question: Question, color: string, onChange: (value: any) => void }) => {
    switch (question.type) {
        case "rating":
            return <RatingInput value={0} color={color} onChange={onChange} />;
        case "multiple_choice":
            return (
                <RadioGroup onValueChange={(value) => onChange(value)} className="ml-auto">
                    {question.options?.map((option, i) => (
                        <Label key={i} className="flex items-center gap-2">
                            <RadioGroupItem value={option.value} />
                            {option.value}
                        </Label>
                    ))}
                </RadioGroup>
            );
        case "true_false":
            return (
                <RadioGroup onValueChange={(value) => onChange(value === "true")}>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="true" /> True
                    </Label>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="false" /> False
                    </Label>
                </RadioGroup>
            );
        case "open_ended":
            return <Textarea onChange={(e) => onChange(e.target.value)} />;
        default:
            return null;
    }
};

export default QuestionInput;