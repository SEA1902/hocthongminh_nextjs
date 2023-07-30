import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks";
import { getUserFromToken } from "@/app/features/users/usersApi";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";
import { getCookie } from "@/utils/cookies";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function fetchData() {
      const token = getCookie("token");
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
