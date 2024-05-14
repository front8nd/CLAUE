import React from "react";
import "./style.css";
import PublishContentInput from "../../components/PublishContent-Input";
import PublishHeader from "../../components/PublishHeader";

export default function PublishContent() {
  return (
    <div>
      <PublishHeader />
      <div className="center">
        <div className="publish-content">
          <PublishContentInput />
        </div>
      </div>
    </div>
  );
}
