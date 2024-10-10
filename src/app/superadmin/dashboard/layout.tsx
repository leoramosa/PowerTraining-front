import SuperSidebar from "@/components/SuperSidebar/SuperSidebar";

export default function dashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 h-full flex flex-col">
      <div className="w-full flex h-full px-5 py-5 mx-auto">
        <SuperSidebar />
        <div className="flex-1 ml-5  rounded-lg ">{children}</div>
      </div>
    </div>
  );
}
