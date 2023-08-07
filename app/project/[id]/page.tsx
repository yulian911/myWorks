import Image from 'next/image';
import Link from 'next/link';

import { getCurrentUser } from '@/lib/session';
import { getProjectDetails } from '@/lib/actions';
import Modal from '@/components/Modal';
import ProjectActions from '@/components/ProjectActions';
import RelatedProjects from '@/components/RelatedProjects';
import { ProjectInterface } from '@/common.types';
import { Github, ScreenShare } from 'lucide-react';
import Button from '@/components/Button';
import { shimmer, toBase64 } from '@/lib/utils';

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as { project?: ProjectInterface };

  if (!result?.project) return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="w-full max-w-5xl flexBetween gap-y-8 max-xs:flex-col">
        <div className="flex items-start flex-1 w-full gap-5 max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-col flex-1 gap-1 flexStart">
            <p className="self-start text-lg font-semibold">{projectDetails?.title}</p>
            <div className="user-info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link
                href={`/?category=${projectDetails.category}`}
                className="font-semibold text-primary-purple">
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex items-center justify-end gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3 mt-14 2xl:flex-row">
        <Image
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(864, 598))}`}
          src={`${projectDetails?.image}`}
          className="object-cover rounded-2xl"
          width={864}
          height={598}
          alt="poster"
        />
        <div className='flex-col flexCenter"'>
          <p className="self-start text-lg font-semibold">{projectDetails?.title}</p>
          <p className="max-w-5xl text-xl font-normal">{projectDetails?.description}</p>

          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {projectDetails?.githubUrl && (
              <>
                <Link
                  href={projectDetails?.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-2 font-medium flexCenter tex-sm text-primary-purple">
                  <Button type="button">
                    <Github />
                    <span>Github</span>
                  </Button>
                </Link>
                <Image src="/dot.svg" width={4} height={4} alt="dot" />
              </>
            )}
            {projectDetails?.liveSiteUrl && (
              <Link
                href={projectDetails?.liveSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="gap-2 font-medium flexCenter tex-sm text-primary-purple">
                <Button>
                  <ScreenShare />
                  <span>Live Site</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* <section className="flex-col mt-20 flexCenter">
        <p className="max-w-5xl text-xl font-normal">{projectDetails?.description}</p>

        <div className="flex flex-wrap gap-5 mt-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="gap-2 font-medium flexCenter tex-sm text-primary-purple">
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="gap-2 font-medium flexCenter tex-sm text-primary-purple">
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section> */}

      <section className="w-full gap-8 flexCenter mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects userId={projectDetails?.createdBy?.id} projectId={projectDetails?.id} />
    </Modal>
  );
};

export default Project;
