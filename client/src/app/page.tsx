import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Footer } from "@/components/organisms";
import Navbar from "@/components/organisms/header/components/Navbar";
import { About, Categories, Feedbacks, Discussions, Header } from "@/components/pages/LandingPage";

const HomePage = async() => {
    const user = await getServerSideDataWithFeatures({url:'/auth/profile', key:'profile'})
  return (
    <div className="min-h-screen h-full bg-background relative">
      <Navbar user={user}/>
      <Header />
      <Categories />
      <About />
      {/* <Metrics /> */}
      <Feedbacks />
      <Discussions />
      <Footer />
    </div>
  );
};

export default HomePage;
