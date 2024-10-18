// import AvatarUser from "@/components/images/AvatarUser/AvatarUser";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function dashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 h-full flex flex-col">
      <div className="w-full flex h-full px-5 py-5 mx-auto">
        <Sidebar />
        <div className="flex-1 ml-5 bg-white shadow-lg relative rounded-lg ">
          {children}
        </div>
      </div>
    </div>
  );
}
