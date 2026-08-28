"use client";
import Image from "next/image";
import membersData from "@/data/members.json";
import { useState } from "react";

export default function Members() {
  return (
    <section
      id="members"
      className="bg-zerologon-black px-4 sm:px-8 lg:px-16 py-16 sm:py-24 border-b-4 border-zerologon-yellow"
    >
      <div className="flex items-center gap-4 mb-8 sm:mb-12">
        <span
          className="font-bebas text-3xl sm:text-5xl leading-none text-zerologon-yellow"
          style={{ opacity: 0.25 }}
        >
          02
        </span>
        <h2 className="font-bebas text-3xl sm:text-5xl leading-none tracking-[0.05em] text-zerologon-white">
          CORE <span className="text-zerologon-red">MEMBERS</span>
        </h2>
        <div className="flex-1 h-1 bg-zerologon-yellow ml-2 sm:ml-4"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {membersData.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </div>
    </section>
  );
}

function MemberCard({
  member,
}: {
  member: (typeof membersData)[number] & { imagePosition?: string };
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = member.image && !imgError;

  return (
    <div className="border-2 border-gray-700 bg-gray-950 transition-all duration-75 relative overflow-hidden group hover:border-zerologon-yellow hover:-translate-x-1 hover:-translate-y-1 hover:shadow-zerologon hover:shadow-zerologon-yellow/30">
      <div className="absolute top-0 left-0 right-0 h-1 bg-zerologon-yellow transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-10"></div>

      <div className="relative aspect-[4/5] bg-gray-900 border-b-2 border-gray-700 overflow-hidden">
        {showImage ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-200"
            style={{ objectPosition: member.imagePosition || "center top" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,229,0,0.04) 4px, rgba(255,229,0,0.04) 8px)",
              }}
            ></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-zerologon-yellow/50 flex items-center justify-center bg-gray-950">
              <span className="font-bebas text-2xl sm:text-3xl text-zerologon-yellow tracking-wide">
                {member.initials}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <div className="font-space-mono text-sm sm:text-base font-bold text-zerologon-white mb-1 leading-snug">
          {member.name}
        </div>
        <div className="font-share-tech text-xs text-zerologon-yellow uppercase tracking-[0.15em] mb-3 pb-3 border-b border-gray-800">
          {member.role}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {member.skills.map((skill, j) => (
            <span
              key={j}
              className="font-share-tech text-xs text-gray-500 border border-gray-700 px-2 py-1 uppercase group-hover:border-gray-600 group-hover:text-gray-400 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}