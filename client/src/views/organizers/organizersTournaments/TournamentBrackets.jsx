import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
} from "@g-loot/react-tournament-brackets";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./TournamentBrackets.css";
import RoundDetails from "./TournamentBracketRoundComponent";

export default function TournamentBrackets() {
  return (

  <SingleElimination />
  
  );
}

export const SingleElimination = ({ search }) => {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  const tournamentName = "hurracan";

  const [matches, setMatches] = useState([]);
  const [roundDetails,setRoundDetails] = useState(null);
  const [update,setUpdate] = useState(true);

  useEffect(() => {

    axios
      .get(
        `/api/organizers/get-tournament?tournamentName=${tournamentName}`
      )
      .then((r) => {
        setMatches(r.data.allMatches);
        setRoundDetails(r.data)
        console.log(r.data);
      })
      .catch((er) => {
        console.log(er);
      });

      setUpdate(false);

  }, [update]);

  if (matches.length > 0 && roundDetails) {
    return (
      <div className="tournament-brackets-wrapper">
        <OrganizersNavigationBar />
        <div className="tournament-brackets-header">
          <h1 className="tournament-brackets-heading">Tournament Brackets</h1>
        </div>
        <div className="tournament-brackets-content">
          <SingleEliminationBracket
            theme={GlootTheme}
            matches={matches}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer
                width={10000}
                height={5000}
                background="rgb(11, 13, 19)"
                SVGBackground="rgb(11, 13, 19)"
                {...props}
              >
                {children}
              </SVGViewer>
            )}
            onMatchClick={(match) => console.log(match)}
            onPartyClick={(match) => console.log(match)}
          />
        </div>
        {roundDetails?<RoundDetails setUpdate={setUpdate} tournamentName={tournamentName} roundDetails={roundDetails}/>:<></>}
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="tournament-brackets-wrapper">
        <OrganizersNavigationBar />
        <div className="tournament-brackets-header">
          <h1 className="tournament-brackets-heading">Tournament Brackets</h1>
        </div>
        <div className="tournament-brackets-content">
          <SingleEliminationBracket
            theme={GlootTheme}
            matches={simpleSmallBracket}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
              <SVGViewer
                width={10000}
                height={5000}
                background="rgb(11, 13, 19)"
                SVGBackground="rgb(11, 13, 19)"
                {...props}
              >
                {children}
              </SVGViewer>
            )}
            onMatchClick={(match) => console.log(match)}
            onPartyClick={(match) => console.log(match)}
          />
        </div>
        <Footer />
      </div>
    );
  }
};

const GlootTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#F4F2FE", dark: "#707582" },
  matchBackground: { wonColor: "#2D2D59", lostColor: "#1B1D2D" },
  score: {
    background: {
      wonColor: `#10131C`,
      lostColor: "#10131C",
    },
    text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" },
  },
  border: {
    color: "#292B43",
    highlightedColor: "RGBA(152,82,242,0.4)",
  },
  roundHeader: { backgroundColor: "#3B3F73", fontColor: "#F4F2FE" },
  connectorColor: "#3B3F73",
  connectorColorHighlight: "RGBA(152,82,242,0.4)",
  svgBackground: "#0F121C",
});

export const simpleSmallBracket = [
  {
    id: 100,
    nextMatchId: 200,
    tournamentRoundText: "1",
    participants: [
      {
        id: "14754a1a-932c-4992-8dec-f7f94a339960",
        isWinner: false,
        resultText: null,
        name: "FalseFive",
      },
      {
        id: "d16315d4-7f2d-427b-ae75-63a1ae82c0a8",
        isWinner: false,
        resultText: null,
        name: "Zegg",
      },
    ],
  },
  {
    id: 101,
    nextMatchId: 200,
    tournamentRoundText: "1",
    participants: [
      {
        id: "d8b9f00a-0ffa-4527-8316-da701894768e",
        isWinner: false,
        resultText: null,
        name: "Revolutionary Gamers",
      },
      {
        id: "e1e9f00a-0ffa-4527-8316-da701894768f",
        isWinner: false,
        resultText: null,
        name: "Haytalus",
      },
    ],
  },
  {
    id: 102,
    nextMatchId: 201,
    tournamentRoundText: "1",
    participants: [
      {
        id: "d8b9f00a-0ffa-8888-8316-da701894768e",
        isWinner: false,
        name: "Team Cortex",
      },
      {
        id: "e1e9f00a-0ffa-4527-6666-da701894768f",
        isWinner: false,
        name: "The High Table",
      },
    ],
  },
  {
    id: 103,
    nextMatchId: 201,
    tournamentRoundText: "1",
    participants: [
      {
        id: "d8b9f00a-0ffa-4527-4444-da701894768e",
        isWinner: false,
        name: "Team Zeekerz",
      },
      {
        id: "e1e9f00a-0ffa-4527-2222-da701894768f",
        isWinner: false,
        name: "Heroes eSports",
      },
    ],
  },
  {
    id: 200,
    nextMatchId: 300,
    tournamentRoundText: "2",
    participants: [],
  },
  {
    id: 201,
    nextMatchId: 300,
    tournamentRoundText: "2",
    participants: [],
  },
  {
    id: 300,
    nextMatchId: null,
    tournamentRoundText: "3",
    participants: [],
  },
];
