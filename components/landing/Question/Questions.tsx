import { QuestionCard } from "./QuestionCard";

export const Questions = () => {
  return (
    <section className="flex flex-col gap-5 justify-center items-center py-40 px-5 font-grotesk ">
      <h2 className="font-grotesk text-5xl font-bold">Butuh Bantuan?</h2>
      <p className="text-lg text-center">
        Cari jawaban cepat mengenai tiket, pembayaran, dan pengalaman eventmu.
      </p>
      <QuestionCard />
    </section>
  );
};
