import React, { useState } from "react";

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
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <textarea
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <button onClick={postJob}>Post Job</button>
    </div>
  );
};

export default JobPost;
