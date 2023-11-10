import React from "react";
import NavigationBar from "../../components/NavigationBar";
import HeroBanner from "./HeroBanner";
import OrganizersAndPlayers from "./OrganizersAndPlayers";
import Footer from "../../components/Footer";

function HomePage() {
  return (
    <div className="d-flex flex-column">
      <NavigationBar />
      <HeroBanner />
      <OrganizersAndPlayers />
      <Footer />
    </div>
  );
}

export default HomePage;
