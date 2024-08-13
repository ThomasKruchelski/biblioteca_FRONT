import Image from "next/image";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="w-full min-h-[100vh]">
      <div className="bg h-[70px] w-full bg-[#2f2f8f] px-[5rem] flex flex-row items-center justify-between">
        <div>Menu</div>
        <div className="w-[40%]">
          <input className="bg-[#fefefe] w-full rounded-full p-1 px-4 text-black" />
        </div>
        <div>Logo</div>
      </div>
      <div className="px-[5rem] py-[2rem]">É só um software</div>
      <div className="px-[5rem]"></div>
    </main>
  );
}
