import * as React from "react";
import { useRouter } from "next/router";
import unidecode from "unidecode";
import { styled } from "@mui/material/styles";
import TreeItem, { TreeItemProps, treeItemClasses } from "@mui/lab/TreeItem";
import styles from "./styledTreeItem.module.scss";

type StyledTreeItemProps = TreeItemProps & {
  icon?: React.ReactElement;
  sumTopicNumber?: number;
  topicName?: string;
  topicNumber?: number;
  labelText: string;
  topicId?: string;
  child?: boolean;
  labelInfo?: React.ReactNode;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    borderBottom: "1px solid #d0d6e1",
    [`& .${treeItemClasses.label}`]: {
      width: "100%",
      minWidth: "0px",
      paddingLeft: "4px",
      position: "relative",
      fontFamily: "inherit",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.5",
    },
  },
}));

const StyledTreeItem = (props: StyledTreeItemProps) => {
  const router = useRouter();
  const {
    icon: LabelIcon,
    sumTopicNumber,
    topicName,
    topicNumber,
    labelInfo,
    labelText,
    topicId,
    child,
    ...other
  } = props;

  const handleNavigate = () => {
    if (topicName) {
      const normalizedString = unidecode(topicName);
      const slug = normalizedString.toLowerCase().replace(/\s+/g, "-");
      router.push("/luyen-tap/" + slug + "-" + topicId);
    }
  };
  return (
    <StyledTreeItemRoot
      sx={
        child
          ? {
              width: "100%",
              border: "unset",
              boxShadow: "unset",
              margin: "unset",
              borderRadius: "unset",
            }
          : {
              boxShadow: "0 2px 10px rgba(0,0,0,.1)",
              borderRadius: "10px",
              flex: "1",
              margin: "10px",
              backgroundColor: "#fff",
              border: "1px solid #d0d6e1",
              borderBottom: "none",
              overflow: "hidden",
            }
      }
      label={
        <div className={styles.tree_box_item} onClick={handleNavigate}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.tree_box_item_content}>
              <span className={styles.tree_box_item_title}>{labelText}</span>

              {sumTopicNumber && (
                <span className={styles.tree_box_item_desc}>
                  {sumTopicNumber} bài tập
                </span>
              )}
            </div>
            <div className={styles.tree_box_item_progress}>{labelInfo}</div>
          </div>
        </div>
      }
      icon={LabelIcon}
      {...other}
    />
  );
};

export default StyledTreeItem;
