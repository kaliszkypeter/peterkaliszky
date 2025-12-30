import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/" data-testid="link-footer-home">
              <span className="font-serif font-semibold cursor-pointer">
                Peter Kaliszky
              </span>
            </Link>
            <span className="text-muted-foreground text-sm">
              Product Owner
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
