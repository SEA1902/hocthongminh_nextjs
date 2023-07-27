import { getKnowledgesList } from "@/app/features/knowledges/knowledgesApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Container, Grid, Link, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./knowledge.module.scss";
import DOMPurify from "dompurify";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";

function Knowledge() {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const knowledges = useAppSelector((state) => state.knowledges.knowledges);
  useEffect(() => {
    dispatch(getKnowledgesList(page));
  }, [page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const linkBreadcrumbs = [
    { name: "Chia sẻ kiến thức", href: "/chia-se-kien-thuc" },
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
                  {knowledges?.knowledgesList?.map((knowledge, index) => {
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
                  })}
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3}></Grid>
        </Grid>
        <div className={styles.cat_pagination}>
          <Pagination
            count={knowledges?.totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </div>
    </Container>
  );
}

export default Knowledge;
