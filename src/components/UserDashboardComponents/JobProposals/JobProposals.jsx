import React, { useEffect, useState } from "react";
import { Card, Button, List } from "antd";
import axios from "axios";

const JobProposals = ({ UserData, notification, fnotification }) => {
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch job postings
        const jobsResponse = await axios.get("/api/jobs");
        setJobs(jobsResponse.data);

        // Fetch proposals
        const proposalsResponse = await axios.get("/api/proposals");
        setProposals(proposalsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        fnotification("Error", "An error occurred while fetching data.");
      }
    }

    fetchData();
  }, []);

  const acceptProposal = async (jobId, proposalId) => {
    try {
      const response = await axios.post(`/api/jobs/${jobId}/accept/${proposalId}`);
      
      if (response.status === 200) {
        // Proposal accepted successfully
        notification("Proposal Accepted", "The proposal has been accepted.");
        // Remove the accepted proposal from the list (if needed)
        setProposals((prevProposals) => prevProposals.filter((p) => p._id !== proposalId));
      } else {
        // Proposal acceptance failed
        fnotification("Error", "Failed to accept the proposal.");
      }
    } catch (error) {
      console.error("Error accepting proposal:", error);
      fnotification("Error", "An error occurred while accepting the proposal.");
    }
  };

  return (
    <div>
      <h2>Job Proposals</h2>
      {jobs.map((job) => (
        <Card key={job._id} title={job.title} style={{ marginBottom: "16px" }}>
          <p>{job.description}</p>
          <h4>Proposals:</h4>
          <List
            dataSource={proposals}
            renderItem={(proposal) => (
              <List.Item>
                {proposal.jobId === job._id ? (
                  <div>
                    <p>{proposal.description}</p>
                    <Button type="primary" onClick={() => acceptProposal(job._id, proposal._id)}>
                      Accept Proposal
                    </Button>
                  </div>
                ) : null}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </div>
  );
};

export default JobProposals;
