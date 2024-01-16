import Link from "next/link";
import Image from "next/image";

// import { listItem } from "./listItem.js";
import { listItem } from "./listItemMenu.js";

// import icon
import faScrewdriverWrench from "../../assets/icons/screwdriver-wrench-solid.svg";
import faBullhorn from "../../assets/icons/bullhorn-solid.svg";
import faUserGroup from "../../assets/icons/user-group.svg";
import faUserTie from "../../assets/icons/user-tie-solid.svg";
import faHandshake from "../../assets/icons/handshake-solid.svg";
import faGift from "../../assets/icons/gift-solid.svg";
import faFileLines from "../../assets/icons/file-lines-solid.svg";

export default function DropdownComponent() {
  function filterIcon(icon) {
    listIcon.indexOf(icon);
    return `listIcon[${listIcon.indexOf(icon)}]`;
  }

  return (
    <div className="bg-red-700 h-25">
      <div className="container h-full py-3 mx-auto">
        <ul className="flex items-center h-24 gap-3">
          {/* Dropdown list */}
          {listItem.map((item) => (
            <>
              <li className="relative flex flex-col items-start flex-1 h-full gap-1 px-3 py-3 rounded-lg shadow-box bg-primary w-1/7 group/submenu1 hover:bg-secondary">
                <div className="">
                  <Image
                    src={
                      (item.icon == "faScrewdriverWrench" &&
                        faScrewdriverWrench) ||
                      (item.icon == "faBullhorn" && faBullhorn) ||
                      (item.icon == "faUserGroup" && faUserGroup) ||
                      (item.icon == "faUserTie" && faUserTie) ||
                      (item.icon == "faHandshake" && faHandshake) ||
                      (item.icon == "faGift" && faGift) ||
                      (item.icon == "faFileLines" && faFileLines)
                    }
                    alt="icon"
                    className="mb-1"
                  />
                </div>
                <p className="text-sm font-medium leading-tight text-white pointer-events-none">
                  {item.title}
                </p>
                {/* submenu 1 */}
                <ul
                  id="submenu"
                  className="shadow-box rounded-md absolute z-[999] min-w-max w-56 py-2 left-0 top-full text-sm bg-white hidden group-hover/submenu1:block group-last/submenu1:right-0 group-last/submenu1:left-auto group-[:nth-child(6)]/submenu1:right-0 group-[:nth-child(6)]/submenu1:left-auto"
                >
                  {item.submenu?.map((subItem) => (
                    <>
                      <h5 className="px-3 py-1 text-xs font-normal uppercase text-title">
                        {subItem.category}
                      </h5>

                      {subItem.menu?.map((menu, index) => (
                        <li className="relative group/submenu2" key={index}>
                          <Link
                            href={menu.href}
                            className="block px-3 py-1 hover:text-primary"
                          >
                            {menu.title}
                            {menu.submenu && (
                              <span className="float-right">&#9656;</span>
                            )}
                          </Link>
                          {/* submenu 2 */}
                          {menu.submenu && (
                            <ul
                              id="submenu2"
                              className="shadow-box rounded-md absolute min-w-max py-2 top-0 left-full w-48 text-sm bg-white drop-shadow-2xl hidden group-hover/submenu2:block group-last/submenu1:right-full group-last/submenu1:left-auto group-[:nth-child(6)]/submenu1:right-full group-[:nth-child(6)]/submenu1:left-auto"
                            >
                              <h5 className="px-3 py-1 text-xs font-normal uppercase text-title">
                                {menu.title}
                              </h5>
                              {menu.submenu?.map((subItem2) => (
                                <>
                                  <li className="relative group/submenu3">
                                    <Link
                                      href={subItem2.href}
                                      className="block px-3 py-1 hover:text-primary"
                                    >
                                      {subItem2.title}
                                    </Link>
                                  </li>
                                </>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                      {subItem.hr && <hr className="my-2" />}
                    </>
                  ))}
                </ul>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
