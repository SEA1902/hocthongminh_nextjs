import { NavigateNextOutlined } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import styles from "./customBreadcrumbs.module.scss";

interface LinkProps {
  name?: string;
  href?: string;
}
function CustomBreadcrumbs({ links }: { links: LinkProps[] }) {
  return (
    <Breadcrumbs
      separator={<NavigateNextOutlined fontSize="small" />}
      aria-label="breadcrumb"
      className={styles.site_breadcrumbs}
    >
      <Link underline="none" key="1" color="inherit" href="/">
        Trang chủ
      </Link>
      {links.map((link, index) => {
        if (link.name) {
          return (
            <Link key={index} underline="none" color="inherit" href={link.href}>
              {link.name}
            </Link>
          );
        }
      })}
    </Breadcrumbs>
  );
}

export default CustomBreadcrumbs;
