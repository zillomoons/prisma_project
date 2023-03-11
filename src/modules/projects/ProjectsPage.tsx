import { ProjectPage } from '@/modules/projects/components';
import { Layout } from '@/modules/shared';
import { Project } from '@prisma/client';
import { FieldValues, useForm } from 'react-hook-form';

interface Props {
  projects: Project[];
  refreshData: () => void;
}

export const ProjectsPage = ({ projects, refreshData }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const body = { name: data.projectName };
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      refreshData();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className='flex flex-col gap-5 text-white font-bold'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex items-center gap-5'
        >
          <input
            type='text'
            className='p-2 rounded-md outline-none text-purple-800'
            {...register('projectName', { required: true })}
          />
          <button type='submit' role='submit' className='button'>
            Add
          </button>
        </form>

        <ul className='flex flex-col gap-3'>
          {projects.map((project) => (
            <li
              key={project.id}
              className='cursor-pointer text-lg hover:text-yellow-400'
            >
              <ProjectPage project={project} refreshData={refreshData} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};
