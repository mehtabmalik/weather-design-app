import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer, Image } from "antd";
import React, { useState } from "react";
import { Link } from "react-scroll";
import { Icons } from "../../../public";
const LINKS = [
  { to: "Hero", text: "Home" },
  { to: "Contact-Section", text: "Service" },
  { to: "Complete-Section", text: "Project" },
  { to: "Recomment-Section", text: "About" },
  { to: "Team-Member", text: "Client" },
  { to: "Footer", text: "Contact" },
];
const ICONS = [
  { id: 1, src: Icons.linkedIn, alt: "LinkedIn" },
  { id: 2, src: Icons.facebook, alt: "Facebook" },
  { id: 3, src: "./assets/twitter.png", alt: "Twitter" },
  { id: 4, src: "./assets/youtube.png", alt: "YouTube" },
];
const CONTACT_ICONS = [
  { id: 1, data: "+223 456 789", src: "./assets/call.png", alt: "Call" },
  { id: 2, data: "example@gmail.com", src: "./assets/send.png", alt: "send" },
  {
    id: 3,
    data: "6391 Elgin St. Celina, Delaware",
    src: "./assets/location_on.png",
    alt: "Location",
  },
];
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen((prev) => !prev);
  return (
    <div className="fixed w-full z-50 px-3 sm:px-3 md:px-3 shadow-[0px_5px_16px_0px_rgba(0,0,0,0.25)] bg-[#17171970]">
      {" "}
      <div className="flex items-end justify-end md:items-center md:justify-between pt-2">
        {" "}
        <div className="hidden md:flex items-center justify-end">
          {" "}
          {ICONS.map((item) => (
            <>
              {" "}
              <Link key={item.id} href="#">
                {" "}
                <Image preview={false} src={item.src} alt={item.alt} />{" "}
              </Link>{" "}
            </>
          ))}{" "}
        </div>{" "}
        <div className="hidden md:flex gap-5">
          {" "}
          {CONTACT_ICONS.map((item) => (
            <>
              {" "}
              <div className="items-center flex">
                {" "}
                <Image preview={false} src={item.src} alt={item.alt} />{" "}
                <p className="text-Satoshi px-0.5 text-[rgba(230,230,230,0.51)] text-[14px] font-medium">
                  {" "}
                  {item.data}{" "}
                </p>{" "}
              </div>{" "}
            </>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="flex justify-between text-end items-center py-2">
        {" "}
        <div className="flex items-center">
          {" "}
          <Image
            preview={false}
            className="text-[#194BFD] !w-8 !h-7 hidden md:flex"
            src="./assets/Downkey.png"
            alt="Down key"
          />{" "}
          <div className="flex md:hidden">
            {" "}
            <MenuOutlined
              className="cursor-pointer text-blue-600 text-3xl"
              onClick={toggleDrawer}
            />{" "}
            <Drawer
              style={{
                backgroundColor: "rgba(0,0,0)",
                boxShadow: "0px_5px_16px_0px",
              }}
              className="text-Satoshi text-[18px] font-bold leading-10 shadow-[0px_5px_16px_0px_rgba(0,0,0,0.25)] bg-[#17171970]"
              placement="left"
              closable={false}
              onClose={toggleDrawer}
              open={open}
              width={320}
            >
              {" "}
              <div className="flex w-full flex-col">
                {" "}
                {LINKS.map(({ to, text }) => (
                  <Link
                    key={to}
                    to={to}
                    smooth
                    duration={3000}
                    onClick={toggleDrawer}
                    className="text-[rgba(230,230,230,0.51)] w-full text-center py-2 hover:border-blue-700 cursor-pointer"
                  >
                    {" "}
                    {text}{" "}
                  </Link>
                ))}{" "}
              </div>{" "}
            </Drawer>{" "}
          </div>{" "}
          <h2 className="w-full hidden sm:flex pl-1 text-Space-Grotesk text-lg tracking-widest font-bold leading-[20.42px]">
            {" "}
            designer{" "}
          </h2>{" "}
        </div>{" "}
        <div className="hidden md:flex md:gap-[20px] lg:gap-[50px] text-Satoshi text-[rgba(230,230,230,0.51)] text-[14px] font-bold leading-4">
          {" "}
          <Link
            to="Hero"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            Home{" "}
          </Link>{" "}
          <Link
            to="Contact-Section"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            Service{" "}
          </Link>{" "}
          <Link
            to="Complete-Section"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            Project{" "}
          </Link>{" "}
          <Link
            to="Recomment-Section"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            About{" "}
          </Link>{" "}
          <Link
            to="Team-Member"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            Client{" "}
          </Link>{" "}
          <Link
            to="Footer"
            smooth={true}
            duration={2000}
            className="hover:text-white cursor-pointer"
          >
            {" "}
            Contact{" "}
          </Link>{" "}
        </div>{" "}
        <Button className="w-40 h-10 hidden md:flex rounded-[29px] py-3 px-5 text-white text-Satoshi text-[14px] font-bold leading-[15.96px] bg-[linear-gradient(93.66deg,#194BFD-10.33%,_#AD13FB_139.21%)]">
          {" "}
          Discuss for Projects{" "}
        </Button>{" "}
        <div className="flex items-center md:hidden justify-end py-4">
          {" "}
          <Link href="#">
            {" "}
            <Image
              preview={false}
              src="./assets/linkedin.png"
              alt="LinkedIn"
            />{" "}
          </Link>{" "}
          <Link href="#">
            {" "}
            <Image
              preview={false}
              className="px-2"
              src="./assets/fb.png"
              alt="Facebook"
            />{" "}
          </Link>{" "}
          <Link href="#">
            {" "}
            <Image
              preview={false}
              className="px-2"
              src="./assets/twitter.png"
              alt="Twitter"
            />{" "}
          </Link>{" "}
          <Link href="#">
            {" "}
            <Image
              preview={false}
              className="px-2"
              src="./assets/youtube.png"
              alt="YouTube"
            />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Navbar;
