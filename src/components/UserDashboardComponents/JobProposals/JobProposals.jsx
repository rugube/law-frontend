import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Card, Button, List } from "antd";
import HOST from "../../../utils/baseUrl";

const JobProposals = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch jobs when the component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${HOST}/jobs/post`);
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handleViewProposals = (job) => {
    setSelectedJob(job);
  };

  const handleAcceptProposal = async (jobId, proposalId) => {
    try {
      await axios.post(`${HOST}/jobs/post`, { jobId, proposalId });
      // Update the UI or refetch jobs
      fetchJobs();
      // Close the modal
      setSelectedJob(null);
    } catch (error) {
      console.error("Failed to accept proposal:", error);
    }
  };

  const handleRejectProposal = async (jobId, proposalId) => {
    try {
      await axios.post(`${HOST}/jobs/post`, { jobId, proposalId });
      // Update the UI or refetch jobs
      fetchJobs();
      // Close the modal
      setSelectedJob(null);
    } catch (error) {
      console.error("Failed to reject proposal:", error);
    }
  };

  return (
    <div>
      <h1>View Proposals</h1>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={jobs}
        renderItem={(job) => (
          <List.Item>
            <Card
              title={job.title}
              extra={
                <Button onClick={() => handleViewProposals(job)}>
                  View Proposals
                </Button>
              }
            >
              <p>Service Type: {job.serviceType}</p>
              <p>Description: {job.description}</p>
            </Card>
          </List.Item>
        )}
      />

      {selectedJob && (
        <Modal
          title={`Proposals for ${selectedJob.title}`}
          visible={true}
          onCancel={() => setSelectedJob(null)}
          footer={null}
        >
          <List
            dataSource={selectedJob.proposals}
            renderItem={(proposal) => (
              <List.Item>
                <Card title={`Lawyer: ${proposal.lawyerId}`}>
                  <p>{proposal.proposal}</p>
                  <Button
                    type="primary"
                    onClick={() => handleAcceptProposal(selectedJob._id, proposal._id)}
                  >
                    Accept
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleRejectProposal(selectedJob._id, proposal._id)}
                  >
                    Reject
                  </Button>
                </Card>
              </List.Item>
            )}
          />
        </Modal>
      )}
    </div>
  );
};

export default JobProposals;
