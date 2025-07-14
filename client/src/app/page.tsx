import FetchWithSuspension from "@/components/molecules/fetchWithSuspension";
import { Footer } from "@/components/organisms";
import Navbar from "@/components/organisms/header/components/Navbar";
import {
  About,
  Categories,
  Feedbacks,
  Discussions,
  Header,
} from "@/components/pages/LandingPage";
import FetchOnServer from "@/lib/FetchOnServerSide";
import CategoriesSliderSkeleton from "@/skeletons/LandingPage/CategoriesSliderSkeleton";
import DisscussionSkeleton from "@/skeletons/LandingPage/DisscussionSkeleton";
import ResponseSlideSkeleton from "@/skeletons/LandingPage/ResponseSlideSkeleton";

const HomePage = () => {
  return (
    <div className="w-screen min-h-screen bg-background relative">
      <FetchOnServer getProfile>
        {(data, profile) => <Navbar user={profile} />}
      </FetchOnServer>
      <Header />
      <FetchWithSuspension
        apiData={{
          url: `/category`,
          key: "categories",
        }}
        suspension={<CategoriesSliderSkeleton />}
      >
        {(data) => <Categories categories={data?.categories} />}
      </FetchWithSuspension>
      <About />
      {/* <Metrics /> */}
      <FetchWithSuspension
        apiData={{
          url: `/school/branch`,
          key: "feedbackFormForGroups",
        }}
        suspension={<ResponseSlideSkeleton />}
      >
        {(data) => <Feedbacks reviews={data} />}
      </FetchWithSuspension>
      <FetchWithSuspension
        apiData={{
          url: "/forum-question?pageSize=3",
          key: "forumList",
        }}
        suspension={<DisscussionSkeleton />}
      >
        {(data) => <Discussions data={data} />}
      </FetchWithSuspension>
      <Footer />
    </div>
  );
};

export default HomePage;
