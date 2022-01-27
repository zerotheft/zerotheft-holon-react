import React, { useState, useContext, useEffect } from "react"
import { get } from "lodash"
import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"

import { AppBar, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import MenuIcon from "@mui/icons-material/Menu"
import { Apps, Dvr, Home, Language, MoreVert, ViewList, KeyboardArrowDown } from "@mui/icons-material"
import config from "config"
import BRANDLOGO from "assets/icons/zerotheft.svg"

import { getNations } from "apis/path"
import useFetch from "commons/hooks/useFetch"

import * as ROUTES from "constants/routes"

// import { Container } from "commons/styles";
import { colors, height } from "theme"

import { AppContext } from "../../AppContext"

const { CENTRALIZED_SERVER_FRONTEND } = config

const Header = () => {
  // const history = useHistory();
  const [getNationsApi] = useFetch(getNations)
  const { filterParams } = useContext(AppContext)

  const [country] = useState({
    value: get(filterParams, "initPath", "USA"),
    label: get(filterParams, "initPath", "USA"),
  })

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElMore, setAnchorElMore] = useState(null)
  const [anchorElMoreSmall, setAnchorElMoreSmall] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    handleCloseMoreMenuSmall()
    setAnchorElNav(null)
  }

  const handleOpenMoreMenu = (event) => {
    setAnchorElMore(event.currentTarget)
  }

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null)
  }

  const handleOpenMoreMenuSmall = (event) => {
    setAnchorElMoreSmall(event.currentTarget)
  }

  const handleCloseMoreMenuSmall = () => {
    setAnchorElMoreSmall(null)
  }

  const buttonSx = {
    px: 2,
    display: "flex",
    color: colors.grey500,
    fontSize: "14px",
    textTransform: "unset",
  }

  const SubButtonSx = {
    display: "flex",
    color: colors.grey500,
    textTransform: "unset",
  }

  useEffect(() => {
    getNationsApi()
  }, [])

  return (
    <AppBar color="neutral">
      <Container maxWidth="false">
        <NavToolBar disableGutters>
          <NavLink to="/">
            <Box component="img" alt="Your logo." src={BRANDLOGO} sx={{ display: { xs: "none", md: "flex" } }} />
          </NavLink>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <MenuAnchor>
              <NavLink to={ROUTES.HOME} exact activeClassName="active">
                <Button startIcon={<Home />} key="home" variant="text" sx={buttonSx}>
                  Home
                </Button>
              </NavLink>

              <a href={`${CENTRALIZED_SERVER_FRONTEND}/holons`} target="_blank" rel="noreferrer">
                <Button startIcon={<Language />} key="holon" variant="text" sx={buttonSx}>
                  Holons
                </Button>
              </a>

              <NavLink to={`${ROUTES.PATH}/${country.value}`} activeClassName="active">
                <Button startIcon={<Dvr />} key="path" variant="text" sx={buttonSx}>
                  Path
                </Button>
              </NavLink>

              <NavButton
                startIcon={<Apps />}
                key="more"
                onClick={handleOpenMoreMenu}
                variant="text"
                sx={buttonSx}
                activeClassName="active"
                endIcon={<KeyboardArrowDown />}
              >
                More
              </NavButton>

              <Menu
                sx={{
                  mt: "36px",
                  pt: "0px",
                }}
                id="menu-appbar"
                anchorEl={anchorElMore}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElMore)}
                onClose={handleCloseMoreMenu}
              >
                <SubMenuAnchor>
                  <NavLink to={ROUTES.DATALIST} activeClassName="active" onClick={handleCloseMoreMenu}>
                    <MenuItem key="citizens">
                      <Typography textAlign="center">Citizens/Proposals</Typography>
                    </MenuItem>
                  </NavLink>

                  <NavLink to={ROUTES.VOTELIST} activeClassName="active" onClick={handleCloseMoreMenu}>
                    <MenuItem key="votes">
                      <Typography textAlign="center">Votes</Typography>
                    </MenuItem>
                  </NavLink>

                  <NavLink to={ROUTES.HIERARCHY} activeClassName="active" onClick={handleCloseMoreMenu}>
                    <MenuItem key="hierarchyYaml">
                      <Typography textAlign="center">HierarchyYaml</Typography>
                    </MenuItem>
                  </NavLink>

                  <a
                    href={ROUTES.EXPORT_LOCATION}
                    activeClassName="active"
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleCloseMoreMenu}
                  >
                    <MenuItem key="exportedData">
                      <Typography textAlign="center">Exported Data</Typography>
                    </MenuItem>
                  </a>
                </SubMenuAnchor>
              </Menu>
            </MenuAnchor>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Nav menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <SubMenuAnchor>
                <MenuItem key="home">
                  <NavLink to={ROUTES.HOME} exact activeClassName="active" onClick={handleCloseNavMenu}>
                    <Button startIcon={<Home />} key="home" variant="text" sx={SubButtonSx}>
                      Home
                    </Button>
                  </NavLink>
                </MenuItem>
              </SubMenuAnchor>

              <SubMenuAnchor>
                <MenuItem key="holon">
                  <a
                    href={`${CENTRALIZED_SERVER_FRONTEND}/holons`}
                    onClick={handleCloseNavMenu}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button startIcon={<Language />} key="holon" variant="text" sx={SubButtonSx}>
                      Holons
                    </Button>
                  </a>
                </MenuItem>
              </SubMenuAnchor>

              <SubMenuAnchor>
                <MenuItem key="path">
                  <NavLink to={`${ROUTES.PATH}/${country.value}`} activeClassName="active" onClick={handleCloseNavMenu}>
                    <Button startIcon={<ViewList />} key="path" variant="text" sx={SubButtonSx}>
                      Path
                    </Button>
                  </NavLink>
                </MenuItem>
              </SubMenuAnchor>

              <SubMenuAnchor>
                <MenuItem key="more">
                  <Button
                    startIcon={<MoreVert />}
                    key="more"
                    onClick={handleOpenMoreMenuSmall}
                    variant="text"
                    sx={SubButtonSx}
                  >
                    More
                  </Button>
                </MenuItem>
              </SubMenuAnchor>
            </Menu>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElMoreSmall}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElMoreSmall)}
              onClose={handleCloseMoreMenuSmall}
            >
              <SubMenuAnchor>
                <NavLink to={ROUTES.DATALIST} activeClassName="active" onClick={handleCloseNavMenu}>
                  <MenuItem key="citizens">
                    <Typography textAlign="center">Citizens/Proposals</Typography>
                  </MenuItem>
                </NavLink>

                <NavLink to={ROUTES.VOTELIST} activeClassName="active" onClick={handleCloseNavMenu}>
                  <MenuItem key="votes">
                    <Typography textAlign="center">Votes</Typography>
                  </MenuItem>
                </NavLink>

                <NavLink to={ROUTES.HIERARCHY} activeClassName="active" onClick={handleCloseNavMenu}>
                  <MenuItem key="hierarchyYaml">
                    <Typography textAlign="center">HierarchyYaml</Typography>
                  </MenuItem>
                </NavLink>

                <a
                  href={ROUTES.EXPORT_LOCATION}
                  activeClassName="active"
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleCloseNavMenu}
                >
                  <MenuItem key="exportedData">
                    <Typography textAlign="center">Exported Data</Typography>
                  </MenuItem>
                </a>
              </SubMenuAnchor>
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ pt: 1, flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/">
              <img src={BRANDLOGO} alt="Zerotheft Movement" />
            </Link>
          </Typography>
        </NavToolBar>
      </Container>
    </AppBar>
  )
}

export default Header

const NavToolBar = styled(Toolbar)`
    height: ${height.header}px;
    min-height: ${height.header}px;
  `,
  NavButton = styled(Button)`
    &&:hover {
      background-color: rgba(127, 88, 191, 0.04);
    }
    &:focus {
      background-color: ${colors.white};
    }
    &.active {
      color: ${colors.primary};
    }
    span.MuiButton-endIcon {
      margin-left: 0;
    }
  `,
  MenuAnchor = styled.div`
    display: flex;
    a {
      text-decoration: none;
      button {
        min-height: 100%;
      }
    }
    .active {
      button {
        color: ${colors.primary};
        svg {
          path {
            fill: ${colors.primary};
          }
        }
      }
    }
  `

const SubMenuAnchor = styled.div`
  p {
    font-size: 14px !important;
  }
  a {
    text-decoration: none;
    color: ${colors.grey500};
  }
  .active {
    button {
      color: ${colors.primary};
      svg {
        path {
          fill: ${colors.primary};
        }
      }
    }
  }
`
