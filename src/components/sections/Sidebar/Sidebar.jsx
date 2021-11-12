import React from 'react'
import "./Sidebar.css"
import {
    RssFeed,
    PlayCircleFilledOutlined,
    PostAddOutlined,
    ScheduleOutlined,
    HelpOutline,
    Person
} from "@material-ui/icons"

export default function Sidebar() {
    return (
        <div className="Sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarLists">
                    <li className="sidebarListsItems">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Feed</span>
                    </li>
                    <li className="sidebarListsItems">
                        <Person className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Followers</span>
                    </li>
                    <li className="sidebarListsItems">
                        <PostAddOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Personal log</span>
                    </li>
                    <li className="sidebarListsItems">
                        <ScheduleOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Schedule</span>
                    </li>
                    <li className="sidebarListsItems">
                        <HelpOutline className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Questions</span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/user/girl_1.png" alt=""/>
                        <span className="sidebarFriendName">Jane</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
