// app/page.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Header from "./Header";
import CardSection from "./Section";
import Footer from "./Footer";

async function getPosts() {
  const res = await fetch("http://localhost:8080/user");
  console.log("Fetched posts:", res);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Header />
      <CardSection posts={posts} />
      <Footer />
    </div>
  );
}
