import React from "react";
import { Card, Button, List } from "antd";

const JobProposals = ({ jobs, proposals, setProposals, notification, fnotification }) => {
  // Function to accept a proposal
  const acceptProposal = (jobId, proposalId) => {
    // Find the job by ID
    const job = jobs.find((j) => j.id === jobId);

    // Find the proposal by ID
    const proposal = proposals.find((p) => p.id === proposalId);

    if (job && proposal) {
      // Perform any necessary logic to accept the proposal
      // You can update the proposal status, etc.

      // Show a success notification
      notification("Proposal Accepted", "The proposal has been accepted.");

      // Update the proposals state (if needed)
      // setProposals([...proposals, updatedProposal]);
    } else {
      // Show an error notification if job or proposal not found
      fnotification("Error", "Job or proposal not found.");
    }
  };

  return (
    <div>
      <h2>Job Proposals</h2>
      {jobs.map((job) => (
        <Card key={job.id} title={job.title} style={{ marginBottom: "16px" }}>
          <p>{job.description}</p>
          <h4>Proposals:</h4>
          <List
            dataSource={proposals}
            renderItem={(proposal) => (
              <List.Item>
                {proposal.jobId === job.id ? (
                  <div>
                    <p>{proposal.description}</p>
                    <Button type="primary" onClick={() => acceptProposal(job.id, proposal.id)}>
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
