import { CodeIcon, MailIcon, MapPinIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="relative -bottom-10 py-10 md:px-3 bg-gray-100 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-16 items-start justify-between">
            <Link
              href="/main/home"
              className="md:mr-10 pt-3 flex flex-row items-center hover:text-primary gap-1"
            >
              <Image
                src="/images/boasafarislogo.png"
                alt="The Best of Africa Safaris Logo"
                width={500}
                height={500}
                className="h-12 w-32 dark:invert"
              />
              <span className="font-black text-xl">
                The Best of Africa Safaris
              </span>
            </Link>
            <div>
              <h4 className="font-semibold text-lg py-3">Contact</h4>
              <div className="flex-1">
                <div className="flex items-center py-4">
                  <MapPinIcon />
                  <p>Arusha Eyasi, Tanzania</p>
                </div>
                <div className="flex items-center py-4">
                  <MailIcon />
                  <Link
                    href="mailto:sonayilodge@gmail.com"
                    className="ml-2 hover:text-primary"
                  >
                    sonayilodge@gmail.com
                  </Link>
                </div>
                <div className="flex items-center py-4">
                  <SmartphoneIcon />
                  <Link
                    href="tel:+255742446107"
                    className="ml-2 hover:text-primary"
                  >
                    +255742446107
                  </Link>
                </div>
                <div className="flex items-center pt-4">
                  <CodeIcon />
                  <p className="ml-2">
                    Made by{" "}
                    <Link
                      href="https://ayanda.vercel.app/"
                      className="underline hover:text-primary"
                    >
                      Ayanda Kinyambo
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 md:text-right">
              <h4 className="font-semibold text-lg py-3">Company</h4>
                <Link
                  href="/"
                  className="pb-4 hover:text-primary block"
                >
                  Home
                </Link>
                <Link
                  href="/"
                  className="pb-4 hover:text-primary block"
                >
                  About
                </Link>
                <Link
                  href="/"
                  className="pb-4 hover:text-primary block"
                >
                  Gallery
                </Link>
            </div>
            <div className="flex-1 md:text-right">
              <h4 className="font-semibold text-lg py-3">Legal</h4>
              <Link
                href={`/main/about`}
                className="pb-4 hover:text-primary block"
              >
                About Us
              </Link>
              <Link
                href="/lodge/terms-of-service"
                className="pb-4 hover:text-primary block"
              >
                Terms of Service
              </Link>
              <Link
                href="/lodge/contact"
                className="pb-4 hover:text-primary block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-10 bg-neutral-700" />
        <p className="px-4 text-center">
          {" "}
          &copy; {year} The Best of Africa Safaris.
        </p>
      </footer>
    </>
  );
}
