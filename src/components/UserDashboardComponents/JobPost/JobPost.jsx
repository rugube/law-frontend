import React, { useState } from "react";
import { Card, Input, Button, Select } from "antd";
import axios from "axios";
import HOST from "../../../utils/baseUrl";

const { TextArea } = Input;
const { Option } = Select;

const JobPost = ({ UserData, notification }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [serviceType, setServiceType] = useState("contract review");
  const [jobDescription, setJobDescription] = useState("");

  const postJob = async () => {
    try {
      const response = await axios.post(`${HOST}/jobs`, {
        userId: UserData._id, // Assuming UserData contains user information
        serviceType,
        description: jobDescription,
      });

      if (response.status === 201) {
        // Job posting successful
        notification("Job Posted", "Your job has been posted successfully.");
        // Clear input fields
        setJobTitle("");
        setServiceType("contract review");
        setJobDescription("");
      } else {
        // Job posting failed
        notification("Error", "Failed to post the job.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      notification("Error", "An error occurred while posting the job.");
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <Card>
        <Input
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Select
          value={serviceType}
          onChange={(value) => setServiceType(value)}
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <Option value="contract review">Contract Review</Option>
          <Option value="litigation">Litigation</Option>
          <Option value="legal consultation">Legal Consultation</Option>
          <Option value="other">Other</Option>
        </Select>
        <TextArea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <Button type="primary" onClick={postJob}>
          Post Job
        </Button>
      </Card>
    </div>
  );
};

export default JobPost;
