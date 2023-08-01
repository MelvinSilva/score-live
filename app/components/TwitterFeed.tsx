"use client";
import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterFeed = () => {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName="ActuFoot_"
      options={{ height: 600 }}
    />
  );
};

export default TwitterFeed;
