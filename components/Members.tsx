"use client";
import { useState } from "react";
import Photo from "./Photo";
import type { Member } from "@/lib/content/types";

export default function Members({ members }: { members: Member[] }) {
  return (
    <section id="team" className="section">
      <div className="wrap">
        <h2 className="heading">Core team</h2>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
          {members.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false);
  const showImage = member.image && !imgError;

  return (
    <li>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-raised">
        {showImage ? (
          <Photo
            src={member.image!}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover grayscale"
            style={{ objectPosition: member.imagePosition || "center top" }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-3xl font-semibold text-muted">
            {member.initials}
          </div>
        )}
      </div>

      <h3 className="mt-3 text-lg leading-snug">{member.name}</h3>
      <p className="mt-1 text-muted">{member.role}</p>
      <p className="text-muted">{member.batch}</p>
    </li>
  );
}
