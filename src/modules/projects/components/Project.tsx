import { Prisma, Project } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface Props {
  project: Project;
  refreshData: () => void;
}

export function Project({ project, refreshData }: Props) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus('projectName');
  }, [mode, setFocus]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const body = { name: data.projectName };
      await fetch(`/api/projects/${project.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      refreshData();
      reset();
      setMode('view');
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    reset();
    setMode('view');
  };

  const deleteProject = async () => {
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE',
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return mode === 'view' ? (
    <div className='flex gap-5 items-center'>
      <div className='w-full'>{project.name}</div>
      <button onClick={() => setMode('edit')} className='button'>
        Edit
      </button>
      <button onClick={deleteProject} className='button'>
        Delete
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
      <input
        defaultValue={project.name as string}
        className='p-2 rounded-md outline-none text-purple-800'
        type='text'
        {...register('projectName', { required: true })}
      />
      <button className='button' type='submit' role='submit'>
        Save
      </button>
      <button className='button' onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
}
