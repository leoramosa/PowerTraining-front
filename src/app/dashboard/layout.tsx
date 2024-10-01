import AvatarUser from "@/components/images/AvatarUser/AvatarUser";
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
        <div className="flex-1 ml-5  rounded-lg ">{children}</div>
        <div className="w-72  ml-5 ">
          <div className="pb-5">
            <p className="text-black text-[12px]">Recently registered</p>
            <p className="text-black text-2xl">New users</p>
          </div>
          <div className="bg-white w-full flex items-center p-3 shadow-lg rounded-lg mb-3">
            <AvatarUser name="lelso" />
            <div className="pl-2">
              <p className="">Leonardo R.</p>
              <span className="text-[12px] text-gray-400">leo33@gmail.com</span>
            </div>
          </div>
          <div className="bg-white w-full flex items-center p-3 shadow-lg rounded-lg mb-3">
            <AvatarUser name="lelso" />
            <div className="pl-2">
              <p className="">Maria S.</p>
              <span className="text-[12px] text-gray-400">leo33@gmail.com</span>
            </div>
          </div>
          <div className="bg-white w-full flex items-center p-3 shadow-lg rounded-lg mb-3">
            <AvatarUser name="lelso" />
            <div className="pl-2">
              <p className="">Maria S.</p>
              <span className="text-[12px] text-gray-400">leo33@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
