import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Knowledge } from "@/types";
import { Grid, Link } from "@mui/material";
import styles from "./knowledgeItem.module.scss";

interface KnowledgeProps {
  knowledge: Knowledge;
}
const KnowledgeItem = ({ knowledge }: KnowledgeProps) => {
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    setSanitizedHtml(DOMPurify.sanitize(knowledge.content || ""));
  }, [knowledge.content]);

  const firstParagraph = sanitizedHtml.match(/<p>.*?<\/p>/)?.[0] || "";
  return (
    <Grid item xs={12} sm={6}>
      <Link
        href={"/chia-se-kien-thuc/" + knowledge.slug}
        underline="none"
        color="inherit"
      >
        <div className={styles.post_item}>
          <div className={styles.post_thumb}>
            <div className={styles.wp_post_thumb}>
              <img src={knowledge.image} alt="" />
            </div>
          </div>
          <h2 className={styles.post_title}>{knowledge.title}</h2>
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
};
export default KnowledgeItem;
