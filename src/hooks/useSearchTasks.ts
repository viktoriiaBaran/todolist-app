import { Task } from '@redux/types';
import { useEffect, useState } from 'react';

const useSearchTasks = ({
  taskList,
}: {
  taskList: { [date: string]: Task[] };
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [filteredTasksByDate, setFilteredTasksByDate] = useState<{
    [date: string]: Task[];
  }>({});

  useEffect(() => {
    if (!taskList) {
      setFilteredTasksByDate({});
      return;
    }

    if (searchValue === '') {
      setFilteredTasksByDate(taskList);
      return;
    }

    const filteredTasks: { [date: string]: Task[] } = {};

    // Iterate through each date
    Object.entries(taskList).forEach(([date, tasks]) => {
      // Filter tasks for current date
      const matchingTasks = tasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchValue.toLowerCase())
      );

      // Only add date to filtered results if there are matching tasks
      if (matchingTasks.length > 0) {
        filteredTasks[date] = matchingTasks;
      }
    });

    setFilteredTasksByDate(filteredTasks);
  }, [searchValue, taskList]);

  return {
    searchValue,
    setSearchValue,
    isSearchVisible,
    setIsSearchVisible,
    filteredTasks: filteredTasksByDate,
  };
};

export default useSearchTasks;
