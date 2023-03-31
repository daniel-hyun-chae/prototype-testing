import { useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function ClipboardCopy({ copyText }: { copyText: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        onClick={handleCopyClick}
        className="flex w-full justify-center text-center border-2 border-blue-500 rounded-full py-1 text-blue-500 font-semibold"
      >
        <ClipboardIcon className="h6 w-6" />
        <span>Copy link</span>
      </button>
      {isCopied && (
        <div className="-translate-x-1/2 fixed px-4 py-2 bottom-1 left-1/2 bg-gray-800 text-white rounded-lg font-semibold">
          Copied
        </div>
      )}
    </>
  );
}
