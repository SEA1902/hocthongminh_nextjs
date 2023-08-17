import CategoryCourse from "@/components/CategoryCourse";
import CategoryTest from "@/components/CategoryTest";
import HomeBannerRegister from "@/components/HomeBannerRegister";
import HomeBase from "@/components/HomeBase";
import HomeFeedback from "@/components/HomeFeedback";
import HomeUtils from "@/components/HomeUtils";
import KnowledgeView from "@/components/KnowledgeView";
import styles from "./home.module.scss";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/ErrorFallback";
import TestError from "@/components/TestError";
// import ErrorBoundary from "@/components/ErrorBoundary";

const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.banner_pages}>
        <div className={styles.banner_item}>
          <img
            alt="Banner Home"
            src="/images/new-banner.png"
            className={styles.banner_image}
          />
        </div>
      </div>
      <ErrorBoundary
        fallbackRender={ErrorFallback}
        onReset={() => {}} // increment the retry count on reset
        // resetKeys={[retryCount]}
      >
        <TestError />
      </ErrorBoundary>
      <CategoryCourse />
      <CategoryTest />
      <HomeUtils />
      <HomeBase />
      <HomeBannerRegister />
      <HomeFeedback />
      <KnowledgeView />
    </div>
  );
};

export default Home;
