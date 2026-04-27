import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full border-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 border-gray-300 dark:border-gray-600 cursor-pointer"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
            theme === "dark" ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-blue-600 transition-all duration-300 ${
            theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        />
      </div>
    </Button>
  );
}
