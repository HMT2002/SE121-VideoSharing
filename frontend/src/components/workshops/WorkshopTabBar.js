import React from "react";

import Button from "../UI elements/Button";

import { SiAddthis } from "react-icons/si";

const WorkshopTabBarItem = (props) => {
    const index = props.itemIndex;

    const ItemClickedHandler = () => props.onClick(index);

    return (
        <React.Fragment>
            <Button
                className={props.className}
                icon={props.icon}
                content={props.content}
                onClick={ItemClickedHandler} />
        </React.Fragment>
    );
}

const WorkshopTabBar = (props) => {
    const ChangeTabHandler = (index) => props.onChangeTab(index);
    return (
        <React.Fragment>
            <div className="workshop-page__tab-bar">
                <WorkshopTabBarItem
                    itemIndex={4}
                    className="workshop-page__tab-bar__new-thread-btn"
                    icon={<SiAddthis className="workshop-page__tab-bar__new-thread-icon" />}
                    content="NEW THREAD"
                    onClick={ChangeTabHandler} />
                <WorkshopTabBarItem
                    itemIndex={1}
                    className="workshop-page__tab-bar__item"
                    content="Dashboard"
                    onClick={ChangeTabHandler} />
                <WorkshopTabBarItem
                    itemIndex={2}
                    className="workshop-page__tab-bar__item"
                    content="Threads"
                    onClick={ChangeTabHandler} />
                <WorkshopTabBarItem
                    itemIndex={3}
                    className="workshop-page__tab-bar__item"
                    content="Comments"
                    onClick={ChangeTabHandler} />
            </div>
        </React.Fragment>
    );
}

export default WorkshopTabBar;