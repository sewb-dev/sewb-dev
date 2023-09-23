import Container from '@/components/Container'
import FileUpload from '@/components/FileUpload'
import React from 'react'
import { Roboto,  } from "next/font/google";
import TakeTest from '@/components/Buttons/TakeTest/TakeTest';
import Export from '@/components/Buttons/Export';
const roboto = Roboto({ subsets: ["greek"], weight: "400" });
const Home = () => {
  return (
    <section className='pt-5 flex w-full h-full flex-col md:flex-row md:justify-between gap-4'>
      <Container className="md:w-3/4 md:h-1/2 px-0">
        <FileUpload />
      </Container>
      <div className="w-full">
        <h1 className={`${roboto.className} text-6xl text-justify`}>Elevate your learning using  <span className='text-orange-500'>AI. </span></h1>

        <section className='mt-5 text-xl'>
          <TakeTest />
          <Export />
          <ul>
            <li>Question: What year was QNAI born? </li>
            <li>Answer: 2023</li>
            <li>Question: What year was QNAI born? </li>
            <li>Answer: 2023</li>
            <li>Question: What year was QNAI born? </li>
            <li>Answer: 2023</li>
            <li>Question: What year was QNAI born? </li>
            <li>Answer: 2023</li>
          </ul>
        </section>
      </div>
    </section>
  )
}

export default Home