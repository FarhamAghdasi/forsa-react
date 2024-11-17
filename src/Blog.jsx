// Blog.js
import {React} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  Footer,
  Header,
  Hero,
  Pricing,
  Services,
  Breadcrumb,
  BlogC,
} from "./components"; 






const posts = [
  { id: 1, title: "مطلب اول" },
  { id: 2, title: "مطلب دوم" },
  { id: 3, title: "مطلب سوم" },
];

function Blog() {

  return (
    <>
    <Header />
    <Breadcrumb />
    <BlogC slice={20}/>
    <Footer />
    </>

  );
}

export default Blog;
