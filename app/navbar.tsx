import Image from "next/image";

const minusLogoSize = 100;

export default function Navbar() {
  return (
    <div className="lg:p-10">
      <Image
        src="/logo.svg"
        alt="tiktaktao"
        width={300 - minusLogoSize}
        height={120 - minusLogoSize}
      />
    </div>
  );
}
