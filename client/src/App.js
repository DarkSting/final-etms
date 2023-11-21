import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage/HomePage";
import OrganizersRegister from "./views/organizers/organizersRegister/OrganizersRegister";
import OrganizersLogin from "./views/organizers/organizersLogin/OrganizersLogin";
import OrganizersDashboard from "./views/organizers/organizersDashboard/OrganizersDashboard";
import OrganizersProfile from "./views/organizers/organizersProfile/OrganizersProfile";
import OrganizersViewProfile from "./views/organizers/organizersProfile/OrganizersViewProfile";
import OrganizersEditProfile from "./views/organizers/organizersProfile/OrganizersEditProfile";
import OrganizersTournaments from "./views/organizers/organizersTournaments/OrganizersTournaments";
import ChooseTitle from "./views/organizers/organizersTournaments/ChooseTitle";
import CounterStrikeGlobalOffensive from "./views/organizers/organizersTournaments/CounterStrikeGlobalOffensive";
import Dota2 from "./views/organizers/organizersTournaments/Dota2";
import Valorant from "./views/organizers/organizersTournaments/Valorant";
import LeagueOfLegends from "./views/organizers/organizersTournaments/LeagueOfLegends";
import TournamentPage from "./views/organizers/organizersTournaments/TournamentPage";
import TournamentRegistration from "./views/organizers/organizersTournaments/TournamentRegistration";
import TournamentBrackets from "./views/organizers/organizersTournaments/TournamentBrackets";
import TournamentSchedule from "./views/organizers/organizersTournaments/TournamentSchedule";
import TournamentReport from "./views/organizers/organizersTournaments/TournamentReport";
import ManageTournaments from "./views/organizers/organizersTournaments/ManageTournaments";
import PlayersRegister from "./views/players/playersRegister/PlayersRegister";
import PlayersLogin from "./views/players/playersLogin/PlayersLogin";
import PlayersDashboard from "./views/players/playersDashboard/PlayersDashboard";
import PlayersProfile from "./views/players/playersProfile/PlayersProfile";
import PlayersViewProfile from "./views/players/playersProfile/PlayersViewProfile";
import PlayersEditProfile from "./views/players/playersProfile/PlayersEditProfile";
import PlayersTournaments from "./views/players/playersTournaments/PlayersTournaments";
import PlayersTournamentPage from "./views/players/playersTournaments/PlayersTournamentPage";
import PlayersTournamentRegistration from "./views/players/playersTournaments/PlayersTournamentRegistration";
import PlayersTournamentRegistrationSuccessful from "./views/players/playersTournaments/PlayersTournamentRegistrationSuccessful";
import PlayersTournamentBrackets from "./views/players/playersTournaments/PlayersTournamentBrackets";
import PlayersTournamentSchedule from "./views/players/playersTournaments/PlayersTournamentSchedule";
import PlayersTournamentRegistrations from "./views/players/playersRegistrations/PlayersTournamentRegistrations";
import PlayersTeams from "./views/players/playersTeams/PlayersTeams";
import ChooseTeamTitle from "./views/players/playersTeams/ChooseTeamTitle";
import CounterStrikeGlobalOffensiveTeam from "./views/players/playersTeams/CounterStrikeGlobalOffensiveTeam";
import Dota2Team from "./views/players/playersTeams/Dota2Team";
import ValorantTeam from "./views/players/playersTeams/ValorantTeam";
import LeagueOfLegendsTeam from "./views/players/playersTeams/LeagueOfLegendsTeam";
import TeamPage from "./views/players/playersTeams/TeamPage";
import TeamPageAllTeamsView from "./views/players/playersTeams/TeamPageAllTeamsView";
import TeamPageOpenedTeamsView from "./views/players/playersTeams/TeamPageOpenedTeamsView";
import TeamPageJoinedTeamsView from "./views/players/playersTeams/TeamPageJoinedTeamsView";
import TeamRequests from "./views/players/playersTeams/TeamRequests";
import TeamPlayers from "./views/players/playersTeams/TeamPlayers";
import TeamPlayersViewOnly from "./views/players/playersTeams/TeamPlayersViewOnly";
import ViewAndManageTeams from "./views/players/playersTeams/ViewAndManageTeams";
import OrganizersAndPlayersLogin from "./views/news/OrganizersAndPlayersLogin";
import OrganizersCounterStrikeNews from "./views/news/OrganizersCounterStrikeNews";
import PlayersCounterStrikeNews from "./views/news/PlayersCounterStrikeNews";
import AboutUs from "./views/aboutUs/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<HomePage />} />

        {/* Organizers routes */}
        <Route path="/organizers/register" element={<OrganizersRegister />} />
        <Route path="/organizers/login" element={<OrganizersLogin />} />
        <Route path="/organizers/dashboard" element={<OrganizersDashboard />} />
        <Route path="/organizers/profile" element={<OrganizersProfile />} />
        <Route
          path="/organizers/view-profile"
          element={<OrganizersViewProfile />}
        />
        <Route
          path="/organizers/edit-profile"
          element={<OrganizersEditProfile />}
        />
        <Route
          path="/organizers/tournaments"
          element={<OrganizersTournaments />}
        />
        <Route path="/organizers/create-tournament" element={<ChooseTitle />} />
        <Route
          path="/organizers/create-tournament/cs-go"
          element={<CounterStrikeGlobalOffensive />}
        />
        <Route
          path="/organizers/create-tournament/dota-2"
          element={<Dota2 />}
        />
        <Route
          path="/organizers/create-tournament/valorant"
          element={<Valorant />}
        />
        <Route
          path="/organizers/create-tournament/lol"
          element={<LeagueOfLegends />}
        />
        <Route
          path="/organizers/:esportsTitle/tournament/:tournamentId"
          element={<TournamentPage />}
        />
        <Route
          path="/organizers/:esportsTitle/tournament/:tournamentId/registration"
          element={<TournamentRegistration />}
        />
        <Route
          path="/organizers/:esportsTitle/tournament/:tournamentId/brackets"
          element={<TournamentBrackets />}
        />
        <Route
          path="/organizers/:esportsTitle/tournament/:tournamentId/schedule"
          element={<TournamentSchedule />}
        />
        <Route
          path="/organizers/:esportsTitle/tournament/:tournamentId/report"
          element={<TournamentReport />}
        />
        <Route
          path="/organizers/manage-tournaments"
          element={<ManageTournaments />}
        />

        {/* Players routes */}
        <Route path="/players/register" element={<PlayersRegister />} />
        <Route path="/players/login" element={<PlayersLogin />} />
        <Route path="/players/dashboard" element={<PlayersDashboard />} />
        <Route path="/players/profile" element={<PlayersProfile />} />
        <Route path="/players/view-profile" element={<PlayersViewProfile />} />
        <Route path="/players/edit-profile" element={<PlayersEditProfile />} />
        <Route path="/players/tournaments" element={<PlayersTournaments />} />
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId"
          element={<PlayersTournamentPage />}
        />
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId/registration"
          element={<PlayersTournamentRegistration />}
        />
        {/* <Route
          path="/players/:esportsTitle/tournament/:tournamentId/registration/payment/:teamId"
          element={<PlayersTournamentRegistrationPayment />}
        />
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId/registration/card-payment/:teamId"
          element={<PlayersTournamentRegistrationCardPayment />}
        /> */}
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId/registration/successful/:teamId"
          element={<PlayersTournamentRegistrationSuccessful />}
        />
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId/brackets"
          element={<PlayersTournamentBrackets />}
        />
        <Route
          path="/players/:esportsTitle/tournament/:tournamentId/schedule"
          element={<PlayersTournamentSchedule />}
        />
        <Route
          path="/players/registrations"
          element={<PlayersTournamentRegistrations />}
        />
        <Route path="/players/teams" element={<PlayersTeams />} />
        <Route path="/players/create-team" element={<ChooseTeamTitle />} />
        <Route
          path="/players/create-team/cs-go"
          element={<CounterStrikeGlobalOffensiveTeam />}
        />
        <Route path="/players/create-team/dota-2" element={<Dota2Team />} />
        <Route
          path="/players/create-team/valorant"
          element={<ValorantTeam />}
        />
        <Route
          path="/players/create-team/lol"
          element={<LeagueOfLegendsTeam />}
        />
        <Route
          path="/players/:esportsTitle/team/:teamId"
          element={<TeamPage />}
        />
        <Route
          path="/players/:esportsTitle/all/team/:teamId"
          element={<TeamPageAllTeamsView />}
        />
        <Route
          path="/players/:esportsTitle/opened/team/:teamId"
          element={<TeamPageOpenedTeamsView />}
        />
        <Route
          path="/players/:esportsTitle/joined/team/:teamId"
          element={<TeamPageJoinedTeamsView />}
        />
        <Route
          path="/players/:esportsTitle/team/:teamId/requests"
          element={<TeamRequests />}
        />
        <Route
          path="/players/:esportsTitle/team/:teamId/players"
          element={<TeamPlayers />}
        />
        <Route
          path="/players/:esportsTitle/all/team/:teamId/players"
          element={<TeamPlayersViewOnly />}
        />
        <Route
          path="/players/:esportsTitle/opened/team/:teamId/players"
          element={<TeamPlayersViewOnly />}
        />
        <Route
          path="/players/view-manage-teams"
          element={<ViewAndManageTeams />}
        />

        {/* News routes */}
        <Route
          path="/organizers-players/login"
          element={<OrganizersAndPlayersLogin />}
        />
        <Route
          path="/organizers/news/counter-strike"
          element={<OrganizersCounterStrikeNews />}
        />
        <Route
          path="/players/news/counter-strike"
          element={<PlayersCounterStrikeNews />}
        />

        {/* About us route */}
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
