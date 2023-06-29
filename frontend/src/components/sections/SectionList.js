import React from "react";

import Section from "./Section";

const SectionList = (props) => {
    const sections = props.labels.map((label) => {
        let threadsPerTag = [];

        props.threads.map((thread) => {
            if (thread.tag === label)
                threadsPerTag = [...threadsPerTag, thread];
            return thread;
        });

        return (<Section
            key={props.labels.indexOf(label).toString()}
            tag={label}
            threadsByTag={threadsPerTag}
        />);
    });

    return (
        <React.Fragment>
            <ul className="centered">
                {sections}
            </ul>
        </React.Fragment>
    );
};

export default SectionList;