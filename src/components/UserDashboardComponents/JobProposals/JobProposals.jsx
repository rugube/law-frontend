import React from "react";

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
        <div key={job.id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <h4>Proposals:</h4>
          <ul>
            {proposals.map((proposal) => (
              <li key={proposal.id}>
                {proposal.jobId === job.id ? (
                  <div>
                    {proposal.description}
                    <button onClick={() => acceptProposal(job.id, proposal.id)}>Accept Proposal</button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default JobProposals;
