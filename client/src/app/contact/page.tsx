import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>

            <div className="space-y-4 text-gray-600">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Office</h2>
                <p>123 Example Street<br />City, Country</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
                <p>+1 (123) 456-7890</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Email</h2>
                <p>contact@example.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
