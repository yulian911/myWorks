import Image from 'next/image';
import Link from 'next/link';

import { getCurrentUser } from '@/lib/session';

// import AuthProviders from "./AuthProviders";
// import Button from "./Button";
// import ProfileMenu from "./ProfileMenu";
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import Button from './Button';
import ProfileMenu from './ProfileMenu';

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 gap-10 flexStart">
        <Link href="/">
          <Image src="/logo.png" width={200} height={43} alt="logo" />
        </Link>
        {/* <ul className="hidden xl:flex text-small gap-7">
          {NavLinks.map(link => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul> */}
      </div>

      <div className="gap-4 flexCenter">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
