import React from "react";
import { MapPin, Phone, Mail, Globe, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8 text-sm md:grid-cols-3">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="mb-2 text-base font-semibold text-white">
              กองทุนวิจัยและพัฒนาฯ
            </h3>
            <p className="leading-relaxed text-slate-400">
              กองทุนวิจัยและพัฒนากิจการกระจายเสียง กิจการโทรทัศน์
              และกิจการโทรคมนาคม เพื่อประโยชน์สาธารณะ (กทปส.)
            </p>
            <div className="mt-2 flex items-start gap-2">
              <MapPin
                size={18}
                className="mt-0.5 flex-shrink-0 text-blue-500"
              />
              <span className="text-slate-400">
                เลขที่ 87 ถนนพหลโยธิน ซอย 8 แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400
              </span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="mb-2 text-base font-semibold text-white">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3">
              <li className="group flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
                <Phone
                  size={18}
                  className="text-blue-500 transition-transform group-hover:scale-110"
                />
                <span>02-271-0151</span>
              </li>
              <li className="group flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
                <Mail
                  size={18}
                  className="text-blue-500 transition-transform group-hover:scale-110"
                />
                <span>info@nbtc.go.th</span>
              </li>
              <li className="group flex cursor-pointer items-center gap-2 transition-colors hover:text-white">
                <Globe
                  size={18}
                  className="text-blue-500 transition-transform group-hover:scale-110"
                />
                <span>www.nbtc.go.th</span>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="mb-2 text-base font-semibold text-white">
              ติดตามข่าวสาร
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all hover:bg-blue-600 hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 transition-all hover:bg-sky-500 hover:text-white"
              >
                <Globe size={20} />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} สำนักงาน กสทช. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="bg-slate-950 py-3 text-center">
        <p className="text-xs text-slate-600">
          Version 2.0.1 • รองรับการแสดงผลบน Chrome, Firefox, Safari
        </p>
      </div>
    </footer>
  );
}
