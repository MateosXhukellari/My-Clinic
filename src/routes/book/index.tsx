import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { ClipboardPen } from "lucide-react";

export const Route = createFileRoute("/book/")({
  component: PurposePage,
  errorComponent: () => (
    <div className="p-6 text-red-600">
      Something broke. Please go back and try again.
    </div>
  ),
});

function PurposePage() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 motion-translate-y-in-100 motion-duration-[2s] motion-ease-spring-smooth">
      <h1 className="text-3xl font-bold text-center">What do you need?</h1>

      {/* Two options side by side on larger screens */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Second Opinion Card */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2 ">
              <ClipboardPen className="w-8 h-8" />
              <CardTitle className="text-xl font-bold">
                Second opinion on your diagnosis
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="list-disc list-inside space-y-1 dark:text-gray-400 ">
              <li>Review of your current diagnosis</li>
              <li>Suggestions for potential treatment</li>
              <li>Consideration of medication side effects</li>
              <li>Price: €10 for document upload</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate({ to: "/book/chat" });
              }}
            >
              Second opinion
            </Button>
          </CardFooter>
        </Card>

        {/* Health Advice Card */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-green-600 dark:text-green-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <CardTitle className="text-xl font-bold">
                Health advice for your condition
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ol className="list-disc list-inside space-y-1 dark:text-gray-400">
              <li>Discussion about current symptoms</li>
              <li>Practical care suggestions</li>
              <li>Guidance on whether a specialist is needed</li>
              <li>Prices: €15 chat and €30 video call</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                navigate({ to: "/book/form" });
              }}
            >
              Health advice
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
