import { Task } from '@prisma/client';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

interface Props {
  task: Task;
  refreshData: () => void;
}

export function TaskPage({ task, refreshData }: Props) {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus('taskName');
  }, [mode, setFocus]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const body = { name: data.taskName };
      await fetch(`/api/tasks/${task.id}`, {
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

  const incompleteTask = async () => {
    try {
      await fetch(`/api/tasks/incomplete/${task.id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async () => {
    try {
      await fetch(`/api/tasks/complete/${task.id}`);
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = () => {
    if (task.completedDateTime) {
      incompleteTask();
    } else {
      completeTask();
    }
  };

  const cancelEdit = () => {
    reset();
    setMode('view');
  };

  const deleteProject = async () => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };

  return mode === 'view' ? (
    <div className='flex gap-5 items-center'>
      <div className='w-full flex items-center'>
        <input
          type='checkbox'
          name={`task-${task.id}`}
          id={`task-${task.id}`}
          checked={Boolean(task.completedDateTime)}
          onChange={toggleComplete}
        />
        <label htmlFor={`task-${task.id}`}>{task.name}</label>
      </div>
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
        defaultValue={task.name as string}
        className='p-2 rounded-md outline-none text-purple-800'
        type='text'
        {...register('taskName', { required: true })}
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
