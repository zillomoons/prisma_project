import { safeJson } from '@/lib/formatHelpers';
import prisma from '@/lib/prisma';
import TasksPage from '@/modules/tasks';
import { Project, Task } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  project: Project & { tasks: Task[] };
}

const Tasks = ({ project }: Props) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Head>
        <title>Tasks</title>
        <meta
          name='description'
          content='Adding a little sparkle to your everyday to dos.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <TasksPage
        projectId={project.id}
        projectName={project.name}
        tasks={project.tasks}
        refreshData={refreshData}
      />
    </>
  );
};

export default Tasks;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      props: {},
    };
  }
  let project = await prisma.project.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      tasks: true,
    },
  });

  project = safeJson(project);

  return {
    props: { project },
  };
};
