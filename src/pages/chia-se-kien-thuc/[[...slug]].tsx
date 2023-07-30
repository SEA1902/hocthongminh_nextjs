import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import DOMPurify from "dompurify";
import { Container, Grid, Link, Pagination } from "@mui/material";
import { getKnowledgesList } from "@/app/features/knowledges/knowledgesApi";
import { AppDispatch, wrapper } from "@/app/store";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import { Knowledge } from "@/types";
import styles from "./knowledge.module.scss";

const Knowledge = ({
  knowledges,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { slug } = router.query;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value != 1) {
      router.push("/chia-se-kien-thuc/page/" + value);
    } else {
      router.push("/chia-se-kien-thuc");
    }
  };
  const linkBreadcrumbs = [
    { name: "Chia sẻ kiến thức", href: "/chia-se-kien-thuc" },
    {
      name: slug && "Trang " + slug[1],
      href: slug && "/chia-se-kien-thuc/page/" + slug[1],
    },
  ];
  return (
    <Container maxWidth="md">
      <div className={styles.wp_category_view}>
        <CustomBreadcrumbs links={linkBreadcrumbs} />
        <Grid container spacing={2} sx={{ marginTop: "0" }}>
          <Grid item xs={12} sm={12} md={9}>
            <div className={styles.category_main}>
              <h1 className={styles.cat_title}>Chia sẻ kiến thức</h1>
              <div className={styles.cat_posts_list}>
                <Grid container spacing={3}>
                  {knowledges?.knowledgesList?.map(
                    (knowledge: Knowledge, index: number) => {
                      const sanitizedHtml = DOMPurify.sanitize(
                        knowledge?.content || ""
                      );
                      const firstParagraph =
                        sanitizedHtml.match(/<p>.*?<\/p>/)?.[0] || "";

                      return (
                        <Grid item xs={12} sm={6} key={index}>
                          <Link
                            href={"/chia-se-kien-thuc/" + knowledge.slug}
                            underline="none"
                            color="inherit"
                          >
                            <div className={styles.post_item}>
                              <div className={styles.post_thumb}>
                                <div className={styles.wp_post_thumb}>
                                  <img src={knowledge.image} />
                                </div>
                              </div>
                              <h2 className={styles.post_title}>
                                {knowledge.title}
                              </h2>
                              <div className={styles.post_meta}></div>
                              <div
                                className={styles.post_excerpt}
                                dangerouslySetInnerHTML={{
                                  __html: firstParagraph,
                                }}
                              />
                            </div>
                          </Link>
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}></Grid>
        </Grid>
        <div className={styles.cat_pagination}>
          <Pagination
            count={knowledges?.totalPages}
            page={slug ? +slug[1] : 1}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const slug = context?.params?.slug;

    const { dispatch } = store as { dispatch: AppDispatch };
    if (slug) {
      await dispatch(getKnowledgesList(+slug[1]));
    } else {
      await dispatch(getKnowledgesList(1));
    }
    const knowledges = store.getState().knowledges.knowledges;
    return { props: { knowledges } };
  });
export default Knowledge;
