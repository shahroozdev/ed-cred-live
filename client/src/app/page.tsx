import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { Footer } from "@/components/organisms";
import Navbar from "@/components/organisms/header/components/Navbar";
import { About, Categories, Feedbacks, Discussions, Header } from "@/components/pages/LandingPage";

const HomePage = async() => {
    const user = await getServerSideDataWithFeatures({url:'/auth/profile', key:'profile'})
    const data = await getServerSideDataWithFeatures({url:'/forum-question?pageSize=3', key:'forumList'})
  return (
    <div className="w-screen min-h-screen bg-background relative">
      <Navbar user={user}/>
      <Header />
      <Categories />
      <About />
      {/* <Metrics /> */}
      <Feedbacks />
      <Discussions data={data}/>
      <Footer />
    </div>
  );
};

export default HomePage;
