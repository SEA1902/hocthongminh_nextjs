import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/app/hooks";
import { getUserFromToken } from "@/app/features/users/usersApi";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const token = Cookies.get("token");
      if (token) {
        await dispatch(getUserFromToken(token));
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
