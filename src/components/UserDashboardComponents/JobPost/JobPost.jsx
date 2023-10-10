import React, { useState } from "react";
import { Card, Input, Button } from "antd";

const { TextArea } = Input;

const JobPost = ({ UserData, jobs, setJobs, notification }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const postJob = () => {
    // Create a new job object
    const newJob = {
      title: jobTitle,
      description: jobDescription,
      postedBy: UserData.id, // Assuming UserData contains user information
    };

    // Update the jobs state with the new job
    setJobs([...jobs, newJob]);

    // Show a success notification
    notification("Job Posted", "Your job has been posted successfully.");

    // Clear input fields
    setJobTitle("");
    setJobDescription("");
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
