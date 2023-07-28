import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Box, Drawer, IconButton, Typography } from "@mui/material";
import MainMenu from "./MainMenu";
import DrawerMobile from "./DrawerMobile";
import RightNavHeader from "../Header/RightNavHeader";
import styles from "./navbar.module.scss";

interface Props {
  windows?: () => Window;
}
const drawerWidth = 240;
function Navbar(props: Props) {
  const { windows } = props;
  const [stickyClass, setStickyClass] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    let windowHeight = window.scrollY;
    windowHeight > 80 ? setStickyClass(styles.nav_sticky) : setStickyClass("");
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  return (
    <nav className={styles.nav_bar_header}>
      <div id={styles.web_nav} className={`${stickyClass}`}>
        <AppBar
          component="nav"
          sx={{
            bgcolor: "inherit",
            position: "static",
            boxShadow: 1,
            flexDirection: "row",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              width: "50px",
              display: { sm: "none" },
              marginLeft: "0",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
          >
            {stickyClass ? (
              <div className={styles.app_bar_header_nav}>
                <div className={styles.left_nav_header}>
                  <div className={styles.logo}>
                    <a href="/">
                      <img
                        alt="logo"
                        src="/images/logo.svg"
                        className={styles.image_logo}
                      ></img>
                    </a>
                  </div>
                </div>
                <RightNavHeader />
              </div>
            ) : (
              <div></div>
            )}
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              width: "100%",
              maxWidth: "992px",
              margin: "auto",
            }}
          >
            <div className={styles.web_nav_main}>
              <MainMenu display="flex" />
              {stickyClass && <RightNavHeader />}
            </div>
          </Box>
        </AppBar>
      </div>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <div id={styles.web_nav} className={`${stickyClass}`}>
            <div className={styles.icon_close} onClick={handleDrawerToggle}>
              <CloseIcon />
            </div>
            <DrawerMobile />
          </div>
        </Drawer>
      </Box>
    </nav>
  );
}

export default Navbar;
