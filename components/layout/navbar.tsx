"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Loader2 } from "lucide-react";

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  //   useEffect(() => {
  //     document.body.style.overflow = mobileOpen ? "hidden" : "";
  //     return () => {
  //       document.body.style.overflow = "";
  //     };
  //   }, [mobileOpen]);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const closeAll = () => {
    setOpenKey(null);
    setMobileOpen(false);
  };

  if (user) {
    return (
      <div className="bg-[#0095DB] text-white">
        <style>{`
        .subMenu {
            position: relative;
            display: flex;
            justify-content: space-between;
        }

        .subMenu::after {
            content: "";
            background-image: url(../arrow_dropdown.webp);
            width: 12px;
            border: 0;
            height: 12px;
            vertical-align: inherit;
            background-size: 12px;
            transition: all .1s;
            margin-left: 8px;
        }
        .subMenu.opened::after {
            transform: rotate(180deg);
        }
      `}</style>
        <div className="mx-auto max-w-7xl px-4">
          <nav className="relative flex h-[46px] items-center justify-between">
            <button
              className="h-[46px] px-4 md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              ☰
            </button>
            <ul
              className={`md:flex ${mobileOpen ? "block" : "hidden"} absolute top-full left-0 z-50 w-full bg-[#0095DB] md:static md:w-auto md:bg-transparent`}
            >
              <li>
                <a
                  href="/"
                  onClick={closeAll}
                  className="flex h-[46px] cursor-pointer items-center bg-[#05547E] px-[20px]"
                >
                  หน้าแรก
                </a>
              </li>
              <li>
                <a
                  href="#ประกาศรับข้อเสนอ"
                  onClick={closeAll}
                  className="flex h-[46px] cursor-pointer items-center px-[20px] hover:bg-[#05547E]"
                >
                  ประกาศรับข้อเสนอ
                </a>
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={() => toggle("proposal")}
                  className={`subMenu flex h-[46px] w-full cursor-pointer items-center px-[20px] hover:bg-[#05547E] md:w-auto ${openKey === "proposal" ? "opened bg-[#05547E]" : ""}`}
                >
                  ข้อเสนอโครงการ
                </button>

                {openKey === "proposal" && (
                  <ul
                    className={` ${mobileOpen ? "static" : "absolute"} top-full left-0 cursor-pointer bg-[#05547E]`}
                  >
                    <li>
                      <a
                        href="#ข้อเสนอโครงการ"
                        onClick={closeAll}
                        className="menu"
                      >
                        ข้อเสนอโครงการ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#ผลตรวจความซ้ำซ้อน"
                        onClick={closeAll}
                        className="menu"
                      >
                        ผลตรวจความซ้ำซ้อน
                      </a>
                    </li>
                    <li>
                      <a
                        href="#กำหนดสิทธิ์ข้อเสนอโครงการ"
                        onClick={closeAll}
                        className="menu"
                      >
                        กำหนดสิทธิ์ข้อเสนอโครงการ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#แบบร่างข้อเสนอโครงการ"
                        onClick={closeAll}
                        className="menu"
                      >
                        แบบร่างข้อเสนอโครงการ
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={() => toggle("report")}
                  className={`subMenu flex h-[46px] w-full cursor-pointer items-center px-[20px] hover:bg-[#05547E] md:w-auto ${openKey === "report" ? "opened bg-[#05547E]" : ""}`}
                >
                  รายงาน
                </button>

                {openKey === "report" && (
                  <ul
                    className={` ${mobileOpen ? "static" : "absolute"} top-full left-0 bg-[#05547E]`}
                  >
                    <li>
                      <a href="#กราฟ" onClick={closeAll} className="menu">
                        กราฟ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#รายงานภาพรวม"
                        onClick={closeAll}
                        className="menu"
                      >
                        รายงานภาพรวม
                      </a>
                    </li>
                    <li>
                      <a
                        href="#รายงานรายโครงการ"
                        onClick={closeAll}
                        className="menu"
                      >
                        รายงานรายโครงการ
                      </a>
                    </li>
                    <li>
                      <a
                        href="#ประวัติบุคคล/หน่วยงาน"
                        onClick={closeAll}
                        className="menu"
                      >
                        ประวัติบุคคล/หน่วยงาน
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <a
                  href="#คู่มือ"
                  onClick={closeAll}
                  className="flex h-[46px] cursor-pointer items-center px-[20px] hover:bg-[#05547E]"
                >
                  คู่มือ
                </a>
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={() => toggle("user")}
                  className={`subMenu flex h-[46px] w-full cursor-pointer items-center px-[20px] hover:bg-[#05547E] md:w-auto ${openKey === "user" ? "opened bg-[#05547E]" : ""}`}
                >
                  จัดการผู้ใช้
                </button>

                {openKey === "user" && (
                  <ul
                    className={` ${mobileOpen ? "static" : "absolute"} top-full left-0 bg-[#05547E]`}
                  >
                    <li>
                      <a
                        href="#จัดการผู้ใช้ภายใน"
                        onClick={closeAll}
                        className="menu"
                      >
                        จัดการผู้ใช้ภายใน
                      </a>
                    </li>
                    <li>
                      <a
                        href="#จัดการผู้ใช้ภายนอก"
                        onClick={closeAll}
                        className="menu"
                      >
                        จัดการผู้ใช้ภายนอก
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <button
                  type="button"
                  onClick={() => toggle("settings")}
                  className={`subMenu flex h-[46px] w-full cursor-pointer items-center px-[20px] hover:bg-[#05547E] md:w-auto ${openKey === "settings" ? "opened bg-[#05547E]" : ""}`}
                >
                  ตั้งค่าระบบ
                </button>

                {openKey === "settings" && (
                  <ul
                    className={` ${mobileOpen ? "static" : "absolute"} top-full left-0 bg-[#05547E]`}
                  >
                    <li>
                      <a
                        href="#Tags ข้อเสนอโครงการ"
                        onClick={closeAll}
                        className="menu"
                      >
                        Tags ข้อเสนอโครงการ
                      </a>
                    </li>
                    <li>
                      <a href="#สถานะภาพ" onClick={closeAll} className="menu">
                        สถานะภาพ
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
