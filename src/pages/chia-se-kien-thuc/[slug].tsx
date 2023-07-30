import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Container } from "@mui/material";
import { getKnowledgeBySlug } from "@/app/features/knowledges/knowledgesApi";
import { AppDispatch, wrapper } from "@/app/store";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import styles from "./knowledge.module.scss";

const KnowledgePage = ({
  knowledgePage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const slug = context?.params?.slug;

    const { dispatch } = store as { dispatch: AppDispatch };
    if (slug) await dispatch(getKnowledgeBySlug(slug.toString()));

    const knowledgePage = store.getState().knowledges.knowledgePage;

    return { props: { knowledgePage } };
  });

export default KnowledgePage;
