import Hero from "../src/components/Hero";
import HomeCards from "../src/components/HomeCards";

function HomePage() {
  return (
    <>
      {/* hero is the main purple component after the navbar */}
      <Hero />
      <HomeCards />
    </>
  );
}

export default HomePage;
