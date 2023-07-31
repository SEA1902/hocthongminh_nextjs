import CategoryCourse from "@/components/CategoryCourse";
import CategoryTest from "@/components/CategoryTest";
import Image from "next/image";
import HomeBannerRegister from "@/components/HomeBannerRegister";
import HomeBase from "@/components/HomeBase";
import HomeFeedback from "@/components/HomeFeedback";
import HomeUtils from "@/components/HomeUtils";
import KnowledgeView from "@/components/KnowledgeView";
import styles from "./home.module.scss";

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
