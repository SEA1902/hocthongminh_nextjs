import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "@mui/material";
import { getKnowledgeBySlug } from "@/app/features/knowledges/knowledgesApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import styles from "./knowledge.module.scss";

const KnowledgePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  const knowledgePage = useAppSelector(
    (state) => state.knowledges.knowledgePage
  );

  useEffect(() => {
    if (slug) dispatch(getKnowledgeBySlug(slug.toString()));
  }, [slug]);

  const linkBreadcrumbs = [
    { name: "Chia sẻ kiến thức", href: "/chia-se-kien-thuc" },
    {
      name: knowledgePage?.title,
      href: "/chia-se-kien-thuc" + knowledgePage?.slug,
    },
  ];
  return (
    <Container maxWidth="xl">
      <div className={styles.wp_category_view}>
        <CustomBreadcrumbs links={linkBreadcrumbs} />
        <div className={styles.post_content_main}>
          <div className={styles.post_content_main_left}></div>
          <div className={styles.post_content_main_view}>
            <h1 className={styles.post_title}>{knowledgePage?.title}</h1>
            <div className={styles.post_content_wrapper}>
              <div
                className={styles.post_content}
                dangerouslySetInnerHTML={{
                  __html: knowledgePage?.content ? knowledgePage.content : "",
                }}
              ></div>
            </div>
          </div>
          <div className={styles.post_content_main_right}></div>
        </div>
      </div>
    </Container>
  );
};
export default KnowledgePage;
