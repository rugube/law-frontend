import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Card, Button, List, Row, Col, Typography } from "antd";
import HOST from "../../../utils/baseUrl";

const { Text } = Typography;

const JobProposals = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch jobs when the component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${HOST}/jobs/all`);
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
      await axios.post(`${HOST}/jobs/acceptProposal`, { jobId, proposalId });
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
      await axios.post(`${HOST}/jobs/rejectProposal`, { jobId, proposalId });
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
      <Row gutter={16}>
        {jobs.map((job) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={job._id}>
            <Card
              title={job.title}
              extra={
                <Button onClick={() => handleViewProposals(job)}>View Proposals</Button>
              }
            >
              <p>Service Type: {job.serviceType}</p>
              <p>Description: {job.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

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
                <Card title={<Text strong>{`Lawyer: ${proposal.lawyerId}`}</Text>}>
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
