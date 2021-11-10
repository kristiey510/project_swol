import React from 'react'
import "./Share.css"
import {
    PermMedia,  
    EmojiEmotions,
    AddCircleOutline
} from "@material-ui/icons"

export default function Share() {
    return (
      <div className="Share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src="/assets/user/guy_1.png" alt="" />
            <input
              placeholder="What's in your mind?"
              className="shareInput"
            />
          </div>
          <hr className="shareHr"/>
          <div className="shareBottom">
              <div className="shareOptions">
                  <div className="shareOption">
                      <PermMedia htmlColor="tomato" className="shareIcon"/>
                      <span className="shareOptio nText">Add photos</span>
                  </div>
                  <div className="shareOption">
                      <AddCircleOutline htmlColor="goldenrod" className="shareIcon"/>
                      <span className="shareOptionText">Add activities</span>
                  </div>
                  <div className="shareOption">
                      <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                      <span className="shareOptionText">Share feelings</span>
                  </div>
              </div>
              <button className="shareButton">Share</button>
          </div>
        </div>
      </div>
    );
  }
