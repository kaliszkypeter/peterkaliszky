import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location === "/") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`max-w-3xl mx-auto px-4 py-2.5 rounded-xl transition-all duration-500 ${
          isScrolled
            ? "bg-background/60 dark:bg-background/40 backdrop-blur-xl border border-foreground/[0.08] shadow-lg shadow-black/[0.03] dark:shadow-black/[0.1]"
            : "bg-background/30 dark:bg-background/20 backdrop-blur-md border border-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="/" data-testid="link-home">
            <motion.span
              className="font-serif text-lg font-semibold cursor-pointer px-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              PK
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5 flex-wrap">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground px-3 h-8"
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="ml-1 pl-2 border-l border-foreground/10">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
              className="h-8 w-8"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Floating below navbar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-3xl mx-auto mt-2"
          >
            <div className="bg-background/80 dark:bg-background/60 backdrop-blur-xl border border-foreground/[0.08] rounded-2xl p-3 shadow-lg">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 text-muted-foreground hover:text-foreground"
                      onClick={() => handleNavClick(item.href)}
                      data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
