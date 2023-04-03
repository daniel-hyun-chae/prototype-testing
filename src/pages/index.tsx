import Head from "next/head";
import { Inter } from "next/font/google";
import {
  EmailShareButton,
  LineShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import { EmailIcon, LineIcon, TelegramIcon, WhatsappIcon } from "react-share";

import Image from "next/image";
import { useRouter } from "next/router";
import ClipboardCopy from "./components/ClipboardCopy";
import { useWindowSize } from "@/hooks/useWindowSize";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const testUrl = process.env.NEXT_PUBLIC_TEST_URL as string;
  const testSize = parseInt(process.env.NEXT_PUBLIC_TEST_WIDTH || "1024");
  const { width } = useWindowSize();

  if (!testUrl) {
    <div>Test URL is not available</div>;
  }

  return (
    <>
      <Head>
        <title>Körber Pharma Software Usability Testing</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[url('/csm_Seidenader-BubbleX-1155_d6fdcaf537.jpg')] h-screen w-screen bg-cover bg-center flex flex-col">
        <div className="p-2">
          <Image
            src="/korber-logo.svg"
            alt="Koerber logo"
            width={70}
            height={70}
          />
        </div>
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col bg-white w-11/12 rounded-sm shadow-md">
            <div className="text-3xl font-semibold px-4 py-2">
              Userbility Testing
            </div>
            <hr />
            <div className="px-4 space-y-4 py-2">
              <div>We appreciate your participation!</div>
              {testSize < 1024 ||
                (testSize > 1024 && width && width >= 1024 && (
                  <div>
                    <div className="py-2">
                      Do you want to do the test on this device?
                    </div>
                    <button
                      className="w-full text-center border-2 border-blue-500 rounded-full py-1 text-blue-500 font-semibold"
                      onClick={() => {
                        router.push(testUrl);
                      }}
                    >
                      Start the test
                    </button>
                  </div>
                ))}
              {testSize > 1024 && width && width < 1024 && (
                <div>Current device is too small to perform the test.</div>
              )}

              <div>
                <div className="pb-2">
                  {testSize > 1024 && width && width < 480
                    ? "Please copy the link and perform the test in desktop"
                    : "Or would you like to send the link to do it later?"}
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <ClipboardCopy copyText={testUrl} />
                  <div>OR</div>
                  <div className="flex justify-center space-x-2">
                    <EmailShareButton url={testUrl}>
                      <EmailIcon size={45} round={true} />
                    </EmailShareButton>
                    <WhatsappShareButton url={testUrl}>
                      <WhatsappIcon size={45} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton url={testUrl}>
                      <TelegramIcon size={45} round={true} />
                    </TelegramShareButton>
                    <LineShareButton url={testUrl}>
                      <LineIcon size={45} round={true} />
                    </LineShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
