import Container from '@/components/Container';
import FeatureCard from '@/components/FeatureCard';
import TextGradient from '@/components/TextGradient_A/TextGradient_A';
import { Inter, Pacifico, Roboto } from 'next/font/google';
import styles from './page.module.css';

const roboto = Roboto({ subsets: ['greek'], weight: '400' });
const pacifo = Pacifico({ weight: '400', subsets: ['cyrillic'] });
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <section className={`${styles.homepage}`}>
        <Container className='md:pt-38 flex h-full w-full flex-col justify-center pt-16'>
          <h2
            className={`${roboto.className} mb-8 text-center text-4xl font-extrabold capitalize tracking-wider text-black delay-200 md:mb-12 md:text-6xl`}
          >
            Generate Dynamic Questions and Answers from any Text{' '}
            <TextGradient
              className='underline decoration-wavy'
              text='using AI.'
            />
          </h2>
          <h2
            className={`${roboto.className} mb-8 text-center text-base font-bold text-black md:mb-3 md:text-3xl md:font-normal`}
          >
            Elevate your learning with AI-enhanced dynamic Q&A creation. QnAI
            magically transforms your uploaded text into captivating interactive
            Q&A experiences.
          </h2>
          <Container className='mx-auto mb-8 mt-4 flex justify-center p-0'>
            <FeatureCard />
          </Container>
        </Container>
      </section>
    </>
  );
}
