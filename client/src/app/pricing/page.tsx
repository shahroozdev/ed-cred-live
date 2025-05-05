import { CircleCheckIcon } from "lucide-react";
import { plans, PricingPlan } from "./plans";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const PricingPage = () => {
    return (
        <main className="w-full h-auto font-inter bg-green-600 text-white p-20 flex flex-col gap-40 items-center pt-32">
            <div className="flex items-start justify-between w-3/4">
                <div className="text-7xl font-semibold">Pricing Plans</div>
                <div className="text-2xl font-normal">
                    Choose a plan that is right for you. <br/> Pause or cancel anytime
                </div>
            </div>
            <div className="grid grid-cols-3 gap-20 w-3/4 mx-auto">
                {
                    plans.map((plan, i) => <PricingCard plan={plan} key={i} />)
                }
            </div>
            <div className="flex items-start justify-between w-3/4 mt-20">
                <div className="text-7xl font-semibold">FAQ's</div>
                <div className="text-2xl font-normal">
                    Frequenty asked questions <br/> Ed-Cred is Safe and Authentic
                </div>
            </div>
            <FAQ />
            <div className="w-3/4 text-xl font-semibold">
                Mady by high-house
            </div>
        </main>
    )
}

const PricingCard = ({ plan } : { plan: PricingPlan }) => {
    return (
        <div className={`p-6 rounded-4xl flex flex-col shadow-md bg-white text-black ${plan.primary ? "scale-115" : ""}`}>
            <div className="text-2xl font-semibold">{plan.title}</div>
            <div className="text-base font-normal mb-4">{plan.description}</div>
            <div className="text-6xl font-semibold flex items-start gap-2">
                {plan.price}
                <span className="text-lg font-normal">{plan.frequency}</span>
            </div>
            <div className="w-full h-0.5 bg-black/40 rounded-full my-4"/>
            <div className="flex flex-col gap-1 text-lg font-normal mb-8">
                {
                    plan.features.map((feature, i) => (<div className="flex gap-2 items-center" key={`${plan.title}-feature-${i}`}>
                        <CircleCheckIcon fill="oklch(0.627 0.194 149.214)" stroke="white" />
                        <div>{feature}</div>
                    </div>))
                }
            </div>
            <button className="w-full mt-auto rounded-2xl bg-green-600 text-white py-3 hover:shadow-md hover:opacity-90 cursor-pointer">Buy Now</button>
        </div>
    )
}


const FAQ = () => {
    return (
        <Accordion type="single" collapsible className="w-3/4">
            <AccordionItem value="item-1">
                <AccordionTrigger>Is my identity really hidden?</AccordionTrigger>
                <AccordionContent>
                    Yes. Ed-Cred uses strong anonymity protocols to ensure your identity is never linked to your reviews.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Can schools see who left the reviews?</AccordionTrigger>
                <AccordionContent>
                    No. Schools can only see the review content, never the reviewer's identity.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>What kind of schools can I review?</AccordionTrigger>
                <AccordionContent>
                    You can review high schools, colleges, and universities across the country.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Can I edit or delete my review?</AccordionTrigger>
                <AccordionContent>
                    Yes, you can manage your reviews anytime through your anonymous profile.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Is Ed-Cred free to use?</AccordionTrigger>
                <AccordionContent>
                    Yes! It's completely free for students and alumni.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default PricingPage;
