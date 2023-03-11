import { Layout } from '@/modules/shared';
import { TaskPage } from '@/modules/tasks/components';
import { Task } from '@prisma/client';
import { FieldValues, useForm } from 'react-hook-form';

interface Props {
  projectName: string | null;
  projectId: number;
  tasks: Task[];
  refreshData: () => void;
}

export default function TasksPage({
  projectName,
  projectId,
  tasks,
  refreshData,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const body = {
        name: data.taskName,
        projectId,
      };
      await fetch(`/api/tasks`, {
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
      <h1 className='text-2xl font-bold'>{projectName}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-5'
      >
        <input
          type='text'
          className='p-2 rounded-md outline-none text-purple-800'
          {...register('taskName', { required: true })}
        />
        <button type='submit' role='submit' className='button'>
          Add
        </button>
      </form>
      <ul className='flex flex-col gap-3'>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskPage task={task} refreshData={refreshData} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
