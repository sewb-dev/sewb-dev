import { Roboto, Pacifico, Inter } from "next/font/google";
import styles from "./page.module.css";
import Container from "@/components/Container";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getBaseUrl } from "@/app/lib/dispatcher";
import TextGradient from "@/components/TextGradient_A/TextGradient_A";
const roboto = Roboto({ subsets: ["greek"], weight: "400" });
const pacifo = Pacifico({ weight: "400", subsets: ["cyrillic"] });
const inter = Inter({subsets:['latin']})

async function joinWaitingList(data: FormData) {
  "use server";
  console.log('I logged')

  const response = await fetch(`${getBaseUrl()}api/users/waiting-list`, {
    method:'post',
    body: data,
    cache:'no-cache'
  })

  if(response.status !== 200){
    throw new Error('Failed to add you to the waiting-list. Please try again.')
  }
}

export default function Home() {
  return (
    <>
      <section className={`${styles.homepage}`}>
        <Container className="pt-16 md:pt-38 flex w-full h-full flex-col justify-center">
          {/* <h1
            className={`${roboto} capitalize text-3xl md:text-6xl text-center mb-12 text-black font-extrabold tracking-wider`}
          >
            Unleash the Power of Your Text!
          </h1> */}
          <TextGradient text="Unleash the Power of Your Text!" className={`${roboto} capitalize text-4xl md:text-6xl text-center mb-8 md:mb-12 text-black font-extrabold tracking-wider delay-200`}/>
          <h2
            className={`${roboto} text-base font-bold md:font-normal md:text-3xl text-center text-black md:mb-3  mb-8`}
          >
            Elevate your learning with AI-enhanced dynamic Q&A creation. {/* <span className="bg-black text-white m-2">QnAGenius</span> */}QnAGenius magically transforms your ordinary text into captivating interactive Q&A experiences. 
          </h2>
       
          <form className="w-full max-w-sm mx-auto" action={joinWaitingList}>
            <div className="flex flex-col md:flex-row items-center py-2 mb-4 gap-2">
              <input
                className={styles.wlTextInput}
                type="text"
                placeholder="Your name..."
                aria-label="Full name"
                required
                name="fullName"
              />
              <input
                className={styles.wlTextInput}
                type="email"
                placeholder="Your email..."
                aria-label="Email"
                required={true}
                name="email"
              />
            </div>
            <button
              className="flex rounded border text-center px-6 py-3 uppercase mx-auto text-gray-100 bg-slate-900 border-slate-900"
              type="submit"
            >
              Join the waiting list
            </button>
          </form>
             {/* <p className="mt-8 w-full text-xl pb-6 text-black">
            Empower your text and elevate it to new heights using cutting-edge
            AI technology. Our platform magically transforms your ordinary text
            into captivating interactive Q&A experiences. Watch as your content
            springs to life, beckoning you to explore, learn, and interact in
            ways you've never imagined. Say goodbye to static information and
            welcome a dynamic conversation led by AI.
          </p> */}
          {/* <div className="absolute bottom-0 right-0 mb-4 mr-5">
            <ArrowDownIcon className="h-6 w-6 animate-bounce" />
          </div> */}
        </Container>
      </section>
     
    </>
  );
}
