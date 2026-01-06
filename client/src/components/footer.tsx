import { Link } from "wouter";
import replitLogo from "@assets/brands/replit.svg";
import cursorLogo from "@assets/brands/cursor.svg";
import codexLogo from "@assets/brands/codex.png";
import vercelLogo from "@assets/brands/vercel.svg";

export function Footer() {
  const logos = [
    {
      name: "Replit",
      href: "https://replit.com/",
      src: replitLogo,
    },
    {
      name: "Cursor",
      href: "https://cursor.com/",
      src: cursorLogo,
    },
    {
      name: "Codex",
      href: "https://openai.com/codex/",
      src: codexLogo,
    },
    {
      name: "Vercel",
      href: "https://vercel.com/",
      src: vercelLogo,
    },
  ];

  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <Link href="/" data-testid="link-footer-home">
            <span className="font-serif font-semibold cursor-pointer">
              Peter Kaliszky
            </span>
          </Link>
          <span className="text-muted-foreground text-sm">
            Product Owner
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end sm:text-right">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Built with
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            {logos.map((logo) => (
              <a
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="transition-opacity opacity-70 hover:opacity-100"
                aria-label={`${logo.name} website`}
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className={`h-5 w-auto object-contain dark:invert ${
                    logo.name === "Codex" ? "transform scale-[1.2]" : ""
                  }`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
