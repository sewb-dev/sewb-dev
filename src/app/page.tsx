import { Roboto, Pacifico, Inter } from "next/font/google";
import styles from "./page.module.css";
import Container from "@/components/Container";

import TextGradient from "@/components/TextGradient_A/TextGradient_A";
import FeatureCard from "@/components/FeatureCard";
import WaitingListForm from "@/components/WaitingListForm";
const roboto = Roboto({ subsets: ["greek"], weight: "400" });
const pacifo = Pacifico({ weight: "400", subsets: ["cyrillic"] });
const inter = Inter({subsets:['latin']})



export default function Home() {
  return (
    <>
      <section className={`${styles.homepage}`}>
        <Container className="pt-16 md:pt-38 flex w-full h-full flex-col justify-center">
          <h2 className={`${roboto.className} capitalize text-4xl md:text-6xl text-center mb-8 md:mb-12 text-black font-extrabold tracking-wider delay-200`}>Generate Dynamic Questions and Answers from any Text <TextGradient className="underline decoration-wavy" text="using AI." /></h2>
          <h2
            className={`${roboto.className} text-base font-bold md:font-normal md:text-3xl text-center text-black md:mb-3 mb-8`}
          >
            Elevate your learning with AI-enhanced dynamic Q&A creation. QnAI magically transforms your uploaded text into captivating interactive Q&A experiences. 
          </h2>
          <Container className="justify-center mx-auto flex p-0 mb-8 mt-4">
            <FeatureCard />
          </Container>
       
          <WaitingListForm />
        </Container>
      </section>
     
    </>
  );
}
