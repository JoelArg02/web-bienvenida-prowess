import React from "react";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
  const { currentUser } = useAuth();
  const chartOptions = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      {currentUser ? (
        <>
          <div>Welcome back, {currentUser && currentUser.sub[1]}!</div>
          <div className="row">
            <div className="col-md-6">
              <h2>Performance Overview</h2>
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                type="bar"
                width="500"
              />
            </div>
            <div className="col-md-6">
              <h2>Tasks</h2>
              <ul className="list-group">
                <li className="list-group-item">Task 1</li>
                <li className="list-group-item">Task 2</li>
                <li className="list-group-item">Task 3</li>
              </ul>
            </div>
          </div>
          <div className="mt-3"></div>
        </>
      ) : (
        <div>Please log in to view this page.</div>
      )}
    </div>
  );
};

export default Dashboard;
