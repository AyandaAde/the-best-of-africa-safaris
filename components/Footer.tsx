import { CodeIcon, MailIcon, MapPinIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <footer className="relative py-10 w-screen md:px-5 text-gray-200 bg-[url('/images/background__layout.png')] bg-[#282f34] dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-16 items-start justify-between">
            <Link
              href="/main/home"
              className="md:mr-10 pt-3 flex flex-row items-center text-gray-200 hover:text-primary gap-1"
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
            <div className="md:ml-20">
              <h4 className="font-semibold text-lg py-3">Contact</h4>
              <div className="flex-1">
                <div className="flex items-center py-4">
                  <MapPinIcon />
                  <p>Karatu Arusha, Tanzania</p>
                </div>
                <div className="flex items-center py-4">
                  <MailIcon />
                  <Link
                    href="mailto:info@bestofafricasafaris.co.tz"
                    className="ml-2 hover:text-primary"
                  >
                    info@bestofafricasafaris.co.tz
                  </Link>
                </div>
                <div className="flex items-center py-4">
                  <SmartphoneIcon />
                  <Link
                    href="tel:+255767-695030"
                    className="ml-2 hover:text-primary"
                  >
                    +255767-695030
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:text-left">
              <h4 className="font-semibold text-lg py-3">Company</h4>
              <Link href="/main/home" className="pb-4 hover:text-primary block">
                Home
              </Link>
              <Link
                href="/main/activities"
                className="pb-4 hover:text-primary block"
              >
                Activities
              </Link>
              <Link
                href="/main/gallery"
                className="pb-4 hover:text-primary block"
              >
                Gallery
              </Link>
            </div>
            <div className="md:text-left">
              <h4 className="font-semibold text-lg py-3">Legal</h4>
              <Link
                href={`/main/about`}
                className="pb-4 hover:text-primary block"
              >
                About Us
              </Link>
              <Link
                href="/main/terms-of-service"
                className="pb-4 hover:text-primary block"
              >
                Terms of Service
              </Link>
              <Link
                href="/main/contact"
                className="pb-4 hover:text-primary block"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-10 bg-neutral-700" />
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <p className="px-4 text-center">
            {" "}
            &copy; {year} The Best of Africa Safaris.
          </p>
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
      </footer>
    </>
  );
}
