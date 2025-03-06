import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center border-t bg-muted">
      <div className="mx-auto px-4 container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-bold text-xl">IQTISADIYYAT</div>
            <p className="text-sm text-muted-foreground">
              The premier economics conclave by The Economics Society of Shiv
              Nadar University.
            </p>
          </div>
          <div className="space-y-4">
            <div className="font-bold">Quick Links</div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#speakers"
                  className="text-sm hover:text-primary"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-sm hover:text-primary"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#schedule"
                  className="text-sm hover:text-primary"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="#tickets"
                  className="text-sm hover:text-primary"
                >
                  Tickets
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold">Contact</div>
            <ul className="space-y-2">
              <li className="text-sm">economics.society@snu.edu.in</li>
              <li className="text-sm">+91 123 456 7890</li>
              <li className="text-sm">Shiv Nadar University, Greater Noida</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold">Follow Us</div>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 IQTISADIYYAT. All rights reserved. The Economics
            Society, Shiv Nadar University.</p>
        </div>
      </div>
    </footer>
  );
}