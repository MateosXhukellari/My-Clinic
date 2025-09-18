import logo from "../../img/img.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ClipboardPen } from "lucide-react";
import { Video } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";

export function HomePage() {
  const { theme, setTheme, actualTheme } = useTheme();

  // For the switch, treat "system" based on actual resolved theme
  const isDark = actualTheme === "dark";

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };
  return (
    <div className="min-h-screen ">
      <section className="py-20 bg-[var(--brand-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-[var(--brand-text)]">
            <h2 className="text-3xl font-bold mb-4 text-[var(--brand-text)] intersect:motion-preset-slide-up motion-delay-100">
              Why Choose MyClinic?
            </h2>
          </div>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="flex items-center space-x-2">
              <Sun
                className={`w-4 h-4 transition-colors duration-300 ${
                  !isDark ? "text-yellow-500" : "text-gray-400"
                }`}
              />
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  !isDark ? "text-[var(--brand-text)]" : "text-gray-400"
                }`}
              >
                Light
              </span>
            </div>

            <Switch
              id="switch-theme"
              checked={isDark}
              onCheckedChange={handleToggle}
              className="data-[state=checked]:bg-blue-600 transition-colors duration-300"
            />

            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDark ? "text-[var(--brand-text)]" : "text-gray-400"
                }`}
              >
                Dark
              </span>
              <Moon
                className={`w-4 h-4 transition-colors duration-300 ${
                  isDark ? "text-blue-400" : "text-gray-400"
                }`}
              />
            </div>

            {/* Show system indicator if using system theme */}
            {theme === "system" && (
              <div className="ml-2 px-2 py-1 text-xs bg-[var(--brand-card-bg)] border border-[var(--brand-border)] rounded-md text-[var(--brand-text)] transition-colors duration-300">
                Auto
              </div>
            )}
          </div>
          <div className="flex flex-col gap-16 items-center justify-center bg-[var(--brand-bg)]">
            <div className="card text-center bg-[var(--brand-bg)]">
              <p className="text-[var(--brand-text)] intersect:motion-preset-slide-up motion-delay-100">
                Comprehensive primary care for common conditions, with referrals
                to specialists when needed
              </p>
            </div>

            <div className="card text-center bg-[var(--brand-bg)]">
              <p className="text-[var(--brand-text)]/85 motion-preset-focus intersect:motion-preset-slide-up motion-delay-100">
                Upload your documents before the consultation. I will review
                them in advance and prepare the best advice for you
              </p>
            </div>
            <AspectRatio
              ratio={19 / 6}
              className="bg-muted rounded-lg mx-34 mx-auto w-96"
            >
              <img
                src={logo}
                alt="Logo"
                className=" w-full h-full object-cover rounded-lg motion-preset-blur-right"
                loading="lazy"
              />
            </AspectRatio>
            <div className="text-center mb-16 motion-preset-slide-right">
              <h1 className="text-2xl font-bold mb-4">What do we offer?</h1>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="shadow-md rounded-2xl intersect:motion-preset-slide-up motion-delay-0">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="w-8 h-8" />
                    <CardTitle className="text-xl font-bold">
                      Video Call:
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="list-disc list-inside space-y-1">
                    <li>Test Test Test</li>
                    <li>Test Test Test</li>
                    <li>Test Test Test</li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="shadow-md rounded-2xl intersect:motion-preset-fade">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardPen className="w-8 h-8" />

                    <CardTitle className="text-xl font-bold">
                      Text Chat:
                    </CardTitle>
                  </div>
                  <CardContent>
                    <ol className="list-disc list-inside space-y-1">
                      <li>Test Test Test</li>
                      <li>Test Test Test</li>
                      <li>Test Test Test</li>
                    </ol>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
