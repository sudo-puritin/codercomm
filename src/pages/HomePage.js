import React, { useState } from "react";
import useAuth from "../hooks/useAuth";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

import Profile from "../features/user/Profile";
import FriendList from "../features/friend/FriendList";
import FriendRequest from "../features/friend/FriendRequest";
import AddFriend from "../features/friend/AddFriend";
import { Box, Card, Container, Tab, Tabs, styled } from "@mui/material";
import { capitalCase } from "change-case";
import ProfileCover from "../features/user/ProfileCover";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

function HomePage() {
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState("profile");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };
  const PROFILE_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 24 }} />,
      component: <Profile profile={user} />,
    },
    {
      value: "friends",
      icon: <PeopleAltIcon sx={{ fontSize: 24 }} />,
      component: <FriendList />,
    },
    {
      value: "requests",
      icon: <ContactMailIcon sx={{ fontSize: 24 }} />,
      component: <FriendRequest />,
    },
    {
      value: "add_friends",
      icon: <PersonAddRoundedIcon sx={{ fontSize: 24 }} />,
      component: <AddFriend />,
    },
  ];

  return (
    <Container>
      <Card sx={{ mb: 3, height: 200, position: "relative" }}>
        <ProfileCover profile={user} />

        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            onChange={(e, value) => handleChangeTab(value)}
            aria-label="wrapped label tabs example"
          >
            {PROFILE_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card>

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default HomePage;
