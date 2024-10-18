import Banner from "@/components/Banner/Banner";
import CardExerciseBody from "@/components/CardExerciseBody/CardExerciseBody";
import ClientChat from "@/components/Chat/ClientChat/ClientChat";
export default function Home() {
  return (
    <>
      <ClientChat />

      <Banner />
      <CardExerciseBody />
      <ClientChat />
    </>
  );
}
