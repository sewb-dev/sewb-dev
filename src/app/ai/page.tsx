import Container from "@/components/Container";
import React from "react";
import { Roboto } from "next/font/google";
import Stack from "@mui/material/Stack";
import GenerationResponse from "@/components/GenerationResponse";
import Typography from "@mui/material/Typography";
import InputUpload from "@/components/InputUpload";

const roboto = Roboto({ subsets: ["greek"], weight: "400" });
const Home = () => {
  return (
    <section className="pt-5 flex w-full h-full flex-col md:flex-row md:justify-between gap-4">
      <Container className="md:w-3/4 md:h-1/2 px-0">
        <InputUpload />
      </Container>
      <div className="w-full">
        <Typography fontSize={"3.5rem"} component={"h1"} variant="h1">
          Elevate your learning using{" "}
          <span className="text-orange-500">AI. </span>
        </Typography>
        <h1 className={`${roboto.className} text-6xl text-justify`}></h1>

        <Stack spacing={2} direction="column" my={"20px"}>
          <Typography fontSize={"20px"}>
            Your generated questions would appear here.
          </Typography>

          <GenerationResponse />
        </Stack>
      </div>
    </section>
  );
};

export default Home;
