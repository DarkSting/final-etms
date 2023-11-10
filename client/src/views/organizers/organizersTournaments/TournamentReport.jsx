import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import Chart from "chart.js/auto";
import "./TournamentReport.css";

function getEsportsDisplayName(esportsTitle) {
  switch (esportsTitle) {
    case "cs-go":
      return "Counter-Strike: Global Offensive";
    case "dota-2":
      return "Dota 2";
    case "valorant":
      return "Valorant";
    case "lol":
      return "League of Legends";
    default:
      return "Esports Title";
  }
}

function createChart(data, totalEarnings) {
  const ctx = document.getElementById("tournamentChart").getContext("2d");

  const chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Earnings (LKR)",
          data: data.earnings,
          backgroundColor: ["#338CFF", "#FF336E", "#33FFAA"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Total Earnings: ${totalEarnings} LKR`,
          align: "center",
          font: {
            size: 24,
            weight: "bold",
            family: "'Arial', sans-serif",
          },
          color: "#1CAC78",
        },
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });

  return chart;
}

function TournamentReport() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  const [reportData, setReportData] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  useEffect(() => {
    // Fetch the tournament report data
    axios
      .get(`/api/organizers/${esportsTitle}/tournament/${tournamentId}/report`)
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tournament report:", error);
      });

    // Send a GET request to the server's endpoint to get total earnings
    axios
      .get(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/total-earnings`
      )
      .then((response) => {
        setTotalEarnings(response.data.totalEarnings);
      })
      .catch((error) => {
        console.error("Error fetching total earnings:", error);
      });

    // Send a GET request to the server's endpoint to get total registrations
    axios
      .get(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/total-registrations`
      )
      .then((response) => {
        setTotalRegistrations(response.data.totalRegistrations);
      })
      .catch((error) => {
        console.error("Error fetching total registrations:", error);
      });
  }, [tournamentId, esportsTitle]);

  const displayEsportsTitle = getEsportsDisplayName(esportsTitle);

  useEffect(() => {
    if (reportData) {
      createChart(
        {
          labels: reportData.teams.map((team) => team.teamName),
          earnings: reportData.teams.map((team) => team.registrationFees),
        },
        totalEarnings
      );
    }
  }, [reportData, totalEarnings]);

  return (
    <div className="tournament-report-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <div className="tournament-report-content">
        <h1 className="tournament-report-title">Tournament Report</h1>
        {reportData && (
          <div className="tournament-report-details">
            <h2 className="tournament-report-name">
              {reportData.tournamentName}
            </h2>
            <h3 className="tournament-report-esports-title">
              Esports Title: {displayEsportsTitle}
            </h3>
            {/* Total registrations cards */}
            <p className="tournament-report-total-registrations">
              Total Teams Registered: {totalRegistrations}
            </p>
            {/* Canvas for the chart */}
            <canvas
              id="tournamentChart"
              className="tournament-report-chart"
            ></canvas>
            <h3 className="tournament-report-table-title">
              Team Registration Details
            </h3>
            <table className="tournament-report-table">
              <thead className="tournament-report-table-head">
                <tr>
                  <th className="tournament-report-table-header">Team Name</th>
                  <th className="tournament-report-table-header">
                    Registration Fees
                  </th>
                  <th className="tournament-report-table-header">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {reportData.teams.map((team, index) => (
                  <tr key={index}>
                    <td className="tournament-report-table-data">
                      {team.teamName}
                    </td>
                    <td className="tournament-report-table-data">
                      {team.registrationFees} LKR
                    </td>
                    <td className="tournament-report-table-data">
                      {team.paymentStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TournamentReport;
