import Badge from "@/components/badges/BadgeUser/BadgeUser";
import ButtonActions from "@/components/buttons/ButtonActions/ButtonActions";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import AvatarCircle from "@/components/images/AvatarUser/AvatarUser";
import ItemInfo from "@/components/ItemInfo/ItemInfo";
export default function Dashboard() {
  return (
    <main className="">
      <ContainerWeb>
        <h1>DASHBOARD</h1>

        <ItemInfo>
          <AvatarCircle name="Martin Ramos" size="lg" />
          <p>Martin Ramos</p>
          <Badge status="without-routine" />
          <div className="flex">
            <ButtonActions status="view" size="md" tooltip="View user" />
            <ButtonActions status="edit" size="md" tooltip="Edit user" />
            <ButtonActions status="delete" size="md" tooltip="Delete user" />
          </div>
        </ItemInfo>
        <ItemInfo>
          <p>Item 1</p>
          <Badge status="with-routine" />
          <ButtonActions status="view" size="md" tooltip="View user" />
        </ItemInfo>
      </ContainerWeb>
    </main>
  );
}
