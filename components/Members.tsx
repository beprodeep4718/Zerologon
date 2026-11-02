"use client";
import { useRef, useState } from "react";
import Photo from "./Photo";
import { MOTION, ScrollTrigger, gsap, useGSAP } from "@/lib/motion";
import type { Member } from "@/lib/content/types";

function Portrait({ member, sizes }: { member: Member; sizes: string }) {
  const [imgError, setImgError] = useState(false);

  if (!member.image || imgError) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-crash text-6xl font-light">
        {member.initials}
      </div>
    );
  }

  return (
    <Photo
      src={member.image}
      alt={member.name}
      fill
      sizes={sizes}
      className="photo-ink object-cover"
      style={{ objectPosition: member.imagePosition || "center top" }}
      onError={() => setImgError(true)}
    />
  );
}

export default function Members({ members }: { members: Member[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  // On wide screens the portrait follows whichever name is in the middle of the screen.
  useGSAP(
    () => {
      gsap.matchMedia().add(`${MOTION} and (min-width: 768px)`, () => {
        gsap.utils.toArray<HTMLElement>("[data-member]").forEach((row, i) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="team" className="relative bg-void">
      <h2 className="gutter pt-20 text-haze md:absolute md:top-0 md:right-0 md:pt-24">Core team</h2>

      {/* Phones: swipe through the team. */}
      <ul className="gutter mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-20 md:hidden">
        {members.map((member) => (
          <li key={member.name} className="w-[72vw] shrink-0 snap-center">
            <div className="relative aspect-[4/5] overflow-hidden bg-line">
              <Portrait member={member} sizes="72vw" />
            </div>
            <h3 className="mt-3 text-2xl font-normal tracking-tight">{member.name}</h3>
            <p className="text-haze">
              {member.role}, {member.batch}
            </p>
          </li>
        ))}
      </ul>

      {/* Wide screens: a fixed portrait beside a long list of names. */}
      <div className="hidden grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:grid">
        <div className="sticky top-0 h-svh overflow-hidden bg-line">
          {members.map((member, i) => (
            <div
              key={member.name}
              className={`absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                active === i ? "z-10 [clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
              }`}
            >
              <Portrait member={member} sizes="42vw" />
            </div>
          ))}
        </div>

        <ol className="gutter py-[50vh]">
          {members.map((member, i) => (
            <li key={member.name} data-member>
              <button
                type="button"
                onClick={() => setActive(i)}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                className="block w-full py-3 text-left"
              >
                <span
                  className={`type-title block transition-colors duration-300 ${
                    active === i ? "text-paper" : "text-ash"
                  }`}
                >
                  {member.name}
                </span>
                <span
                  className={`mt-1 block text-lg transition-colors duration-300 ${
                    active === i ? "text-haze" : "text-ash"
                  }`}
                >
                  {member.role}, {member.batch}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
