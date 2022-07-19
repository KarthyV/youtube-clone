import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { logout } from "../../redux/actions/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [appAnchorEl, setAppAnchorEl] = React.useState(null);
  const appOpen = Boolean(appAnchorEl);
  const handleAppClick = (event) => {
    setAppAnchorEl(event.currentTarget);
  };
  const handleAppClose = () => {
    setAppAnchorEl(null);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query !== "") {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-logo-png-transparent-image-5.png"
          alt="ytc_logo"
        />
      </div>
      <div className="header__center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
          onKeyDown={handleSearch}
        />
        <SearchIcon className="searchIcon" />
      </div>
      <div className="header__right">
        <IconButton onClick={handleAppClick} size="small" sx={{ ml: 2 }}>
          <AppsIcon className="header__logo" />
        </IconButton>
        <Menu
          anchorEl={appAnchorEl}
          open={appOpen}
          onClose={handleAppClose}
          onClick={handleAppClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <a
              className="header_appLink"
              href="https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="header_AppIcons"
                src="https://www.freepnglogos.com/uploads/youtube-tv-png/youtube-tv-youtube-watch-record-live-apk-download-from-moboplay-21.png"
                alt="youtube-tv"
              />
              Youtube TV
            </a>
          </MenuItem>
          <Divider />
          <MenuItem>
            <a
              className="header_appLink"
              href="https://music.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="header_AppIcons"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Youtube_Music_icon.svg/1024px-Youtube_Music_icon.svg.png"
                alt="youtube-music"
              />
              Youtube Music
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="header_appLink"
              href="https://www.youtubekids.com/?source=youtube_web"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="header_AppIcons"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/YouTube_Kids_LogoVector.svg/1267px-YouTube_Kids_LogoVector.svg.png"
                alt="youtube-kids"
              />
              Youtube Kids
            </a>
          </MenuItem>
          <Divider />
          <MenuItem>
            <a
              className="header_appLink"
              href="https://artists.youtube.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="header_AppIcons"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
                alt="youtube-artists"
              />
              Youtube for Artists
            </a>
          </MenuItem>
        </Menu>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar src={user?.picture} alt={user?.name} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar src={user?.picture} alt={user?.name} /> {user?.name}
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
