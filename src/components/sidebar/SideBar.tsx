import React, { MouseEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const SideContainer = styled.aside`
  width: 15%;
  min-width: 250px;
  height: 100vh;
  border: 1px solid #00000060;
  border-top: none;
`;

const SideBarMenuWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
`;

type MenuProps = {
  $activeMenu: string;
};

const SideBarMenu = styled.li<MenuProps>`
  width: 100%;
  padding: 1rem 3rem;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  ${(props) => {
    if (
      props.children &&
      typeof props.children === "string" &&
      props.$activeMenu === props.children.toLowerCase()
    ) {
      return css`
        background-color: white;
        color: #1f8be9;
      `;
    }
  }}

  &:hover {
    background-color: #63b6ff;
    color: white;
  }
`;

export default function SideBar() {
  const { pathname } = useLocation();

  const menu = ["DashBoard", "Tasks"];
  const [activeMenu, setActiveMenu] = useState<string>("DashBoard");

  const navi = useNavigate();

  const handleActiveMenu = (e: MouseEvent<HTMLLIElement>) => {
    const clickedMenu = e.currentTarget.innerText.toLowerCase();
    setActiveMenu(clickedMenu);
  };

  const setPrevMenu = () => {
    if (pathname !== "/") {
      setActiveMenu(pathname.slice(1));
    } else {
      setActiveMenu("dashboard");
    }
  };

  const navigateTo = (e: MouseEvent<HTMLLIElement>) => {
    const path = e.currentTarget.innerText.toLowerCase();
    navi(`/${path}`);
  };

  useEffect(() => {
    setPrevMenu();
  }, [pathname]);

  return (
    <SideContainer>
      <SideBarMenuWrapper>
        {menu.map((list, idx) => {
          return (
            <SideBarMenu
              key={idx}
              $activeMenu={activeMenu}
              onClick={(e) => {
                navigateTo(e);
                handleActiveMenu(e);
              }}>
              {list}
            </SideBarMenu>
          );
        })}
      </SideBarMenuWrapper>
    </SideContainer>
  );
}
