import React from 'react'
import "./Sidebar.css"
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    ScheduleOutlined,
    HelpOutline
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
                        <Chat className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Chats</span>
                    </li>
                    <li className="sidebarListsItems">
                        <PlayCircleFilledOutlined className="sidebarIcon"/>
                        <span className="sidebarListItemNext">Videos</span>
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
                <button className="sidebarButton">Show More</button>
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
