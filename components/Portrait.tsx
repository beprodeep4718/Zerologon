'use client';
import { useState } from 'react';
import Photo from './Photo';
import type { Member } from '@/lib/content/types';

export default function Portrait({ member }: { member: Member }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-rule">
      {member.image && !failed ? (
        <Photo
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          className="object-cover"
          style={{ objectPosition: member.imagePosition || 'center top' }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-5xl">{member.initials}</div>
      )}
    </div>
  );
}
