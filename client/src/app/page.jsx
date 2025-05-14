import About from "@/components/Landing/About";
import Categories from "@/components/Landing/Categories";
import Feedbacks from "@/components/Landing/RecentFeedbacks";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
// import Metrics from '@/components/Landing/Metrics';
import Dissussions from "@/components/Landing/RecentDisscussions";
import Navbar from "@/components/Landing/Navbar";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";

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
      <Dissussions />
      <Footer />
    </div>
  );
};

export default HomePage;
