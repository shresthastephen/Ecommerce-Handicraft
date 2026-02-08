import { Link } from "react-router-dom";
import { Facebook, Instagram, } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center">
                <span className="font-serif font-bold text-lg text-primary-foreground">
                  SH
                </span>
              </div>
              <span className="font-serif text-xl font-semibold">
                Shrestha Handicraft
              </span>
            </Link>

            <p className="text-sm text-muted-foreground mb-4">
              Handcrafted sacred sculptures bringing divinity to your home.
              Each piece is crafted with devotion and artistry.
            </p>

            <div className="flex gap-4">
              <SocialIcon label="Facebook">
                <Facebook />
              </SocialIcon>
              <SocialIcon label="Instagram">
                <Instagram />
              </SocialIcon>
              
              
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/shops">All Products</FooterLink>
          </FooterColumn>

          {/* Info */}
          <FooterColumn title="Information">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms & Conditions</FooterLink>
          </FooterColumn>

          {/* Contact */}
          <div>
            <h4 className="footer-title mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Thaina, Lalitpur, Nepal</li>
              <li>
                <a
                  href="mailto:stephencrestha07@gmail.com"
                  className="footer-link"
                >
                  info@shresthahandicraft.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+977 9841835052"
                  className="footer-link"
                >
                  +977 9841835052
                </a> <br />
                <a
                  href="tel:+977 9841835052"
                  className="footer-link"
                >
                  +977 9863021927
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Shrestha Handicraft. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ---------- Reusable Helpers ---------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="footer-title mb-4">{title}</h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link to={to} className="footer-link text-sm">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="p-2 rounded-md text-muted-foreground hover:text-yellow-500 transition-colors"
    >
      {children}
    </a>
  );
}



