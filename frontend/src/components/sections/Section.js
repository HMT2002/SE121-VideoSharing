import React from "react";

import ThreadList from "../threads/ThreadList";

import "../../styles/Section.css";

const Section = (props) => {
    return (
        <section className="tag-section">
            <h1 className="tag-section__label"># {props.tag}</h1>
            <ThreadList threads={props.threadsByTag} />
            <div className="tag-section__separator" />
        </section>
    );
};

export default Section;